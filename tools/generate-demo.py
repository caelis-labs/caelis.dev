"""Build a homepage MP4 from reviewed Caelis ANSI captures.

Timing is editorial. Reviewed replies stream; submitted user messages and tools
appear whole. Composer typing, pointer gestures, waiting clocks, and the pending
main pane are reconstructed from the same captures, without a live model run.
"""
import argparse
import json
import math
import subprocess
import textwrap
from pathlib import Path

import pyte
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

ROOT = Path(__file__).resolve().parents[1]
MEDIA = ROOT / "assets/video"
DURATION_MS = 44000
POSTER_MS = 25800
COLS, ROWS = 140, 42
DISABLE = "\x1b[?1000l\x1b[?1002l\x1b[?1003l\x1b[?1006l\x1b[?2004l\x1b[?25l"
captures = json.loads((ROOT / "tools/recordings/session.json").read_text(encoding="utf8"))
screens = {}
for name, capture in captures.items():
    screen = pyte.Screen(COLS, ROWS)
    pyte.Stream(screen).feed(capture["ansi"])
    screens[name] = screen


def color(value, default):
    if value == "default":
        return default
    named = {"black": "000000", "red": "cc5555", "green": "55cc55", "brown": "cccc55", "blue": "5555cc", "magenta": "cc55cc", "cyan": "55cccc", "white": "cccccc"}
    return "#" + named.get(value, value)


def style(cell):
    fg, bg = color(cell.fg, "#e7e9ee"), color(cell.bg, "#000000")
    if cell.reverse:
        fg, bg = bg, fg
    rgb = lambda c: ";".join(str(int(c[i:i+2], 16)) for i in (1, 3, 5))
    return "\x1b[0;38;2;" + rgb(fg) + ";48;2;" + rgb(bg) + (";1" if cell.bold else "") + "m"


events = []
gestures = []
carets = []


def event(at, data, reset=False):
    item = {"at": round(at), "data": data}
    if reset:
        item["reset"] = True
    events.append(item)


def mask(name, x, y, width, height):
    """Hide characters while retaining the captured cell backgrounds."""
    data = ""
    for row in range(y, y+height):
        data += f"\x1b[{row+1};{x+1}H"
        previous_style = None
        for col in range(x, x+width):
            current_style = style(screens[name].buffer[row][col])
            if current_style != previous_style:
                data += current_style
                previous_style = current_style
            data += " "
    return data


def frame(name, at, regions=()):
    data = "\x1b[2J\x1b[H" + captures[name]["ansi"] + DISABLE
    for region in regions:
        data += mask(name, *region)
    event(at, data, reset=True)


def region_cells(name, region):
    x, y, width, height = region
    cells = []
    for row in range(y, y+height):
        line = screens[name].buffer[row]
        last = max((col for col in range(x, x+width) if line[col].data.strip()), default=x-1)
        for col in range(x, last+1):
            cells.append((col, row, line[col]))
    return cells


def write_cells(cells):
    return "".join(f"\x1b[{row+1};{col+1}H" + style(cell) + cell.data for col, row, cell in cells)


def show(name, at, region):
    """Show one complete user input, tool record, or separator."""
    x, y, width, height = region
    event(at, write_cells([(col, row, screens[name].buffer[row][col])
                          for row in range(y, y+height) for col in range(x, x+width)]))


def stream_assistant(name, at, duration, region):
    """Animate only the assistant reply in the specified captured region."""
    cells = region_cells(name, region)
    chunk = 12
    for begin in range(0, len(cells), chunk):
        event(at + duration * begin / max(1, len(cells)), write_cells(cells[begin:begin+chunk]))


def text_at(x, y, text, fg="e7e9ee", bg="000000"):
    cell = screens["welcome"].default_char._replace(fg=fg, bg=bg)
    return f"\x1b[{y+1};{x+1}H" + style(cell) + text


def clear(x, y, width, height=1, bg="000000"):
    return "".join(text_at(x, row, " "*width, bg=bg) for row in range(y, y+height))


def captured_text(name, rows, start, end):
    """Undo hard wraps inside a captured text block, keeping its original words."""
    return "".join(screens[name].display[row][start:end] for row in rows).rstrip()


TASK = captured_text("dispatch", range(1, 5), 5, 139)
FOLLOWUP = captured_text("steer", range(27, 29), 81, 139)


