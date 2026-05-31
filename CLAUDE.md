# The Portfolio of Andre Ortiz, Product Designer

Owner: **Andre Ortiz** — see [AO.md](AO.md) for full identity, messaging, and personal details.

---

## Maintenance Protocol

| File                   | Owns                                                                    |
| ---------------------- | ----------------------------------------------------------------------- |
| [CLAUDE.md](CLAUDE.md) | Tech stack, commands, file structure, tokens, component patterns        |
| [AO.md](AO.md)         | Identity, experience, messaging, skills, personal contact details       |
| [DESIGN.md](DESIGN.md) | Visual language, typography, color, spacing, motion — **authoritative** |
| [WORK.md](WORK.md)     | Demo component concepts, build order, status                            |

**Always update when:**

- A component, page, token, or dependency changes → update **CLAUDE.md**
- Personal details, positioning, or experience changes → update **AO.md**
- A visual/typographic/motion/design token decision is added or changed → update **DESIGN.md**
- A demo is built or revised → update **WORK.md**

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

| Layer     | Detail                                                                                                                                                       |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Framework | Astro 5 — static-first, zero JS by default                                                                                                                   |
| Styling   | Tailwind v4 via `@tailwindcss/vite` plugin. Theme lives entirely in `src/styles/global.css` — no config file, no `settings.css` (that file is unused legacy) |
| Demos     | React JSX islands, hydrated with `client:load`. See demo components below                                                                                    |
| Fonts     | Fraunces (variable serif), Instrument Sans, JetBrains Mono. Loaded via `@import url(...)` at the top of `global.css`                                         |

---

## Project structure

```
src/
├── components/
│   ├── ui/                       # Shadcn primitives (unused for now)
│   ├── Header.astro              # Sticky nav: logo dot + Blog + Contact links
│   ├── Footer.astro              # Social icon links + copyright
│   ├── BaseHead.astro            # <head> meta, imports global.css
│   └── demos/
│       ├── DesignSystemDemo.jsx  # Fully interactive — token explorer + theme switcher
│       ├── MedicalSchedulingDemo.jsx # Fully interactive — scheduling workflow
│       ├── FinanceDemo.jsx       # Visual mockup — invoice / budget / payables tabs
│       └── AIFileDemo.jsx        # Visual mockup — file tree + AI chat with citations
├── pages/
│   ├── index.astro               # Homepage (all content: hero → 4 demos → about → contact)
│   ├── about.astro               # Unused placeholder
│   ├── blog/
│   │   ├── index.astro           # Blog index
│   │   └── [...slug].astro       # Blog post template
│   ├── work/                     # Unused — kept for existing content collection
│   │   ├── index.astro
│   │   └── [...slug].astro
│   └── tag/[...slug].astro       # Tag pages
├── content/
│   ├── blog/                     # Blog posts (markdown)
│   └── work/                     # Work entries (unused in homepage)
└── styles/
    └── global.css                # ALL tokens, base styles, animations, utility classes
```

---

## Design tokens

All tokens live in `src/styles/global.css` under `@theme inline`. This is the single source of truth — do not add tokens elsewhere. For design rationale see [DESIGN.md](DESIGN.md).

<!-- TO-DO: Replace these values with the theme variables from ShadcnUI https://ui.shadcn.com/docs/theming-->

| Token                 | Value              | Use                                     |
| --------------------- | ------------------ | --------------------------------------- |
| `--color-background`  | `#ffffff`          | Page surface                            |
| `--color-paper`       | `#fafafa`          | Widget / card backgrounds               |
| `--color-ink`         | `#0a0a0a`          | Primary text                            |
| `--color-ink-2`       | `#404040`          | Secondary text, descriptions            |
| `--color-ink-3`       | `#737373`          | Tertiary text, labels, metadata         |
| `--color-line`        | `rgba(0,0,0,0.08)` | Borders, dividers                       |
| `--color-line-soft`   | `rgba(0,0,0,0.04)` | Subtle inner dividers, stage grids      |
| `--color-accent`      | `#dc2626`          | Red — `<em>` in headings, logo dot only |
| `--color-accent-soft` | `#fef2f2`          | Accent tint backgrounds                 |
| `--color-highlight`   | `#fee2e2`          | Text selection background               |
| `--font-serif`        | Fraunces, Georgia  | Display headings, hero, section titles  |
| `--font-sans`         | Instrument Sans    | Body copy, descriptions, CTA labels, UI |
| `--font-mono`         | JetBrains Mono     | Section labels, metadata, tags, periods |
| `--radius`            | `0.25rem`          | Default border radius                   |

---

## Typography system

Implemented per [DESIGN.md § Typography](DESIGN.md). Key sizes:

| Context        | Font      | Size / Settings                                                        |
| -------------- | --------- | ---------------------------------------------------------------------- |
| Hero h1        | Fraunces  | `clamp(3rem, 9vw, 8.5rem)`, opsz 144 wght 350, lh 0.95, ls -0.035em    |
| Intro para     | Fraunces  | `clamp(1.35rem, 2.2vw, 1.85rem)`, opsz 32 wght 350, lh 1.4             |
| Section h2     | Fraunces  | `clamp(1.75rem, 3.5vw, 2.75rem)`, opsz 72 wght 400, lh 1.1, ls -0.02em |
| Contact CTA h2 | Fraunces  | `clamp(2.5rem, 6vw, 5rem)`, opsz 144 wght 350, lh 1.0, ls -0.035em     |
| Body           | Inst Sans | 17px, 400, lh 1.5–1.7                                                  |
| CTA labels     | Inst Sans | 13px, 500, ls -0.005em                                                 |
| Section labels | JB Mono   | 11px, 400, uppercase, ls +0.12em                                       |

Variable font axes applied via `font-variation-settings: 'opsz' X, 'wght' Y`.

---

## Homepage Work Examples

- **Work examples plan:** See [WORK.md](WORK.md) for full build plan, interactive demo specs, and status tracker

---

## Animation

| Animation         | Duration | Easing                           | Purpose                                         |
| ----------------- | -------- | -------------------------------- | ----------------------------------------------- |
| `animate-fade-up` | 0.9s     | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Hero entrance, staggered with `animation-delay` |

---

## Blog

Coming soon...

## Work Page

Coming soon...
