import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname,'..');
const font = await readFile(path.join(root,'assets/fonts/social-sans.ttf'));
const projects = JSON.parse(await readFile(path.join(root,'src/data/projects.json'),'utf8'));
const supported = new Set(await readFile(path.join(root,'assets/fonts/characters.txt'),'utf8'));
const botLogo = `data:image/png;base64,${(await sharp(path.join(root,'assets/bot/caelis-bot-logo.png')).resize(512,512).png().toBuffer()).toString('base64')}`;
const el = (type, props, ...children) => ({ type, props: { ...props, children: children.flat() } });
const mark = (size, color) => el('svg', { width: size, height: size, viewBox: '0 0 40 40', fill: 'none' },
  el('path', { d: 'M29.6 9.2a14.5 14.5 0 1 0 0 21.6', stroke: color, strokeWidth: 3.8, strokeLinecap: 'round' }),
  el('path', { d: 'M25 14.4a7.5 7.5 0 1 0 0 11.2', stroke: color, strokeWidth: 3.2, strokeLinecap: 'round' }),
  el('circle', { cx: 32.7, cy: 20, r: 3.1, fill: color }));

export function socialContent(url, title, description, lang) {
  const chinese = lang.toLowerCase().startsWith('zh');
  const locale = chinese ? 'zh-cn' : 'en';
  const project = projects.find(project => url.split('/').includes(project.id));
  const isDocs = url.includes('/docs/');
  const isHome = url === '/' || url === '/zh-cn/';
  return {
    title: isHome ? (chinese ? '开放的工具，\n协作的智能。' : 'Open tools.\nConnected intelligence.') : title.replace(/\s*[|·]\s*Caelis Labs$/, ''),
    subtitle: isHome ? (chinese ? '独立的工具，共同的可能。' : 'Independent tools. Shared possibilities.') : isDocs ? `${project?.name || 'Caelis Labs'} / ${chinese ? '文档' : 'Documentation'}` : project ? project[locale].short : description,
    label: isDocs ? 'DOCUMENTATION' : project?.status === 'preview' ? 'PREVIEW' : project?.status === 'beta' ? 'EARLY BETA' : 'OPEN SOURCE',
    locale,
    project: project?.id,
  };
}

export async function renderSocial(content, height = 630) {
  const copy = `${content.title}${content.subtitle}`;
  const missing = [...new Set([...copy].filter(character => !supported.has(character) && character !== '\n'))];
  if (missing.length) throw new Error(`Social font needs characters ${missing.join('')}. Run scripts/update-social-font.py before building.`);
  const titleSize = content.title.length > 44 ? 60 : content.title.length > 27 ? 70 : 84;
  const hasBotLogo = content.project === 'caelis-bot';
  const textWidth = hasBotLogo ? 760 : 1040;
  const tree = el('div', { style: { display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '54px 64px 40px', backgroundColor: '#0b0c12', color: '#f1f0f6', fontFamily: 'Social Sans', position: 'relative', overflow: 'hidden' } },
    el('div', { style: { display: 'flex', position: 'absolute', width: 610, height: 610, right: -310, top: -220, border: '1px solid #303146', borderRadius: 305 } }),
    el('div', { style: { display: 'flex', position: 'absolute', width: 780, height: 780, right: -395, top: -305, border: '1px solid #222333', borderRadius: 390 } }),
    el('div', { style: { display: 'flex', position: 'absolute', width: 8, height: 8, right: 240, top: 205, background: '#9a9de9', borderRadius: 4 } }),
    ...(hasBotLogo ? [el('img', { src: botLogo, width: 260, height: 260, style: { position: 'absolute', right: 56, top: (height - 260) / 2, objectFit: 'contain' } })] : []),
    el('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 } },
      el('div', { style: { display: 'flex', alignItems: 'center', gap: 15 } }, mark(43,'#f1f0f6'), el('div', { style: { display: 'flex', fontSize: 32, letterSpacing: '-1.4px' } }, 'caelis ', el('span', { style: { color: '#a5a4b7', marginLeft: 5 } }, 'labs'))),
      el('div', { style: { display: 'flex', color: '#a5a4b7', fontSize: 15, letterSpacing: '2px' } }, content.label)),
    el('div', { style: { display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', paddingBottom: 15, width: textWidth } },
      el('div', { style: { display: 'flex', whiteSpace: 'pre-wrap', fontSize: titleSize, lineHeight: 1.16, letterSpacing: '-3px', maxWidth: textWidth - 20 } }, content.title),
      el('div', { style: { display: 'flex', fontSize: 25, lineHeight: 1.5, color: '#a9a9bd', marginTop: 26, maxWidth: textWidth - 50 } }, content.subtitle)),
    el('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 22, borderTop: '1px solid #30303e', color: '#aaaabc', fontSize: 17 } }, el('span', {}, 'caelis.dev'), el('span', { style: { color: '#a7a9ed' } }, '→')),
  );
  const svg = await satori(tree, { width: 1200, height, fonts: [{ name: 'Social Sans', data: font, weight: 500, style: 'normal' }] });
  const png = new Resvg(svg).render().asPng();
  const hash = createHash('sha256').update(png).digest('hex').slice(0,12);
  return { png, hash, svg };
}
