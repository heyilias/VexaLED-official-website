# Context — Website Launch Readiness

> Handoff document for the AI agent implementing the tasks in `tasks.md`.

---

## Project Overview

VexaLED is a corporate marketing website for an LED display company. The frontend is built with React + TypeScript + Vite and is visually complete with 14 pages, 22 components, a full Tailwind design system, and Framer Motion animations. However, the project is not production-ready: all form submissions are mocked with `setTimeout`, there is no per-page SEO, several accessibility violations exist, and there is no deployment configuration for SPA routing.

This feature set completes the remaining 30% of the project so it can launch.

---

## Startup Command

- **Dev server**: `npm run dev`
- **Build**: `npm run build`
- **Preview production build**: `npm run preview`
- **Lint**: `npm run lint`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18+ with TypeScript |
| Build tool | Vite + SWC |
| Styling | Tailwind CSS with custom theme (`tailwind.config.ts`) |
| Animations | Framer Motion |
| State/Data | `@tanstack/react-query` (installed, QueryClientProvider set up, but no queries/mutations defined yet) |
| UI library | shadcn/ui (button, toast, tooltip, sonner) |
| 3D (possibly) | `@react-three/fiber` (in deps — may be used by MarketCube.tsx, needs audit) |
| i18n | Custom implementation in `src/i18n/` |
| Icons | lucide-react |

---

## Current Data Model

All data is static, living in TypeScript files. There are no database models or API schemas.

| Data file | Contains | Used by |
|-----------|----------|---------|
| `src/data/productDetailData.ts` | Product specs, features, images, applications | Product Detail pages |
| `src/data/productCategoryData.ts` | Category names, descriptions, product lists | Product Category pages |
| `src/data/marketDetailData.ts` | Market info, differentiators, solutions | Market Detail pages |
| `src/lib/faqDatabase.ts` | FAQ questions and answers | FAQ sections |
| `src/i18n/` | Translation strings | All pages (language support) |

---

## Existing Patterns

**Routing**: All routes defined in `src/App.tsx:29-44` using `react-router-dom`. Standard `<Routes>` + `<Route>` pattern.

**Component structure**: Pages in `src/pages/`, reusable components in `src/components/`. Each page is a single file exporting a default component.

**Toast notifications**: Using Sonner (`sonner` package) via shadcn's toast setup. Call `toast.success()` or `toast.error()` from any component.

**Form handling**: Forms use controlled React state (`useState`). Validation is done inline before submission. Currently, submission is mocked:
```tsx
// Current pattern (to be replaced):
setIsSubmitting(true);
setTimeout(() => {
  setIsSubmitting(false);
  toast.success("Message sent!");
}, 1500);
```

**CSS approach**: Tailwind utility classes. Custom theme colors defined in `tailwind.config.ts`. CSS variables in `src/index.css`. Primary accent: `#CCFF00`. Dark theme.

---

## File Map

Key files the agent will need to read or modify:

