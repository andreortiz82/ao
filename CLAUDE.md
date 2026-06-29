# Portfolio — CLAUDE.md

Senior product designer's portfolio. Astro 7 + Tailwind v4 + React 19 islands. Case studies with embedded interactive demos.

Owner: **Andre Ortiz** — see [AO.md](AO.md) for full identity, messaging, and personal details.

---

## Maintenance Protocol

| File | Owns |
| ---- | ---- |
| [CLAUDE.md](CLAUDE.md) | Tech stack, commands, file structure, tokens, component patterns |
| [AO.md](AO.md) | Identity, experience, messaging, skills, personal contact details |
| [DESIGN.md](DESIGN.md) | Visual language, typography, color, spacing, motion — **authoritative** |
| [WORK.md](WORK.md) | Case study + demo specs, build order, status |

**Always update when:**

- A component, page, token, or dependency changes → update **CLAUDE.md**
- Personal details, positioning, or experience changes → update **AO.md**
- A visual/typographic/motion decision is added or changed → update **DESIGN.md**
- A case study or demo is built or revised → update **WORK.md**

**Cross-reference rule:** never duplicate information across files. Point to the authoritative source instead.

---

## Commands

```bash
npm run dev       # dev server → http://localhost:4321
npm run build     # production build → ./dist
npm run preview   # preview the dist build
```

---

## Stack

| Layer | Detail |
| ----- | ------ |
| Framework | Astro 7 — static-first, zero JS by default |
| Content | MDX via `@astrojs/mdx` — case studies in `src/content/work/` |
| Islands | React 19 via `@astrojs/react`, hydrated with `client:load` |
| Styling | Tailwind v4 via `@tailwindcss/vite`. Theme in `src/styles/global.css` |
| Motion | GSAP + ScrollTrigger in `src/scripts/motion.ts` |
| Icons | Phosphor (`@phosphor-icons/react`) in site chrome; Lucide for shadcn UI |
| UI primitives | shadcn/base-ui (`@base-ui/react`, `class-variance-authority`) — add via `npx shadcn@latest add` |

---

## Project structure

```
src/
├── lib/
│   ├── work.ts                 # getWorkEntries()
│   └── blog.ts                 # getBlogPosts(), formatBlogDate()
├── scripts/
│   └── motion.ts               # GSAP homepage, case study, blog motion
├── components/
│   ├── ContactBar.astro        # Sticky nav (all routes)
│   ├── BaseHead.astro
│   ├── WorkGrid.astro
│   ├── BlogGrid.astro
│   ├── DemoFrame.astro
│   └── demos/                    # Six case study interactive islands
├── pages/
│   ├── index.astro             # Homepage: hero + work grid
│   ├── work/
│   │   ├── index.astro         # Work index — ContactBar + WorkGrid
│   │   └── [...slug].astro     # Case study template
│   ├── blog/                   # Blog index + posts (ContactBar shell)
│   └── tag/[...tag].astro      # Tag archive pages
├── content/
│   ├── blog/
│   └── work/                   # MDX case studies — source of truth for copy + metadata
└── styles/
    └── global.css              # ALL tokens, typography classes, work grid, case study styles
```

---

## Case study + demo pattern

Each work entry is MDX narrative plus optional React demo(s). See [WORK.md](WORK.md) for per-project demo specs and external repo strategy.

Embed in MDX:

```mdx
import ChatbotDemo from "../../components/demos/ChatbotDemo.jsx";

<ChatbotDemo client:load />
```

Wrap in `DemoFrame.astro` when built for consistent stage-grid background and spacing.

---

## Design tokens

All tokens live in `src/styles/global.css` under `@theme inline`. For design rationale see [DESIGN.md](DESIGN.md).

| Token | Value | Use |
| ----- | ----- | --- |
| `--color-background` | `#ffffff` | Page surface |
| `--color-paper` | `#fafafa` | Widget / card backgrounds |
| `--color-ink` | `#0a0a0a` | Primary text |
| `--color-ink-2` | `#404040` | Secondary text |
| `--color-ink-3` | `#737373` | Tertiary text, labels |
| `--color-line` | `rgba(0,0,0,0.08)` | Borders, dividers |
| `--color-accent` | `#dc2626` | Emphasis, logo dot |
| `--font-serif` | Fraunces | Display headings, hero |
| `--font-sans` | Instrument Sans | Body, UI |
| `--font-mono` | JetBrains Mono | Labels, metadata, tags |

Typography utility classes: `.type-hero`, `.type-name`, `.type-cs-title`, `.type-tile-title`, `.type-outcome`. Work grid: `.work-grid`, `.work-tile`. Case study: `.cs-meta`, `.cs-img-placeholder`, `.cs-nav-link`.

---

## Homepage layout

```
ContactBar (sticky)
Hero — name + rotating role labels
Work grid — 6 tiles linking to /work/[slug]
```

Preserves on `nu1` through visual redesign: rotating hero, work grid, case study template layout.

---

## Animation

Implemented in `src/scripts/motion.ts` (GSAP + ScrollTrigger).

| Context | Motion |
| ------- | ------ |
| Homepage load | ContactBar fade/slide; hero name + title rise |
| Hero rotate | Label crossfade with vertical drift (replaces CSS interval) |
| Work grid | Staggered tile reveal on scroll |
| Case study / blog post | Header stagger, hero image, article + demo frames on scroll |
| Blog grid | Staggered card reveal on scroll (`initBlogMotion`) |

---

## Dependencies note

Runtime deps are limited to what the site and demos use. `shadcn` CLI is a **devDependency** — run `npx shadcn@latest add <component>` to scaffold UI primitives into `src/components/ui/`. Per-demo data libs (e.g. `@faker-js/faker`) belong in the demo's own repo unless shared across multiple islands.
