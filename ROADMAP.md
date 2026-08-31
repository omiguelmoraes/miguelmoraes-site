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

### 2026-08-31
- Refino dos textos em Português (PT-BR) de todo o site (`index.astro`, `about.astro`, `career.astro`, `stack.astro`): remoção de construções com tom de tradução literal do inglês (ex: "coisas que parecem boas e realmente significam algo"), eliminação de pontuações de travessão (`—`) e dois pontos (`:`) em frases de apresentação, e alinhamento total com as diretrizes de voz do vault (`Content/Estratégia/Voz — Escrita Longa (Blog).md`).
- Reequilíbrio de posicionamento (Barca x Korbi Studio): remoção de jargões como "no tempo livre", "durante a semana" e "projetos paralelos", apresentando Miguel como Web Designer na Barca e fundador da Korbi Studio com o mesmo peso e autoridade profissional.
- Redesign da página `/links` (`src/pages/links.astro`): substituição do destaque de case (Flouds) por **Produto em destaque** (PackPro com imagem `/og-packpro.png`), remoção da seção "Leituras Recentes" e adição da seção **"Vida recente"** no rodapé (grade de 4 fotos do dia a dia integradas ao Lightbox).

### 2026-08-29
- Tradução do site para Português (PT-BR): migração completa da navegação (`Início`, `Projetos`, `Blog`, `Carreira`, `Sobre`, `Stack`), páginas principais, metadados, filtros, rótulos de cases e página 404 para português casual e direto.
- Carreira (`src/pages/career.astro`): Redesign da seção Work Experience substituindo os accordions (`<details>`, `View full experience`, listas de responsabilidades e badges) por um layout limpo de linhas (`.row`), alinhado com Education e Speaking. Cada experiência agora é apresentada em um parágrafo conciso com os principais destaques, mantendo as imagens de OpServices e Gama Marketing diretamente visíveis e integradas ao Lightbox.
- Bônus 2 do PackPro: página `/packpro/calculadora` (`src/pages/packpro/calculadora.astro`), calculadora de precificação freelancer com custo/hora a partir de custos fixos, meta de pró-labore, horas faturáveis, impostos e reserva, orçamento por projeto com presets de horas e tabela de faixas de mercado
- Área de bônus do PackPro: hub em `/packpro/bonus` e os bônus 1 e 3 viraram página web (`/packpro/bonus/checklist` e `/packpro/bonus/scripts`) via layout `PackProBonus.astro`, com PDF pra download em `public/packpro/`. Motivo: PDF A4 é ruim de ler no celular, e o link deixa o conteúdo atualizável depois da compra
- Navegação dos bônus volta pro hub, nunca pra LP (quem está ali já comprou e não precisa ver o preço de novo); `filter` do sitemap agora tira toda sub-rota de `/packpro/`
- Página de scripts tem botão de copiar por mensagem, que é o gesto principal dela
- Cartão do resultado da calculadora virou peça única e passou a de fato acompanhar a rolagem: o `align-items: start` do grid encolhia a coluna e o `position: sticky` não tinha trilho. Memória de cálculo recolhida em `<details>` dentro do próprio cartão, valor de tabela em laranja com `tabular-nums` e transição do número a cada tecla
- Calculadora fica fora do índice: `noindex, nofollow` na página e `filter` no `@astrojs/sitemap` tirando a rota do sitemap, já que é bônus entregue por link após a compra
- PackPro LP (`src/pages/packpro.astro`): Redesign completo para Full White Mode com estética inspirada no Notion (fundo `#ffffff`, lavagens em cinza claro, bordas limpas `#e5e5e8`, cartões estilo callout e sombras de elevação sutis)
- Reescrita estratégica de copy focada em alta conversão: autoridade instantânea, blindagem de escopo, 5 minutos de setup e retorno no primeiro cliente
- Seção de Templates Showcase: remoção do elemento sintético de mockup da Hero e inclusão de uma seção dedicada "3 documentos essenciais", apresentando Proposta Comercial, Contrato e Orçamento Rápido em um grid de 3 colunas (desktop) e slider horizontal nativo swipeable (`scroll-snap`) no mobile
- Refinamento de Craft UI & Mobile Peek: troca dos ícones por SVGs nítidos de checkmark dentro de badges circulares laranja, topo estilo Notion/Figma nos cartões, fonte monospace (`Geist Mono`) para metadados e ajuste da largura dos cards no mobile (`calc(78vw - 12px)`) para deixar o próximo cartão visivelmente vazado na lateral direita
- Ritmo Vertical & Respiro: aumento da margem inferior dos títulos de seção (`.section-title`) para 48px no desktop e 32px no mobile quando não há subtítulo, garantindo espaçamento visual harmonioso em relação aos cartões
- Seções de Alta Conversão & Integridade: adição da seção "Antes vs Depois" (comparando envio no Whats/Canva vs proposta corporativa no Figma) e manutenção de prova social 100% autêntica sem inventar depoimentos fictícios
- Empilhamento de Oferta & Seções Wash: inclusão dos 3 bônus exclusivos no card de comparativo ("Checklist PDF", "Calculadora Web de Precificação" e "Script de Fechamento PDF" elevando o valor total de R$391 para R$552 por R$37), e correção na especificidade da regra CSS `.section.section-wash` para garantir alternância perfeita de fundos em todas as seções

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
