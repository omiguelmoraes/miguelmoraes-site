# Claude Code — miguelmoraes.pro

Guidelines para trabalhar no site pessoal do Miguel.

## Dev Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Deploy: `npx vercel --prod` (ou push pra main → auto-deploy no Vercel)

## Stack
- **Framework:** Astro v6 (SSG, static output)
- **Styling:** CSS puro com custom properties — sem Tailwind
- **Font:** Inter (Google Fonts)
- **Analytics:** Vercel Analytics + Speed Insights
- **Deploy:** Vercel (`miguelmoraes.pro`)

## Arquivos Chave
- Design tokens: `src/styles/global.css`
- Dados dos projetos: `src/data/projects.ts`
- Componentes: `src/components/`
- Páginas: `src/pages/`

## Design System (CSS Variables)
- **Bg:** `var(--color-bg)` → `#ffffff` / dark `#111111`
- **Texto:** `var(--color-title)` `#111111` / `var(--color-body)` `#555555`
- **Border:** `var(--color-border)` `#e5e5e5`
- **Wash:** `var(--color-wash)` `#f2f2f2`
- **Estilo:** Read.CV — minimalismo pessoal, layout 600px max-width
- **Dark mode:** toggle via `data-theme` no `<html>` + `prefers-color-scheme` fallback

## Páginas
- `/` — portfolio pessoal (home)
- `/projects/[slug]` — case individual com lightbox
- `/links` — página de links
- `/packpro` — landing page do PackPro
- `/toolkit` — ferramentas que usa

## Convenções
- Usar sempre CSS variables, nunca valores hardcoded
- Componentes em `src/components/` (único: `Lightbox.astro`)
- Projetos novos: adicionar em `src/data/projects.ts` + imagens em `public/projects/[slug]/`
- Idioma do conteúdo: inglês

## Changelog
Ao final de cada sessão com mudanças no projeto, registrar no `ROADMAP.md` sob `## Changelog` com a data de hoje (`### YYYY-MM-DD`) e bullets descrevendo o que foi feito. Se já existir um bloco com a data de hoje, adicionar nele.
