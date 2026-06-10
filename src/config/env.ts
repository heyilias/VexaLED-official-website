// Public, browser-safe env config. Anything sensitive must stay server-side.
// vite.config.ts exposes both `VITE_*` and `NEXT_PUBLIC_*` prefixes so the
// same keys can be used if the project is ever migrated to Next.js.

const env = {
  VITE_API_URL: import.meta.env.VITE_API_URL ?? 'http://localhost:3001',
  VITE_CONTACT_FORM_ENDPOINT: import.meta.env.VITE_CONTACT_FORM_ENDPOINT ?? 'http://localhost:3001/forms',
  VITE_ANALYTICS_ID: import.meta.env.VITE_ANALYTICS_ID ?? '',
  VITE_SITE_URL: import.meta.env.VITE_SITE_URL ?? 'http://localhost:5173',

  // Supabase (preferred VITE_*; falls back to NEXT_PUBLIC_* if you copied them in that form).
  SUPABASE_URL:
    import.meta.env.VITE_SUPABASE_URL ?? import.meta.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  SUPABASE_ANON_KEY:
    import.meta.env.VITE_SUPABASE_ANON_KEY ?? import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
} as const;

export type EnvConfig = typeof env;
export default env;
