import { test } from 'node:test';
import assert from 'node:assert/strict';
import { onRequest } from '../functions/_middleware.js';

test('retired App pages return localized 410 without becoming a replacement product', async () => {
  for (const path of ['/projects/caelis-app', '/projects/caelis-app/', '/docs/caelis-app/quickstart/', '/zh-cn/docs/caelis-app/reference/architecture/']) {
    const response = await onRequest({request:new Request(`https://caelis.dev${path}`),next:()=>{throw Error('must retire')}});
    assert.equal(response.status,410);assert.equal(response.headers.get('X-Robots-Tag'),'noindex');
    const html=await response.text();assert.ok(html.includes(path.startsWith('/zh-cn/')?'此页面已退役':'This page has been retired'));
    assert.ok(!html.includes('http-equiv="refresh"'));
  }
  const response=await onRequest({request:new Request('https://caelis.dev/docs/caelis-app/',{method:'HEAD'}),next:()=>{throw Error('must retire')}});
  assert.equal(await response.text(),'');assert.equal(response.status,410);
});
test('retirement middleware preserves downloads, active products and similarly named paths', async()=>{
  for (const path of ['/download/caelis-bot/','/docs/caelis/','/projects/desktop-world/','/docs/caelis-application/']) {
    const response=await onRequest({request:new Request(`https://caelis.dev${path}`),next:()=>new Response('next',{status:202})});
    assert.equal(response.status,202);assert.equal(await response.text(),'next');
  }
});
