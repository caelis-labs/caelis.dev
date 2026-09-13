"""Build a browser timeline and MP4 from reviewed Caelis ANSI captures.

Timing is editorial: assistant text streams from real captures; user input and
tool records appear as complete blocks. Run with demo-requirements.
"""
import argparse
import json
import math
import subprocess
from pathlib import Path

import pyte
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

ROOT = Path(__file__).resolve().parents[1]
DEMO = ROOT / "demo"
COLS, ROWS = 140, 42
DISABLE = "\x1b[?1000l\x1b[?1002l\x1b[?1003l\x1b[?1006l\x1b[?2004l\x1b[?25l"
captures = json.loads((DEMO / "recordings/session.json").read_text(encoding="utf8"))
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


events, chapters = [], []


def event(at, data, scene=None, reset=False):
    item = {"at": round(at), "data": data}
    if scene is not None:
        item["scene"] = scene
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


def frame(name, at, title, note, regions=()):
    chapters.append({"id": name, "at": at, "title": title, "note": note})
    data = "\x1b[2J\x1b[H" + captures[name]["ansi"] + DISABLE
    for region in regions:
        data += mask(name, *region)
    event(at, data, name, True)


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
    event(at, write_cells(region_cells(name, region)))


def stream_assistant(name, at, duration, region):
    """Animate only the assistant reply in the specified captured region."""
    cells = region_cells(name, region)
    chunk = 12
    for begin in range(0, len(cells), chunk):
        event(at + duration * begin / max(1, len(cells)), write_cells(cells[begin:begin+chunk]))


def command(text, at):
    event(at, "\x1b[40;6H\x1b[48;2;15;15;15m\x1b[38;2;231;233;238m" + text + "\x1b[0m")


frame("welcome", 0, "Caelis · one local session", "A real terminal session led by GPT-6 Astra.")
command("/connect", 1600)
frame("connect", 2800, "Connect your models", "Use a provider account, API key, or installed ACP agent.")
frame("providers", 6000, "Choose a provider", "Hosted models and compatible endpoints share the same workspace.")
event(8600, "\x1b[2J\x1b[H" + captures["welcome"]["ansi"] + DISABLE, reset=True)
command("/subagent", 8700)
frame("subagent", 9800, "Configure specialist profiles", "Breeze uses Luna; Orbit uses Sol; Astra leads the session.")
frame("dispatch", 14500, "Give Astra a shared task", "Two participants inspect retry behavior and missing regression coverage.", [(0, 6, 140, 12)])
show("dispatch", 20200, (0, 7, 140, 1))
show("dispatch", 21000, (0, 9, 140, 1))
show("dispatch", 22000, (0, 11, 140, 1))
frame("breeze", 24000, "Inspect Breeze's findings", "Luna identifies cancellation and backoff defects.", [(77, 14, 62, 20)])
stream_assistant("breeze", 24400, 6500, (77, 14, 62, 20))
frame("orbit", 34000, "Compare Orbit's review", "Sol exchanges findings with Breeze and proposes regression coverage.", [(77, 2, 62, 33)])
stream_assistant("orbit", 34400, 5000, (77, 2, 62, 20))
show("orbit", 39500, (77, 22, 62, 1))
show("orbit", 39600, (77, 24, 62, 4))
show("orbit", 39800, (77, 29, 62, 1))
stream_assistant("orbit", 40000, 1000, (77, 31, 62, 3))
show("orbit", 41100, (77, 34, 62, 1))
frame("steer", 44000, "Steer a participant directly", "Ask Orbit for the single most useful test assertion.", [(77, 26, 62, 9)])
show("steer", 44400, (77, 26, 62, 3))
stream_assistant("steer", 48000, 2500, (77, 31, 62, 3))
show("steer", 50600, (77, 34, 62, 1))
frame("review", 54000, "Bring the findings together", "Astra combines the review. The sample files remain unchanged.", [(0, 16, 140, 19)])
stream_assistant("review", 54400, 4900, (0, 16, 140, 19))
events.sort(key=lambda e: e["at"])
for chapter, hold in zip(chapters, (1000, 4000, 7000, 13000, 23000, 33000, 43000, 53000, 63000)):
    chapter["hold"] = hold
timeline = {"version": 1, "cols": COLS, "rows": ROWS, "duration": 64000, "timing": "Editorial pacing reconstructed from genuine Caelis terminal captures.", "chapters": chapters, "events": events}


