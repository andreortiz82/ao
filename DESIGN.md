# Design System — Portfolio

This document records the visual language that is implemented in the
portfolio. Project-specific content and interaction plans live in `WORK.md`;
technical implementation rules live in `AGENT.md`.

## Direction

The portfolio is restrained editorial: white space, strong type, quiet
structure, and one deliberate accent. The work should feel more like a clear
design argument than a gallery of decoration.

The portfolio chrome stays neutral. The Design Systems demo has its own
interactive light/dark and multi-brand themes inside the demo surface; those
themes do not restyle the site chrome.

## Color

Tokens are defined in `src/styles/global.css`.

| Role | Token | Value |
| --- | --- | --- |
| Page surface | `--color-background` | `#ffffff` |
| Card/widget surface | `--color-paper` | `#fafafa` |
| Homepage stage | `--color-stage` | `#ececec` |
| Primary ink | `--color-ink` | `#0a0a0a` |
| Secondary ink | `--color-ink-2` | `#404040` |
| Metadata ink | `--color-ink-3` | `#737373` |
| Divider | `--color-line` | `rgba(0, 0, 0, 0.08)` |
| Soft divider | `--color-line-soft` | `rgba(0, 0, 0, 0.04)` |
| Accent | `--color-accent` | `#dc2626` |
| Accent tint | `--color-accent-soft` | `#fef2f2` |
| Selection | `--color-highlight` | `#fee2e2` |

Red is reserved for italic headline emphasis, selected states, markers, and
the small logo dot. It is not a large background treatment.

Subtle gradients are allowed only where they support a stage, grid, or content
surface. They are not the portfolio identity.

## Typography

- Fraunces: hero and section display type; variable `opsz` and `wght` axes
- Instrument Sans: body copy, card titles, UI, and calls to action
- JetBrains Mono: navigation, labels, tags, indexes, and metadata

Key implemented settings:

- Hero: `clamp(3rem, 10vw, 8rem)`, Fraunces, optical size 144, weight 350,
  line-height `.95`, tracking `-.035em`
- Body: Instrument Sans, `17px`, line-height `1.5`
- Homepage card title: Instrument Sans, `15px`, weight 500
- Section labels: JetBrains Mono, uppercase, `11px`, tracking `.12em`

Italic `<em>` fragments inside headings are red and are used for one deliberate
semantic emphasis per headline.

## Layout

- Edge padding: `clamp(1.25rem, 4vw, 2.5rem)`
- Homepage hero keeps the first viewport tall and lets the four work cards peek
  below it.
- Work cards use a borderless grey `5 / 4` stage with an abstract UI specimen,
  title, and mono metadata.
- Cards are four columns on large screens, two below `860px`, and one below
  `560px`.
- Inner pages use readable measures and generous vertical spacing.

## Motion

Motion communicates hierarchy or state:

- Hero role rotation: 300ms opacity crossfade, with reduced-motion support
- Project card hover: 4px lift and restrained shadow
- Navigation underline: 350ms scale from the left
- Logo dot: 2.4s availability pulse
- Design Systems story: GSAP chapter reveals, active chapter tracking, and
  desktop-only pinned/scrubbed sections

All motion must respect `prefers-reduced-motion`. Prefer opacity and transforms
over layout-changing animation.
