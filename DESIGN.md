# Design System — Portfolio

The visual language for Andre Ortiz's portfolio. A minimalist editorial identity: white surface, black ink, one accent color, typographic contrast as the primary expressive tool.

Cross-reference:
- [AO.md](AO.md) — brand voice, positioning, and the personal identity this system expresses
- [CLAUDE.md](CLAUDE.md) — token names, CSS implementation, component file locations

---

## Maintenance Protocol

See [CLAUDE.md § Maintenance Protocol](CLAUDE.md) for the full rule set. Short version:
- Update this file when a visual, typographic, spacing, or motion decision changes.
- Update [CLAUDE.md](CLAUDE.md) when the codebase changes.
- Update [AO.md](AO.md) when identity or messaging changes.
- Never duplicate information across files — cross-reference instead.

---

## Aesthetic

**Restrained confidence.** No gradients, no illustrations, no stock photography. The work speaks; the container steps back. Every choice earns its presence — if it doesn't serve hierarchy or readability, it doesn't ship.

The overall register is print editorial — close to a well-designed annual report or book — executed as a web experience. It reflects who Andre is: someone who thinks in systems, ships real things, and doesn't over-explain. See [AO.md § Differentiators](AO.md) for how this maps to his professional identity.

---

## Color

Tokens are defined in `src/styles/global.css`. See [CLAUDE.md § Design tokens](CLAUDE.md) for the full token table and Tailwind class mapping.

| Role | Token | Hex / Value |
|---|---|---|
| Page surface | `--color-background` | `#ffffff` |
| Widget / card surface | `--color-paper` | `#fafafa` |
| Primary text | `--color-ink` | `#0a0a0a` |
| Secondary text | `--color-ink-2` | `#404040` |
| Tertiary / metadata | `--color-ink-3` | `#737373` |
| Divider / border | `--color-line` | `rgba(0,0,0,0.08)` |
| Subtle inner divider | `--color-line-soft` | `rgba(0,0,0,0.04)` |
| Accent | `--color-accent` | `#dc2626` |
| Accent tint | `--color-accent-soft` | `#fef2f2` |
| Text selection | `--color-highlight` | `#fee2e2` |

**Rules:**
- The accent (`#dc2626`) is used sparingly: italic emphasis in headlines, active UI states (nav underline, tab indicator, hotspot markers), the nav logo dot. Never as a background fill on large surfaces.
- Text always reads against white. No dark mode implemented.
- Borders and dividers use opacity-based values so they remain legible against any slightly-tinted surface without needing variant tokens.

---

## Typography

Three typefaces with clearly separated roles. Mixing them without a role reason is an error.

### Fraunces — Display serif
- **Use:** Hero headline, section headings, section sub-quotes, footer CTA, card titles in v04/v05 iterations.
- **Style:** Variable font. Axes used: `opsz` (optical size) and `wght` (weight).
- **Key settings:**
  - Hero h1: `opsz 144, wght 350` — extremely large, optically compensated, hairline-light
  - Section h2: `opsz 72, wght 400`
  - Card titles: `opsz 48, wght 450`
  - Intro paragraph: `opsz 32, wght 350`
- **Italic:** Fraunces' italic is narrow and expressive. Used for accent emphasis (see Emphasis System below). The italic form is narrow enough to read as a gesture, not a typeface change.
- **Tracking:** Negative at all display sizes (`-0.035em` at hero, `-0.02em` at section heads). Tight tracking reinforces the editorial voice.
- **Line height:** `0.95`–`1.1` at display sizes.

### Instrument Sans — Body
- **Use:** Body copy, descriptions, CTA labels, nav (paired with mono), UI text inside widgets.
- **Weights:** 400 (body), 500 (medium emphasis), 600 (strong labels).
- **Base size:** `17px` body, `14–14.5px` card descriptions, `13px` CTAs.
- **Line height:** `1.5` base, `1.55–1.6` for longer passages.

### JetBrains Mono — Metadata
- **Use:** Section index numbers (`01`, `02`…), tag labels, footer metadata grid, nav links, hotspot specs, commit labels in widgets.
- **Weight:** 400 (default), 500 (accent labels).
- **Size:** Always small — `10px`–`12px`.
- **Tracking:** `+0.08em`–`+0.14em` depending on size (smaller text needs more tracking).
- **Transform:** `uppercase` everywhere it's used as a label.

---

## Emphasis System — Italics

Italicized `<em>` fragments inside headings render in `--color-accent`. This is the primary expressive mechanism. Not decorative — each italic fragment is a deliberate semantic gesture, marking the conceptually weighted word in a sentence.

For implementation details see [CLAUDE.md § Italic + accent emphasis system](CLAUDE.md).

**Examples from the codebase:**
- *"Ship, then sharpen. Every pass has intent."* → "sharpen" is italic + red
- *"The same craft scales in different shapes."* → "in different shapes" is italic + red
- *"The decisions behind the pixels."* → "behind the pixels" is italic + red
- *"Twenty years of designing software that moves the needle."* → "that moves the needle." is italic + red

**Rules:**
- One italic fragment per headline. Don't double-italicize.
- The fragment should be the clause that carries the most semantic surprise or weight.
- Never use `<strong>` or bold in display headings — it competes with the serif weight and flattens rhythm.

---

## Spacing & Layout

