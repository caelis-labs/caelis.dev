"""Subset an OFL Noto Sans SC font for deterministic, offline social images.

Run explicitly with uv run --with fonttools --with brotli python
scripts/update-social-font.py /path/to/NotoSansSC.ttf. Website builds do not
download fonts or require Python.
"""
import hashlib
import json
import sys
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools import subset

root = Path(__file__).resolve().parent.parent
source = Path(sys.argv[1])
text = ''.join(chr(i) for i in range(32, 127)) + '©·—→。开放工具协作智能文档项目Caelis Labs'
for directory in ['src', 'content-sources/snapshots']:
    for path in (root / directory).rglob('*'):
        if path.suffix in ['.md', '.mdx', '.json', '.ts', '.astro']:
            text += path.read_text()
characters = ''.join(sorted(set(text)))
font = TTFont(source)
font = instantiateVariableFont(font, {'wght': 500}, inplace=True)
options = subset.Options()
options.hinting = False
subsetter = subset.Subsetter(options=options)
subsetter.populate(text=characters)
subsetter.subset(font)
output = root / 'assets/fonts/social-sans.ttf'
font.save(output)
(root / 'assets/fonts/characters.txt').write_text(characters)
(root / 'assets/fonts/source.json').write_text(json.dumps({
    'name': 'Noto Sans SC', 'license': 'OFL-1.1', 'weight': 500,
    'source': 'https://raw.githubusercontent.com/google/fonts/main/ofl/notosanssc/NotoSansSC[wght].ttf',
    'sourceSHA256': hashlib.sha256(source.read_bytes()).hexdigest(),
    'subsetSHA256': hashlib.sha256(output.read_bytes()).hexdigest(),
}, indent=2) + '\n')
print(f'Prepared {output.stat().st_size:,}-byte social font.')