def compile_timeline():
    """Decode ANSI once so the static player needs no runtime terminal parser."""
    screen = pyte.Screen(COLS, ROWS)
    stream = pyte.Stream(screen)
    palette, lookup, compiled = [], {}, []
    previous = [[None]*COLS for _ in range(ROWS)]
    for item in events:
        if item.get("reset"):
            screen.reset()
            previous = [[None]*COLS for _ in range(ROWS)]
        stream.feed(item["data"])
        patches = []
        for row in sorted(screen.dirty):
            run = None
            for col in range(COLS):
                cell = screen.buffer[row][col]
                if previous[row][col] == cell:
                    run = None
                    continue
                fg, bg = color(cell.fg, "#e7e9ee"), color(cell.bg, "#000000")
                if cell.reverse:
                    fg, bg = bg, fg
                key = (fg, bg, cell.bold)
                if key not in lookup:
                    lookup[key] = len(palette)
                    palette.append(key)
                sid = lookup[key]
                if run is not None and run[3] == sid:
                    run[2] += cell.data
                else:
                    run = [row, col, cell.data, sid]
                    patches.append(run)
                previous[row][col] = cell
        screen.dirty.clear()
        compiled.append({**{k:v for k,v in item.items() if k != "data"}, "patches": patches})
    data = {**timeline, "events": compiled, "styles": palette}
    (DEMO / "recordings/timeline.json").write_bytes(json.dumps(data, ensure_ascii=False, separators=(",", ":")).encode())


compile_timeline()


def render_video(font_path, output, fps=30):
    font = ImageFont.truetype(str(font_path), 21)
    bold_path = Path(font_path).with_name("consolab.ttf")
    bold = ImageFont.truetype(str(bold_path if bold_path.exists() else font_path), 21)
    label = ImageFont.truetype(str(font_path), 20)
    small = ImageFont.truetype(str(font_path), 15)
    cw, ch = font.getlength("M"), 24
    left, top = (1920-COLS*cw)/2, 52
    screen = pyte.Screen(COLS, ROWS)
    stream = pyte.Stream(screen)
    body = Image.new("RGB", (1920, 1080), "black")
    pointer, chapter = 0, chapters[0]
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    args = [ffmpeg, "-y", "-hide_banner", "-loglevel", "error", "-f", "rawvideo", "-vcodec", "rawvideo", "-pix_fmt", "rgb24", "-s", "1920x1080", "-r", str(fps), "-i", "-", "-an", "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(output)]
    process = subprocess.Popen(args, stdin=subprocess.PIPE)
    saved = False
    for number in range(math.ceil(timeline["duration"]/1000*fps)):
        now = number*1000/fps
        while pointer < len(events) and events[pointer]["at"] <= now:
            item = events[pointer]
            if item.get("reset"):
                screen.reset()
            stream.feed(item["data"])
            if "scene" in item:
                chapter = next(c for c in chapters if c["id"] == item["scene"])
            pointer += 1
        draw = ImageDraw.Draw(body)
        for row in screen.dirty:
            y = top + row*ch
            draw.rectangle((0, y, 1919, y+ch-1), fill="black")
            cells = screen.buffer[row]
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
                draw.text((left+col*cw, y+19), text, font=bold if cell.bold else font, fill=fg, anchor="ls")
                col = end
        screen.dirty.clear()
        image = body.copy()
        draw = ImageDraw.Draw(image)
        draw.rectangle((0, 0, 1920, 43), fill="#10141c")
        draw.text((35, 10), "CAELIS  /  " + chapter["title"], font=label, fill="#dbe4f8")
        draw.text((1260, 14), "Real session captures · edited pacing", font=small, fill="#9da5b6")
        draw.rectangle((0, 1075, int(1920*now/timeline["duration"]), 1079), fill="#7c9cf5")
        if not saved and now >= 42000:
            image.save(output.with_name("caelis-demo-poster.png"))
            saved = True
        if number % (fps*10) == 0:
            print(f"rendered {number//fps}s", flush=True)
        process.stdin.write(image.tobytes())
    process.stdin.close()
    if process.wait() != 0:
        raise SystemExit("Video encoding failed")
    print(f"Wrote {output.name}: {output.stat().st_size} bytes", flush=True)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--font", default="C:/Windows/Fonts/consola.ttf")
    parser.add_argument("--video", action="store_true")
    args = parser.parse_args()
    print(f"Timeline: {len(events)} events, {timeline['duration']/1000:.0f}s", flush=True)
    if args.video:
        render_video(args.font, DEMO / "media/caelis-demo.mp4")
