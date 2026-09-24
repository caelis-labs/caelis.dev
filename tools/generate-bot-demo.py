"""Render two connected Caelis Bot workflows from authored sample content.

UI is reconstructed from the owner's screenshots and v0.2.0 chat/bubble styles.
Terminal chrome follows the supplied Codex TUI; private paths, warning banners
and delegation envelopes are omitted. This is not a native/model recording.
Proactive activation remains the poc/eventbot direction, not a shipping feature.
"""
import argparse
import json
import math
import shutil
import subprocess
import unicodedata
from functools import lru_cache
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
STORY = json.loads((ROOT / 'src/data/bot-demo.json').read_text())
W, H, FPS = 1600, 900, 24
INK, MUTED, ACCENT = '#292929', '#777777', '#7468aa'
p = argparse.ArgumentParser(description=__doc__)
p.add_argument('--font', default='/System/Library/Fonts/Hiragino Sans GB.ttc')
p.add_argument('--latin-font', default='/System/Library/Fonts/SFNS.ttf')
p.add_argument('--mono-font', default='/System/Library/Fonts/Menlo.ttc')
p.add_argument('--ffmpeg', default=shutil.which('ffmpeg'))
p.add_argument('--character-frames', type=Path, default=ROOT / '.artifacts/bot-redesign/character')
p.add_argument('--avatar', type=Path, default=ROOT.parent / 'caelis-bot/frontend/public/icons/caelis-avatar.png')
p.add_argument('--lang', choices=['en', 'zh-cn', 'all'], default='all')
p.add_argument('--stills-only', action='store_true')
a = p.parse_args()
for path in [a.font, a.latin_font, a.mono_font]:
    if not Path(path).is_file(): p.error(f'Missing font: {path}')
clips = json.loads((a.character_frames / 'clips.json').read_text())
for name in ['idle', 'working', 'attention', 'nod', 'celebrate']:
    if name not in clips['clips']: p.error(f'Missing rendered clip: {name}')


def cjk(s):
    return any('\u4e00' <= c <= '\u9fff' for c in s)


@lru_cache(None)
def font(size, kind='body', chinese=False):
    path = a.mono_font if kind == 'mono' else a.font if chinese else a.latin_font
    return ImageFont.truetype(path, size)


def write(d, xy, value, size=26, fill=INK, mono=False):
    if not mono:
        d.text(xy, value, font=font(size, chinese=cjk(value)), fill=fill)
        return
    # Menlo's Latin cells and the system CJK fallback preserve a TUI grid.
    x, y = xy
    cell = font(size, 'mono').getlength('M')
    for char in value:
        wide = unicodedata.east_asian_width(char) in ('W', 'F')
        f = font(size, chinese=True) if wide else font(size, 'mono')
        d.text((x, y), char, font=f, fill=fill)
        x += cell * (2 if wide else 1)


def lines(value, width, size=26):
    f = font(size, chinese=cjk(value))
    chunks = list(value) if cjk(value) else value.split(' ')
    sep = '' if cjk(value) else ' '
    result, line = [], ''
    for chunk in chunks:
        candidate = line + (sep if line else '') + chunk
        if f.getlength(candidate) > width and line:
            result.append(line)
            line = chunk
        else:
            line = candidate
    return result + [line]


def wrap(d, value, xy, width, size=26, fill=INK, gap=12, limit=None):
    rows = lines(value, width, size)
    if limit is not None and len(rows) > limit:
        rows = rows[:limit]
        rows[-1] = rows[-1][:-1] + '…'
    for i, row in enumerate(rows):
        write(d, (xy[0], xy[1] + i * (size + gap)), row, size, fill)
    return len(rows) * (size + gap)


def progress(t, start, duration):
    return max(0, min(1, (t - start) / duration))


def ease(v):
    v = max(0, min(1, v))
    return v * v * (3 - 2 * v)


def typed(value, t, start, duration):
    # Small pauses at punctuation make input feel typed rather than wiped on.
    q = progress(t, start, duration)
    return value[:math.floor(len(value) * q)] if q < 1 else value


