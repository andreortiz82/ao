# Portfolio — CLAUDE.md

Senior product designer's portfolio. Astro 5 + Tailwind v4 + React JSX islands.
Owner: **Andre Ortiz** — see [AO.md](AO.md) for full identity, messaging, and personal details.

---

## Maintenance Protocol

| File                   | Owns                                                                  |
| ---------------------- | --------------------------------------------------------------------- |
| [CLAUDE.md](CLAUDE.md) | Tech stack, commands, file structure, tokens, component patterns      |
| [AO.md](AO.md)         | Identity, experience, messaging, skills, personal contact details     |
| [DESIGN.md](DESIGN.md) | Visual language, typography, color, spacing, motion — **authoritative** |
| [WORK.md](WORK.md)     | Demo component concepts, build order, status                          |

**Always update when:**
- A component, page, token, or dependency changes → update **CLAUDE.md**
- Personal details, positioning, or experience changes → update **AO.md**
- A visual/typographic/motion decision is added or changed → update **DESIGN.md**
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

| Layer     | Detail |
| --------- | ------ |
| Framework | Astro 5 — static-first, zero JS by default |
| Styling   | Tailwind v4 via `@tailwindcss/vite` plugin. Theme lives entirely in `src/styles/global.css` — no config file, no `settings.css` (that file is unused legacy) |
| Demos     | React JSX islands, hydrated with `client:load`. See demo components below |
| Fonts     | Fraunces (variable serif), Instrument Sans, JetBrains Mono. Loaded via `@import url(...)` at the top of `global.css` |

---

## Project structure

```
src/
├── components/
│   ├── ui/                       # Shadcn primitives (unused for now)
│   ├── Header.astro              # Avatar + Phosphor socials; About/Blog; Contact me. About modal lives here
│   ├── Footer.astro              # Social icon links + copyright (used on blog/work collection pages)
│   ├── BaseHead.astro            # <head> meta, imports global.css
│   └── demos/                    # Interactive work examples — not mounted on the homepage frame
├── data/
│   └── projects.ts               # The four homepage tile entries + placeholder page copy
├── layouts/
│   ├── BlogPost.astro
│   └── ProjectPage.astro         # Lightweight project placeholder (headline + short body)
├── pages/
│   ├── index.astro               # Homepage frame: header, rotating claim, four peeking tiles
│   ├── about.astro               # Unused leftover — About is a modal, not a page
│   ├── blog/
│   │   ├── index.astro           # Blog index (real posts only; empty state if none)
│   │   └── [...slug].astro
│   ├── work/
│   │   ├── design-systems.astro  # Placeholder project page
│   │   ├── ai-chatbot.astro
│   │   ├── scheduling.astro
│   │   ├── finance.astro
│   │   ├── index.astro           # Older work collection index (not the homepage tiles)
│   │   └── [...slug].astro
│   └── tag/[...slug].astro
├── content/
│   ├── blog/
│   └── work/                     # Older MDX case studies — not the four homepage destinations
└── styles/
    └── global.css
```

---

## Design tokens

All tokens live in `src/styles/global.css` under `@theme inline`. This is the single source of truth — do not add tokens elsewhere. For design rationale see [DESIGN.md](DESIGN.md).

| Token                 | Value               | Use                                      |
| --------------------- | ------------------- | ---------------------------------------- |
| `--color-background`  | `#ffffff`           | Page surface                             |
| `--color-paper`       | `#fafafa`           | Widget / card backgrounds                |
| `--color-ink`         | `#0a0a0a`           | Primary text                             |
| `--color-ink-2`       | `#404040`           | Secondary text, descriptions             |
| `--color-ink-3`       | `#737373`           | Tertiary text, labels, metadata          |
| `--color-line`        | `rgba(0,0,0,0.08)`  | Borders, dividers                        |
| `--color-line-soft`   | `rgba(0,0,0,0.04)`  | Subtle inner dividers, stage grids       |
| `--color-accent`      | `#dc2626`           | Red — `<em>` in headings, logo dot only  |
| `--color-accent-soft` | `#fef2f2`           | Accent tint backgrounds                  |
| `--color-highlight`   | `#fee2e2`           | Text selection background                |
| `--font-serif`        | Fraunces, Georgia   | Display headings, hero, section titles   |
| `--font-sans`         | Instrument Sans     | Body copy, descriptions, CTA labels, UI  |
| `--font-mono`         | JetBrains Mono      | Section labels, metadata, tags, periods  |
| `--radius`            | `0.25rem`           | Default border radius                    |

---

## Typography system

Implemented per [DESIGN.md § Typography](DESIGN.md). Key sizes:

