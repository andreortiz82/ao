# Work Examples — Build Plan

Interactive portfolio demonstrations. Each page is the proof of knowledge — not a case study describing work, but a working artifact that shows how Andre thinks in that domain.

## Original notes

```markdown
My work is not public so I will show traditional work samples. Instead, each work example will be an interactive, beautifully designed experience that demostrates my depth of knowledge in that area.

- **Work example 1: Design Systems**
  - Description
    - This example should demostate my knowledge of design systems for distributed teams
  - Topics to cover
    - Design tokens
    - Brands and themes
    - UI Kits and components
    - Atomic Design principals
    - NPM packages and distrbution
    - Working with dev teams
    - Figma to Code

- **Work example 2: Advanced Scheduling Workflows**
  - Description
    - This example should demonstrate my knowledge and experience with advanced scheduling workflows
  - Topics to cover
    - Scheduling for large organizations
    - Availability management
    - Scheduling windows
    - Calculated schedules
    - Scheduling workflows
    - Managing status

- **Work example 3: Financial tools**
  - Description
    - This example should demonstrate my knowledge and experience with financial products
  - Topics to cover
    - Creating budgets
    - Billing
    - Invoices
    - Accounts Payable / Receivable
    - Vendor management

- **Work example 4: AI tools**
  - Description
    - This example should demonstrate my knowledge and experience with AI chatbots
  - Topics to cover
    - Chat UIs
    - Adding context
    - AI Generated UI tools
    - Agent builder
    - Agent task creation (cron jobs)
```

Cross-reference:

- [AO.md](AO.md) — identity, positioning, goals this work serves
- [CLAUDE.md](CLAUDE.md) — tech stack, design tokens, component patterns
- [DESIGN.md](DESIGN.md) — visual language, typography, motion rules

---

## Maintenance Protocol

Update this file when:

- A work example page is built, revised, or completed — mark status and note decisions made
- New interactive components are added — document them here and in [CLAUDE.md](CLAUDE.md)
- The concept or narrative for an example changes

---

## Principles

1. **The page is the demo.** No screenshots of work. The interactive experience IS the work sample.
2. **Depth over breadth.** Better to show one concept brilliantly than cover every topic shallowly.
3. **Editorial quality throughout.** Every section gets the same typographic and layout care as the homepage. Use existing tokens, patterns, and motion system from [DESIGN.md](DESIGN.md).
4. **Teach, don't tell.** Each demo should make the viewer understand the domain better for having used it — not just impress.
5. **Startup-legible.** The primary audience is startups. Frame problems in terms of speed, scale, and product decisions — not process theater.

---

## Shared Infrastructure

New files needed before any individual example is built.

### New pages

```
src/pages/work/
├── index.astro              # Older collection index — not the homepage tile grid
├── design-systems.astro     # Placeholder (full demo is next)
├── ai-chatbot.astro
├── scheduling.astro
└── finance.astro
```

Homepage tiles link to those four routes. Shared copy lives in `src/data/projects.ts`. Placeholder layout: `src/layouts/ProjectPage.astro`.

### New layout + components

```
src/layouts/
└── WorkLayout.astro          # Extends Layout.astro — adds work-specific nav context

src/components/
├── WorkHero.astro            # Case hero: title, discipline tags, one-line hook
├── WorkSection.astro         # Narrative section wrapper with consistent padding + SectionHead
└── DemoFrame.astro           # Container for React island demos — stage-grid bg, label bar
```

## Nav

Homepage header: About (modal), Blog (`/blog`), Contact me. Tiles are the work entry points — no separate Work nav item.

### Work index page

Four cards in a 2×2 grid. Each card: index number, domain name, one-line hook, discipline tags. Matches the editorial language of the homepage. On mobile: single column.

---

## Work Example 1 — Design Systems

**URL:** `/work/design-systems`
**Status:** Placeholder page. Full interactive demo is next.

### Concept

A living, scrollable demonstration of how a design system is architected and maintained for distributed teams. The page itself is built using the system it describes — meta and intentional.

### Hook

> A design system isn't a component library. It's a contract between design and engineering, written in tokens, maintained in code, and felt in every screen.

### Page structure

