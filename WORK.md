# Portfolio Work

This document defines the four interactive portfolio examples. Each project
should state a meaningful product problem and end in a usable interactive
solution. The portfolio is the proof; it is not a museum of screenshots.

Implementation conventions belong in `AGENT.md`. Shared visual rules belong in
`DESIGN.md`. This file contains project intent, content, interaction, imagery,
and status.

## Shared portfolio rules

- Product examples come before process theater.
- Each page teaches the viewer something by letting them use the artifact.
- The writing should be startup-legible: speed, scale, tradeoffs, and outcomes.
- Placeholder copy is acceptable during implementation, but placeholder pages
  should not be treated as finished examples.
- Imagery should explain the product concept, not decorate an empty page.
- Every interactive element needs a clear state, feedback, and reduced-motion
  behavior.

## Project index

| # | Title | Route | Status |
| --- | --- | --- | --- |
| 01 | Design Systems | `/work/design-systems` | Full interactive story |
| 02 | AI Chatbot | `/work/ai-chatbot` | Placeholder |
| 03 | Scheduling | `/work/scheduling` | Placeholder |
| 04 | Finance | `/work/finance` | Placeholder |

Homepage tiles use the same order and link directly to these four routes.

---

## 01 — Design Systems

**Route:** `/work/design-systems`

**Title:** Design Systems

**Short description:** Tokens, themes, and the contract between design and
engineering.

**Hook:** From a few hexes to a system a team can ship.

**Audience signal:** Demonstrates design-system leadership for distributed
teams: translating visual decisions into reusable foundations, components,
governance, and a system engineers can actually use.

### Problem

Teams often begin with isolated Figma colors and component decisions. Without
shared semantic names, type roles, interaction rules, and contribution
practices, the system fragments across products and brands.

### Solution

A scrollable fictional Lumen product story that moves from raw design
decisions to a usable mini system. The viewer can inspect tokens, switch modes
and brands, assemble primitives, compare practices, and operate the final
explorer.

### Page sections

1. **Hero** — frame the move from one-off decisions to a shippable system.
2. **01 Origin** — stylized Figma canvas and the reason raw hexes break.
3. **02 Tokens** — primitive ramps mapped to semantic jobs, shown as CSS and
   JavaScript representations.
4. **03 Themes** — light and dark modes restyled in place with contrast pairs.
5. **04 Type** — display, body, and metadata roles with a live type scale.
6. **05 Icons** — icon size, weight, alignment, and usage guidance.
7. **06 Brands** — Lumen, Harbor, and Cinder using the same components with
   different token mappings.
8. **07 Atomic** — atoms assembled into a molecule and then a toolbar organism.
9. **08 Practice** — contrast, spacing, icon, button, and token do/don't pairs.
10. **09 Govern** — contribution request flow and changelog.
11. **10 Explorer** — a usable mini system combining tokens, brand, mode, and
    a composed organism.

### Topics

Design tokens, semantic versus primitive values, CSS custom properties,
JavaScript tokens, themes, contrast, typography roles, iconography, multi-brand
systems, atomic design, contribution governance, Figma-to-code, and
design/engineering collaboration.

### Imagery recommendations

Use diagrams and specimens rather than stock photography: Figma-like origin
panels, token ramps, type specimens, icon grids, brand swatches, and composed
UI surfaces. Keep imagery inside the demo so it demonstrates the system.

### Interactive components

Origin canvas, token mapping inspector, light/dark switcher, type-scale
specimen, icon guidance panel, multi-brand remapper, atomic assembly, practice
comparisons, governance flow, changelog, and final system explorer.

### Design and content notes

The page should feel like a guided explanation that becomes a tool. Keep the
portfolio chrome neutral; demo themes belong inside the story. Use concrete
language about decisions and tradeoffs rather than generic design-system
claims.

### Current implementation status

Complete interactive story. The route is implemented with the ten sections
above, including GSAP chapter motion, desktop pin/scrub behavior, reduced-motion
handling, and the final explorer.

---

## 02 — AI Chatbot

**Route:** `/work/ai-chatbot`

**Title:** AI Chatbot

**Short description:** Trust, context, and control when the output is not
predictable.

**Hook:** Designing for AI is not about making chatbots look good. It is about
trust and control.

**Audience signal:** Demonstrates product thinking for non-deterministic
interfaces: provenance, context, human oversight, agent configuration, and
clear recovery from uncertainty.

### Problem

AI output changes with context and is not guaranteed to be correct. A polished
chat surface is insufficient if users cannot understand what influenced an
answer, correct the system, or control what happens next.

### Solution

A scripted but believable AI workspace where the viewer can use a chat, change
context, generate interface output, configure an agent, and schedule agent
tasks. The artifact should make trust and control visible rather than merely
describing them.

### Page sections

1. **Hero** — frame AI as an uncertainty, trust, and control problem.
2. **01 Chat UI** — production-quality conversation with suggested prompts,
   model selection, history, response actions, and typing state.
3. **02 Context Management** — add and remove files, instructions, and memory;
   compare responses with and without context.
4. **03 AI-Generated UI** — choose a prompt, watch a short generation state,
   inspect the rendered component, and reveal design reasoning.
5. **04 Agent Builder** — configure identity, instructions, tools, and persona
   with a live preview.
6. **05 Agent Tasks** — create recurring tasks with human-readable schedules,
   status, and run history.
7. **Reflection** — principles for trust, transparency, and user control.

### Topics

