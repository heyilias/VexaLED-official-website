import { useState, useCallback, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";
import { getProductCategories, getApplicationFilters, getPixelPitchFilters, type Product } from "@/data/productCategoryData";

const SUBGROUP_ORDER = ["Indoor", "Outdoor", "Poster"];

const LedScreens = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [applicationFilter, setApplicationFilter] = useState("all");
  const [pixelPitchFilter, setPixelPitchFilter] = useState("all");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -50]);

  const categories = useMemo(() => getProductCategories(), []);
  const applicationFilters = useMemo(() => getApplicationFilters(), []);
  const pixelPitchFilters = useMemo(() => getPixelPitchFilters(), []);

  const ledScreensData = categories["led-screens"];

  const groupedProducts = useMemo(() => {
    if (!ledScreensData) return [];
    return SUBGROUP_ORDER.map(label => {
      const group = ledScreensData.subGroups.find(g => g.label === label);
      if (!group || group.comingSoon) return null;
      const filtered = group.products.filter((p: Product) => {
        const matchApp = applicationFilter === "all" || p.application === applicationFilter;
        const matchPitch = pixelPitchFilter === "all" || p.pixelPitch === pixelPitchFilter;
        return matchApp && matchPitch;
      });
      return { label, slug: group.slug, products: filtered };
    }).filter(Boolean) as { label: string; slug: string; products: Product[] }[];
  }, [ledScreensData, applicationFilter, pixelPitchFilter]);

  const totalCount = groupedProducts.reduce((sum, g) => sum + g.products.length, 0);

  return (
    <main id="main-content" className="min-h-screen bg-[#0a0a0f]">
      <SEOHead
        title="LED Screen Products"
        description="Browse VEXALED's complete range of professional LED screen products — indoor fine pitch, outdoor rental, poster displays, and more."
      />
      <Navbar onSearchClick={openSearch} isSearchOpen={isSearchOpen} onCloseSearch={closeSearch} />

      {/* Hero */}
      <section ref={heroRef} className="relative z-20 flex h-[65vh] min-h-[500px] w-full flex-col items-center justify-center overflow-hidden bg-black">
        <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
          {/* TODO: Replace with hero image */}
          <div className="h-full w-full bg-gradient-to-br from-neutral-900 via-black to-neutral-950" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(204,255,0,0.06)_0%,transparent_70%)]" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90" />

        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative z-10 flex flex-col items-center text-center px-6"
        >
          <motion.nav
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="mb-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/30"
          >
            <Link to="/" className="hover:text-white/60 transition-colors">Home</Link>
            <span>/</span>
            <span>Products</span>
            <span>/</span>
            <span className="text-white/55">LED Screens</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-5 flex items-center gap-3"
          >
            <div className="h-px w-10 bg-[#CCFF00]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#CCFF00]">Products</span>
            <div className="h-px w-10 bg-[#CCFF00]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}
            className="font-display text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
          >
            LED Screens
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-5 max-w-lg text-sm font-light tracking-wide text-white/40 md:text-base"
          >
            Professional LED display solutions for every application — indoor, outdoor, and portable.
          </motion.p>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
      </section>

      {/* Filter bar */}
      <section className="sticky top-14 z-30 border-b border-white/[0.05] bg-[#0a0a0f]/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
          <div className="flex items-center gap-3 py-3">
            {/* Application filter */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === "app" ? null : "app")}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-widest text-white/55 transition-all hover:border-white/20 hover:text-white/80"
              >
                {applicationFilters.find(o => o.value === applicationFilter)?.label ?? "Application"}
                <ChevronDown className={`h-3 w-3 transition-transform ${openDropdown === "app" ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openDropdown === "app" && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1.5 min-w-[160px] overflow-hidden rounded-xl border border-white/10 bg-[#111114] shadow-2xl z-40"
                  >
                    {applicationFilters.map(opt => (
                      <button key={opt.value} onClick={() => { setApplicationFilter(opt.value); setOpenDropdown(null); }}
                        className={`w-full px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-widest transition-colors ${applicationFilter === opt.value ? "text-[#CCFF00] bg-[#CCFF00]/[0.06]" : "text-white/50 hover:text-white hover:bg-white/[0.04]"}`}>
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pixel pitch filter */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === "pitch" ? null : "pitch")}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-widest text-white/55 transition-all hover:border-white/20 hover:text-white/80"
              >
                {pixelPitchFilters.find(o => o.value === pixelPitchFilter)?.label ?? "Pixel Pitch"}
                <ChevronDown className={`h-3 w-3 transition-transform ${openDropdown === "pitch" ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openDropdown === "pitch" && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1.5 min-w-[180px] overflow-hidden rounded-xl border border-white/10 bg-[#111114] shadow-2xl z-40"
                  >
                    {pixelPitchFilters.map(opt => (
                      <button key={opt.value} onClick={() => { setPixelPitchFilter(opt.value); setOpenDropdown(null); }}
                        className={`w-full px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-widest transition-colors ${pixelPitchFilter === opt.value ? "text-[#CCFF00] bg-[#CCFF00]/[0.06]" : "text-white/50 hover:text-white hover:bg-white/[0.04]"}`}>
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {(applicationFilter !== "all" || pixelPitchFilter !== "all") && (
              <button onClick={() => { setApplicationFilter("all"); setPixelPitchFilter("all"); }}
                className="text-[11px] uppercase tracking-widest text-white/30 hover:text-[#CCFF00] transition-colors">
                Clear
              </button>
            )}

            <span className="ml-auto text-[11px] uppercase tracking-widest text-white/25">
              {totalCount} {totalCount === 1 ? "product" : "products"}
            </span>
          </div>
        </div>
      </section>

      {/* Product groups */}
      <section className="mx-auto max-w-7xl px-5 pb-28 pt-16 md:px-8 lg:px-10">
        {groupedProducts.every(g => g.products.length === 0) ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 gap-4 text-center">
            <p className="text-white/30 text-lg">No products match the current filters.</p>
            <button onClick={() => { setApplicationFilter("all"); setPixelPitchFilter("all"); }}
              className="text-[11px] uppercase tracking-widest text-[#CCFF00] hover:text-white transition-colors">
              Clear filters
            </button>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-20">
            {groupedProducts.map((group, gIdx) => group.products.length === 0 ? null : (
              <div key={group.label}>
                {/* Section heading */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5 }}
                  className="mb-8 flex items-center gap-4"
                >
                  <div className="h-px w-6 bg-[#CCFF00]" />
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#CCFF00]">{group.label}</h2>
                  <div className="h-px flex-1 bg-white/[0.06]" />
                  <span className="text-[11px] text-white/20">{group.products.length} {group.products.length === 1 ? "product" : "products"}</span>
                </motion.div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.products.map((product, pIdx) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, delay: pIdx * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        to={`/products/led-screens/${product.slug}`}
                        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-500 hover:border-[#CCFF00]/25 hover:shadow-[0_0_40px_-12px_rgba(204,255,0,0.12)]"
                      >
                        {/* Thumbnail */}
                        <div className="relative aspect-[16/9] overflow-hidden bg-white/[0.03]">
                          {/* TODO: Replace with product image */}
                          <div className="h-full w-full bg-gradient-to-br from-white/[0.04] to-transparent" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white/[0.06] text-5xl font-bold tracking-tighter select-none">
                              {product.name.split(" ")[0]}
                            </span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                          {/* Badge */}
                          <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest text-white/50 backdrop-blur-md">
                              {group.label}
                            </span>
                          </div>

                          {/* Variant badge */}
                          {product.variantTabs && product.variantTabs.length > 1 && (
                            <div className="absolute top-3 right-3">
                              <span className="inline-flex items-center rounded-full border border-[#CCFF00]/20 bg-[#CCFF00]/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest text-[#CCFF00]">
                                {product.variantTabs.length} variants
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex flex-1 flex-col p-5">
                          <h3 className="mb-1.5 text-[15px] font-semibold leading-snug text-white/90 transition-colors group-hover:text-[#CCFF00]">
                            {product.name}
                          </h3>
                          <p className="mb-4 text-[12px] leading-relaxed text-white/35 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="mt-auto flex items-center justify-between border-t border-white/[0.05] pt-3.5">
                            <span className="text-[10px] uppercase tracking-widest text-white/25">View details</span>
                            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] transition-all duration-300 group-hover:border-[#CCFF00]/40 group-hover:bg-[#CCFF00]/10">
                              <ArrowRight className="h-3 w-3 text-white/40 transition-colors group-hover:text-[#CCFF00]" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
      <AnimatePresence>{isSearchOpen && <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />}</AnimatePresence>
    </main>
  );
};

export default LedScreens;