def compose(text, at, duration, submit, pane=False):
    """Type inside the editor; submission itself is a separate whole-block event."""
    x, width, bg = (78, 61, "1a1a1a") if pane else (2, 136, "0f0f0f")
    content_width = width-4
    # Leave time for the final typed text to register before Enter submits it.
    step = 40
    for offset in range(0, duration+step, step):
        progress = min(1, offset/duration)
        visible = text[:round(len(text)*progress)]
        lines = textwrap.wrap(visible, content_width, break_on_hyphens=False) or [""]
        top = 40-len(lines)
        data = clear(x, 35, width, 6)
        data += clear(x, top-1, width, len(lines)+2, bg)
        for row, line in enumerate(lines):
            data += text_at(x+3, top+row, line, bg=bg)
        data += text_at(x+1, top, ">", fg="7c9cf5", bg=bg)
        event(at+min(offset, duration), data)
        carets.append((at+min(offset, duration), submit, x+3+len(lines[-1]), 39))
    event(submit, clear(x, 35, width, 6))
    event(submit, mask("orbit" if pane else "welcome", x, 38, width, 3))
    show("orbit" if pane else "welcome", submit, (x, 39, width, 1))


def gesture(at, start, target, click=None, end=None):
    """Pointer coordinates are terminal cells; it fades away after the action."""
    gestures.append({"at": at, "start": start, "target": target,
                     "click": click, "end": end or (click+550 if click else at+1200)})


def waiting(start, end, x=3, origin=None):
    """The visible clock follows the edited scene clock, not a frozen capture."""
    origin = start if origin is None else origin
    for at in range(start, end, 100):
        seconds = (at-origin)/1000
        data = clear(x, 36, 38)
        data += text_at(x, 36, "•", fg="7c9cf5")
        data += text_at(x+2, 36, f"Waiting for response · {seconds:.1f}s", fg="a8afbd")
        event(at, data)
    event(end, clear(x, 36, 38))


def footer(at, status, split=False, budget=None):
    x, width = (44, 31) if split else (102, 38)
    event(at, clear(x, 41, width))
    if status:
        budget = budget or ("7.8k / 258k · 3%" if status == "2 done" else "5.1k / 258k · 1%")
        event(at, text_at(x, 41, f"• {status}  {budget}", fg="a8afbd"))


def pending_line(name, source_row, target_row, at):
    """Fit a real collapsed tool/message row into the narrower main pane."""
    cells = region_cells(name, (2, source_row, 138, 1))
    if len(cells) > 71:
        cells = cells[:70] + [(0, 0, cells[70][2]._replace(data="…"))]
    event(at, clear(2, target_row, 73))
    event(at, write_cells([(2+i, target_row, cell) for i, (_, _, cell) in enumerate(cells)]))


def pending_main(at, phase):
    """Replace the already-finished left capture with its earlier task/progress.

    Split captures were taken after completion. Preserve their genuine pane
    chrome, but never leak final Findings or a stale '2 done' into active work.
    """
    event(at, clear(0, 0, 76, 38))
    lines = textwrap.wrap(TASK, 68, break_on_hyphens=False)
    for row, line in enumerate(lines, 1):
        event(at, clear(2, row, 73, bg="0f0f0f") + text_at(5, row, line, bg="0f0f0f"))
    event(at, text_at(3, 1, ">", fg="7c9cf5", bg="0f0f0f"))
    for source_row, target_row in ((7, 11), (9, 13), (11, 15)):
        pending_line("dispatch", source_row, target_row, at)
    if phase >= 1:
        pending_line("review", 8, 20, at)
        pending_line("review", 10, 22, at)
    if phase >= 2:
        pending_line("review", 12, 24, at)
        pending_line("review", 14, 26, at)
    footer(at, ("2 running", "1 running", "2 done")[phase], split=True)


def separator(row, at, label):
    # Completion durations use the same edited clock as the animated waits.
    text = f" {label} "
    side = (61-len(text))//2
    event(at, text_at(77, row, "─"*side + text + "─"*(61-side-len(text)), fg="5b6270"))


