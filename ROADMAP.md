# Roadmap — miguelmoraes.pro

## ✅ Concluído
- Setup Astro + CSS puro, design tokens Read.CV style
- Portfolio com projetos dinâmicos (`/projects/[slug]`)
- Dark mode toggle + `prefers-color-scheme`
- Páginas: `/links`, `/packpro`, `/toolkit`
- Vercel Analytics + Speed Insights
- Deploy no Vercel (`miguelmoraes.pro`)

## 🔴 Alta Prioridade
- [ ] PackPro LP: adicionar seção de testimonials (quote real de freelancer)
- [ ] PackPro LP: mostrar preview real das páginas internas (screenshots do Figma)
- [ ] PackPro LP: adicionar urgência (badge "Preço de lançamento" no pricing card)

## 🟡 Média Prioridade
- [ ] Página `/sobre` — bio expandida, serviços, processo de trabalho
- [ ] SEO: Open Graph + meta description em todas as páginas
- [ ] Projeto novo: adicionar Villanueva Advogados quando assets prontos

## 🟢 Crescimento (sem prazo)
- [ ] Assinatura de e-mail pessoal (miguelmoraes.pro) — mesmo estilo da OpServices
- [ ] Portfolio estilo Read.CV com mais detalhes de processo

---

## Changelog

### 2026-08-29
- PackPro LP (`src/pages/packpro.astro`): Redesign completo para Full White Mode com estética inspirada no Notion (fundo `#ffffff`, lavagens em cinza claro, bordas limpas `#e5e5e8`, cartões estilo callout e sombras de elevação sutis)
- Reescrita estratégica de copy focada em alta conversão: autoridade instantânea, blindagem de escopo, 5 minutos de setup e retorno no primeiro cliente
- Seção de Templates Showcase: remoção do elemento sintético de mockup da Hero e inclusão de uma seção dedicada "3 documentos essenciais", apresentando Proposta Comercial, Contrato e Orçamento Rápido em um grid de 3 colunas (desktop) e slider horizontal nativo swipeable (`scroll-snap`) no mobile
- Ícones de Check Estilizados: inclusão de badges circulares em tom laranja (`var(--accent-wash)`) com checkmark para cada item da lista de oferta no card de pricing e nos cartões de template

### 2026-08-24
- Home: a seção de projetos agora mostra três previews visuais dos cases no desktop e quatro em uma grade 2×2 no mobile, com título e ano e mantendo o link para a página completa de projetos

### 2026-08-19
- Header do post reestruturado (`src/pages/blog/[...slug].astro`): categoria como eyebrow, título, lead e uma linha de assinatura fechando o bloco — avatar à esquerda, data à direita (antes categoria e data dividiam a linha acima do título)
- Avatar da assinatura reusa `/webp/avatar.webp` no mesmo squircle da sidebar, em 28px, com `alt` nomeado por ser a única marca de autoria visível (o nome em texto saiu: a sidebar já mostra o mesmo avatar e nome logo acima); o nome volta em tooltip no hover, reusando o pill da `/links` e o guard `@media (hover: hover)`
- Data agora sai em `<time datetime>`, legível por máquina
- Corrigido off-by-one na data exibida: o `date` do frontmatter vira meia-noite UTC e era formatado em UTC-3, mostrando o dia anterior (`2026-08-12` aparecia como "11 de agosto"). `formatDate` passou a usar `timeZone: 'UTC'`
- `BaseLayout`/`SiteLayout` aceitam `type` (`website` | `article`) pro `og:type`; post de blog passa `article`
- Post de blog usa a própria capa como `og:image` (cai na `og.png` do site quando não tem) e ganhou JSON-LD `BlogPosting` com autor, data e categoria
- `public/og-packpro.png` criada — as tags OG e o JSON-LD `Product` da PackPro apontavam pra um arquivo que não existia, então a landing compartilhava sem preview
- `scripts/make-og-packpro.py` gera essa imagem na paleta da página (fundo `#050505`, accent `#E84820`, Inter Tight) e avisa se algum elemento estoura o corte quadrado central
- Feed RSS em `/rss.xml` (`@astrojs/rss`), com `trailingSlash: false` pros links baterem com o canonical de cada post
- `<link rel="alternate">` no `BaseLayout` pro feed ser descoberto sozinho pelos leitores
- Fontes auto-hospedadas via API nativa do Astro 6 (`fonts` no config + `<Font>`): saíram os 2 preconnects e o CSS bloqueante do Google Fonts das 18 páginas
- Rethink Sans, Geist Mono e Inter Tight (PackPro) agora saem de `/_astro/fonts/` — 92 KB em 3 woff2, subset `latin`
- `--font-family`/`--font-mono` (e `--font` da PackPro) apontam pras CSS vars do Astro, que já trazem fallback com métrica casada pra reduzir CLS
- Preload só na Rethink Sans: a mono só aparece em bloco de código e não vale disputar banda no primeiro paint