def paste_layer(im, layer, alpha=1, offset=(0, 0)):
    if alpha <= 0: return
    if alpha < 1:
        layer = layer.copy()
        layer.putalpha(layer.getchannel('A').point(lambda v: round(v * alpha)))
    im.alpha_composite(layer, offset)


@lru_cache(256)
def character(clip, index):
    path = a.character_frames / clip / f'{index:03}.png'
    return Image.open(path).convert('RGBA').resize((340, 470), Image.Resampling.LANCZOS)


def pet(im, t):
    clip, local = ('working', t - 7) if 7 <= t < 30.5 else ('idle', t)
    for at, name in [(6.1, 'nod'), (14.4, 'attention'), (16.2, 'nod'), (24.4, 'nod'),
                     (30.5, 'celebrate'), (46.2, 'attention'), (57.5, 'nod'), (63, 'celebrate')]:
        if at <= t < at + clips['clips'][name]['duration']:
            clip, local = name, t - at
    count = clips['clips'][clip]['frames']
    index = int(local * clips['fps']) % count
    im.alpha_composite(character(clip, index), (1205, 284))


def window(im, rect, title, terminal=False):
    x, y, right, bottom = rect
    shadow = Image.new('RGBA', (W, H))
    sd = ImageDraw.Draw(shadow)
    sd.rounded_rectangle((x + 3, y + 9, right + 3, bottom + 9), 17, fill=(30, 26, 42, 35))
    im.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(9)))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle(rect, 15, fill='#ffffff' if terminal else '#f7f7f7', outline='#cfcdd1', width=1)
    d.rounded_rectangle((x + 1, y + 1, right - 1, y + 46), 14, fill='#f2f0f2')
    d.rectangle((x + 1, y + 26, right - 1, y + 46), fill='#f2f0f2')
    for i, color in enumerate(['#ff6057', '#ffbd2e', '#28c840']):
        d.ellipse((x + 18 + i * 30, y + 14, x + 34 + i * 30, y + 30), fill=color)
    size = 23 if not terminal else 20
    fw = font(size, chinese=cjk(title)).getlength(title)
    write(d, ((x + right - fw) / 2, y + 11), title, size, '#555555')
    return d


def pointer(d, xy, click=False):
    x, y = xy
    if click:
        d.ellipse((x - 19, y - 19, x + 19, y + 19), outline='#9b92b8', width=3)
    d.polygon([(x, y), (x + 3, y + 27), (x + 10, y + 20), (x + 21, y + 18)],
              fill='#242424', outline='#ffffff', width=2)


def cursor_position(t):
    keys = [(0, (850, 752)), (4.8, (850, 752)), (5.6, (989, 714)), (11.8, (989, 714)),
            (12.8, (86, 125)), (13.8, (86, 125)), (14.5, (1380, 761)),
            (15.4, (1349, 769)), (21.8, (1349, 769)), (23.7, (1423, 769)),
            (29.8, (1423, 769)), (31.8, (1506, 266)), (38.0, (1506, 266)),
            (38.9, (86, 125)), (45.6, (940, 734)), (49.8, (1506, 266)),
            (51.5, (900, 738)), (55.9, (900, 738)), (57.1, (989, 714)),
            (65.2, (989, 714)), (66.8, (86, 125)), (71.9, (850, 752))]
    for (start, first), (end, last) in zip(keys, keys[1:]):
        if start <= t < end:
            # Hold at the previous target, then move decisively before the click.
            # No slow cursor drift across reading/typing beats.
            move = min(.28, end - start)
            q = ease((t - (end - move)) / move)
            return (first[0] + (last[0] - first[0]) * q, first[1] + (last[1] - first[1]) * q)
    return keys[-1][1]


def arrow(d, x, y, upward=False, fill=INK):
    if upward:
        d.line((x, y + 10, x, y - 9), fill=fill, width=3)
        d.line((x - 8, y - 1, x, y - 9, x + 8, y - 1), fill=fill, width=3)
    else:
        d.line((x - 8, y + 8, x + 8, y - 8), fill=fill, width=3)
        d.line((x - 6, y - 8, x + 8, y - 8, x + 8, y + 6), fill=fill, width=3)