```
src/
├── App.tsx                          # Router config (lines 29-44), QueryClientProvider
├── main.tsx                         # App entry point — wrap with HelmetProvider here
├── index.css                        # Global styles, CSS variables
├── config/
│   └── env.ts                       # TO CREATE — typed env config
├── api/
│   └── forms.ts                     # TO CREATE — API submission functions
├── hooks/
│   ├── useContactForm.ts            # TO CREATE — React Query mutation
│   └── useNewsletter.ts             # TO CREATE — React Query mutation
├── types/
│   └── api.ts                       # TO CREATE — API type definitions
├── components/
│   ├── SEOHead.tsx                   # TO CREATE — reusable Helmet wrapper
│   ├── InquiryModal.tsx             # MODIFY — add focus trap, wire up mutation
│   ├── navbar/
│   │   ├── Navbar.tsx               # READ — understand nav structure
│   │   └── navData.ts              # READ — nav link data
│   └── Footer.tsx                   # READ — social links for JSON-LD
├── pages/
│   ├── Home.tsx                     # MODIFY — add SEOHead, JSON-LD Organization
│   ├── Product.tsx                  # MODIFY — fix aria-hidden (line 85), fix labels (700-752), replace setTimeout (314/676), add SEOHead, lazy video (521)
│   ├── Blog.tsx                     # MODIFY — replace setTimeout (line 46), add SEOHead
│   ├── Configurator.tsx             # MODIFY — replace alert() (line 269), add SEOHead
│   ├── CaseStudies.tsx              # MODIFY — add SEOHead
│   ├── CaseStudy.tsx                # MODIFY — add SEOHead, JSON-LD Article
│   ├── About.tsx                    # MODIFY — add SEOHead
│   ├── AboutOverview.tsx            # MODIFY — add SEOHead
│   ├── Manufacturing.tsx            # MODIFY — add SEOHead
│   ├── Sustainability.tsx           # MODIFY — add SEOHead
│   ├── AboutDetail.tsx              # MODIFY — add SEOHead
│   ├── MarketDetail.tsx             # MODIFY — add SEOHead
│   ├── ProductCategory.tsx          # MODIFY — add SEOHead
│   └── NotFound.tsx                 # MODIFY — add SEOHead
├── data/
│   ├── productDetailData.ts         # READ — product names/descriptions for SEO
│   ├── productCategoryData.ts       # READ — category names for SEO
│   └── marketDetailData.ts          # READ — market names for SEO
└── lib/
    └── faqDatabase.ts               # READ — reference only

public/
├── index.html                       # MODIFY — keep static fallback tags, fix OG image
├── robots.txt                       # MODIFY — add sitemap reference
├── sitemap.xml                      # TO CREATE
├── og-image.png                     # TO CREATE or fix reference
└── _redirects                       # TO CREATE — Netlify SPA redirect

Root:
├── .env.example                     # TO CREATE
├── vercel.json                      # TO CREATE
├── netlify.toml                     # TO CREATE
├── .github/workflows/ci.yml         # TO CREATE
├── tailwind.config.ts               # READ — theme reference
├── vite.config.ts                   # READ — verify base path
├── package.json                     # READ/MODIFY — deps
└── .gitignore                       # VERIFY — .env.local listed
```

---

## Dependencies & Packages to Install

| Package | Purpose | Task |
|---------|---------|------|
| `react-helmet-async` | Dynamic per-page meta/title/OG tags | Task 3 |
| `focus-trap-react` | Keyboard focus trapping in modals | Task 7 |

Already installed but unused:
| Package | Status |
|---------|--------|
| `@tanstack/react-query` | Installed, QueryClientProvider set up — needs actual mutations | Task 8 |

Potentially removable:
| Package | Action |
|---------|--------|
| `@react-three/fiber`, `@react-three/drei`, `three` | Audit if MarketCube.tsx uses them. Remove if not. | Task 9 |

---

## Read These Files First

Before starting any task, the implementing agent should read these files in order:

1. `package.json` — understand all dependencies and scripts
2. `src/App.tsx` — router structure, QueryClientProvider, overall app layout
3. `src/main.tsx` — app entry point (where HelmetProvider will wrap)
4. `src/index.css` — global styles and CSS variables
5. `tailwind.config.ts` — theme configuration
6. `vite.config.ts` — build configuration, base path
7. `src/pages/Product.tsx` — the most complex page with the most changes needed
8. `src/pages/Blog.tsx` — newsletter form mock
9. `src/components/InquiryModal.tsx` — modal with incomplete verification
10. `src/pages/Configurator.tsx` — alert() that needs replacing
11. `public/index.html` — current static SEO tags
12. `.gitignore` — verify .env coverage

---

## Summary

The VexaLED website is a React + Vite + TypeScript SPA with 14 fully-designed pages, a dark theme with `#CCFF00` accent, and Framer Motion animations. All data is hardcoded in `src/data/`. The work involves 11 sequential tasks: (1) set up environment variables, (2) add SPA deployment config, (3-5) add dynamic SEO with react-helmet-async, JSON-LD, and sitemap, (6-7) fix accessibility bugs and add focus traps, (8) replace all form `setTimeout` mocks with React Query mutations pointing to configurable API endpoints, (9) add route-level code splitting and lazy loading, (10) add a CI/CD pipeline, and (11) run a full validation pass. The project uses shadcn/ui for components, Sonner for toasts, and already has `@tanstack/react-query` installed but unused. The agent should read `src/App.tsx`, `src/pages/Product.tsx`, and `package.json` first to understand the project structure.
