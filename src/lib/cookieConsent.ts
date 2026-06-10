/**
 * Lightweight GDPR cookie consent store.
 *
 * Architecture
 *  - Single source of truth in localStorage under one key.
 *  - In-memory pubsub so React components re-render when consent changes.
 *  - The `version` field is bumped if categories change → re-prompts users.
 *
 * Why custom (not a library):
 *  - ~150 LOC total. No external runtime dependency, no monthly SaaS fee.
 *  - Fully brand-matched UI (built in components/CookieBanner.tsx).
 *  - The user can replace it with Klaro / Cookiebot later without changing
 *    the call sites: components just check `hasConsent("analytics")`.
 */

import { useEffect, useSyncExternalStore } from "react";

export type CookieCategory = "necessary" | "functional" | "analytics" | "marketing";

export interface ConsentState {
  necessary: true;            // always on — required for the site to function
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  /** ISO timestamp when the user last made an explicit choice */
  decidedAt: string | null;
  /** Bumped when we change category definitions → invalidates old consent */
  version: number;
}

const STORAGE_KEY = "vexaled.cookieConsent";
export const CONSENT_VERSION = 1;

const defaultState: ConsentState = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
  decidedAt: null,
  version: CONSENT_VERSION,
};

// ── Storage helpers ──────────────────────────────────────────────────────────
function read(): ConsentState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as ConsentState;
    // Force-reset if the consent schema bumped.
    if (parsed.version !== CONSENT_VERSION) return defaultState;
    return { ...defaultState, ...parsed, necessary: true };
  } catch {
    return defaultState;
  }
}

function write(state: ConsentState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ── Pubsub for React subscriptions ───────────────────────────────────────────
const listeners = new Set<() => void>();
function notify() {
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

// ── Public API ───────────────────────────────────────────────────────────────
export function getConsent(): ConsentState {
  return read();
}

export function hasConsent(category: CookieCategory): boolean {
  return read()[category] === true;
}

export function hasDecided(): boolean {
  return read().decidedAt !== null;
}

export function acceptAll() {
  write({
    necessary: true,
    functional: true,
    analytics: true,
    marketing: true,
    decidedAt: new Date().toISOString(),
    version: CONSENT_VERSION,
  });
  notify();
}

export function rejectAll() {
  write({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
    decidedAt: new Date().toISOString(),
    version: CONSENT_VERSION,
  });
  notify();
}

export function savePreferences(prefs: { functional?: boolean; analytics?: boolean; marketing?: boolean }) {
  const current = read();
  write({
    necessary: true,
    functional: prefs.functional ?? current.functional,
    analytics: prefs.analytics ?? current.analytics,
    marketing: prefs.marketing ?? current.marketing,
    decidedAt: new Date().toISOString(),
    version: CONSENT_VERSION,
  });
  notify();
}

export function resetConsent() {
  if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
  notify();
}

// ── React hook ───────────────────────────────────────────────────────────────
export function useCookieConsent() {
  // useSyncExternalStore makes React re-render whenever notify() fires.
  return useSyncExternalStore(subscribe, getConsent, () => defaultState);
}

/**
 * Convenience hook: returns true once the page has hydrated AND the user has
 * granted consent to the given category. Use to gate analytics/marketing tags.
 */
export function useHasConsent(category: CookieCategory): boolean {
  const state = useCookieConsent();
  return state[category] === true;
}

/**
 * Listen for a custom "open preferences" event so footer/text links elsewhere
 * can re-open the modal without needing prop-drilling.
 */
export const OPEN_PREFERENCES_EVENT = "vexaled:open-cookie-preferences";

export function openCookiePreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}

export function useOnOpenPreferences(handler: () => void) {
  useEffect(() => {
    window.addEventListener(OPEN_PREFERENCES_EVENT, handler);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, handler);
  }, [handler]);
}
