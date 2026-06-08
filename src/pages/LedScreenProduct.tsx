import { useState, useCallback } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";
import { getProductBySlug, type ProductVariantTab } from "@/data/productCategoryData";

// ─── Shared specs grid ────────────────────────────────────────────────────────
const SharedSpecs = ({ specs }: { specs: { label: string; value: string }[] }) => (
  <div className="mt-8 grid grid-cols-2 gap-px rounded-xl overflow-hidden border border-white/[0.06] sm:grid-cols-3 lg:grid-cols-5">
    {specs.map((s, i) => (
      <div key={i} className="bg-white/[0.02] px-4 py-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1">{s.label}</p>
        <p className="text-[13px] font-medium text-white/80">{s.value}</p>
      </div>
    ))}
  </div>
);

// ─── Spec table (multi-column, variable width) ────────────────────────────────
const SpecTable = ({ tab }: { tab: ProductVariantTab }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] border-collapse text-[12px]">
        <thead>
          <tr className="border-b border-white/[0.08]">
            <th className="py-3 pr-4 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25 w-[38%]">
              Parameter
            </th>
            {tab.pitchColumns.map((col, i) => (
              <th key={i} className="py-3 px-2 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-[#CCFF00]">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tab.rows.map((row, rIdx) => (
            <tr
              key={rIdx}
              className={`border-b border-white/[0.04] transition-colors hover:bg-white/[0.02] ${rIdx % 2 === 0 ? "" : "bg-white/[0.01]"}`}
            >
              <td className="py-3 pr-4 text-white/50">{row.label}</td>
              {row.values.map((val, vIdx) => (
                <td key={vIdx} className="py-3 px-2 text-center font-medium text-white/80">
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ─── Features list ────────────────────────────────────────────────────────────
const FeaturesList = ({ features }: { features: string[] }) => (
  <ul className="space-y-2.5">
    {features.map((f, i) => (
      <motion.li
        key={i}
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: i * 0.06 }}
        className="flex items-start gap-3 text-[13px] leading-relaxed text-white/60"
      >
        <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#CCFF00]" />
        <span>{f}</span>
      </motion.li>
    ))}
  </ul>
);

// ─── Main page ────────────────────────────────────────────────────────────────
const LedScreenProduct = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  if (!slug) return <Navigate to="/products/led-screens" replace />;

  const product = getProductBySlug(slug);
  if (!product) return <Navigate to="/products/led-screens" replace />;

  const tabs = product.variantTabs ?? [];
  const hasVariants = tabs.length > 1;
  const activeVariant: ProductVariantTab | null = tabs[activeTab] ?? null;

  return (
    <main id="main-content" className="min-h-screen bg-[#0a0a0f]">
      <SEOHead
        title={product.name}
        description={product.description}
      />
      <Navbar onSearchClick={openSearch} isSearchOpen={isSearchOpen} onCloseSearch={closeSearch} />

      {/* Hero */}
      <section className="relative flex min-h-[60vh] flex-col justify-end overflow-hidden bg-black pb-16 pt-32">
        <div className="absolute inset-0">
          {/* TODO: Replace with product hero image */}
          <div className="h-full w-full bg-gradient-to-br from-neutral-900 via-black to-neutral-950" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(204,255,0,0.04)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-black/40 to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/25">
            <Link to="/" className="hover:text-white/50 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products/led-screens" className="hover:text-white/50 transition-colors">LED Screens</Link>
            <span>/</span>
            <span className="text-white/50">{product.name}</span>
          </nav>

          {/* Sub-group badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="mb-4 flex items-center gap-2"
          >
            <div className="h-px w-6 bg-[#CCFF00]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#CCFF00]">
              {product.subGroup === "indoor" ? "Indoor" : product.subGroup === "outdoor" ? "Outdoor" : "Poster"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            {product.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl text-base leading-relaxed text-white/45"
          >
            {product.description}
          </motion.p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 pb-28 pt-16 md:px-8 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_380px]">

          {/* Left — specs */}
          <div>
            {/* Variant tabs (only when >1 variant) */}
            {hasVariants && (
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="mb-10"
              >
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/25">Cabinet Size</p>
                <div className="flex flex-wrap gap-2">
                  {tabs.map((tab, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab(i)}
                      className={`rounded-lg border px-4 py-2 text-[12px] font-semibold transition-all duration-200 ${
                        activeTab === i
                          ? "border-[#CCFF00]/50 bg-[#CCFF00]/10 text-[#CCFF00]"
                          : "border-white/[0.08] bg-transparent text-white/45 hover:border-white/20 hover:text-white/70"
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Spec content */}
            <AnimatePresence mode="wait">
              {activeVariant ? (
                <motion.div
                  key={activeVariant.name}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {activeVariant.description && (
                    <p className="mb-6 text-[13px] leading-relaxed text-white/40">{activeVariant.description}</p>
                  )}

                  <div className="mb-2 flex items-center gap-3">
                    <div className="h-px w-4 bg-[#CCFF00]" />
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/25">Specifications</p>
                  </div>

                  <SpecTable tab={activeVariant} />

                  {/* Shared specs */}
                  <div className="mt-10">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="h-px w-4 bg-white/20" />
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/25">Common Specifications</p>
                    </div>
                    <SharedSpecs specs={activeVariant.sharedSpecs} />
                  </div>
                </motion.div>
              ) : (
                <motion.div key="no-specs" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="rounded-xl border border-white/[0.05] p-12 text-center">
                  <p className="text-white/25">Specifications coming soon.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right — product image + features */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
            {/* Product image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]"
            >
              {/* TODO: Replace with product image */}
              <div className="h-full w-full bg-gradient-to-br from-white/[0.04] via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/[0.05] text-6xl font-bold tracking-tighter select-none text-center px-4">
                  {product.name}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-[9px] font-semibold uppercase tracking-widest text-white/20">
                  {/* TODO: Replace with product image */}
                  Product render coming soon
                </p>
              </div>
            </motion.div>

            {/* Features — shown when variant is selected or product has single variant */}
            <AnimatePresence mode="wait">
              {activeVariant && activeVariant.features.length > 0 && (
                <motion.div
                  key={`features-${activeVariant.name}`}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <div className="h-px w-4 bg-[#CCFF00]" />
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/30">Key Features</p>
                  </div>
                  <FeaturesList features={activeVariant.features} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Back link */}
            <Link
              to="/products/led-screens"
              className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/25 transition-colors hover:text-[#CCFF00]"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              All LED Screens
            </Link>
          </div>
        </div>
      </div>

      <Footer />
      <AnimatePresence>{isSearchOpen && <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />}</AnimatePresence>
    </main>
  );
};

export default LedScreenProduct;