def pill(im, value, t, working=False):
    # The native bubble is a two-line capsule with actions, no speaker label/tail.
    layer = Image.new('RGBA', (W, H))
    d = ImageDraw.Draw(layer)
    d.rounded_rectangle((1045, 218, 1540, 310), 46, fill='#faf9fa', outline='#dedbdf', width=2)
    wrap(d, value, (1068, 237), 365, 23, gap=9, limit=2)
    if working:
        d.rectangle((1452, 255, 1465, 268), fill='#62666b')
    else:
        d.line((1449, 261, 1456, 269, 1469, 252), fill=INK, width=3)
    d.ellipse((1480, 240, 1527, 287), fill='#eeecee')
    arrow(d, 1504, 263)
    paste_layer(im, layer, min(1, t / .25))


def dock(im, expanded=False, active=0, tooltip=None):
    d = ImageDraw.Draw(im)
    if not expanded:
        d.rounded_rectangle((1321, 742, 1438, 785), 22, fill='#eeeaf0', outline='#c9c3cc', width=2)
        d.rounded_rectangle((1326, 747, 1433, 780), 17, outline='#ffffff', width=1)
        for i in range(3): d.ellipse((1360 + i * 16, 762, 1363 + i * 16, 765), fill='#7d7782')
    else:
        for i in range(2):
            x = 1320 + i * 76
            d.ellipse((x, 742, x + 52, 794), fill='#eeeaf0', outline='#bdb6c8' if active == i + 1 else '#d4ced7', width=2)
            write(d, (x + 19, 754), str(i + 1), 24, '#69616f')
    if tooltip:
        d.rounded_rectangle((1080, 196, 1536, 287), 28, fill='#f7f5f8', outline='#dad5df', width=2)
        wrap(d, tooltip, (1101, 216), 413, 23, gap=10, limit=2)


avatar = Image.open(a.avatar).convert('RGBA').resize((55, 55), Image.Resampling.LANCZOS)


