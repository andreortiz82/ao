# AO Portfolio Gallery — draft (2026-10-01)

Hard reset. Prior examples, steals, and site design locks are obsolete. This doc is the working list of **interactive gallery pieces** plus build plans. Andre locks titles/order; AO Bot builds after lock.

**Constraint:** each piece is a usable product surface in the browser, not a static case study or screenshot museum. Prefer CSS-first motion; GSAP when it earns it. Stack stays Astro + React + TypeScript + Tailwind + Phosphor + shadcn/ui.

**Engagement goal (unchanged):** founder / design-leadership visitor wants Andre on the team as a maker-leader.

---

## Proposed gallery (8)

Order is proposal only. Aim for ≥6 shippable interactive pieces before treating the gallery as “full.”

| # | Slug | Title | One-line promise |
|---|------|-------|------------------|
| 1 | `virgo` | Virgo | A living design system you can drive — tokens, components, light/dark, multi-brand. |
| 2 | `pair` | Pair | Human + agent on the same canvas: draft in contract, human owns names and merge. |
| 3 | `cue` | Cue | Clinic-grade scheduling: constraints visible, steerable suggestions, calm UI. |
| 4 | `ledger` | Ledger | Personal finance desk: cashflow narrative + an agent that proposes moves, not chat spam. |
| 5 | `mark` | Mark | Brand artifact forge: lockups, color stories, and exportable tokens in one sitting. |
| 6 | `beat` | Beat | Loopdeck — make a short musical phrase in the browser; keep the craft visible. |
| 7 | `play` | Play | A tiny game that proves interaction design and juice without a full studio. |
| 8 | `motion` | Motion | Purposeful motion specimens — scroll, layout, reduced-motion — as product polish. |

Retired (do not rebuild as the old set): Design Systems (Leo/Specimen fiction), AI Chatbot tile, Scheduling/Finance as brochure tiles, Chaachie homepage costume, masonry wireframe locks, `/about` page.

---

## Shared build spine (every piece)

1. **Hook** — problem in one sentence + who it’s for.
2. **Live stage** — interactive island above the fold (the proof).
3. **Make it** — visitor changes something (token, constraint, prompt, motif) and sees the product update.
4. **System view** — how the surface is structured (components / tokens / rules) in plain words.
5. **Close** — what Andre owned (design + build) + Contact me CTA.

Routes: `/work/<slug>` for each piece. Gallery index TBD with the redesign (home vs `/work`) — **not** locked here.

---

## 1. Virgo — `/work/virgo`

**Why it exists:** AO Bot owns Virgo Design System. This is the flagship proof that Andre builds systems other people (and agents) can run.

**Problem:** Teams ship UI without a shared contract; agents make it worse when tokens and components aren’t real.

**Live stage:** Specimen app with:
- Token panel (color, type, radius, space) → remaps the specimen instantly
- Light / dark
- Two named brands via token remap (not two separate codebases)
- Small component catalog (button, input, card, tabs, badge) — Storybook-like, in-product
- Agent payload preview: skill markdown primary; optional MCP/JSON secondary

**Make it:** Edit a brand color or type scale; specimen + agent payload stay in sync.

**Build plan:**
1. Scaffold React island `VirgoSpecimen` with local token CSS variables (do not fight site globals).
2. Seed Virgo token pack (light/dark + brand A/B).
3. Wire catalog + remapping; keyboard accessible.
4. Agent view: generated skill.md from current tokens.
5. Case shell: hook → stage → make it → system view → close.
6. Accessibility pass + `prefers-reduced-motion`.

**Done when:** Visitor can switch brand/theme, tweak a token, and see both UI and agent payload update without reload.

**Depends on:** Virgo naming/brand basics (can start fictional-clean if wiki Virgo isn’t ready).

---

## 2. Pair — `/work/pair`

**Why:** Shows agent craft as product UX, not a chatbot museum.

**Problem:** Agent output is untrusted soup; humans need a clear contract for draft → review → merge.

**Live stage:** Split canvas — agent drafts a UI section or copy block into a structured “proposal” card; human renames, edits, accepts/rejects. History of merges.

**Make it:** Trigger a draft (canned or local model stub), edit fields, merge into the canvas.

**Build plan:**
1. Define proposal schema (title, fields, rationale, status).
2. Build canvas + proposal inspector (React).
3. Stub agent: deterministic mock proposals first; optional later LLM.
4. Merge animation (CSS/GSAP Flip) with reduced-motion fallback.
5. Write the “contract” copy: humans own names/merge.

**Done when:** A visitor completes draft → edit → merge once and understands the rule without reading a novel.

---

## 3. Cue — `/work/cue`

**Why:** Healthcare/scheduling depth without claiming a full EMR.

**Problem:** Booking UIs hide constraints until failure.

**Live stage:** Week view + constraint chips (provider, room, duration, buffers). Suggestions that explain *why* a slot works.

