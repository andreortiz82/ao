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

All content is on a single long-scroll `/` page. Section pattern for demos:

```
Section head: 1fr / 2fr grid
  [col 1] section-label (index number + category)
  [col 2] h2 with <em> emphasis + description paragraph
Demo component (full width below)
```

Collapses to single column below `md` breakpoint (`768px`).

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
| `#github` `#linkedin` `#dribbble` `#youtube` `#instagram` | Footer social links + Contact section icons in `index.astro` |
| Blog content | `src/content/blog/` — no posts written yet |