**Edge padding:** `clamp(1.25rem, 4vw, 2.5rem)` — fluid, narrows on mobile, wider on large screens. Applied consistently via a CSS custom property pattern (`--edge`). See [CLAUDE.md § Responsive edge padding pattern](CLAUDE.md).

**Vertical rhythm:** `clamp(5rem, 10vw, 9rem)` per section. Large breathing room between sections is intentional — it communicates confidence.

**Reading measure:** Intro paragraph and card descriptions are constrained to `~32–34ch`. Wider than necessary kills the eye's return line.

**Grid patterns:**
- Section heads use a `1fr 2fr` grid: narrow label column, wider title column.
- Scope widget content uses a `1.2fr 1fr` split: long-form quote left, data rows right.
- These grids collapse to single-column below `860px` / `max-md`.

---

## Motion

Motion is purposeful. No decorative animations. Every transition has a reason.

| Animation | Duration | Easing | Purpose |
|---|---|---|---|
| Hero word stagger (`animate-fade-up`) | 900ms per word, staggered 0.1s increments | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Reveals the headline progressively, making it feel spoken |
| Nav logo dot (`animate-pulse-dot`) | 2.4s loop | `ease-in-out` | Signals availability / "live" status |
| Widget crossfade (IterationWidget) | 180ms | — | Fast enough to feel responsive, slow enough to register |
| Tab underline (ScopeWidget) | 450ms | `cubic-bezier(0.65, 0, 0.35, 1)` | Ease-in-out with cubic tension — the underline slides, not snaps |
| CTA arrow hover translate | 250ms | `ease` | 3px translateX — felt before seen |
| Nav link underline extend | 350ms | `cubic-bezier(0.65, 0, 0.35, 1)` | Scale origin-left slide |
| AnatomyWidget panel transition | 300ms | — | Opacity + 8px translateY for panel swap |

**General rules:**
- Nothing animates on page load except the hero stagger and the logo dot.
- Hover transitions are fast (200–350ms). Entrance transitions are slower (450–900ms).
- Prefer `opacity` + `transform` — compositor-safe, no layout thrash.

For CSS class definitions see [CLAUDE.md § Animation utilities](CLAUDE.md).

---

## Component Anatomy Decisions

The `AnatomyWidget` documents these inline (see `src/components/AnatomyWidget.tsx`), but the reasoning is captured here as the design record.

**Eyebrow / tag:** Mono type inside a serif card creates a voice change. It signals "this word is metadata, not content," allowing the title to land without hierarchy competition.

**Italic headline emphasis:** The italic word shifts emphasis without boldface. Fraunces' italic is narrow enough to read as a gesture.

**Body copy length:** ~32ch measure target. Wide enough to feel generous; narrow enough that the eye never hunts for the next line. Color is `ink-2` (not full black) to keep the title dominant.

**CTA button:** Solid ink fill, not accent. The CTA should feel inevitable, not urgent. Arrow glyph has 0.5rem gap and a 3px translateX on hover — a gesture small enough that it's felt before it's consciously seen.

---

## Widget Design Patterns

The three React islands follow a shared visual grammar. See [CLAUDE.md § Project structure](CLAUDE.md) for file locations.

- **Container:** `bg-paper border border-line rounded-[3px]` — sits slightly off-white from the page, bordered with near-invisible line.
- **Stage area:** uses `.stage-grid` or `.stage-grid-lg` for the subtle grid pattern behind the component preview. Fade masks at top/bottom edges.
- **Control bar:** `border-t border-line bg-paper px-8 py-6` — separated from stage by a line.
- **Active state:** `bg-ink text-paper` (dark fill) for active buttons/tabs; `text-accent italic` for active tab labels in ScopeWidget.
- **Accent underline indicator:** 2px `bg-accent` bar that scale-x transitions from 0→1 on active state.

---

## Typography Scale Reference

| Context | Font | Size | Weight / Settings | Leading | Tracking |
|---|---|---|---|---|---|
| Hero h1 | Fraunces | clamp(3rem, 9vw, 8.5rem) | opsz 144, wght 350 | 0.95 | -0.035em |
| Intro paragraph | Fraunces | clamp(1.35rem, 2.2vw, 1.85rem) | opsz 32, wght 350 | 1.4 | -0.01em |
| Section h2 | Fraunces | clamp(1.75rem, 3.5vw, 2.75rem) | opsz 72, wght 400 | 1.1 | -0.02em |
| Footer CTA | Fraunces | clamp(2.5rem, 6vw, 5rem) | opsz 144, wght 350 | 1.0 | -0.035em |
| Card title (final) | Fraunces | 28px | opsz 48, wght 450 | 1.1 | -0.025em |
| Anatomy panel h4 | Fraunces | 1.5rem | opsz 36, wght 450 | 1.2 | -0.02em |
| Body / base | Instrument Sans | 17px | 400 | 1.5 | — |
| Card description | Instrument Sans | 14–14.5px | 400 | 1.6 | — |
| CTA label | Instrument Sans | 13px | 500 | — | -0.005em |
| Nav links | JetBrains Mono | 12px | 400, uppercase | — | +0.08em |
| Section index | JetBrains Mono | 11px | 400, uppercase | — | +0.12em |
| Tag / eyebrow | JetBrains Mono | 10px | 500, uppercase | — | +0.14em |
| Footer meta | JetBrains Mono | 11px | 400, uppercase | — | +0.08em |
