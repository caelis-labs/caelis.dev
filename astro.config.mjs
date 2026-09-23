import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import projects from './src/data/projects.json' with { type: 'json' };

export default defineConfig({
  site: 'https://caelis.dev',
  output: 'static',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'never' },
  integrations: [starlight({
    title: 'Caelis Labs',
    disable404Route: true,
    description: 'Guides for Caelis, Caelis Bot, ACP Go SDK, Memory, and Caelis App.',
    defaultLocale: 'root',
    locales: { root: { label: 'English', lang: 'en' }, 'zh-cn': { label: '简体中文', lang: 'zh-CN' } },
    favicon: '/icon.svg',
    customCss: ['./src/styles/docs.css'],
    routeMiddleware: './src/docs-route.ts',
    components: {
      SiteTitle: './src/components/docs/SiteTitle.astro',
      Sidebar: './src/components/docs/Sidebar.astro',
      PageTitle: './src/components/docs/PageTitle.astro',
      Footer: './src/components/docs/Footer.astro',
    },
    social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/caelis-labs' }],
    sidebar: [
      { label: 'Documentation', translations: { 'zh-CN': '文档首页' }, link: '/docs/' },
      { label: 'Choose a project', translations: { 'zh-CN': '选择项目' }, slug: 'docs/choose' },
      ...projects.map(project => ({ label: project.name, collapsed: false, items: [{ autogenerate: { directory: `docs/${project.id}` } }] })),
    ],
    expressiveCode: { themes: ['github-dark', 'github-light'], styleOverrides: { borderRadius: '7px', codeFontSize: '.82rem' } },
    head: [{ tag: 'meta', attrs: { name: 'theme-color', content: '#0b0c12' } }],
    lastUpdated: false,
    editLink: { baseUrl: 'https://github.com/caelis-labs/caelis.dev/edit/main/' },
  })],
});