def build_timeline():
    frame("welcome", 0)
    gesture(100, (24, 36), (8, 39.4), click=430, end=1150)
    compose("/connect", 550, 520, 1400)
    frame("connect", 1500)
    gesture(1650, (8, 39.4), (19, 30.4), click=2350)
    frame("providers", 2450)
    gesture(2800, (19, 30.4), (18, 24.4), end=4050)
    frame("welcome", 4300)
    compose("/subagent", 4480, 600, 5250)
    frame("subagent", 5350)
    gesture(5500, (24, 21), (24, 16.5), end=6500)
    gesture(6500, (24, 16.5), (126.3, 9.4), click=7090)
    frame("welcome", 7200)
    gesture(7290, (126, 9.4), (12, 39.4), click=7690, end=8400)
    compose(TASK, 7780, 1260, 9350)
    frame("dispatch", 9400, [(0, 6, 140, 12), (0, 35, 140, 3)])
    footer(9400, "")
    show("dispatch", 9800, (0, 7, 140, 1))
    show("dispatch", 10400, (0, 9, 140, 1))
    footer(10400, "1 running")
    show("dispatch", 11000, (0, 11, 140, 1))
    footer(11000, "2 running")
    waiting(9400, 12000)
    gesture(11100, (13, 39.4), (19, 11.4), click=11850)

    # Orbit finishes before Breeze's captured parent message references it.
    frame("orbit", 12000, [(77, 2, 62, 33)])
    pending_main(12000, 0)
    waiting(12000, 20000, origin=9400)
    waiting(12000, 12400, x=79)
    stream_assistant("orbit", 12400, 4400, (77, 2, 62, 20))
    separator(22, 16900, "4.9s")
    show("orbit", 17300, (77, 24, 62, 4))
    show("orbit", 17900, (77, 29, 62, 1))
    stream_assistant("orbit", 18200, 900, (77, 31, 62, 3))
    separator(34, 19200, "1.9s")
    footer(19200, "1 running", split=True)
    pending_line("review", 8, 20, 19200)
    gesture(19300, (89, 32), (19, 13.4), click=19850)

    frame("breeze", 20000, [(77, 14, 62, 21)])
    pending_main(20000, 1)
    waiting(20000, 27000, origin=9400)
    waiting(20000, 20400, x=79)
    stream_assistant("breeze", 20400, 5000, (77, 14, 62, 20))
    separator(34, 25500, "5.5s")
    footer(25500, "2 done", split=True)
    pending_line("review", 12, 24, 25500)
    gesture(26100, (96, 33), (19, 15.4), click=26850)

    frame("steer", 27000, [(77, 26, 62, 9)])
    event(27000, clear(77, 26, 62, 9))
    pending_main(27000, 2)
    # Replace old completion labels that scroll into the follow-up capture.
    separator(12, 27000, "4.9s")
    separator(24, 27000, "1.9s")
    waiting(27000, 33700, origin=9400)
    gesture(27200, (19, 15.4), (87, 39.4), click=27850, end=28500)
    compose(FOLLOWUP, 28000, 1560, 29950, pane=True)
    show("steer", 30000, (77, 26, 62, 3))
    footer(30000, "1 running", split=True, budget="7.8k / 258k · 3%")
    waiting(30000, 30800, x=79)
    stream_assistant("steer", 30800, 1700, (77, 31, 62, 3))
    separator(34, 32600, "2.6s")
    footer(32600, "2 done", split=True)
    gesture(32800, (96, 36), (135.5, 0.5), click=33550)

    frame("review", 33700, [(0, 16, 140, 19)])
    waiting(33700, 34000, origin=9400)
    stream_assistant("review", 34000, 5900, (0, 16, 140, 19))
    events.sort(key=lambda e: e["at"])


build_timeline()


def smooth(value):
    value = max(0, min(1, value))
    return value*value*(3-2*value)


def draw_interaction(body, now, left, top, cw, ch):
    """Render overlays on a copy so a moving pointer/caret cannot leave trails."""
    active = [g for g in gestures if g["at"] <= now < g["end"]]
    cursor = next((c for c in reversed(carets) if c[0] <= now < c[1]), None)
    if not active and cursor is None:
        return body
    overlay = Image.new("RGBA", body.size)
    draw = ImageDraw.Draw(overlay)
    if cursor:
        _, _, col, row = cursor
        x, y = left+col*cw, top+row*ch
        draw.rectangle((x, y+5, x+3, y+ch-5), fill=(168, 190, 255, 240))
    for g in active:
        arrive = g["click"]-80 if g["click"] else g["at"]+650
        t = smooth((now-g["at"])/(arrive-g["at"]))
        x = left + (g["start"][0] + (g["target"][0]-g["start"][0])*t)*cw
        y = top + (g["start"][1] + (g["target"][1]-g["start"][1])*t)*ch
        alpha = round(255*min(smooth((now-g["at"])/140), smooth((g["end"]-now)/250)))
        if g["click"] and 0 <= now-g["click"] < 420:
            phase = (now-g["click"])/420
            radius = 13+32*smooth(phase)
            draw.ellipse((x-radius, y-radius, x+radius, y+radius),
                         outline=(124, 156, 245, round(alpha*(1-phase))), width=4)
        points = [(x, y), (x+3, y+51), (x+15, y+38), (x+26, y+59),
                  (x+36, y+53), (x+25, y+33), (x+43, y+31)]
        draw.polygon(points, fill=(244, 247, 255, alpha), outline=(18, 24, 38, alpha), width=3)
    return Image.alpha_composite(body.convert("RGBA"), overlay).convert("RGB")