Chat interfaces, context windows, provenance, prompt boundaries, generated UI,
human-in-the-loop controls, agent configuration, task scheduling, uncertainty,
failure recovery, and trust-building language.

### Imagery recommendations

Use interface states as the imagery: message threads, context chips, side-by-
side response diffs, generated component previews, agent profiles, and task
logs. Avoid robot illustrations, glowing brains, or generic AI stock imagery.

### Interactive components

`ChatInterface`, `ContextPanel`, `UIGenerator`, `AgentBuilder`, and
`TaskScheduler`. Outputs can be pre-wired; the experience should feel real
without requiring an external AI service.

### Design and content notes

The chat surface can use a subtly darker paper panel to distinguish it from the
portfolio. Copy should explain uncertainty without making the interface feel
anxious. The generated UI moment is the visual payoff; agent configuration is
the credibility payoff.

### Current implementation status

Placeholder page only. The route and basic project copy exist. Interactive
components and the full page structure are not started.

---

## 03 — Scheduling

**Route:** `/work/scheduling`

**Title:** Scheduling

**Short description:** Organizational scheduling as a product problem, not a
calendar.

**Hook:** Scheduling for one person is a calendar. For an organization, it is a
product problem.

**Audience signal:** Demonstrates how to make constrained optimization legible:
availability, rules, conflicts, states, and consequences at organizational
scale.

### Problem

Naive calendars work for one person but break when many people, resources,
rules, buffers, and exceptions interact. The user needs to understand not only
what is available, but why a slot is unavailable and what changing a rule will
affect.

### Solution

A guided scheduling workspace that starts with availability and ends with a
calculated schedule and an explicit request lifecycle. The interaction should
make complexity visible while keeping the decisions understandable.

### Page sections

1. **Hero** — frame organizational scheduling as constrained product design.
2. **01 The Problem** — annotated complexity map showing why simple calendars
   fail.
3. **02 Availability** — multi-person time grid with overlap and gap detection.
4. **03 Scheduling Windows** — configure dates, excluded days, hours, and
   buffers with a live timeline.
5. **04 Calculated Schedules** — enter constraints and generate a schedule with
   conflict flags.
6. **05 Workflows and Status** — follow a request through draft, requested,
   confirmed, completed, cancelled, and rescheduled states.
7. **06 Managing at Scale** — filter, select, and act on many schedules.
8. **Reflection** — explain the human side of scheduling systems.

### Topics

Availability management, scheduling windows, calculated schedules, constraints,
conflicts, buffers, state machines, bulk actions, notifications, and
organizational scale.

### Imagery recommendations

Use muted calendars, timelines, overlap bands, constraint callouts, and state
diagrams. Avoid colorful consumer-calendar screenshots. The visual language
should feel clinical and precise without feeling bureaucratic.

### Interactive components

`AvailabilityGrid`, `WindowConfigurator`, `ScheduleCalculator`,
`WorkflowDiagram`, and `BulkScheduler`.

### Design and content notes

Lead with the Availability Grid because it is the most visceral demonstration.
Every blocked slot should explain itself. The page should communicate that the
domain is difficult while the interface feels inevitable.

### Current implementation status

Placeholder page only. The route and basic project copy exist. Interactive
components and the full page structure are not started.

---

## 04 — Finance

**Route:** `/work/finance`

**Title:** Finance

**Short description:** Making money legible, actions safe, and decisions
confident.

**Hook:** Money is emotional. Financial product design is a clarity problem.

**Audience signal:** Demonstrates high-stakes information design: context for
numbers, safe actions, status clarity, and confidence in financial workflows.

### Problem

Financial interfaces often expose numbers without enough context. Users need
to understand variance, aging, status, and consequences before committing to an
action.

### Solution

A compact financial workspace that moves from budget planning through invoices,
exposure summaries, vendor management, and payment confirmation. Each surface
should pair a number with the context and next action it supports.

### Page sections

1. **Hero** — frame financial UX as the work of reducing anxiety through
   clarity.
2. **01 Budget Builder** — plan, compare actuals, and see variance live.
3. **02 Invoice** — edit line items, calculate tax, and move through payment
   status states.
4. **03 AP / AR Dashboard** — compare payables and receivables by aging
   bucket.
5. **04 Vendor Management** — filter, sort, expand, and act on vendor records.
6. **05 Billing Flow** — review, confirm, and complete a payment with clear
   security and next-step copy.
7. **Reflection** — principles for designing confident financial interfaces.

### Topics

Budgets, variance, invoices, tax, payment states, accounts payable, accounts
receivable, aging buckets, vendor management, payment methods, confirmation,
and high-stakes interaction design.

### Imagery recommendations

Use restrained charts, ledger rows, status badges, aging bars, invoice
documents, and confirmation states. Avoid stock finance imagery, coins, graphs
floating in space, or decorative gradients. Numbers should be the visual
material.

### Interactive components

`BudgetBuilder`, `InvoicePreview`, `ARDashboard`, `VendorTable`, and
`BillingFlow`.

### Design and content notes

This example can be denser than the others, but hierarchy must remain clear.
Reserve red/green variance treatment for meaningful financial states. Make
Billing Flow the most polished sequence because it carries the highest user
stakes.

### Current implementation status

Placeholder page only. The route and basic project copy exist. Interactive
components and the full page structure are not started.

---

## Build order

1. Design Systems — complete
2. AI Chatbot — next
3. Scheduling
4. Finance

Before production approval, all four examples need usable interactive surfaces;
the three placeholder routes are not finished work.
