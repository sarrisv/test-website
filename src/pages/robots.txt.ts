import type { APIRoute } from 'astro';

const getRobotsTxt = (sitemapURL?: URL) => `\
User-agent: *
Allow: /
Disallow: /papers/
${sitemapURL ? `\nSitemap: ${sitemapURL.href}\n` : ''}`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = site ? new URL('sitemap-index.xml', site) : undefined;
  return new Response(getRobotsTxt(sitemapURL));
};