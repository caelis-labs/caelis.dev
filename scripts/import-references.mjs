import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { visit } from 'unist-util-visit';

const root = path.resolve(import.meta.dirname, '..');
const projects = JSON.parse(await readFile(path.join(root,'src/data/projects.json'),'utf8'));
const sources = [
  ['caelis','docs/participants.md','participants','Participant reference','参与者参考'],
  ['caelis','docs/external-acp-agents.md','external-acp-agents','External ACP agents','外部 ACP 智能体'],
  ['caelis-bot','docs/install.md','install','Verified installation steps','完整安装与校验步骤'],
  ['caelis-bot','docs/character-assets.md','character-assets','Character assets','角色资产'],
  ['acp-go-sdk','docs/upgrading-to-v1.4.0.md','upgrading-to-v1-4','Upgrade to v1.4.0','升级到 v1.4.0'],
  ['memory','docs/memory-v0.6-migration.md','migration','Migration reference','数据迁移参考'],
  ['memory','docs/memory-v0.6.1-release.md','v0-6-1','v0.6.1 release notes','v0.6.1 发布说明'],
  ['memory','docs/memory-v0.6-facts.md','facts','Facts contract','Facts 契约'],
];

for (const [repo, sourcePath, slug, title, zhTitle] of sources) {
  const project = projects.find(project => project.id === repo);
  for (const lang of ['en','zh-cn']) {
    const translated = repo === 'caelis-bot' && slug === 'install' && lang === 'zh-cn';
    const actualSource = translated ? 'docs/install.zh-CN.md' : sourcePath;
    const raw = await readFile(path.join(root,'content-sources/snapshots',repo,actualSource),'utf8');
    const processor = unified().use(remarkParse).use(remarkStringify, { fences: true });
    const tree = processor.parse(raw);
    if (tree.children[0]?.type === 'heading' && tree.children[0].depth === 1) tree.children.shift();
    const resolveUrl = (url, image = false) => {
      if (/^(https?:|mailto:|#)/.test(url)) return url;
      const [file,fragment] = url.split('#');
      const normalized = path.posix.normalize(path.posix.join(path.posix.dirname(actualSource),file));
      const local = !image && sources.find(source => source[0] === repo && source[1] === normalized);
      if (local) return `${lang === 'zh-cn' ? '/zh-cn' : ''}/docs/${repo}/reference/${local[2]}/${fragment ? `#${fragment}` : ''}`;
      return `https://github.com/caelis-labs/${repo}/blob/${project.sourceRef}/${normalized}${fragment ? `#${fragment}` : ''}`;
    };
    visit(tree, node => {
      if (node.type === 'link' || node.type === 'definition') node.url = resolveUrl(node.url);
      if (node.type === 'image') { node.type = 'link'; node.url = resolveUrl(node.url,true); node.children = [{ type: 'text', value: node.alt || 'View image in source' }]; delete node.alt; }
    });
    const prefix = lang === 'zh-cn' && !translated ? '> 本页为已锁定版本的英文上游参考，尚未翻译。中文入门指南可从左侧导航进入。\n\n' : '';
    const frontmatter = {
      title: lang === 'en' ? title : zhTitle,
      description: lang === 'en' ? `Reference from a reviewed ${project.name} source revision.` : `${project.name} 参考文档，来源见页末。`,
      project: repo, productVersion: project.version, sourceRepo: repo, sourceRef: project.sourceRef, sourcePath: actualSource,
      generated: true, editUrl: false, sidebar: { order: 20 },
    };
    const target = path.join(root,'src/content/docs',lang === 'en' ? '' : lang,'docs',repo,'reference',`${slug}.md`);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, `---\n${Object.entries(frontmatter).map(([key,value])=>`${key}: ${JSON.stringify(value)}`).join('\n')}\n---\n\n${prefix}${processor.stringify(tree)}`);
  }
}
console.log('Imported 16 versioned reference pages from local snapshots.');