def chat(im, story, t, mode):
    layer = Image.new('RGBA', (W, H))
    window(layer, (60, 100, 1060, 795), 'Caelis Bot')
    d = ImageDraw.Draw(layer)
    if mode == 'start':
        messages = [(6.0, 'user', story['request'], 0), (7.3, 'assistant', story['ack'], 3.3)]
        draft = typed(story['request'], t, 1.0, 4.4) if t < 6 else ''
        typing = 1 <= t < 6
        waiting = 6.3 <= t < 7.3
        show = ease(progress(t, 0, .45)) * (1 - ease(progress(t, 13.2, .6)))
    elif mode == 'result':
        messages = [(0, 'user', story['request'], 0), (0, 'assistant', story['ack'], 0),
                    (32.7, 'assistant', story['complete'], 2.8)]
        draft, typing, waiting = '', False, False
        show = ease(progress(t, 32.2, .45)) * (1 - ease(progress(t, 39.0, .6)))
    else:
        messages = [(0, 'assistant', story['notice'], 0), (57.5, 'user', story['feedback'], 0),
                    (59, 'assistant', story['remember'], 3)]
        draft = typed(story['feedback'], t, 52, 5) if t < 57.5 else ''
        typing = 52 <= t < 57.5
        waiting = 58 <= t < 59
        show = ease(progress(t, 50.8, .5)) * (1 - ease(progress(t, 67, .6)))

    # Retain the actual chat anatomy and scroll older messages as replies arrive.
    body = Image.new('RGBA', (1000, 494))
    bd = ImageDraw.Draw(body)
    rows, total = [], 12
    for at, role, value, duration in messages:
        if t < at: continue
        max_width = 756 if role == 'user' else 802
        rows_full = lines(value, max_width, 26)
        natural_width = max(font(26, chinese=cjk(value)).getlength(row) for row in rows_full)
        width = min(max_width + 68, natural_width + 68)
        height = 32 + len(rows_full) * 41
        entrance = ease(progress(t, at, .3)) if at else 1
        rows.append((at, role, value, duration, total, width, height, entrance, max_width))
        total += (height + 24) * entrance
    scroll = max(0, total - 472)
    for at, role, value, duration, top, width, height, entrance, max_width in rows:
        y = round(top - scroll + 10 * (1 - entrance))
        x = round(960 - width) if role == 'user' else 110
        bd.rounded_rectangle((x, y, x + width, y + height), 25,
                             fill='#eaeaea' if role == 'user' else '#fafafa',
                             outline=None if role == 'user' else '#d7d7d7', width=2)
        if role == 'assistant': body.alpha_composite(avatar, (35, y + 7))
        value_now = typed(value, t, at, duration) if duration else value
        wrap(bd, value_now, (x + 25, y + 17), max_width, 26, gap=15)
    if waiting:
        y = int(min(440, total))
        body.alpha_composite(avatar, (35, y))
        bd.rounded_rectangle((110, y, 209, y + 49), 23, fill='#fafafa', outline='#d7d7d7', width=2)
        for i in range(3):
            dy = round(math.sin(t * 7 - i) * 3)
            bd.ellipse((132 + i * 20, y + 23 + dy, 138 + i * 20, y + 29 + dy), fill=MUTED)
    layer.alpha_composite(body, (60, 156))
    # The real composer: plus button, text area, send arrow. No mock toolbar.
    d.rounded_rectangle((89, 663, 1030, 767), 40, fill='#fafafa', outline='#d7d7d7', width=2)
    d.ellipse((111, 690, 160, 739), fill='#eaeaea')
    d.line((125, 714, 147, 714), fill='#6b6b6b', width=3)
    d.line((136, 703, 136, 725), fill='#6b6b6b', width=3)
    wrap(d, draft or story['placeholder'], (184, 685), 743, 25, INK if draft else MUTED, gap=10, limit=2)
    if typing and int(t * 2) % 2 == 0:
        draft_lines = lines(draft, 743, 25)
        end = draft_lines[-1]
        cx = 184 + font(25, chinese=cjk(draft)).getlength(end)
        cy = 689 + (len(draft_lines) - 1) * 35
        d.line((cx + 2, cy, cx + 2, cy + 25), fill=ACCENT, width=2)
    d.ellipse((964, 690, 1015, 741), fill='#62666b' if draft else '#f1f1f1')
    arrow(d, 989, 715, True, '#ffffff' if draft else '#b4b4b4')
    paste_layer(im, layer, show)


def terminal(im, story, t, number, back=False):
    zh = cjk(story['request'])
    local = t - (16.4 if number == 1 else 24.6)
    x, y = (60, 100) if number == 1 else (92, 132)
    layer = Image.new('RGBA', (W, H))
    d = window(layer, (x, y, x + 982, y + 675), ('login-fix' if number == 1 else 'release-check') + ' — codex', True)
    # Codex startup box: typography and transcript hierarchy from the reference.
    d.rounded_rectangle((x + 25, y + 68, x + 691, y + 185), 5, outline='#b8b8b8', width=2)
    write(d, (x + 43, y + 80), '>_ OpenAI Codex', 24, '#151515', True)
    write(d, (x + 269, y + 82), '(v0.156.1)', 22, '#999999', True)
    write(d, (x + 43, y + 122), 'model:     GPT-6-Astra xhigh', 22, '#333333', True)
    write(d, (x + 43, y + 151), 'directory: ~/Projects/sample-app', 22, '#777777', True)
    d.rectangle((x + 19, y + 211, x + 961, y + 277), fill='#f6f6f6')
    write(d, (x + 30, y + 229), '›', 23, '#999999', True)
    wrap(d, story['taskPrompts'][number - 1], (x + 56, y + 228), 890, 23, gap=7)
    if number == 1:
        transcript = [
            (.7, '• Read src/login.ts', INK),
            (1.8, '• Edited src/login.ts (+1 -1)', INK),
            (2.5, '-  router.push("/login")', '#b74547'),
            (3.0, '+  router.push(returnTo ?? "/home")', '#3f833c'),
            (4.3, '• Ran npm test -- login-redirect', INK),
            (5.1, '  ✓ 3 passed', '#3f833c'),
            (6.1, '• '+('已修复。登录成功后会回到目标页面。' if zh else 'Fixed. Sign-in returns to the target page.'), INK)]
    else:
        transcript = [
            (.4, '• Read CHANGELOG.md, release-checklist.md', INK),
            (1.1, '• '+('已核对安装、下载链接和迁移说明。' if zh else 'Checked installation, downloads and migration notes.'), INK),
            (1.9, '  ✓ Installation guide', '#3f833c'),
            (2.4, '  ✓ Download links', '#3f833c'),
            (2.9, '  ✓ Migration notes', '#3f833c'),
            (3.6, '• '+('待确认：最终发布日期。' if zh else 'To confirm: the final release date.'), INK)]
    for i, (at, value, color) in enumerate(transcript):
        if local >= at: write(d, (x + 32, y + 303 + i * 36), typed(value, local, at, .25), 21, color, True)
    d.rectangle((x + 19, y + 573, x + 961, y + 624), fill='#f6f6f6')
    write(d, (x + 29, y + 585), '›', 23, '#151515', True)
    write(d, (x + 57, y + 585), 'Ask Codex to do anything', 23, '#a4a4a4', True)
    write(d, (x + 33, y + 637), 'GPT-6-Astra xhigh', 18, '#ab7933', True)
    write(d, (x + 286, y + 637), '· ~/Projects/sample-app', 18, '#3f833c', True)
    show = 1 if back else ease(progress(local, 0, .45))
    show *= 1 - ease(progress(t, 30.8, .5))
    paste_layer(im, layer, show)