def render_video(font_path, output, fps=30, stills=None):
    width, height, size = 3840, 2160, 46
    font = ImageFont.truetype(str(font_path), size)
    bold_path = Path(font_path).with_name("consolab.ttf")
    bold = ImageFont.truetype(str(bold_path if bold_path.exists() else font_path), size)
    symbol_path = Path(font_path).with_name("seguisym.ttf")
    symbols = ImageFont.truetype(str(symbol_path if symbol_path.exists() else font_path), size)
    cw, ch = font.getlength("M"), 50
    left, top = (width-COLS*cw)/2, (height-ROWS*ch)//2
    screen = pyte.Screen(COLS, ROWS)
    stream = pyte.Stream(screen)
    body = Image.new("RGB", (width, height), "black")
    previous_rows = [None]*ROWS
    pointer = 0
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    args = [ffmpeg, "-y", "-hide_banner", "-loglevel", "error", "-f", "rawvideo", "-vcodec", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{width}x{height}", "-r", str(fps), "-i", "-", "-an", "-c:v", "libx264", "-preset", "veryfast", "-crf", "16", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(output)]
    process = None if stills else subprocess.Popen(args, stdin=subprocess.PIPE)
    if stills:
        stills.mkdir(parents=True, exist_ok=True)
        times = [0, 950, 2300, 6000, 8700, 9700, 11700, 14500, 19500,
                 22500, POSTER_MS, 29400, 30400, 31700, 33200, 38500, 41500]
    else:
        times = (number*1000/fps for number in range(math.ceil(DURATION_MS/1000*fps)))
    saved = False
    opening = None
    for number, now in enumerate(times):
        while pointer < len(events) and events[pointer]["at"] <= now:
            item = events[pointer]
            if item.get("reset"):
                screen.reset()
            stream.feed(item["data"])
            pointer += 1
        draw = ImageDraw.Draw(body)
        # Resetting/replaying a capture can discard accumulated pyte dirty rows.
        # Compare actual visible cells so state changes cannot leave stale pixels.
        for row in range(ROWS):
            cells = screen.buffer[row]
            signature = tuple(cells[col] for col in range(COLS))
            if signature == previous_rows[row]:
                continue
            previous_rows[row] = signature
            y = top + row*ch
            draw.rectangle((0, y, width-1, y+ch-1), fill="black")
            col = 0
            while col < COLS:
                cell = cells[col]
                fg, bg = color(cell.fg, "#e7e9ee"), color(cell.bg, "#000000")
                if cell.reverse:
                    fg, bg = bg, fg
                end = col+1
                while end < COLS and cells[end]._replace(data="") == cell._replace(data=""):
                    end += 1
                draw.rectangle((round(left+col*cw), y, round(left+end*cw)-1, y+ch-1), fill=bg)
                text = "".join(cells[i].data for i in range(col, end))
                draw.text((left+col*cw, y+41), text.replace("◨", " ").replace("◆", " "), font=bold if cell.bold else font, fill=fg, anchor="ls")
                for offset, char in enumerate(text):
                    if char in ("◨", "◆"):
                        draw.text((left+(col+offset)*cw, y+41), char, font=symbols, fill=fg, anchor="ls")
                col = end
        screen.dirty.clear()
        if opening is None:
            opening = body.copy()
        if not stills and not saved and now >= POSTER_MS:
            body.save(output.with_name("caelis-demo-poster.png"))
            saved = True
        picture = draw_interaction(body, now, left, top, cw, ch)
        if now > DURATION_MS-300:
            picture = Image.blend(picture, opening, smooth((now-(DURATION_MS-300))/300))
        if stills:
            picture.save(stills / f"{now:05d}ms.png")
            continue
        if number % (fps*10) == 0:
            print(f"rendered {number//fps}s", flush=True)
        process.stdin.write(picture.tobytes())
    if stills:
        print(f"Wrote {len(times)} inspection frames to {stills}", flush=True)
        return
    process.stdin.close()
    if process.wait() != 0:
        raise SystemExit("Video encoding failed")
    print(f"Wrote {output.name}: {output.stat().st_size} bytes", flush=True)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--font", default="C:/Windows/Fonts/consola.ttf")
    parser.add_argument("--stills", type=Path, help="Render inspection PNGs instead of encoding video")
    args = parser.parse_args()
    print(f"Video: {len(events)} events, {DURATION_MS/1000:.0f}s", flush=True)
    MEDIA.mkdir(parents=True, exist_ok=True)
    render_video(args.font, MEDIA / "caelis-demo.mp4", stills=args.stills)