| Section                | Format                                                             | Interactive?                                          |
| ---------------------- | ------------------------------------------------------------------ | ----------------------------------------------------- |
| Hero                   | Full-width, headline + discipline tags                             | No                                                    |
| 01 · Tokens            | Token explorer — color, type, spacing, radius                      | Yes — TokenExplorer                                   |
| 02 · Theming           | Live brand/theme switcher applied to a sample component            | Yes — ThemeSwitcher                                   |
| 03 · Atomic Design     | Layered diagram: atoms → molecules → organisms → templates         | Yes — AtomicExplorer                                  |
| 04 · Components        | Annotated component with variant states and props                  | Yes — ComponentAnatomy (extend AnatomyWidget pattern) |
| 05 · Figma to Code     | Side-by-side: Figma spec vs rendered component + token map         | Yes — FigmaCodeDiff                                   |
| 06 · Distribution      | NPM package concept — version history, changelog, install snippet  | Static — editorial                                    |
| 07 · Working with Devs | Handoff documentation fragment — specs, redlines, token references | Static — editorial                                    |
| Reflection             | 3–4 principles I've learned about running a design system          | Static — editorial                                    |

### React islands to build

**`TokenExplorer.tsx`**

- Tab or filter bar: Color / Typography / Spacing / Radius
- Color: swatches grid with token name, hex, and Tailwind class
- Typography: live type specimens with font, size, weight, tracking values
- Spacing: visual scale with px and rem values
- Radius: visual radius scale applied to a box
- All values pulled from the actual token system in `global.css`

**`ThemeSwitcher.tsx`**

- A sample card component (header + body + CTA)
- 2–3 "brand" presets that remap tokens: default (red), a cool blue brand, a warm amber brand
- Toggle between brands — card updates live
- Shows how a token-based system enables multi-brand without component changes

**`AtomicExplorer.tsx`**

- Five levels: Atom, Molecule, Organism, Template, Page
- Click to expand each level — reveals example components that compose upward
- Visual hierarchy with connecting lines
- Reinforces that complexity is managed through composition, not customization

**`FigmaCodeDiff.tsx`**

- Two-panel: left = stylized Figma spec (annotation overlay on component), right = rendered React component
- Hotspot annotations on both sides pointing to the same design decision
- Toggle to highlight token usage (shows `--color-accent` etc. mapped to both sides)

### Design notes

- TokenExplorer should use `.stage-grid` background
- ThemeSwitcher is the hero interactive moment — put it early, make it visceral
- The page is the most meta of the four — lean into that in the narrative copy

---

## Work Example 2 — Advanced Scheduling Workflows

**URL:** `/work/scheduling`
**Status:** Placeholder page. Full interactive demo not started.

### Concept

Scheduling at organizational scale is one of the hardest UX problems — it's constrained optimization made human. This page walks through the problem space and demonstrates the design thinking behind it through interactive artifacts.

### Hook

> Scheduling for one person is a calendar. Scheduling for an organization is a product problem — with rules, conflicts, states, and consequences.

### Page structure

| Section                   | Format                                                             | Interactive?               |
| ------------------------- | ------------------------------------------------------------------ | -------------------------- |
| Hero                      | Headline + framing of the domain complexity                        | No                         |
| 01 · The Problem          | Complexity map — why scheduling at scale breaks naive solutions    | Static — annotated diagram |
| 02 · Availability         | Multi-user availability grid — visual overlap and gap detection    | Yes — AvailabilityGrid     |
| 03 · Scheduling Windows   | Window configurator — define a rule, see it applied to a timeline  | Yes — WindowConfigurator   |
| 04 · Calculated Schedules | Input parameters → generated schedule output with conflict flags   | Yes — ScheduleCalculator   |
| 05 · Workflows & Status   | State machine diagram — a scheduling request through its lifecycle | Yes — WorkflowDiagram      |
| 06 · Managing at Scale    | Bulk actions UI — filter, select, action pattern for large lists   | Yes — BulkScheduler        |
| Reflection                | What I've learned about the human side of scheduling systems       | Static — editorial         |

### React islands to build

**`AvailabilityGrid.tsx`**

- Grid of time slots (rows) × people (columns)
- Click to toggle availability per person per slot
- Live overlap highlighting: green = all available, yellow = partial, red = conflict
- Summary bar below: "3/5 available for this window"

**`WindowConfigurator.tsx`**

- Form inputs: start date, end date, excluded days, time range, buffer minutes
- Live timeline preview that updates as rules are set
- Shows valid booking slots as highlighted segments on the timeline
- A "why is this slot unavailable?" tooltip on blocked segments