### 2026-08-15
- Legenda opcional nas imagens de projeto: `images` aceita `{ src, caption }` além de string pura (`toImage()` em `src/data/projects.ts`)
- `[slug].astro` renderiza as imagens em `<figure>` + `<figcaption>`; sem caption o markup segue igual
- Lightbox mostra a mesma legenda embaixo da foto (via `data-caption`) e cede altura da imagem quando ela existe
- Legenda centralizada embaixo da imagem (na página e no lightbox)
- Avatar em squircle (era círculo) na sidebar, no menu mobile e na `/links` — `border-radius: 24%` + `corner-shape: squircle`
- Nova OG image (`public/og.png`): fundo branco, avatar em squircle 150px + nome em duas linhas ao lado, centralizado — o grupo cabe no corte quadrado que LinkedIn e afins fazem (a antiga era halftone com foto antiga)
- `scripts/make-og.py` e `scripts/make-icons.py` regeram OG e favicons a partir do avatar
- Favicon regerado a partir de `public/webp/avatar.webp` (era foto antiga), no mesmo squircle: `favicon.png` 180px, `favicon.ico` 16/32/48 e novo `apple-touch-icon.png` 180px quadrado (iOS aplica a própria máscara)

### 2026-05-26
- Typography: tokens de tamanho ajustados (`--font-size-body` 14→15px, `--font-size-small` 12→14px, `--font-size-xs` 11→12px)
- Hardcoded `font-size` substituídos por tokens em `index.astro`, `links.astro` e `toolkit.astro`
- Dark mode `--color-body` #999 → #aaa (mais contraste nas descrições)
- `.row-link` font-weight 400 → 500 (hierarquia título vs descrição)
- `.row-content` gap 2px → 4px; `.row-desc` margin-top 4px → 8px (separação metadado/descrição)


- Troca de fontes: Inter/SF Mono → Geist + Geist Mono (consistência cross-device)
- Design system: adicionado token `--font-size-xs: 11px`; `--color-muted` dark mode ajustado de #666 para #888 (contraste)
- Removida seção "Curated Music" da `/links` (embed Spotify pesado e fora do estilo)
- `/links`: tooltip CSS no hover para "Coming soon" no desktop; badge mantido no mobile
- `/links`: corrigido `.item-arrow` e `.item-status` usando tokens corretos
- `[slug].astro`: corrigidos `.meta-sep` e `.section-label` (font-family e tamanho via tokens)
- `projects/index.astro`: hover de cards usando `var(--color-muted)` em vez de valores hardcoded
- `index.astro`: diferenciados `.row-sub` (metadado, menor/apagado) e `.row-desc` (descrição, corpo) em todas as seções

### 2026-05-25
- Removido sistema de scroll-reveal (IntersectionObserver + `data-reveal`) de todas as páginas
- Lightbox: adicionadas setas de navegação prev/next (visual + teclado já funcionava)
- Links: WhatsApp → "Let's talk." · Korbi Studio → "The studio I built."
- Projetos: filtros com contadores por categoria, UI/UX separado do Web Design, empty state "Coming soon" quando não há projetos na categoria
