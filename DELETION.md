# Deletion log

Files removed during `nu1` cleanup. Last updated: 2026-06-29.

---

## Removed — orphan / unused

| File | Reason |
| ---- | ------ |
| `src/storytime.ts` | Orphaned GSAP scroll experiment |
| `src/storydata.ts` | Paired with `storytime` |
| `src/components/Logo.jsx` | Never imported |
| `src/components/NavLinks.astro` | Never imported |
| `src/components/FooterLink.astro` | Never imported |
| `src/components/HeaderLink.astro` | Never imported |
| `src/lib/utils.ts` | shadcn helper; no UI primitives on `nu1` |
| `src/content/work/.gitkeep` | Empty placeholder |

---

## Removed — legacy routes (2026-06-29)

| File | Reason |
| ---- | ------ |
| `src/pages/about.astro` | Orphan placeholder; not in IA |
| `src/components/Header.astro` | Replaced by `ContactBar` on all routes |
| `src/components/Footer.astro` | Replaced by `ContactBar` social links |
| `src/components/FormattedDate.astro` | Unused; dates via `lib/blog.ts` |
| `tailwind.config.mjs` | Tailwind v4 theme in `global.css` only |

Blog (`/blog`, `/blog/*`) and tag (`/tag/*`) pages now use `ContactBar` + `BlogGrid` — same shell as work pages.

---

## Do not restore (superseded on `nu1`)

| Path | Replaced by |
| ---- | ----------- |
| `src/components/demos/AIFileDemo.jsx` | `ChatbotDemo.jsx` |
| `src/components/demos/FinanceDemo.jsx` | `FinancialDashboardDemo.jsx` |
| `src/components/demos/MedicalSchedulingDemo.jsx` | — (not in IA) |
| `src/components/demos/RestaurantDemo.jsx` | `FoodOrderingDemo.jsx` |
| `src/components/placeholders/**` | Case study MDX + demos |
| `src/components/ui/**` | Not in use |

---

## Single source of truth

| Data | Location |
| ---- | -------- |
| Work case studies | `src/content/work/*.mdx` |
| Work listing | `getWorkEntries()` → `src/lib/work.ts` |
| Blog posts | `getBlogPosts()` → `src/lib/blog.ts` |
| Site + hero labels | `src/consts.ts` |
| Identity copy | `AO.md` |
| Motion | `src/scripts/motion.ts` |