**`ScheduleCalculator.tsx`**

- Input panel: number of appointments, duration, staff count, operating hours
- Output: a generated weekly schedule grid
- Conflict indicator if inputs are impossible (e.g., not enough capacity)
- Shows how constraints produce a calculated, not manual, schedule

**`WorkflowDiagram.tsx`**

- A status state machine rendered as a connected node diagram
- States: Draft → Requested → Confirmed → Completed / Cancelled / Rescheduled
- Click a state to see: allowed actions, who can trigger them, what notifications fire
- Animated transition arrows on state change

### Design notes

- AvailabilityGrid is the most visceral demo — lead with it in the page flow
- Use a muted grid aesthetic for the timeline/calendar elements — not colorful, clinical
- Reinforce that the domain is complex but the UX should feel inevitable, not complicated

---

## Work Example 3 — Financial Tools

**URL:** `/work/finance`
**Status:** Placeholder page. Full interactive demo not started.

### Concept

Financial product UX is about reducing anxiety and creating clarity in high-stakes decisions. Every number needs context; every action needs confidence. This page demonstrates the design thinking behind financial interfaces.

### Hook

> Money is emotional. Financial product design is the work of making complex numbers feel legible, actions feel safe, and decisions feel confident.

### Page structure

| Section                | Format                                                                   | Interactive?         |
| ---------------------- | ------------------------------------------------------------------------ | -------------------- |
| Hero                   | Headline + framing of financial UX as a clarity problem                  | No                   |
| 01 · Budget Builder    | Interactive budget with categories, live totals, and variance indicators | Yes — BudgetBuilder  |
| 02 · Invoice           | A complete invoice with line items, tax, and status states               | Yes — InvoicePreview |
| 03 · AP / AR Dashboard | Visual summary of payables and receivables with aging buckets            | Yes — ARDashboard    |
| 04 · Vendor Management | Filterable vendor table — status, terms, outstanding balance             | Yes — VendorTable    |
| 05 · Billing Flow      | Step-through payment confirmation flow — 3 screens                       | Yes — BillingFlow    |
| Reflection             | Principles for designing financial interfaces                            | Static — editorial   |

### React islands to build

**`BudgetBuilder.tsx`**

- Category rows with label, planned amount, actual amount
- Add / remove rows
- Live variance column: over/under with color coding (green / red)
- Total row at bottom with a donut chart showing allocation
- An "alert" state when total exceeds a defined limit

**`InvoicePreview.tsx`**

- Editable invoice template: line items, quantity, rate, subtotal
- Auto-calculated tax and total
- Status badge: Draft / Sent / Paid / Overdue — each with distinct visual treatment
- "Mark as paid" action with a satisfying state change animation
- Print/download hint (no actual download needed)

**`ARDashboard.tsx`**

