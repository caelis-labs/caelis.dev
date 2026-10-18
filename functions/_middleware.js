// Retired product URLs keep an explicit HTTP lifecycle without retaining a
// searchable product page or touching the independent product repository.
export async function onRequest({ request, next }) {
  const pathname = new URL(request.url).pathname;
  if (!/^\/(?:zh-cn\/)?(?:projects|docs)\/caelis-app(?:\/|$)/.test(pathname)) return next();
  const zh = pathname.startsWith('/zh-cn/');
  const prefix = zh ? '/zh-cn' : '';
  const title = zh ? '此页面已退役' : 'This page has been retired';
  const html = `<!doctype html><html lang="${zh ? 'zh-CN' : 'en'}"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${title} · Caelis Labs</title><style>html{color-scheme:light dark;font:18px/1.7 system-ui}body{max-width:42rem;margin:15vh auto;padding:24px}a{color:inherit;margin-right:24px}h1{font-size:clamp(32px,7vw,48px)}</style><main><p>410 · CAELIS LABS</p><h1>${title}</h1><p>${zh ? '这份产品资料已停止维护并从网站移除。你可以继续浏览当前项目和指南。' : 'These product materials are no longer maintained and have been removed. Explore the current projects and guides.'}</p><a href="${prefix}/projects/">${zh ? '当前项目' : 'Current projects'}</a><a href="${prefix}/docs/">${zh ? '使用指南' : 'Guides'}</a></main></html>`;
  return new Response(request.method === 'HEAD' ? null : html, { status: 410, headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex', 'Cache-Control': 'public, max-age=3600' } });
}
