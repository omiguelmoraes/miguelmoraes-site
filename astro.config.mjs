// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import rehypeExternalLinks from 'rehype-external-links';

export default defineConfig({
  site: 'https://miguelmoraes.pro',
  trailingSlash: 'never',
  integrations: [sitemap(), mdx()],
  markdown: {
    // Link externo em post abre em aba nova sem eu precisar marcar na mão a
    // cada texto. Link interno segue na mesma aba
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
    ],
    shikiConfig: {
      // defaultColor: false emite --shiki-light/--shiki-dark por token em vez
      // de cravar cor inline, o que deixa o CSS decidir conforme o tema do site
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
      wrap: true,
    },
  },
});
