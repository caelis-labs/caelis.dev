import { readFile, writeFile, mkdir, rename } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const manifestPath = resolve(root, 'content-sources/manifest.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const projects = JSON.parse(await readFile(resolve(root, 'src/data/projects.json'), 'utf8'));
const allowed = new Set(projects.map(project => project.id));
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const check = process.argv.includes('--check');
const fetched = [];

for (const entry of manifest.sources) {
  if (!allowed.has(entry.repo) || !/^[a-f0-9]{40}$/.test(entry.ref) || entry.path.startsWith('/') || entry.path.split('/').includes('..')) throw new Error(`Invalid source: ${entry.repo}/${entry.path}`);
  const project = projects.find(project => project.id === entry.repo);
  if (entry.ref !== project.sourceRef || entry.version !== project.version) throw new Error(`Catalog/source revision mismatch: ${entry.repo}/${entry.path}`);
  const target = resolve(root, 'content-sources/snapshots', entry.repo, entry.path);
  if (check) {
    if (!entry.sha256 || hash(await readFile(target)) !== entry.sha256) throw new Error(`Snapshot checksum mismatch: ${entry.repo}/${entry.path}`);
    continue;
  }
  const response = JSON.parse(execFileSync('gh', ['api', `repos/caelis-labs/${entry.repo}/contents/${entry.path}?ref=${entry.ref}`], { maxBuffer: 20 * 1024 * 1024, encoding: 'utf8' }));
  if (response.encoding !== 'base64' || typeof response.content !== 'string') throw new Error(`Expected a base64 file: ${entry.path}`);
  const bytes = Buffer.from(response.content, 'base64');
  fetched.push({ entry, target, bytes });
}
// Fetch every source successfully before modifying any stored snapshot.
for (const { entry, target, bytes } of fetched) {
  await mkdir(dirname(target), { recursive: true });
  await writeFile(`${target}.tmp`, bytes);
  await rename(`${target}.tmp`, target);
  entry.sha256 = hash(bytes);
}
if (!check) {
  await writeFile(`${manifestPath}.tmp`, JSON.stringify(manifest, null, 2) + '\n');
  await rename(`${manifestPath}.tmp`, manifestPath);
}
console.log(`${check ? 'Verified' : 'Synchronized'} ${manifest.sources.length} pinned public sources.`);
