import assert from 'node:assert/strict';
import { readFile, readdir, stat, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseHTML } from 'linkedom';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const hash = value => `'sha256-${createHash('sha256').update(value).digest('base64')}'`;
async function walk(directory) {
  return (await Promise.all((await readdir(directory, { withFileTypes: true })).map(entry =>
    entry.isDirectory() ? walk(path.join(directory, entry.name)) : path.join(directory, entry.name)))).flat();
}

export async function verifySite() {
  const files = await walk(dist);
  const documents = new Map();
  const failures = [];
  const require = (condition, message) => { if (!condition) failures.push(message); };
  for (const file of files.filter(file => file.endsWith('.html'))) {
    const pathname = '/' + path.relative(dist, file).replaceAll(path.sep, '/').replace(/index\.html$/, '');
    const html = await readFile(file, 'utf8');
    documents.set(pathname, { document: parseHTML(html).document, html });
  }
  const assets = new Set(files.map(file => '/' + path.relative(dist, file).replaceAll(path.sep, '/')));
  const aliases = new Set(['/github', '/releases']);
  let links = 0;
  for (const [pathname, { document }] of documents) {
    const base = new URL(pathname, 'https://caelis.dev');
    for (const element of document.querySelectorAll('a[href],link[href],script[src],img[src],source[src],video[poster]')) {
      const raw = element.getAttribute('href') || element.getAttribute('src') || element.getAttribute('poster');
      if (!raw || /^(data:|mailto:|tel:)/.test(raw)) continue;
      const url = new URL(raw, base);
      if (url.origin !== base.origin) continue;
      const target = decodeURIComponent(url.pathname);
      if (aliases.has(target)) continue;
      links++;
      require(documents.has(target) || assets.has(target), `${pathname}: missing ${raw}`);
      if (url.hash && documents.has(target)) {
        require(documents.get(target).document.getElementById(decodeURIComponent(url.hash.slice(1))), `${pathname}: missing anchor ${raw}`);
      }
    }
    require(document.querySelectorAll('h1').length === 1, `${pathname}: must have exactly one H1`);
    const csp = document.querySelector('meta[http-equiv="Content-Security-Policy"]')?.getAttribute('content') || '';
    require(csp.includes("default-src 'self'"), `${pathname}: missing CSP`);
    require(!csp.includes("'unsafe-inline'"), `${pathname}: broad inline CSP exception`);
    for (const el of document.querySelectorAll('script:not([src]),style')) require(csp.includes(hash(el.textContent)), `${pathname}: unapproved inline ${el.localName}`);
    for (const el of document.querySelectorAll('[style]')) require(csp.includes(hash(el.getAttribute('style'))), `${pathname}: unapproved style attribute`);
    if (pathname === '/404.html') continue;
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
    require(canonical === base.href, `${pathname}: incorrect canonical ${canonical}`);
    require(!!document.querySelector('meta[name="description"]')?.getAttribute('content'), `${pathname}: missing description`);
    require(document.querySelector('meta[name="twitter:card"]')?.getAttribute('content') === 'summary_large_image', `${pathname}: missing Twitter card`);
    require(document.querySelector('meta[property="og:image"]'), `${pathname}: missing OG image`);
    const sibling = pathname.startsWith('/zh-cn/') ? pathname.slice(6) : '/zh-cn' + pathname;
    require(documents.has(sibling), `${pathname}: missing language counterpart ${sibling}`);
  }
  const social = JSON.parse(await readFile(path.join(dist, 'social/manifest.json'), 'utf8'));
  require(social.length === documents.size - 1, 'Every indexable page needs social images');
  let largestSocial = 0;
  for (const page of social) {
    for (const [index, image] of page.images.entries()) {
      const file = path.join(dist, image);
      const metadata = await sharp(file).metadata();
      require(metadata.width === 1200 && metadata.height === (index === 0 ? 630 : 600), `${image}: invalid image dimensions`);
      largestSocial = Math.max(largestSocial, (await stat(file)).size);
    }
    const document = documents.get(page.path)?.document;
    require(document?.querySelector('meta[property="og:image"]')?.getAttribute('content') === `https://caelis.dev${page.images[0]}`, `${page.path}: wrong OG image`);
    require(document?.querySelector('meta[name="twitter:image"]')?.getAttribute('content') === `https://caelis.dev${page.images[1]}`, `${page.path}: wrong Twitter image`);
  }
  for (const file of ['install.sh', 'install.ps1']) assert.deepEqual(await readFile(path.join(root, file)), await readFile(path.join(dist, file)), `${file} changed during build`);
  const redirects = await readFile(path.join(dist, '_redirects'), 'utf8');
  require(!/^\/docs\s/m.test(redirects), '/docs must resolve locally');
  const icon = await readFile(path.join(dist, 'icon.svg'), 'utf8');
  require(Buffer.byteLength(icon) < 2048 && !/data:image|<image/.test(icon), 'Logo must remain a small vector');
  let largestBotLogo = 0;
  for (const size of [96, 256, 512]) {
    const file = path.join(dist, `assets/bot/logo-${size}.webp`);
    const metadata = await sharp(file).metadata();
    require(metadata.width === size && metadata.height === size && metadata.hasAlpha, `Bot logo ${size}: lost dimensions or transparency`);
    largestBotLogo = Math.max(largestBotLogo, (await stat(file)).size);
  }
  require(largestBotLogo < 60000, 'Bot logo exceeds 60 KB budget');
  const home = documents.get('/').document;
  for (const id of ['cli', 'demo-video', 'top']) require(home.getElementById(id), `Legacy homepage anchor #${id} missing`);
  const projectOrder = ['caelis', 'caelis-bot', 'acp-go-sdk', 'memory', 'caelis-app'];
  for (const prefix of ['', '/zh-cn']) {
    const projects = documents.get(`${prefix}/projects/`).document;
    const actual = [...projects.querySelectorAll('.project-row h3 a')].map(link => link.getAttribute('href').split('/').filter(Boolean).at(-1));
    require(JSON.stringify(actual) === JSON.stringify(projectOrder), `${prefix}/projects/: promotion order changed`);
  }
  require(assets.has('/pagefind/pagefind.js'), 'Search index is missing');
  const homeHTMLGzip = gzipSync(documents.get('/').html).length;
  require(homeHTMLGzip < 18000, 'Homepage HTML exceeds 18 KB compressed budget');
  require(largestSocial < 1_000_000, 'Social image exceeds 1 MB budget');
  assert.equal(failures.length, 0, failures.join('\n'));
  return { pages: documents.size, documentationPages: [...documents.keys()].filter(p => p.includes('/docs/')).length, internalLinks: links, socialImages: social.length * 2, largestSocialBytes: largestSocial, logoBytes: Buffer.byteLength(icon), largestBotLogoBytes: largestBotLogo, homeHTMLGzipBytes: homeHTMLGzip };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await verifySite();
  await mkdir(path.join(root, '.artifacts'), { recursive: true });
  await writeFile(path.join(root, '.artifacts/verification.json'), JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify(result, null, 2));
}