def care_plan(im, story, zh, t):
    layer = Image.new('RGBA', (W, H))
    d = ImageDraw.Draw(layer)
    # A brief story insert explains where the callback came from. It deliberately
    # does not invent a native settings screen or a shipping registration API.
    write(d, (96, 134), '任务进行时，Bot 留意到了这句话。' if zh else 'While the tasks ran, Bot noticed a clue.', 32)
    d.rounded_rectangle((96, 202, 1035, 286), 26, fill='#e7e5eb')
    write(d, (125, 229), '“' + story['clue'] + '”', 29)
    if t >= 40.6:
        wrap(d, story['observation'], (100, 321), 895, 27, MUTED, gap=12)
    if t >= 41.5:
        layer.alpha_composite(avatar, (98, 421))
        write(d, (175, 414), 'Bot 自行安排了一次关怀回调' if zh else 'Bot creates a follow-up callback', 30)
        wrap(d, typed(story['callback'], t, 41.5, .8), (175, 474), 817, 27, gap=15)
    if 42.5 <= t < 44.4:
        d.ellipse((104, 632, 116, 644), fill=ACCENT)
        write(d, (140, 621), '回调已安排 · 等待当前任务完成' if zh else 'Callback scheduled · waiting for the tasks to finish', 25, '#685890')
    if t >= 44.4:
        d.line((101, 642, 109, 650, 124, 629), fill='#3f833c', width=4)
        write(d, (140, 622), '稍后，两个任务完成了。现在适合开口。' if zh else 'Later, both tasks finish. A good moment to reach out.', 25, '#3f833c')
    paste_layer(im, layer, ease(progress(t, 40, .4)) * (1 - ease(progress(t, 45.6, .6))))


background = Image.new('RGBA', (W, H))
d = ImageDraw.Draw(background)
for y in range(H):
    q = y / H
    d.line((0, y, W, y), fill=(round(244 - 11*q), round(242 - 11*q), round(248 - 4*q), 255))


def source_time(t):
    # Keep authored interactions aligned while tightening empty beats and giving
    # the contextual callback origin enough reading time.
    for (old_start, start), (old_end, end) in zip(STORY['timing'], STORY['timing'][1:]):
        if start <= t < end:
            return old_start + (old_end - old_start) * (t - start) / (end - start)
    return STORY['timing'][-1][0]


