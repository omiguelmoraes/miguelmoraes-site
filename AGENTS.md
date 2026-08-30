# miguelmoraes.pro — contexto pro agente

Site pessoal e portfólio do Miguel Moraes (Web Designer na Barca, fundador da Korbi).
Vale para qualquer agente que trabalhe neste repo.

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

## Blog — regra que não pode ser quebrada
Os posts em `src/content/blog/` são **cópia gerada**, não a fonte da verdade.

- Fonte real: `Content/Blog/` no vault do Obsidian.
- Sync: `python3 ~/Dev/scripts/publish-blog.py` (vault → repo).
- **Nunca edite um `.md` de `src/content/blog/` direto.** A próxima publicação sobrescreve.
  Se precisar corrigir texto, corrija no vault e rode o sync.
- Estrutura, layout e SEO do blog (`src/pages/blog/`) sim, se mexe aqui.

## Convenções
- Usar sempre CSS variables, nunca valores hardcoded
- Componentes em `src/components/` (único: `Lightbox.astro`)
- Projetos novos: adicionar em `src/data/projects.ts` + imagens em `public/projects/[slug]/`
- Idioma da UI/portfólio e posts do blog: português (PT-BR).
- Mudanças cirúrgicas: mexa só no que foi pedido, não refatore o que estava do lado.

## Copy
Voz do Miguel, não voz de IA. Sem travessão no meio de frase, tom casual e direto.
O perfil completo de voz para texto longo vive no vault, em
`Content/Estratégia/Voz — Escrita Longa (Blog).md`. O leitor é tratado por "você".

## Git
Repo com `origin` no GitHub, branch `main`, auto-deploy na Vercel.
Ao fechar um bloco de trabalho: commit com mensagem clara + push. Sem force-push em `main`.
Nunca commitar `.env`, chave ou token.

## Changelog
Ao final de cada sessão com mudanças no projeto, registrar no `ROADMAP.md` sob `## Changelog` com a data de hoje (`### YYYY-MM-DD`) e bullets descrevendo o que foi feito. Se já existir um bloco com a data de hoje, adicionar nele.
