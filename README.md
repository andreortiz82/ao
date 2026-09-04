# Andre Ortiz

Personal portfolio for Andre Ortiz, a senior product designer and design
engineer. The site is designed for startups, founders, and teams looking for
creative product leadership.

## Status

Active development. The current branch is preview-only and is not approved for
production cutover. The live site remains unchanged until Andre gives
explicit approval.

## Stack

- Astro 5 with static output
- Tailwind CSS v4 through the Vite plugin
- React 19 islands
- GSAP for the Design Systems story
- Fraunces, Instrument Sans, and JetBrains Mono

## Run locally

```bash
npm install
npm run dev
```

Useful commands:

```bash
npm run build
npm run preview
```

## Canonical routes

- `/` — portfolio homepage with a statement hero and four color-block work tiles
- `/work/design-systems` — completed interactive Design Systems story
- `/work/ai-chatbot` — placeholder for the AI product example
- `/work/scheduling` — placeholder for the scheduling example
- `/work/finance` — placeholder for the financial tools example
- `/blog` — blog index
- `/blog/[slug]` — blog posts
- `/tag/[tag]` — blog tag indexes
- `/rss.xml` — blog feed

The old work collection and `/about` page are not part of the site. About is
available through the homepage avatar modal.

## Documentation

- [`AGENT.md`](AGENT.md) — technical architecture and implementation contract
- [`AO.md`](AO.md) — Andre's identity, experience, positioning, and messaging
- [`DESIGN.md`](DESIGN.md) — implemented visual language
- [`WORK.md`](WORK.md) — portfolio examples, section plans, and build status
- Workspace wiki — project status, decisions, pull requests, and deployment

## Repository notes

`wireframe.bmpr` is a tracked source artifact for the portfolio direction.
Generated output, local editor settings, environment files, and logs are
ignored by `.gitignore`.
