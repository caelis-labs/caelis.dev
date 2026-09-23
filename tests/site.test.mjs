import test from 'node:test';
import { execFileSync } from 'node:child_process';
import { verifySite } from '../scripts/verify.mjs';

test('pinned public documentation matches its reviewed checksums', () => {
  execFileSync(process.execPath, ['scripts/sync-docs.mjs', '--check'], { stdio: 'pipe' });
});

test('built site preserves links, language pairs, installation URLs, project order, and social metadata', async () => {
  await verifySite();
});
