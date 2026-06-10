"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Settings2, X, Check } from "lucide-react";
import { Link } from "react-router-dom";
import {
  acceptAll,
  rejectAll,
  savePreferences,
  hasDecided,
  getConsent,
  useOnOpenPreferences,
} from "@/lib/cookieConsent";

/**
 * GDPR cookie consent UI.
 *
 *  - Banner appears on first visit (or after `resetConsent()` is called).
 *  - Three actions: Accept all / Reject all / Customize.
 *  - "Customize" opens a modal with per-category toggles.
 *  - Footer "Cookie preferences" link re-opens the modal at any time
 *    via the custom `openCookiePreferences()` event.
 *
 * Design: brand-matched, restrained motion, doesn't block page content
 * (positioned bottom-center), works with keyboard (Esc closes modal).
 */
export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Per-category toggle state in the modal.
  const [functional, setFunctional] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  // On mount: only show the banner if no decision has been recorded.
  useEffect(() => {
    if (!hasDecided()) setShowBanner(true);
  }, []);

  // Allow other places (e.g. footer link, cookie-policy page) to re-open.
  useOnOpenPreferences(() => {
    const current = getConsent();
    setFunctional(current.functional);
    setAnalytics(current.analytics);
    setShowModal(true);
  });

  // Esc closes the modal.
  useEffect(() => {
    if (!showModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showModal]);

  const onAcceptAll = () => {
    acceptAll();
    setShowBanner(false);
    setShowModal(false);
  };
  const onRejectAll = () => {
    rejectAll();
    setShowBanner(false);
    setShowModal(false);
  };
  const onCustomize = () => {
    const current = getConsent();
    setFunctional(current.functional);
    setAnalytics(current.analytics);
    setShowModal(true);
  };
  const onSavePreferences = () => {
    savePreferences({ functional, analytics, marketing: false });
    setShowBanner(false);
    setShowModal(false);
  };

  return (
    <>
      {/* ── Banner ───────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-4 left-1/2 z-[90] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2"
            role="region"
            aria-label="Cookie consent"
          >
            <div
              className="rounded-2xl border border-border/30 shadow-2xl backdrop-blur-xl p-5 md:p-6"
              style={{ backgroundColor: "rgba(10,10,15,0.92)" }}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="flex items-start gap-3 flex-1">
                  <div className="shrink-0 h-9 w-9 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
                    <Cookie className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-foreground leading-relaxed">
                      We use cookies to operate this site and, with your consent, to measure how it's used.
                      You can accept, reject, or choose categories. Read our{" "}
                      <Link to="/legal/cookies" className="text-primary hover:underline">
                        Cookie Policy
                      </Link>
                      .
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3 md:shrink-0">
                  <button
                    onClick={onCustomize}
                    className="inline-flex items-center gap-2 rounded-lg border border-border/40 px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground hover:border-border/60 transition-colors"
                  >
                    <Settings2 className="h-3.5 w-3.5" />
                    Customize
                  </button>
                  <button
                    onClick={onRejectAll}
                    className="rounded-lg border border-border/40 px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground hover:border-border/60 transition-colors"
                  >
                    Reject all
                  </button>
                  <button
                    onClick={onAcceptAll}
                    className="rounded-lg bg-primary px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Accept all
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Preferences modal ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-prefs-title"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl rounded-2xl border border-border/20 p-6 md:p-8 shadow-2xl"
              style={{ backgroundColor: "#0a0a0f" }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-muted/30"
                aria-label="Close cookie preferences"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>

              <div className="mb-6">
                <h2 id="cookie-prefs-title" className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
                  Cookie preferences
                </h2>
                <p className="text-sm text-muted-foreground">
                  Choose which categories to allow. You can change this at any time via the
                  "Cookie preferences" link in the footer.
                </p>
              </div>

              <div className="space-y-3">
                <CategoryRow
                  title="Strictly necessary"
                  description="Required for the site to function — session, consent choice, security tokens. Cannot be switched off."
                  enabled
                  locked
                />
                <CategoryRow
                  title="Functional"
                  description="Remember preferences such as language and region. Used only if you allow this category."
                  enabled={functional}
                  onToggle={setFunctional}
                />
                <CategoryRow
                  title="Analytics"
                  description="Anonymous aggregated statistics about how visitors use the site (pages, sessions, sources)."
                  enabled={analytics}
                  onToggle={setAnalytics}
                />
                <CategoryRow
                  title="Marketing"
                  description="Third-party advertising or retargeting. We do not currently use any cookies in this category."
                  enabled={false}
                  locked
                  disabledNote="Not in use"
                />
              </div>

              <div className="mt-7 flex flex-wrap gap-3 justify-end">
                <button
                  onClick={onRejectAll}
                  className="rounded-lg border border-border/40 px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground hover:border-border/60 transition-colors"
                >
                  Reject all
                </button>
                <button
                  onClick={onSavePreferences}
                  className="rounded-lg border border-primary/40 bg-primary/10 px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-primary hover:bg-primary/20 transition-colors"
                >
                  Save preferences
                </button>
                <button
                  onClick={onAcceptAll}
                  className="rounded-lg bg-primary px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Accept all
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CategoryRow({
  title,
  description,
  enabled,
  locked = false,
  disabledNote,
  onToggle,
}: {
  title: string;
  description: string;
  enabled: boolean;
  locked?: boolean;
  disabledNote?: string;
  onToggle?: (v: boolean) => void;
}) {
  return (
    <div
      className={`flex items-start gap-4 rounded-xl border border-border/20 p-4 ${
        locked ? "opacity-90" : "hover:border-border/40 transition-colors"
      }`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-medium text-foreground">{title}</h3>
          {locked && enabled && (
            <span className="text-[10px] uppercase tracking-wider text-primary/70 px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20">
              Always on
            </span>
          )}
          {locked && !enabled && disabledNote && (
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground px-1.5 py-0.5 rounded bg-muted/10 border border-border/20">
              {disabledNote}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => !locked && onToggle?.(!enabled)}
        disabled={locked}
        aria-checked={enabled}
        role="switch"
        aria-label={title}
        className={`shrink-0 mt-0.5 relative h-6 w-11 rounded-full transition-colors ${
          enabled ? "bg-primary" : "bg-muted/40"
        } ${locked ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            enabled ? "translate-x-[22px]" : "translate-x-0.5"
          } flex items-center justify-center`}
        >
          {enabled && <Check className="h-3 w-3 text-primary" />}
        </span>
      </button>
    </div>
  );
}
