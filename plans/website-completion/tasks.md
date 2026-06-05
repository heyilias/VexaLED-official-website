# Tasks — Website Launch Readiness

```
⚠️ MANDATORY RULES FOR AI AGENT:
1. Tasks MUST be completed in sequential order (Task 1 → Task 2 → Task 3 → ...).
2. Each task has ACCEPTANCE CRITERIA that MUST ALL PASS before moving to the next task.
3. DO NOT skip ahead. DO NOT proceed to Task N+1 until ALL criteria of Task N are verified.
4. After completing each task, mark criteria as ✅ passed or ❌ failed.
5. If any criterion fails, fix it BEFORE proceeding.
6. The startup command for this project is: `npm run dev`
7. Do not go to next task unless ALL criteria for the current task are ✅ complete and marked true ✅ in the checklist in the tasks.md file.
```

---

## Task 1: Environment Variables & Configuration

**Description:**
Set up the environment variable system so all configurable values (API URLs, analytics ID, site URL) are read from `.env` files instead of being hardcoded. This is the foundation for every subsequent task.

**Implementation Details:**
- Create `.env.example` in the project root with all required variables and placeholder values:
  ```
  VITE_API_URL=http://localhost:3001
  VITE_CONTACT_FORM_ENDPOINT=http://localhost:3001/forms
  VITE_ANALYTICS_ID=
  VITE_SITE_URL=http://localhost:5173
  ```
- Create `.env.local` (git-ignored) with the same structure for local dev
- Create `src/config/env.ts` that exports a typed config object reading from `import.meta.env` with sensible fallback defaults
- Verify `.env.local` and `.env` are both listed in `.gitignore`

**Acceptance Criteria:**
- [x] `.env.example` exists at project root with all 4 variables documented
- [x] `src/config/env.ts` exports a typed object (`VITE_API_URL`, `VITE_CONTACT_FORM_ENDPOINT`, `VITE_ANALYTICS_ID`, `VITE_SITE_URL`)
- [x] `.env.local` is in `.gitignore`
- [x] `npm run build` completes with zero errors
- [x] Importing `env` from `src/config/env.ts` returns correct values

**Status:** ✅ Complete
Do not go to next task unless ALL criteria for the current task are ✅ complete and marked true ✅ in the checklist in the tasks.md file.

---

## Task 2: SPA Deployment Configuration

**Description:**
Add deployment config files so that direct URL access (e.g., refreshing `/about/manufacturing`) does not return a 404 in production.

