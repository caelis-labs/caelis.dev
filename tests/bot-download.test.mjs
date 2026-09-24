import test from 'node:test';
import assert from 'node:assert/strict';
import { onRequest } from '../functions/download/caelis-bot.js';

const origin = 'https://releases.caelis.dev/caelis-bot';
const fallback = 'https://github.com/caelis-labs/caelis-bot/releases/latest';
const manifest = version => ({
  schema: 1, version, tag: `v${version}`, file: `Caelis-Bot-${version}-macos-arm64.dmg`,
  length: 32476258, sha256: 'bbc82ab7f468699f659f2f692b1bfb30cca64f0058caa04ed041b6fec70d37d2',
});
const request = (suffix = '', method = 'GET') => ({ request: new Request(`https://caelis.dev/download/caelis-bot/${suffix}`, { method }) });

test('each click resolves the current stable DMG or matching checksum without caching a release', async t => {
  let current = manifest('0.2.0');
  const fetch = t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(options.cache, 'no-store');
    assert.equal(options.redirect, 'manual');
    assert.ok(options.signal instanceof AbortSignal);
    if (url === `${origin}/latest.json`) return Response.json(current);
    assert.equal(options.method, 'HEAD');
    assert.ok([`${origin}/releases/${current.tag}/${current.file}`, `${origin}/releases/${current.tag}/${current.file}.sha256`].includes(url));
    return new Response(null, { headers: { 'Content-Length': String(url.endsWith('.sha256') ? 99 : current.length) } });
  });
  for (const version of ['0.2.0', '0.3.0']) {
    current = manifest(version);
    for (const asset of ['', '?asset=checksum']) {
      const result = await onRequest(request(asset));
      assert.equal(result.status, 302);
      assert.equal(result.headers.get('Location'), `${origin}/releases/v${version}/${current.file}${asset ? '.sha256' : ''}`);
      assert.equal(result.headers.get('Cache-Control'), 'no-store');
    }
  }
  assert.equal(fetch.mock.callCount(), 8);
});

test('invalid, mismatched or non-stable manifests fall back without requesting an arbitrary asset', async t => {
  const invalid = [null, {}, { schema: 2 }, { version: '0.3.0-beta.1' }, { tag: 'v0.1.0' },
    { file: '../../other-project/file.dmg' }, { file: 'https://example.com/file.dmg' },
    { file: 'Caelis-Bot-0.2.0-macos-x64.dmg' }, { length: 0 }, { length: '32476258' }, { sha256: 'invalid' }];
  let value;
  const fetch = t.mock.method(globalThis, 'fetch', async url => {
    assert.equal(url, `${origin}/latest.json`);
    return Response.json(value);
  });
  for (const change of invalid) {
    value = change === null ? null : Object.keys(change).length ? { ...manifest('0.2.0'), ...change } : {};
    const response = await onRequest(request());
    assert.equal(response.headers.get('Location'), fallback);
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
  }
  assert.equal(fetch.mock.callCount(), invalid.length);
});

test('network, timeout, malformed JSON, removed packages and length mismatch use GitHub fallback', async t => {
  const cases = [
    () => { throw new TypeError('network unavailable'); },
    () => { throw new DOMException('timed out', 'TimeoutError'); },
    () => new Response(null, { status: 503 }),
    () => new Response(null, { status: 302, headers: { Location: 'https://example.com/latest.json' } }),
    () => new Response('not JSON'),
    url => url.endsWith('latest.json') ? Response.json(manifest('0.2.0')) : new Response(null, { status: 404 }),
    url => url.endsWith('latest.json') ? Response.json(manifest('0.2.0')) : new Response(null, { status: 302, headers: { Location: 'https://example.com/file.dmg' } }),
    url => url.endsWith('latest.json') ? Response.json(manifest('0.2.0')) : new Response(null, { headers: { 'Content-Length': '1' } }),
  ];
  let implementation;
  t.mock.method(console, 'warn', () => {});
  t.mock.method(globalThis, 'fetch', (...args) => implementation(...args));
  for (implementation of cases) {
    const response = await onRequest(request());
    assert.equal(response.status, 302);
    assert.equal(response.headers.get('Location'), fallback);
  }
});

test('HEAD redirects without a body; invalid methods and asset kinds do not reach the network', async t => {
  const fetch = t.mock.method(globalThis, 'fetch', async url => url.endsWith('latest.json')
    ? Response.json(manifest('0.2.0'))
    : new Response(null, { headers: { 'Content-Length': '32476258' } }));
  assert.equal((await onRequest(request('', 'POST'))).status, 405);
  assert.equal((await onRequest(request('?asset=other'))).status, 400);
  assert.equal(fetch.mock.callCount(), 0);
  const response = await onRequest(request('', 'HEAD'));
  assert.equal(response.status, 302);
  assert.equal(response.headers.get('Location'), `${origin}/releases/v0.2.0/Caelis-Bot-0.2.0-macos-arm64.dmg`);
  assert.equal(await response.text(), '');
});
