# Design System — Portfolio

This document records the visual language that is implemented in the
portfolio. Project-specific content and interaction plans live in `WORK.md`;
technical implementation rules live in `AGENT.md`.

## Direction

Inner pages stay restrained editorial: white space, strong type, quiet
structure, and one deliberate accent. The work should feel more like a clear
design argument than a gallery of decoration.

The homepage is a dark high-contrast field: a large statement hero and four
color-block product tiles. That field remaps the shared chrome tokens rather
than inventing a second palette. The portfolio chrome stays otherwise
neutral. The Design Systems demo has its own interactive light/dark and
multi-brand themes inside the demo surface; those themes do not restyle the
site chrome.

## Color

Tokens are defined in `src/styles/global.css`.

Default (inner pages):

| Role | Token | Value |
| --- | --- | --- |
| Page surface | `--color-background` | `#ffffff` |
| Card/widget surface | `--color-paper` | `#fafafa` |
| Neutral stage | `--color-stage` | `#ececec` |
| Primary ink | `--color-ink` | `#0a0a0a` |
| Secondary ink | `--color-ink-2` | `#404040` |
| Metadata ink | `--color-ink-3` | `#737373` |
| Divider | `--color-line` | `rgba(0, 0, 0, 0.08)` |
| Soft divider | `--color-line-soft` | `rgba(0, 0, 0, 0.04)` |
| Accent | `--color-accent` | `#dc2626` |
| Accent tint | `--color-accent-soft` | `#fef2f2` |
| Selection | `--color-highlight` | `#fee2e2` |
| CTA fill | `--color-cta` | `#0a0a0a` |
| CTA ink | `--color-cta-ink` | `#ffffff` |

Homepage (`.theme-home` remaps chrome tokens):

| Role | Token | Value |
| --- | --- | --- |
| Page surface | `--color-background` | `#050505` |
| Card/widget surface | `--color-paper` | `#111111` |
| Primary ink | `--color-ink` | `#f3efe8` |
| Secondary ink | `--color-ink-2` | `#c8c2b8` |
| Metadata ink | `--color-ink-3` | `#8a857c` |
| Divider | `--color-line` | `rgba(243, 239, 232, 0.12)` |
| Selection | `--color-highlight` | `#3a1515` |
| CTA fill | `--color-cta` | `#f3efe8` |
| CTA ink | `--color-cta-ink` | `#0a0a0a` |

Homepage tile stages (quiet field + one accent family, not a rainbow):

| Tile | Token | Value |
| --- | --- | --- |
| Design Systems | `--color-stage-sage` | `#7f8f74` |
| Scheduling | `--color-stage-terracotta` | `#c06b4a` |
| AI Chatbot | `--color-stage-blue` | `#3e5c7a` |
| Finance | `--color-stage-brown` | `#3c2a22` |

Red remains reserved for italic headline emphasis, selected states, markers,
and the small logo dot. It is not a large background treatment and is not
used as multi-keyword hero color.

Subtle gradients are allowed only where they support a stage, grid, or content
surface. They are not the portfolio identity.

## Typography

- Fraunces: hero and section display type; variable `opsz` and `wght` axes
- Instrument Sans: body copy, card titles, outcome lines, UI, and calls to action
- JetBrains Mono: navigation, labels, tags, indexes, and metadata

Key implemented settings:

- Homepage statement: `clamp(2.15rem, 5.4vw, 4.35rem)`, Fraunces, optical size
  144, weight 350, line-height `1.05`, tracking `-.03em`
- Homepage lede: Instrument Sans, `clamp(0.95rem, 1.4vw, 1.125rem)`
- Body: Instrument Sans, `17px`, line-height `1.5`
- Homepage card title: Instrument Sans, `1.15rem`, weight 600
- Homepage outcome line: Instrument Sans, `0.95rem`
- Section labels: JetBrains Mono, uppercase, `11px`, tracking `.12em`

Italic `<em>` fragments inside headings are red and are used for one deliberate
semantic emphasis per headline. The homepage statement does not use colored
italic accents.

## Layout

- Edge padding: `clamp(1.25rem, 4vw, 2.5rem)`
- Homepage hero keeps the first viewport tall and lets the work tiles peek
  below it.
- Work tiles are two columns on large screens and one below `700px`.
- Each tile is a sharp color-block stage (`5 / 4`) with a static product UI
  mock, then a title and one concrete outcome line. Tiles link to `/work/*`.
- Inner pages use readable measures and generous vertical spacing.

## Motion

Motion communicates hierarchy or state:

- Homepage spotlight: hovered or focused tile stays at full opacity; siblings
  dim to `0.28`. No custom cursor and no difference blend.
- Navigation underline: 350ms scale from the left
- Logo dot: 2.4s availability pulse
- Design Systems story: GSAP chapter reveals, active chapter tracking, and
  desktop-only pinned/scrubbed sections

All motion must respect `prefers-reduced-motion`. Prefer opacity and transforms
over layout-changing animation.
