# PROJECT_STATUS.md — Andre Ortiz Portfolio Site

Last updated: 2026-03-31

---

## Positioning & Story

### Tagline
**Design. Ship. Profit.**

### Why (Simon Sinek framework)
> Good design doesn't make things pretty. It makes things work — for customers, for teams, and for the bottom line.

### Hero intro paragraph (final)
> Good design doesn't make things pretty. It makes things work — for customers, for teams, and for the bottom line. I've spent twenty years building the products and systems behind companies that grew into global platforms used by 95% of an industry.

### Target audience
- Primary: Founders and startup operators
- Secondary: Design leadership hiring managers

### Positioning statement
Experienced, adaptable, technically capable designer who doesn't stop at the handoff. Not a niche specialist — a full creative professional who has compounded 20 years of range. The AI infrastructure work is proof of evolution, not the headline.

---

## About Page Copy (final)

**Experience**
> Twenty years designing software, building systems, and shipping work that moves the needle. I've worked on small teams with big scope — agencies, startups, enterprise — doing whatever was needed to get the job done. I move fast and iterate with purpose.

**Proof**
> The products I've helped build are now global platforms. Some serve entire industries.

**Human**
> I live in Austin, TX with my family. I enjoy music, food, and spending time in the garden. I live by a clear set of values — and I bring that same intentionality to everything I do.

---

## Site Architecture

### Pages
- `/` — Homepage
- `/about` — About page
- `/work` — Work index
- `/work/[slug]` — Case study pages (4 total)
- `/blog` — Blog index
- `/blog/[slug]` — Blog post pages

### Stack
- Astro 5, React 19, Tailwind CSS 4, GSAP 3, Shadcn/ui, MDX, TypeScript

### Design direction
Inspiration:
- https://danielautry.com/
- https://www.rachelhow.com/
- https://azumbrunnen.me/

---

## What Has Been Done

### Copy
- [x] Tagline finalized: "Design. Ship. Profit."
- [x] Hero intro paragraph finalized
- [x] About page copy finalized (3 paragraphs: experience, proof, human)
- [x] Positioning framework established (Start With Why: Why → How → What)

### Code
- [x] Homepage rebuilt (`src/pages/index.astro`)
  - Two-column hero: large serif tagline left, paragraph right
  - Avatar removed from hero
  - Case Studies section: 2×2 grid, all 4 work items
  - Blog section: inline "All posts →" header link
- [x] Case study page template rebuilt (`src/pages/work/[...slug].astro`)
  - Hero block (warm cream, title + summary)
  - Metadata row (Team / My Role / Duration)
  - Problem section (MDX content)
  - Solutions section (alternating layout with interaction placeholders)
  - Impact section (centered, stat cards)
- [x] Content schema updated (`src/content.config.ts`)
  - Added: `duration`, `summary`, `solutions`, `impact` fields
- [x] Build verified — 56 pages, zero errors

---

## What Still Needs To Be Done

### Case Study Content (MDX files)

#### Existing files — need frontmatter updated with new fields
- [ ] `design-system.mdx` — add `summary`, `duration`, `solutions`, `impact`
- [ ] `medical-scheduling.mdx` — add `summary`, `duration`, `solutions`, `impact`
- [x] `restaurant.mdx` — removed (2026-03-31)

#### New files — need to be created
- [ ] `financial-product.mdx` — new case study
- [ ] `ai-product.mdx` — new case study

#### All four case studies need:
- Problem statement (already exists for design-system, scheduling)
- Solutions array (2 per case study, maps to interaction blocks)
- Impact metrics (fabricated data)
- Duration and team info

### Interactive Demos (React components)

#### Design System
- [ ] Theme switcher: Light / Dark / Brand 1 / Brand 2
- [ ] Component gallery: Buttons, inputs, sliders, lists (live interactions)

#### Scheduling Product
- [ ] Visit calculator: User enters a start date, click calculate, visit schedule loads
- [ ] Node map: Branching visit paths, visual mapping

#### Financial Product
- [ ] Budget matrix: Y axis = visit activities, X axis = visits
- [ ] Accounts payable: Invoice listings

#### AI Product
- [ ] Chatbot UI (pre-scripted, no free input)
  - 3 questions: "What is the state of my data?", "What visits are coming up in the next 30 days?", "Which sites are behind on data entry?"
  - Each response: text answer + inline generative UI widget
    - State of data → status cards (Queries Open, Data Entry %, Missing Data, Active Studies)
    - Upcoming visits → visit list rows with status pills (Confirmed / Pending)
    - Sites behind → ranked site list with progress bars, flagged below 80%
- [ ] Generative UI demo (TBD — form that generates a UI preview, or similar)
- [ ] Agent creator (TBD)

### About Page
- [ ] Update `about.astro` with finalized copy (3-paragraph structure)
- [ ] Extended bio (200 words) — Andre to provide later
- [x] Hero photo decision: keep, circle, no border (2026-03-31)

### Blog Posts (6 planned, none written)
1. [ ] "Why your design system has two audiences now" — Strategic frame, publish first
2. [ ] "The difference between a token name and a token with intent" — Infrastructure
3. [ ] "What I learned connecting Figma MCP to Claude Code on a real project" — Documented practice
4. [ ] "The design specification layer: what it is and why it's replacing the component library" — Strategic frame
5. [ ] "How to review AI-generated UI: a framework for design engineers" — Infrastructure
6. [ ] "The role that doesn't exist yet: Design Infrastructure Lead" — Strategic frame

All posts: humanized writing style, short form.

### Work Index Page (`/work`)
- [ ] Review and update to reflect 4 case studies (currently may show 3)

### General
- [x] `restaurant.mdx` — removed (2026-03-31)
- [ ] Run `openclaw doctor --fix` (post-update artifact from 2026-03-30)
- [ ] OpenClaw update 2026.3.28 applied — ARDAgent on port 3283 still worth reviewing
