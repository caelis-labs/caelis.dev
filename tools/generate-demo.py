"""Build a homepage MP4 from reviewed Caelis ANSI captures.

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
MEDIA = ROOT / "assets/video"
DURATION_MS = 64000
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
    event(at, write_cells(region_cells(name, region)))


def stream_assistant(name, at, duration, region):
    """Animate only the assistant reply in the specified captured region."""
    cells = region_cells(name, region)
    chunk = 12
    for begin in range(0, len(cells), chunk):
        event(at + duration * begin / max(1, len(cells)), write_cells(cells[begin:begin+chunk]))


def command(text, at):
    event(at, "\x1b[40;6H\x1b[48;2;15;15;15m\x1b[38;2;231;233;238m" + text + "\x1b[0m")


frame("welcome", 0)
command("/connect", 1600)
frame("connect", 2800)
frame("providers", 6000)
event(8600, "\x1b[2J\x1b[H" + captures["welcome"]["ansi"] + DISABLE, reset=True)
command("/subagent", 8700)
frame("subagent", 9800)
frame("dispatch", 14500, [(0, 6, 140, 12)])
show("dispatch", 20200, (0, 7, 140, 1))
show("dispatch", 21000, (0, 9, 140, 1))
show("dispatch", 22000, (0, 11, 140, 1))
frame("breeze", 24000, [(77, 14, 62, 20)])
stream_assistant("breeze", 24400, 6500, (77, 14, 62, 20))
frame("orbit", 34000, [(77, 2, 62, 33)])
stream_assistant("orbit", 34400, 5000, (77, 2, 62, 20))
show("orbit", 39500, (77, 22, 62, 1))
show("orbit", 39600, (77, 24, 62, 4))
show("orbit", 39800, (77, 29, 62, 1))
stream_assistant("orbit", 40000, 1000, (77, 31, 62, 3))
show("orbit", 41100, (77, 34, 62, 1))
frame("steer", 44000, [(77, 26, 62, 9)])
show("steer", 44400, (77, 26, 62, 3))
stream_assistant("steer", 48000, 2500, (77, 31, 62, 3))
show("steer", 50600, (77, 34, 62, 1))
frame("review", 54000, [(0, 16, 140, 19)])
stream_assistant("review", 54400, 4900, (0, 16, 140, 19))
events.sort(key=lambda e: e["at"])


def render_video(font_path, output, fps=30):
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
    pointer = 0
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    args = [ffmpeg, "-y", "-hide_banner", "-loglevel", "error", "-f", "rawvideo", "-vcodec", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{width}x{height}", "-r", str(fps), "-i", "-", "-an", "-c:v", "libx264", "-preset", "veryfast", "-crf", "16", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(output)]
    process = subprocess.Popen(args, stdin=subprocess.PIPE)
    saved = False
    for number in range(math.ceil(DURATION_MS/1000*fps)):
        now = number*1000/fps
        while pointer < len(events) and events[pointer]["at"] <= now:
            item = events[pointer]
            if item.get("reset"):
                screen.reset()
            stream.feed(item["data"])
            pointer += 1
        draw = ImageDraw.Draw(body)
        for row in screen.dirty:
            y = top + row*ch
            draw.rectangle((0, y, width-1, y+ch-1), fill="black")
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
                draw.text((left+col*cw, y+41), text.replace("◨", " ").replace("◆", " "), font=bold if cell.bold else font, fill=fg, anchor="ls")
                for offset, char in enumerate(text):
                    if char in ("◨", "◆"):
                        draw.text((left+(col+offset)*cw, y+41), char, font=symbols, fill=fg, anchor="ls")
                col = end
        screen.dirty.clear()
        if not saved and now >= 42000:
            body.save(output.with_name("caelis-demo-poster.png"))
            saved = True
        if number % (fps*10) == 0:
            print(f"rendered {number//fps}s", flush=True)
        process.stdin.write(body.tobytes())
    process.stdin.close()
    if process.wait() != 0:
        raise SystemExit("Video encoding failed")
    print(f"Wrote {output.name}: {output.stat().st_size} bytes", flush=True)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--font", default="C:/Windows/Fonts/consola.ttf")
    args = parser.parse_args()
    print(f"Video: {len(events)} events, {DURATION_MS/1000:.0f}s", flush=True)
    MEDIA.mkdir(parents=True, exist_ok=True)
    render_video(args.font, MEDIA / "caelis-demo.mp4")
