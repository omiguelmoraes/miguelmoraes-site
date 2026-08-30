// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';

export default defineConfig({
  site: 'https://miguelmoraes.pro',
  trailingSlash: 'never',
  // a calculadora é bônus entregue por link depois da compra: fica fora do
  // sitemap (e com noindex na própria página) pra não virar página pública
  integrations: [sitemap({ filter: (page) => !page.includes('/packpro/calculadora') })],
  // Astro baixa e serve as fontes junto do site: mata os dois handshakes com
  // o Google e o round-trip bloqueante do CSS deles antes do texto pintar.
  // subsets latin só — o conteúdo é português e inglês
  fonts: [
    {
      name: 'Rethink Sans',
      cssVariable: '--font-rethink-sans',
      provider: fontProviders.google(),
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
    {
      name: 'Geist Mono',
      cssVariable: '--font-geist-mono',
      provider: fontProviders.google(),
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['monospace'],
    },
    {
      name: 'Inter Tight',
      cssVariable: '--font-inter-tight',
      provider: fontProviders.google(),
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
  ],
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