**Make it:** Drag or pick a visit type; watch feasible slots recompute; override with an explicit break-glass that labels risk.

**Build plan:**
1. Fake clinic dataset (providers, rooms, visit types).
2. Constraint engine in TS (pure functions, testable).
3. Calendar UI (React) — keyboard + screen reader for slots.
4. Suggestion list with plain-language reasons.
5. Empty/error states that teach the system.

**Done when:** Visitor can book a constrained slot and see the explanation; breaking a rule is intentional and labeled.

---

## 4. Ledger — `/work/ledger`

**Why:** Finance craft as calm narrative UI + agent proposals, not dashboards-for-dashboards.

**Problem:** Money apps drown people in charts; advice bots chatter.

**Live stage:** Month story (income → fixed → flexible → runway) + “proposed moves” cards from an agent (cut X, shift Y) with accept/dismiss.

**Make it:** Adjust one assumption (rent, income); story and proposals recompute.

**Build plan:**
1. Sample household model in TS.
2. Narrative layout (not a chart wall).
3. Proposal cards with impact delta.
4. Optional sparkline only where it earns space.
5. Tone pass: selective, adult, no hustle slang.

**Done when:** Visitor changes one number and sees both the story and proposals update coherently.

---

## 5. Mark — `/work/mark`

**Why:** Branding/artifacts made live — proof of taste + systems thinking.

**Problem:** Brand kits die as PDFs; tokens never reach product.

**Live stage:** Name + adjective inputs → lockup variants, color story, exportable CSS variables / JSON tokens.

**Make it:** Type a fictional brand; generate 3 directions; pick one; export tokens.

**Build plan:**
1. Generative rules (type pairing, palette from seed) — deterministic first.
2. Lockup renderer (SVG).
3. Token export panel.
4. Guardrails against AI-slop defaults (limited type menu, restrained palettes).

**Done when:** Visitor leaves with a downloaded token snippet for a brand they just named.

---

## 6. Beat — `/work/beat`

**Why:** Maker range (music) with visible craft; ties to loopdeck / Beat Bot lane without requiring Ableton in the browser.

**Problem:** Music tools hide the system; demos feel like toys or DAWs.

**Live stage:** 8-step or short phrase sequencer + simple synth/sample kit; pattern save as URL state.

**Make it:** Build a 4-bar loop; toggle swing; export pattern JSON or share link.

**Build plan:**
1. Web Audio skeleton (or lightweight lib) with mute-safe defaults.
2. Step grid UI accessible via keyboard.
3. URL-serialized patterns.
4. Visual feedback that respects reduced motion (level meters ok; flashing less).

**Done when:** Visitor makes a loop in under a minute and can reload the same pattern from the URL.

---

## 7. Play — `/work/play`

**Why:** Interaction juice and game feel in a tiny footprint (Pix lane).

**Problem:** Portfolios claim “delight” without a playable artifact.

**Live stage:** One-screen game (e.g. timing / spatial puzzle) with readable systems (score, fail, recover).

**Make it:** Finish a run; optionally tweak a feel slider (ease, juice) and replay.

**Build plan:**
1. Pick one mechanic; prototype in React + canvas or DOM.
2. Juice pass (hitstop, particles) with reduced-motion off-ramp.
3. Feel slider that maps to real parameters.
4. Keep scope tiny — no meta-progression.

**Done when:** A complete run is possible on mobile and desktop; feel slider clearly changes the product.

---

## 8. Motion — `/work/motion`

**Why:** Design-engineer proof: purposeful motion as product, not decoration.

**Problem:** Motion portfolios are either showreels or CSS trivia.

**Live stage:** 4–6 specimens (page transition, shared-element, scroll scene, layout Flip, staggered list, reduced-motion twin).

**Make it:** Toggle reduced-motion override; scrub a scroll scene; switch easing presets.

**Build plan:**
1. Specimen shell with identical before/after copy.
2. Implement each with CSS first; GSAP/ScrollTrigger only where needed.
3. Document the product reason for each motion in one line.
4. Prefer `matchMedia` / `prefers-reduced-motion`.

**Done when:** Each specimen has a stated product reason and a reduced-motion path that still communicates state.

---

## Non-goals (this draft)

- Site visual redesign (separate track — design is intentionally blank).
- Blog wipe / new posts (next ask).
- `/about` deletion (next ask).
- Publishing unfinished pieces to andreortiz.com until Andre greenlights.

## Open questions for Andre

1. Keep all 8, cut to a tight 4–6, or swap any titles?
2. Should Virgo be first / flagship?
3. Any real product IP to substitute for Cue / Ledger / Play?
4. Gallery on home, `/work`, or both?

## Next after lock

1. Write one `src/content/work/<slug>.mdx` stub per locked piece (frontmatter only).
2. Update wiki `projects/ao.md` Status + Decisions.
3. Build Virgo first unless Andre reorders.