- Two-panel: Accounts Payable (what you owe) / Accounts Receivable (what you're owed)
- Aging buckets: Current / 1–30 days / 31–60 days / 60+ days
- Visual bar per bucket — wider = more exposure
- Click a bucket to see a list of the items in it

**`VendorTable.tsx`**

- Filterable by status (Active / Inactive / Pending)
- Sortable columns: vendor name, terms, last payment, outstanding balance
- Row expansion: shows contact, payment history summary, notes field
- Bulk action bar appears on multi-select

**`BillingFlow.tsx`**

- Three-step flow: Review → Confirm → Done
- Step 1: Order summary with editable quantity
- Step 2: Payment method selector (card / ACH / wire) with security copy
- Step 3: Confirmation with transaction ID and next steps
- Animated step transitions, clear back/forward navigation

### Design notes

- Use more structured, data-dense layouts here than other examples — financial contexts expect it
- Variance indicators (red/green) are the one place where color-coding beyond the accent is justified
- The BillingFlow should be the most polished piece — it's highest stakes UX

---

## Work Example 4 — AI Tools

**URL:** `/work/ai-chatbot`
**Status:** Placeholder page. Full interactive demo not started.

### Concept

The most forward-facing example. Not about AI as a feature — about AI as a product design problem. How do you design for non-deterministic output? How do you give users control over context, agents, and tasks? This page demonstrates the thinking behind AI product UX.

### Hook

> Designing for AI isn't about making chatbots look good. It's about designing for uncertainty, trust, and control — in interfaces where the output is never quite predictable.

### Page structure

| Section                 | Format                                                            | Interactive?        |
| ----------------------- | ----------------------------------------------------------------- | ------------------- |
| Hero                    | Headline + framing of AI UX as a trust and control problem        | No                  |
| 01 · Chat UI            | Fully interactive chat interface with scripted demo responses     | Yes — ChatInterface |
| 02 · Context Management | Panel showing how context shapes AI behavior                      | Yes — ContextPanel  |
| 03 · AI-Generated UI    | Prompt input → rendered UI component output                       | Yes — UIGenerator   |
| 04 · Agent Builder      | Visual agent configuration: name, tools, instructions, persona    | Yes — AgentBuilder  |
| 05 · Agent Tasks        | Cron-style task scheduler for agent actions                       | Yes — TaskScheduler |
| Reflection              | How I think about trust, transparency, and control in AI products | Static — editorial  |

### React islands to build

**`ChatInterface.tsx`**

- Full chat UI: message thread, input bar, send button
- Scripted response tree — user types a message, picks from suggested prompts or freeform, gets pre-written AI responses that feel real
- Typing indicator (animated dots) before each response
- Message actions: copy, regenerate, thumbs up/down
- Conversation history sidebar (collapsible)
- Model/persona selector in the header

**`ContextPanel.tsx`**

- A split view: left = chat, right = context panel
- Context panel shows active context items: attached files, system instructions, memory snippets
- Add/remove context items — chat response preview updates to reflect them
- Visual diff between "with context" and "without context" response

**`UIGenerator.tsx`**

- Text input: describe a UI component
- 3–4 pre-wired prompts ("a login form", "a data table with filters", "an empty state")
- Selecting/submitting shows an animated "generating..." state then renders a polished component
- "Show the reasoning" toggle — reveals annotated design decisions behind the generated output
- Not actually calling an API — pre-built outputs that look AI-generated and are annotated

**`AgentBuilder.tsx`**

- Step-by-step agent configuration:
  1. Identity: name, avatar, description
  2. Instructions: system prompt editor with token counter
  3. Tools: toggle on/off (web search, code interpreter, file access, etc.)
  4. Persona: tone selector (professional / casual / concise)
- Live preview card that updates as config changes
- "Deploy" button → shows a satisfying confirmation + code snippet for API call

**`TaskScheduler.tsx`**

- Create recurring agent tasks: name, schedule (cron expression with human-readable translation), trigger condition, action
- A human-friendly cron builder: "Every Monday at 9am" → `0 9 * * 1`
- Task list with status (Active / Paused / Last run / Next run)
- Pause/resume/delete actions
- Log view for a selected task showing last N runs with output summaries

### Design notes

- ChatInterface should feel production-quality — this is the highest-visibility demo for startup audiences
- Use a slightly darker surface (e.g., `--color-paper`) for the chat window to distinguish it from the page
- UIGenerator is the most "wow" moment — invest heavily in the generated components and their annotations
- AgentBuilder should feel like a real product, not a toy — copy and interaction quality are everything here

---

## Build Order

Homepage frame first — then the four examples, one at a time. The old seven-section treatise per example is the destination, not the current pass.

| Phase | Deliverable | Rationale |
| ----- | ----------- | --------- |
| 0 | **Homepage frame** — header, rotating claim, four peeking tiles, About modal, Contact me, `/blog`, four placeholder project routes | Locked 2026-08-26. Done when the wireframe is honest and buildable. |
| 1 | **Design Systems** full interactive page | Next. Most directly relevant to systems-lead positioning. |
| 2 | **AI Chatbot** | Highest signal for startup audience |
| 3 | **Scheduling** | Complex product thinking |
| 4 | **Finance** | Domain range and data-dense UI |

---

## Status Tracker

| Example | Route | Homepage tile | Placeholder page | Full interactive demo |
| ------- | ----- | ------------- | ---------------- | --------------------- |
| Homepage frame | `/` | — | — | ✅ |
| Design Systems | `/work/design-systems` | ✅ | ✅ | Next |
| AI Chatbot | `/work/ai-chatbot` | ✅ | ✅ | Not started |
| Scheduling | `/work/scheduling` | ✅ | ✅ | Not started |
| Finance | `/work/finance` | ✅ | ✅ | Not started |

Demo React islands already exist under `src/components/demos/` from an earlier case-study pass. They are **not** mounted on the homepage tiles or on these four placeholder routes. Do not treat those older MDX case studies (`src/content/work/`) as the homepage destinations.
