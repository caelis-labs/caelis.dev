import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import { projects } from './data/site';
export const onRequest = defineRouteMiddleware(context => {
  const route = context.locals.starlightRoute;
  const current = projects.find(project => route.entry.data.project === project.id);
  if (current) route.sidebar = route.sidebar.filter(item => item.type === 'link' || item.label === current.name);
  else route.sidebar = route.sidebar.map(item => item.type === 'group' ? { ...item, collapsed: true } : item);
  const translate = (items: typeof route.sidebar): typeof route.sidebar => items.map(item => {
    if (item.type === 'group') {
      return { ...item, collapsed: item.label === 'reference' ? true : item.collapsed, label: item.label === 'reference' ? (context.url.pathname.startsWith('/zh-cn/') ? '详细参考' : 'Reference') : item.label, entries: translate(item.entries) };
    }
    return item;
  });
  route.sidebar = translate(route.sidebar);
  if (context.url.pathname.startsWith('/zh-cn/')) {
    route.sidebar = route.sidebar.map(item => item.type === 'link' && item.href === '/docs/' ? { ...item, href: '/zh-cn/docs/' } : item);
  }
});
