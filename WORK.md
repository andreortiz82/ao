# Work — Case Studies + Interactive Demos

Each project is a **written case study** (MDX + static imagery) with one or more **embedded interactive demos** (React islands). The page tells the story; the demo proves the thinking.

Cross-reference:

- [AO.md](AO.md) — identity, positioning, goals
- [CLAUDE.md](CLAUDE.md) — tech stack, file structure, embedding pattern
- [DESIGN.md](DESIGN.md) — visual language (in flux on `nu1`)

---

## Maintenance Protocol

Update this file when:

- A case study or demo is built, revised, or completed
- Work order, interactive scope, or repo mapping changes
- A demo moves to or from an external repo

---

## Principles

1. **Case study first.** Narrative, process, and outcomes are the frame. Demos are proof inside the frame — not a replacement for writing.
2. **One flagship interaction per project.** Depth over feature tours. Each demo should teach one domain concept brilliantly.
3. **Independent repos.** Each demo can live in its own GitHub repo and be integrated into this site when ready (see Integration below).
4. **Editorial quality.** Demos inherit portfolio tokens from `global.css`. No demo should look like a different product skin.

---

## Work order (homepage + case study nav)

Source of truth: `src/content/work/*.mdx` + `getWorkEntries()` in `src/lib/work.ts`.

---

## Interactive demos

| Slug | Demo concept | Island component (planned) | External repo |
| ---- | ------------ | -------------------------- | ------------- |
| `ai-chatbot` | User chats with the product and receives a scripted AI response — typing indicator, citations, confidence states | `ChatbotDemo.jsx` | TBD |
| `design-system` | User explores components and switches brand theme via Navigator Design System presets | `DesignSystemDemo.jsx` | TBD |
| `mobile-app` | Phone-frame simulation of the AI chat mobile experience — gestures, thread, input bar | `MobileChatDemo.jsx` | TBD |
| `financial-dashboard` | User adjusts budget sliders and asset allocations; charts update live | `FinancialDashboardDemo.jsx` | TBD |
| `responsive-web-design` | User resizes a container to see layout reflow across breakpoints | `ResponsiveResizeDemo.jsx` | TBD |
| `snyders-bbq` | Interactive online food ordering flow — menu, cart, checkout | `FoodOrderingDemo.jsx` | TBD |

Legacy components on `master` (reference only — not on `nu1`): `AIFileDemo.jsx`, `DesignSystemDemo.jsx`, `FinanceDemo.jsx`, `RestaurantDemo.jsx`. Salvage patterns where useful; do not port wholesale.

---

## Case study page structure

Current shell in `src/pages/work/[...slug].astro`:

```
Header (ContactBar + back)
├── Case metadata (tags, title, description, client/role/team/timeline)
├── Hero image
├── MDX body (narrative)
├── [Interactive demo section(s)]  ← embed via MDX or template slot
├── Process images (static)
├── Detail images (static)
├── Outcome callout
├── Final screens (static)
└── Prev / next navigation
```

**Embedding demos in MDX:**

```mdx
import ChatbotDemo from "../../components/demos/ChatbotDemo.jsx";

## Try it

<ChatbotDemo client:load />
```

Or add a `demo` frontmatter field on the work collection schema pointing to a component slug — template renders `<DemoFrame>` when set.

---

## Shared infrastructure (to build)

```
src/components/
├── DemoFrame.astro          # stage-grid container, optional label bar, consistent padding
└── demos/
    ├── ChatbotDemo.jsx
    ├── DesignSystemDemo.jsx
    ├── MobileChatDemo.jsx
    ├── FinancialDashboardDemo.jsx
    ├── ResponsiveResizeDemo.jsx
    └── FoodOrderingDemo.jsx
```

`DemoFrame.astro` wraps every island so demos feel native to the case study layout.

---

## Integration — independent repos

Each project demo may ship from its own repo. Integration options (pick per demo):

| Method | When to use |
| ------ | ----------- |
| **Vendored component** | Demo is stable; copy `Demo.jsx` + deps into `src/components/demos/` |
| **npm package** | Demo published as `@andreortiz/demo-chatbot` etc.; import in MDX |
| **Git submodule** | Active co-development; submodule under `demos/<slug>/` |
| **iframe embed** | Demo hosted separately with its own deploy URL |

Default for v1: **vendored component** — simplest Astro island path. Move to package or submodule when a demo outgrows the portfolio repo.

---

## Build order

| Phase | Deliverable | Status |
| ----- | ----------- | ------ |
| 1 | `DemoFrame.astro` + first demo (AI chatbot) | ✅ |
| 2 | **Design System** demo | ✅ |
| 3 | **Mobile AI Chat** simulation | ✅ |
| 4 | **Financial Dashboard** interactive charts/sliders | ✅ |
| 5 | **Responsive Web** resize container | ✅ |
| 6 | **Snyder's BBQ** food ordering flow | ✅ |
| 7 | Static process/final images per case study | ⬜ |
| 8 | Legacy route cleanup | ✅ |

---

## Status tracker

| Project | Case study copy | Static images | Interactive demo | Done |
| ------- | --------------- | ------------- | ---------------- | ---- |
| AI Chatbot | ✅ draft | ⬜ placeholders | ✅ `ChatbotDemo.jsx` | ⬜ |
| Design System | ✅ draft | ⬜ placeholders | ✅ `DesignSystemDemo.jsx` | ⬜ |
| Mobile App | ✅ draft | ⬜ placeholders | ✅ `MobileChatDemo.jsx` | ⬜ |
| Financial Dashboard | ✅ draft | ⬜ placeholders | ✅ `FinancialDashboardDemo.jsx` | ⬜ |
| Responsive Web | ✅ draft | ⬜ placeholders | ✅ `ResponsiveResizeDemo.jsx` | ⬜ |
| Snyder's BBQ | ✅ draft | ⬜ placeholders | ✅ `FoodOrderingDemo.jsx` | ⬜ |
| Shared infra (`DemoFrame`, schema) | — | — | ✅ `DemoFrame.astro` | ✅ |
