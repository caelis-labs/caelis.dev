const releaseOrigin = 'https://releases.caelis.dev/caelis-bot';
const fallback = 'https://github.com/caelis-labs/caelis-bot/releases/latest';

const redirect = location => new Response(null, {
  status: 302,
  headers: { Location: location, 'Cache-Control': 'no-store' },
});

// R2 prunes older releases. Resolve on each click instead of pinning a DMG URL
// in static HTML that could outlive the package. No R2 credentials are needed.
export async function onRequest({ request }) {
  if (!['GET', 'HEAD'].includes(request.method)) {
    return new Response(null, { status: 405, headers: { Allow: 'GET, HEAD' } });
  }
  const asset = new URL(request.url).searchParams.get('asset') ?? 'dmg';
  if (!['dmg', 'checksum'].includes(asset)) return new Response(null, { status: 400 });

  try {
    const signal = AbortSignal.timeout(5000);
    const response = await fetch(`${releaseOrigin}/latest.json`, {
      signal, redirect: 'manual', cache: 'no-store',
    });
    if (!response.ok) return redirect(fallback);
    const manifest = await response.json();
    if (manifest?.schema !== 1 || typeof manifest.version !== 'string' ||
        !/^\d+\.\d+\.\d+$/.test(manifest.version) ||
        manifest.tag !== `v${manifest.version}` ||
        manifest.file !== `Caelis-Bot-${manifest.version}-macos-arm64.dmg` ||
        !Number.isSafeInteger(manifest.length) || manifest.length <= 0 ||
        !/^[a-f0-9]{64}$/.test(manifest.sha256)) return redirect(fallback);

    const url = `${releaseOrigin}/releases/${manifest.tag}/${manifest.file}${asset === 'checksum' ? '.sha256' : ''}`;
    const available = await fetch(url, { method: 'HEAD', signal, redirect: 'manual', cache: 'no-store' });
    if (!available.ok || (asset === 'dmg' && Number(available.headers.get('content-length')) !== manifest.length)) {
      return redirect(fallback);
    }
    return redirect(url);
  } catch (error) {
    // A slow/unavailable mirror must still leave a usable installation path.
    console.warn('Caelis Bot download mirror unavailable:', error instanceof Error ? error.message : 'Unknown error');
    return redirect(fallback);
  }
}
