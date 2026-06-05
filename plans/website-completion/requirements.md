# Requirements — Website Launch Readiness

## Goal

The VexaLED website frontend is 70% complete — visually polished with all 14 pages/routes implemented, but missing critical backend integration, SEO infrastructure, accessibility compliance, and deployment configuration. The goal is to complete all remaining work so the site can go live in production without broken forms, poor search rankings, accessibility violations, or routing failures.

---

## Functional Requirements

- All forms (Contact/Product Inquiry, Newsletter Signup, Inquiry Modal) must submit data to real backend endpoints and provide proper success/error feedback to users
- Every page must have its own unique `<title>`, `<meta description>`, and Open Graph tags that update dynamically on route change
- JSON-LD structured data (Organization, Product, BreadcrumbList) must be present on relevant pages
- A valid `sitemap.xml` must be generated and placed in `/public/`
- A working OG image must exist at the URL referenced in meta tags
- SPA routing must work on direct URL access in production (no 404s on refresh)
- Modal components (InquiryModal, SearchOverlay) must trap focus while open
- A skip-to-main-content link must be present on every page
- Form inputs must have proper `<label>` associations
- ARIA live regions must announce toast/form feedback to screen readers
- The `alert()` call in the Configurator must be replaced with a toast or inline error
- The `alt-hidden` typo must be fixed to `aria-hidden`
- Below-fold images and video must use lazy loading
- Route-level code splitting must be implemented with `React.lazy()` and `Suspense`
- Environment variables (`VITE_API_URL`, `VITE_CONTACT_FORM_ENDPOINT`, `VITE_ANALYTICS_ID`) must be configurable via `.env`

## Non-Functional Requirements

- Lighthouse accessibility score ≥ 90 on all pages
- Lighthouse performance score ≥ 85 on all pages
- All forms must handle network errors gracefully (timeouts, 5xx, offline)
- Bundle size must not regress — unused dependencies (e.g., `@react-three/fiber` if unused) must be removed
- Build must complete with zero errors and zero warnings
- The site must render correctly on Chrome, Firefox, Safari, and Edge (latest versions)
- Mobile responsiveness must remain intact after all changes

## Dependencies

- `react-helmet-async` (or equivalent) — dynamic per-page meta tags
- `@tanstack/react-query` — already installed via QueryClientProvider, needs actual queries/mutations
- Backend API or serverless functions — for form submissions (Formspree, Resend, custom API, etc.)
- Hosting platform CLI/config — Vercel, Netlify, or equivalent for SPA routing support
- Vite environment variable system (`import.meta.env`)

## Out of Scope

- Full CMS or admin dashboard
- User authentication or account system
- E-commerce / payment processing
- Blog post authoring workflow
- Multilingual content completion (i18n structure exists but full translation is not in scope)
- PWA / service worker implementation
- Automated end-to-end testing suite
