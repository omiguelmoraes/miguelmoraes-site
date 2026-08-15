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

### 2026-08-15
- Legenda opcional nas imagens de projeto: `images` aceita `{ src, caption }` além de string pura (`toImage()` em `src/data/projects.ts`)
- `[slug].astro` renderiza as imagens em `<figure>` + `<figcaption>`; sem caption o markup segue igual
- Lightbox mostra a mesma legenda embaixo da foto (via `data-caption`) e cede altura da imagem quando ela existe
- Legenda centralizada embaixo da imagem (na página e no lightbox)
- Avatar em squircle (era círculo) na sidebar, no menu mobile e na `/links` — `border-radius: 24%` + `corner-shape: squircle`
- Nova OG image (`public/og.png`): fundo branco, avatar em squircle + "Miguel Moraes" em Rethink Sans, centralizado (a antiga era halftone com foto antiga)
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
