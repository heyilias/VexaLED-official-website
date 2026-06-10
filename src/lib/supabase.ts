import { createClient } from "@supabase/supabase-js";

/**
 * Browser-side Supabase client.
 *
 * Reads keys with either the `VITE_*` or `NEXT_PUBLIC_*` prefix
 * (vite.config.ts exposes both). Anon key is safe in the browser —
 * Row-Level Security in supabase/schema.sql restricts what it can do
 * (anonymous can only INSERT into `leads`, nothing else).
 */
const rawUrl =
  import.meta.env.VITE_SUPABASE_URL ?? import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Defensive: the dashboard sometimes shows the RESTful endpoint
// (https://xxx.supabase.co/rest/v1/) instead of the project URL. The JS client
// adds /rest/v1/ itself, so we strip a trailing /rest/v1[/] and trailing slash.
const url = rawUrl
  ? String(rawUrl)
      .trim()
      .replace(/\/rest\/v1\/?$/i, "")
      .replace(/\/+$/, "")
  : undefined;

if (!url || !anonKey) {
  // Fail loudly in development so missing env vars are caught immediately.
  // In production we still create the client (it'll return a 401 on calls)
  // so the site doesn't crash on missing keys.
  console.warn(
    "[supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY (or NEXT_PUBLIC_* equivalents). Lead submissions will fail. See supabase/SETUP.md.",
  );
}

export const supabase = createClient(url ?? "https://placeholder.supabase.co", anonKey ?? "placeholder", {
  auth: { persistSession: false, autoRefreshToken: false },
});

export function isSupabaseConfigured(): boolean {
  return Boolean(url && anonKey);
}
