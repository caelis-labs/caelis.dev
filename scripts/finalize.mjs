import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { parseHTML } from 'linkedom';
import { renderSocial, socialContent } from './social.mjs';

const root = path.resolve(import.meta.dirname,'..');
const dist = path.join(root,'dist');
async function walk(dir) { const files = await readdir(dir,{withFileTypes:true}); return (await Promise.all(files.map(file => file.isDirectory() ? walk(path.join(dir,file.name)) : path.join(dir,file.name)))).flat(); }
export const digest = content => `'sha256-${createHash('sha256').update(content).digest('base64')}'`;
await mkdir(path.join(dist,'social'),{recursive:true});
const manifest = [];
for (const file of (await walk(dist)).filter(file => file.endsWith('.html')).sort()) {
  const { document } = parseHTML(await readFile(file,'utf8'));
  document.querySelectorAll('meta[http-equiv="Content-Security-Policy"]').forEach(element => element.remove());
  const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
  const relative = path.relative(dist,file).split(path.sep).join('/');
  const pathname = canonical ? new URL(canonical).pathname : `/${relative.replace(/index\.html$/, '')}`;
  const title = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || document.title;
  const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  const lang = document.documentElement.lang || 'en';
  const meta = (attr,key,value) => {
    let element = document.querySelector(`meta[${attr}="${key}"]`);
    if (!element) { element = document.createElement('meta'); element.setAttribute(attr,key); document.head.appendChild(element); }
    element.setAttribute('content',value);
  };
  if (!document.querySelector('meta[name="robots"][content="noindex"]')) {
    const content = socialContent(pathname,title,description,lang);
    const slug = pathname.replace(/^\/+|\/+$/g,'').replaceAll('/','-') || 'home';
    const images = [];
    for (const height of [630,600]) {
      const { png, hash } = await renderSocial(content,height);
      const imagePath = `/social/${slug}-${height}-${hash}.png`;
      await writeFile(path.join(dist,imagePath),png);
      images.push(imagePath);
    }
    meta('property','og:image',`https://caelis.dev${images[0]}`);
    meta('property','og:image:width','1200'); meta('property','og:image:height','630');
    meta('property','og:image:type','image/png'); meta('property','og:image:alt',`${content.title.replaceAll('\n',' ')} — Caelis Labs`);
    meta('property','og:site_name','Caelis Labs');
    meta('name','twitter:card','summary_large_image'); meta('name','twitter:title',title); meta('name','twitter:description',description);
    meta('name','twitter:image',`https://caelis.dev${images[1]}`); meta('name','twitter:image:alt',`${content.title.replaceAll('\n',' ')} — Caelis Labs`);
    manifest.push({ path: pathname, title, locale: lang, images });
  }
  const scripts = [...new Set([...document.querySelectorAll('script:not([src])')].map(script => digest(script.textContent)))];
  const styles = [...new Set([...document.querySelectorAll('style')].map(style => digest(style.textContent)))];
  const attributes = [...new Set([...document.querySelectorAll('[style]')].map(element => digest(element.getAttribute('style'))))];
  const policy = [
    "default-src 'self'", "base-uri 'self'", "object-src 'none'", "form-action 'self'", "frame-src 'none'",
    "img-src 'self' data:", "font-src 'self'", "media-src 'self'", "connect-src 'self'", "worker-src 'self' blob:",
    `script-src 'self'${pathname.includes('/docs/') ? " 'wasm-unsafe-eval'" : ''} ${scripts.join(' ')}`,
    `style-src 'self' ${styles.join(' ')}`,
    `style-src-attr 'unsafe-hashes' ${attributes.length ? attributes.join(' ') : "'none'"}`,
  ].join('; ');
  const csp = document.createElement('meta'); csp.setAttribute('http-equiv','Content-Security-Policy'); csp.setAttribute('content',policy);
  const charset = document.head.querySelector('meta[charset]');
  if (charset) charset.after(csp); else document.head.prepend(csp);
  await writeFile(file,`<!DOCTYPE html>\n${document.documentElement.outerHTML}`);
}
await writeFile(path.join(dist,'social/manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(`Generated social images and hash-based CSP for ${manifest.length} pages.`);