def render(lang, elapsed):
    t = source_time(elapsed)
    story = STORY[lang]
    zh = lang == 'zh-cn'
    im = background.copy()
    d = ImageDraw.Draw(im)
    write(d, (60, 35), 'Caelis Bot', 28)
    if t < 13.8: chat(im, story, t, 'start')
    if 16.4 <= t < 31.3:
        terminal(im, story, t, 1, back=t>=24.6)
        if t >= 24.6: terminal(im, story, t, 2)
    if 32.2 <= t < 39.6: chat(im, story, t, 'result')
    if 40 <= t < 46.2: care_plan(im, story, zh, t)
    if 50.8 <= t < 67.6: chat(im, story, t, 'feedback')
    pet(im, t)
    if 13.8 <= t < 32.2:
        expanded = 14.5 <= t < 30.6
        active = 1 if t < 23 else 2
        tooltip = story['taskPrompts'][active-1] if expanded and (15 <= t < 16.4 or 23 <= t < 24.6) else None
        dock(im, expanded, active if expanded else 0, tooltip)
        if 13.8 <= t < 14.5: pill(im, '两个 Worker 正在处理。' if zh else 'Two Workers are on it.', t-13.8, True)
        if 30.5 <= t < 32.2: pill(im, story['complete'], t-30.5)
    elif t >= 39.6 and not 50.8 <= t < 67.6:
        dock(im)
        if 46.2 <= t < 50.8: pill(im, story['notice'], t-46.2)
        if 67.6 <= t < 71: pill(im, story['remember'], t-67.6)
    # The cursor moves through actual affordances; the paired click ripple lasts .2s.
    d = ImageDraw.Draw(im)
    click = any(abs(t-at)<.14 for at in [5.9, 13.1, 16.3, 24.5, 32.1, 39.0, 50.7, 57.4, 67.0])
    # No pointer floating over the explanatory insert or looping end frame.
    if t < 39.6 or 49.2 <= t < 67.6: pointer(d, cursor_position(t), click)
    index = 0 if elapsed < 10 else 1 if elapsed < 30 else 2
    write(d, (60, 847), story['scenes'][index]['title'], 28)
    caption = ('用户输入 → Bot 接手 → Worker 推进 → 结果回到对话' if zh else 'You ask → Bot delegates → Workers deliver → Back to the chat') if t<40 else ('Bot 发现 → 主动开口 → 你来回应 → 记住反馈' if zh else 'Bot notices → Reaches out → You reply → Feedback remembered')
    write(d, (500, 853), caption, 22, '#69616f')
    return im.convert('RGB')


def timestamp(s):
    return f'00:{s//60:02}:{s%60:02}.000'


out = ROOT / 'assets/video'
qa = ROOT / '.artifacts/bot-redesign'
out.mkdir(parents=True, exist_ok=True)
qa.mkdir(parents=True, exist_ok=True)
for lang in ['en', 'zh-cn'] if a.lang == 'all' else [a.lang]:
    name = f'caelis-bot-demo-{lang}'
    render(lang, 9).save(out / f'{name}.webp', quality=92)
    for second in [3, 6, 9, 11, 16, 21, 24, 27, 31, 34, 36, 38, 42, 46, 51, 55]:
        render(lang, second).save(qa / f'{lang}-{second:02}.png')
    captions = ['WEBVTT\n']
    for i, ch in enumerate(STORY[lang]['scenes']):
        end = STORY[lang]['scenes'][i+1]['at'] if i<2 else STORY['duration']
        captions.append(f'{timestamp(ch["at"])} --> {timestamp(end)}\n{ch["summary"]}\n')
    (out / f'{name}.vtt').write_text('\n'.join(captions))
    if a.stills_only: continue
    command = [a.ffmpeg, '-y', '-loglevel', 'error', '-f', 'rawvideo', '-vcodec', 'rawvideo',
               '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-', '-an',
               '-c:v', 'libx264', '-preset', 'fast', '-crf', '21', '-pix_fmt', 'yuv420p',
               '-movflags', '+faststart', str(out / f'{name}.mp4')]
    process = subprocess.Popen(command, stdin=subprocess.PIPE)
    try:
        for frame in range(STORY['duration'] * FPS):
            process.stdin.write(render(lang, frame / FPS).tobytes())
    finally:
        process.stdin.close()
    if process.wait(): raise RuntimeError(f'FFmpeg failed: {lang}')
    print(f'Rendered {name}: {STORY["duration"]}s', flush=True)
