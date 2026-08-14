// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://miguelmoraes.pro',
  trailingSlash: 'never',
  integrations: [sitemap(), mdx()],
  markdown: {
    shikiConfig: {
      // defaultColor: false emite --shiki-light/--shiki-dark por token em vez
      // de cravar cor inline, o que deixa o CSS decidir conforme o tema do site
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
      wrap: true,
    },
  },
});
