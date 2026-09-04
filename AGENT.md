# Portfolio — Agent Guide

This repository contains Andre Ortiz's personal portfolio. The site is an
Astro 5 static site with Tailwind v4 and React islands.

## Commands

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # production build in dist/
npm run preview   # preview the production build
```

Run `npm run build` after substantive changes. Do not run deployment or replace
the live site without Andre's explicit approval.

## Architecture

Astro owns the document structure and static routes. React is used only for
interactive islands, currently the Design Systems story. Tailwind v4 is loaded
through `@tailwindcss/vite`; theme tokens and shared utilities live in
`src/styles/global.css`. The homepage applies `theme-home` on `body` to remap
those tokens to a dark field; do not add a second token file.

```text
src/
├── components/
│   ├── BaseHead.astro
│   ├── Footer.astro
│   ├── Header.astro
│   ├── ProjectCard.astro
│   ├── SocialLinks.astro
│   └── demos/design-systems/
├── content/blog/
├── data/
│   ├── projects.ts
│   └── socials.ts
├── layouts/
│   ├── BlogPost.astro
│   └── ProjectPage.astro
├── pages/
│   ├── index.astro
│   ├── blog/
│   ├── tag/
│   ├── rss.xml.js
│   └── work/
└── styles/
    ├── global.css
    └── design-systems.css
```

## Route contract

The canonical work surface is limited to:

- `/work/design-systems`
- `/work/ai-chatbot`
- `/work/scheduling`
- `/work/finance`

The homepage links to those routes. `/work` is not a separate collection
index. `/about` is not a route; the About experience is the avatar modal in
`Header.astro`. Blog, tag, and RSS routes remain active.

## Implementation conventions

- Keep project metadata in `src/data/projects.ts`.
- Keep social metadata in `src/data/socials.ts`.
- Use `BaseHead.astro` for page metadata and global CSS loading.
- Use the existing tokens in `global.css`; do not create a second token source.
- Keep portfolio chrome and Design Systems demo theming separate.
- Use Phosphor icons for site and demo iconography.
- Respect `prefers-reduced-motion`.
- Keep interactive work on its project route, not inside homepage cards.
- Homepage work tiles are static product mocks with spotlight hover. Do not
  restore a rotating-role carousel on `/`.

## Documentation ownership

- `README.md` — public overview, setup, route map, and repository status
- `AGENT.md` — technical architecture and agent implementation rules
- `AO.md` — personal identity, experience, positioning, and messaging
- `DESIGN.md` — implemented visual language and motion rules
- `WORK.md` — portfolio project briefs, section plans, and roadmap
- Workspace wiki — project status, decisions, PRs, and deployment state

Do not duplicate identity, visual tokens, or project briefs across these files.
Update the appropriate source when the codebase or portfolio direction changes.