| Context        | Font      | Size / Settings                              |
| -------------- | --------- | -------------------------------------------- |
| Hero h1        | Fraunces  | `clamp(3rem, 9vw, 8.5rem)`, opsz 144 wght 350, lh 0.95, ls -0.035em |
| Intro para     | Fraunces  | `clamp(1.35rem, 2.2vw, 1.85rem)`, opsz 32 wght 350, lh 1.4 |
| Section h2     | Fraunces  | `clamp(1.75rem, 3.5vw, 2.75rem)`, opsz 72 wght 400, lh 1.1, ls -0.02em |
| Contact CTA h2 | Fraunces  | `clamp(2.5rem, 6vw, 5rem)`, opsz 144 wght 350, lh 1.0, ls -0.035em |
| Body           | Inst Sans | 17px, 400, lh 1.5–1.7 |
| CTA labels     | Inst Sans | 13px, 500, ls -0.005em |
| Section labels | JB Mono   | 11px, 400, uppercase, ls +0.12em |

Variable font axes applied via `font-variation-settings: 'opsz' X, 'wght' Y`.

---

## Emphasis system

`<em>` inside h1/h2/h3 renders italic + `--color-accent` (red). Rule in `global.css`:

```css
h1 em, h2 em, h3 em {
  font-style: italic;
  color: var(--color-accent);
}
```

One `<em>` fragment per headline. See [DESIGN.md § Emphasis System](DESIGN.md) for rules.

---

## Utility classes (all in `global.css`)

| Class              | Description                                                             |
| ------------------ | ----------------------------------------------------------------------- |
| `.section-label`   | JetBrains Mono, 11px, uppercase, ink-3 — used for `01`, `02`, category names |
| `.btn-primary`     | Solid ink fill (`#0a0a0a`), white text, 13px Instrument Sans            |
| `.btn-secondary`   | Transparent bg, ink text, 1px `color-line` border                      |
| `.ao-tag`          | Pill tag — paper bg, mono 10px uppercase, line border                  |
| `.nav-link`        | JB Mono, 12px, uppercase, underline scale-x on hover (0.35s)           |
| `.animate-fade-up` | Opacity 0→1 + translateY 0.5em→0, 0.9s, `cubic-bezier(0.2, 0.8, 0.2, 1)`. Use `style="animation-delay: Xs"` |
| `.animate-pulse-dot` | Scale/opacity pulse loop, 2.4s ease-in-out. Used on nav logo dot     |
| `.stage-grid`      | Subtle 24px dot grid — used as demo container backgrounds               |
| `.stage-grid-lg`   | 40px grid + faint red radial gradient upper-left                        |
| `.section-wrap`    | `max-width: 1200px; margin: 0 auto; padding: clamp(5rem,10vw,9rem) clamp(1.25rem,4vw,2.5rem)` |
| `.section-border`  | `border-top: 1px solid var(--color-line)`                               |

---

## Homepage layout

Single long-scroll `/` page. First viewport is a locked frame:

1. **Header** (fixed overlay) — avatar + Phosphor socials on the left; About, Blog, and a **Contact me** button (`mailto:hello@andreortiz.com`) on the right. Avatar and About open the existing about modal (twenty-years intro + capability list). Do not add a standalone `/about` page.
2. **Hero** — small uppercase `ANDRE ORTIZ` + large rotating claim. First paint is **Product Experience Designer**. Existing carousel strings.
3. **Four project tiles** peek at the bottom of the viewport (tops visible so you know to scroll). Left to right: Design Systems, AI Chatbot, Scheduling, Finance. Tiles are links, not live widgets.

Hero stage is `min-height: calc(100dvh - peek)` so the claim stays large. Peek is ~10.5rem desktop, slightly less on smaller screens. Do not crush the hero to fit the tiles.

Project destinations are lightweight placeholder pages under `/work/...` — problem headline + short copy. Full interactive demos are a later pass; Design Systems is next. See [WORK.md](WORK.md).

---

## Animation

| Animation          | Duration | Easing                          | Purpose |
| ------------------ | -------- | ------------------------------- | ------- |
| `animate-fade-up`  | 0.9s     | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Hero entrance, staggered with `animation-delay` |
| `animate-pulse-dot`| 2.4s loop| `ease-in-out`                   | Logo dot — availability signal |
| `.nav-link` underline | 0.35s | `cubic-bezier(0.65, 0, 0.35, 1)` | Scale-x from left on hover |
| `.btn-primary .arrow` | 0.25s | `ease`                          | 3px translateX on hover |

---

## Placeholders to replace

| Placeholder | Location |
| ----------- | -------- |
| Blog content | `src/content/blog/` — existing posts are real; empty state is wired if the collection is empty |