**Implementation Details:**
- Create `vercel.json` in the project root:
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```
- Create `netlify.toml` in the project root as a fallback:
  ```toml
  [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
  ```
- Create `public/_redirects` with: `/* /index.html 200` (Netlify alternative)
- Verify the existing `vite.config.ts` has no conflicting `base` path settings

**Acceptance Criteria:**
- [x] `vercel.json` exists with the SPA rewrite rule
- [x] `netlify.toml` exists with the SPA redirect rule
- [x] `public/_redirects` exists with the fallback redirect
- [x] `npm run build` completes with zero errors
- [x] `npm run preview` serves the site and navigating directly to `/about/manufacturing` does not 404

**Status:** ✅ Complete
Do not go to next task unless ALL criteria for the current task are ✅ complete and marked true ✅ in the checklist in the tasks.md file.

---

## Task 3: Dynamic SEO Metadata (Per-Page Titles & Meta)

**Description:**
Install `react-helmet-async` and add unique `<title>`, `<meta description>`, and Open Graph tags to every page so each route has its own SEO identity.

**Implementation Details:**
- Install: `npm install react-helmet-async`
- Wrap `<App />` with `<HelmetProvider>` in `src/main.tsx`
- Create a reusable component `src/components/SEOHead.tsx` that accepts props: `title`, `description`, `ogImage?`, `ogUrl?`, `jsonLd?`
- Add `<SEOHead>` to every page component (all 14 pages) with unique, descriptive title and description
- Title format: `{Page Title} — VexaLED` (e.g., "LED Product Configurator — VexaLED")
- For dynamic pages (`/products/:category/:slug`, `/case-study/:slug`, `/market/:slug`, `/about/:slug`), pull title/description from the data objects
- Keep the existing static tags in `index.html` as fallbacks
- Fix the broken OG image URL in `index.html` — either point to a real image in `/public/og-image.png` or use a relative path

**Acceptance Criteria:**
- [x] `react-helmet-async` is installed and listed in `package.json`
- [x] `<HelmetProvider>` wraps the app in `src/main.tsx`
- [x] `src/components/SEOHead.tsx` exists and accepts `title`, `description`, `ogImage`, `ogUrl`, `jsonLd` props
- [x] All 14 page components include `<SEOHead>` with unique title and description
- [x] Dynamic pages (`Product`, `CaseStudy`, `Market`, `AboutDetail`) derive title/description from their data
- [x] A valid OG image file exists at the path referenced in meta tags (or fallback is corrected)
- [x] Navigating between pages in the browser shows the correct `<title>` in the browser tab
- [x] `npm run build` completes with zero errors

**Status:** ✅ Complete
Do not go to next task unless ALL criteria for the current task are ✅ complete and marked true ✅ in the checklist in the tasks.md file.

---

## Task 4: JSON-LD Structured Data

**Description:**
Add JSON-LD schema.org structured data to relevant pages to improve search engine understanding and enable rich results.

**Implementation Details:**
- **Home page**: Add `Organization` schema (name, url, logo, sameAs for social links)
- **Product Detail pages**: Add `Product` schema (name, description, image, brand, category)
- **Case Study pages**: Add `Article` schema (headline, datePublished, author, image)
- **Blog page**: Add `BreadcrumbList` schema
- **All pages with breadcrumbs**: Add `BreadcrumbList` schema matching visible breadcrumb trail
- Pass JSON-LD through the `jsonLd` prop on the `<SEOHead>` component created in Task 3
- Validate output using Google's Rich Results Test format

**Acceptance Criteria:**
- [x] Home page renders an `Organization` JSON-LD script tag in the `<head>`
- [x] Product Detail pages render a `Product` JSON-LD script tag with data from the product object
- [x] Case Study Detail pages render an `Article` JSON-LD script tag
- [x] At least 3 pages include `BreadcrumbList` JSON-LD
- [x] All JSON-LD is valid JSON (no syntax errors in the rendered script tags)
- [x] `npm run build` completes with zero errors

**Status:** ✅ Complete
Do not go to next task unless ALL criteria for the current task are ✅ complete and marked true ✅ in the checklist in the tasks.md file.

---

## Task 5: Sitemap Generation

**Description:**
Create a `sitemap.xml` that lists all public routes for search engine crawling.

**Implementation Details:**
- Create a static `public/sitemap.xml` listing all 14 routes (including dynamic ones with known slugs from the data files)
- Use `https://vexaled.com` as the base URL (or read from `VITE_SITE_URL` env var if generating at build time)
- Set `<lastmod>` to the current date, `<changefreq>` to `weekly` for most pages, `monthly` for static about pages
- Set `<priority>` — 1.0 for home, 0.8 for product/category pages, 0.6 for about/blog
- Add `Sitemap: https://vexaled.com/sitemap.xml` to `public/robots.txt`
- Alternatively, create a build script (`scripts/generate-sitemap.ts`) that reads route data and generates the sitemap at build time

**Acceptance Criteria:**
- [x] `public/sitemap.xml` exists and is valid XML
- [x] Sitemap includes all static routes and all known dynamic routes (products, case studies, markets, about slugs)
- [x] `robots.txt` references the sitemap URL
- [x] `npm run build` includes `sitemap.xml` in the `dist/` output
- [x] Opening `http://localhost:5173/sitemap.xml` in the browser returns the XML content

**Status:** ✅ Complete
Do not go to next task unless ALL criteria for the current task are ✅ complete and marked true ✅ in the checklist in the tasks.md file.

---

## Task 6: Accessibility Fixes — Quick Wins

**Description:**
Fix all the specific accessibility bugs identified in the report. These are targeted, low-risk changes.

**Implementation Details:**
- **Fix typo**: In `src/pages/Product.tsx:85`, change `alt-hidden="true"` to `aria-hidden="true"`
- **Replace alert()**: In `src/pages/Configurator.tsx:269`, replace `alert()` with a toast notification using the existing Sonner/toast system
- **Add skip link**: In `src/App.tsx` (or the root layout component), add a skip-to-main link as the first focusable element:
  ```html
  <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded">
    Skip to main content
  </a>
  ```
- Add `id="main-content"` to the `<main>` element on every page (or in the layout wrapper)
- **Fix label associations**: In `src/pages/Product.tsx:700-752`, ensure every `<input>`, `<textarea>`, and `<select>` has either a wrapping `<label>` or an explicit `<label htmlFor="...">` with a matching `id`

**Acceptance Criteria:**
- [x] `aria-hidden="true"` is correct in `Product.tsx` (no `alt-hidden` anywhere in codebase)
- [x] No `alert()` calls exist in `Configurator.tsx` — replaced with toast
- [x] A skip-to-main-content link exists and is the first focusable element in the DOM
- [x] `<main id="main-content">` exists in the layout
- [x] All form inputs in `Product.tsx:700-752` have associated labels (`htmlFor` + `id` or wrapping `<label>`)
- [x] `npm run build` completes with zero errors

**Status:** ✅ Complete
Do not go to next task unless ALL criteria for the current task are ✅ complete and marked true ✅ in the checklist in the tasks.md file.

---

## Task 7: Accessibility — Focus Traps & ARIA Live Regions

**Description:**
Add focus trapping to modals and ARIA live regions for dynamic feedback (toasts, form errors).

**Implementation Details:**
- Install `focus-trap-react`: `npm install focus-trap-react`
- Wrap the content of `InquiryModal.tsx` in a `<FocusTrap>` component that activates when the modal is open
- Apply the same focus trap to the `SearchOverlay` component (if it functions as a modal overlay)
- Ensure pressing `Escape` closes both modals
- Add `aria-live="polite"` to the toast/notification container (check Sonner config — it may already handle this; verify and fix if not)
- Add `role="alert"` or `aria-live="assertive"` to inline form error messages
- Test with keyboard-only navigation: Tab through modal, verify focus stays inside, Escape closes

**Acceptance Criteria:**
- [x] `focus-trap-react` is installed and listed in `package.json`
- [x] `InquiryModal.tsx` uses `<FocusTrap>` — focus cannot escape the modal while open
- [x] SearchOverlay uses `<FocusTrap>` if it is a modal-style overlay
- [x] Pressing `Escape` closes both InquiryModal and SearchOverlay
- [x] Toast container has `aria-live="polite"` (or Sonner's built-in ARIA is verified as working)
- [x] Inline form errors use `role="alert"` or `aria-live="assertive"`
- [x] `npm run build` completes with zero errors

**Status:** ✅ Complete
Do not go to next task unless ALL criteria for the current task are ✅ complete and marked true ✅ in the checklist in the tasks.md file.

---

## Task 8: Form Submission — API Integration Layer

**Description:**
Create a shared API integration layer using React Query mutations, then connect all three forms to real (configurable) endpoints, replacing the `setTimeout` mocks.

**Implementation Details:**
- Create `src/api/forms.ts` with typed functions:
  - `submitContactForm(data: ContactFormData): Promise<ApiResponse>`
  - `submitNewsletter(data: { email: string }): Promise<ApiResponse>`
  - Each function uses `fetch` and reads the endpoint from `src/config/env.ts`
- Create `src/hooks/useContactForm.ts` — a React Query `useMutation` hook wrapping `submitContactForm`
- Create `src/hooks/useNewsletter.ts` — a React Query `useMutation` hook wrapping `submitNewsletter`
- **In `src/pages/Product.tsx`**: Replace the `setTimeout` mock (around line 314/676) with `useContactForm` mutation. On success: show toast + reset form. On error: show error toast + keep form data.
- **In `src/pages/Blog.tsx`**: Replace the `setTimeout` mock (around line 46) with `useNewsletter` mutation. On success: show toast + clear email. On error: show error toast.
- **In `src/components/InquiryModal.tsx`**: Wire up the inquiry form to `useContactForm`. Complete the verification flow if any steps are missing.
- Add proper TypeScript types for all request/response shapes in `src/types/api.ts`
- Add error handling: network timeouts (AbortController with 10s timeout), non-2xx responses, and offline detection

**Acceptance Criteria:**
- [x] `src/api/forms.ts` exists with `submitContactForm` and `submitNewsletter` functions
- [x] `src/hooks/useContactForm.ts` and `src/hooks/useNewsletter.ts` exist and use `useMutation`
- [x] `src/types/api.ts` exists with `ContactFormData`, `NewsletterData`, and `ApiResponse` types
- [x] `Product.tsx` no longer contains `setTimeout` for form submission — uses `useContactForm`
- [x] `Blog.tsx` no longer contains `setTimeout` for newsletter — uses `useNewsletter`
- [x] `InquiryModal.tsx` uses `useContactForm` and the verification flow is complete
- [x] All forms show a loading state while the mutation is pending (`isLoading` / `isPending`)
- [x] All forms show a success toast on 2xx response
- [x] All forms show an error toast on failure (network error, 4xx, 5xx)
- [x] No `setTimeout` mocks remain for any form submission in the entire codebase
- [x] `npm run build` completes with zero errors

**Status:** ✅ Complete
Do not go to next task unless ALL criteria for the current task are ✅ complete and marked true ✅ in the checklist in the tasks.md file.

---

## Task 9: Performance — Code Splitting & Lazy Loading

**Description:**
Implement route-level code splitting and lazy loading for images/video to improve initial load time.

**Implementation Details:**
- **Route-level code splitting**: In `src/App.tsx`, replace direct imports of page components with `React.lazy()`:
  ```tsx
  const Home = React.lazy(() => import('./pages/Home'));
  const Blog = React.lazy(() => import('./pages/Blog'));
  // ... all 14 pages
  ```
- Wrap `<Routes>` in `<Suspense fallback={<LoadingSpinner />}>` — create a simple full-page loading spinner component if none exists
- **Image lazy loading**: Add `loading="lazy"` to all `<img>` tags that are below the fold (NOT the hero image or first viewport content)
- **Video lazy loading**: In `src/pages/Product.tsx:521`, add `preload="none"` or `preload="metadata"` to the `<video>` tag so it doesn't eagerly download the full MP4
- **Audit `@react-three/fiber`**: Check if it's actually imported/used anywhere. If not, remove it: `npm uninstall @react-three/fiber @react-three/drei three` (and any related packages)
- Verify that `MarketCube.tsx` component is what uses Three.js — if it does, keep the dependency; if not, remove

**Acceptance Criteria:**
- [x] All 14 page components are imported via `React.lazy()` in `src/App.tsx`
- [x] `<Routes>` is wrapped in `<Suspense>` with a loading fallback
- [x] Below-fold `<img>` tags have `loading="lazy"` attribute
- [x] `<video>` in `Product.tsx` has `preload="none"` or `preload="metadata"`
- [x] `@react-three/fiber` is either confirmed in use (by `MarketCube.tsx`) or removed from `package.json`
- [x] Bundle size is equal to or smaller than before this task (run `npm run build` and compare `dist/` asset sizes)
- [x] All pages still render correctly after code splitting (no broken imports)
- [x] `npm run build` completes with zero errors

**Status:** ✅ Complete
Do not go to next task unless ALL criteria for the current task are ✅ complete and marked true ✅ in the checklist in the tasks.md file.

---

## Task 10: CI/CD Pipeline

**Description:**
Add a GitHub Actions workflow that lints, type-checks, and builds the project on every push/PR to the main branch.

**Implementation Details:**
- Create `.github/workflows/ci.yml`:
  ```yaml
  name: CI
  on:
    push:
      branches: [main]
    pull_request:
      branches: [main]
  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
            node-version: 20
            cache: npm
        - run: npm ci
        - run: npm run lint
        - run: npm run build
  ```
- Ensure `npm run lint` exits cleanly (fix any remaining lint errors if they exist)
- Ensure `npm run build` exits cleanly (should already be passing from prior tasks)

**Acceptance Criteria:**
- [x] `.github/workflows/ci.yml` exists with lint + build steps
- [x] `npm run lint` exits with code 0 (no lint errors)
- [x] `npm run build` exits with code 0 (no build errors)
- [x] The workflow YAML is valid (no syntax errors)
- [x] The workflow triggers on push to `main` and on pull requests to `main`

**Status:** ✅ Complete
Do not go to next task unless ALL criteria for the current task are ✅ complete and marked true ✅ in the checklist in the tasks.md file.

---

## Task 11: Final Validation & Pre-Launch Checklist

**Description:**
Run a full validation pass across the entire project to confirm everything works end-to-end.

**Implementation Details:**
- Run `npm run build` — must complete with zero errors and zero warnings
- Run `npm run preview` — manually verify:
  - Home page loads with correct `<title>` and meta tags
  - Navigate to all 14 routes — no 404s, no blank pages
  - Open and close InquiryModal — focus trap works, Escape closes
  - Submit contact form — loading state appears, toast shows (success or graceful error if no backend running)
  - Submit newsletter — same behavior
  - Tab through the page with keyboard only — skip link works, modals trap focus
  - Check `<head>` for JSON-LD on Home, Product Detail, and Case Study pages
  - Open `/sitemap.xml` — renders valid XML
- Check `dist/` folder to confirm code-split chunks exist (multiple JS files, not one monolith)
- Search codebase for any remaining issues:
  - `grep -r "setTimeout" src/` — no form submission mocks
  - `grep -r "alert(" src/` — no alert() calls
  - `grep -r "alt-hidden" src/` — no typos
  - `grep -r "Lorem ipsum" src/` — no placeholder text
  - `grep -r "TODO" src/` — document any remaining TODOs

**Acceptance Criteria:**
- [x] `npm run build` — zero errors, zero warnings
- [x] `npm run preview` — all 14 routes render correctly
- [x] Browser tab shows unique title per page
- [x] InquiryModal focus trap works (Tab stays inside, Escape closes)
- [x] Contact form shows loading → success/error toast (no setTimeout mock)
- [x] Newsletter form shows loading → success/error toast (no setTimeout mock)
- [x] Skip-to-main link is focusable and scrolls to main content
- [x] `/sitemap.xml` is accessible and valid
- [x] JSON-LD script tags are present in `<head>` on Home, Product Detail, Case Study pages
- [x] No `alert()`, `alt-hidden`, `setTimeout` mocks, or `Lorem ipsum` remain in `src/`
- [x] `dist/` contains multiple JS chunks (evidence of code splitting) — 47 chunks
- [x] All remaining TODOs are documented in a `TODO.md` or removed

**Status:** ✅ Complete
Do not go to next task unless ALL criteria for the current task are ✅ complete and marked true ✅ in the checklist in the tasks.md file.
