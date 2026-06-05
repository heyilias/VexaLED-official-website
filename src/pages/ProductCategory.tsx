import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown, Home } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";
import { getProductCategories, getApplicationFilters, getPixelPitchFilters, type Product } from "@/data/productCategoryData";

const FilterDropdown = ({ label, options, value, onChange, isOpen, onToggle, onClose }: {
  label: string; options: { value: string; label: string }[]; value: string;
  onChange: (v: string) => void; isOpen: boolean; onToggle: () => void; onClose: () => void;
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedLabel = options.find((o) => o.value === value)?.label ?? label;
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) onClose(); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={onToggle} className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-white/70 backdrop-blur-md transition-all hover:border-white/25 hover:bg-white/10 hover:text-white min-w-[180px] justify-between">
        <span>{selectedLabel}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.97 }} transition={{ duration: 0.2 }} className="absolute top-full left-0 mt-2 w-full overflow-hidden rounded-xl border border-white/15 bg-black/90 shadow-2xl backdrop-blur-xl z-30">
            {options.map((opt) => (
              <button key={opt.value} onClick={() => { onChange(opt.value); onClose(); }} className={`w-full px-5 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors ${value === opt.value ? "bg-primary/15 text-primary" : "text-white/60 hover:bg-white/5 hover:text-white"}`}>
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductCategory = () => {
  const { category } = useParams<{ category: string }>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [applicationFilter, setApplicationFilter] = useState("all");
  const [pixelPitchFilter, setPixelPitchFilter] = useState("all");
  const [isAppDropdownOpen, setIsAppDropdownOpen] = useState(false);
  const [isPitchDropdownOpen, setIsPitchDropdownOpen] = useState(false);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  const productCategories = useMemo(() => getProductCategories(), []);
  const applicationFilters = useMemo(() => getApplicationFilters(), []);
  const pixelPitchFilters = useMemo(() => getPixelPitchFilters(), []);

  const categoryData = category ? productCategories[category] : null;

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.7], [0, -60]);

  const filteredProducts = useMemo(() => {
    if (!categoryData) return [];
    return categoryData.products.filter((product: Product) => {
      const matchesApp = applicationFilter === "all" || product.application === applicationFilter;
      const matchesPitch = pixelPitchFilter === "all" || product.pixelPitch === pixelPitchFilter;
      return matchesApp && matchesPitch;
    });
  }, [categoryData, applicationFilter, pixelPitchFilter]);

  if (!category || !categoryData) return <Navigate to="/" replace />;

  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        title={`${categoryData.name} LED Displays`}
        description={categoryData.description ?? `Browse VexaLED's ${categoryData.name} LED display range. Professional-grade screens with industry-leading brightness, resolution, and reliability.`}
      />
      <Navbar onSearchClick={openSearch} isSearchOpen={isSearchOpen} onCloseSearch={closeSearch} />

      {/* HERO */}
      <section ref={heroRef} className="relative z-20 flex h-[75vh] min-h-[560px] w-full flex-col items-center justify-center overflow-hidden bg-black">
        <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
          <img src={categoryData.heroImage} alt="" aria-hidden="true" className="h-full w-full object-cover opacity-30" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/80" />
        <motion.div className="relative z-10 flex flex-col items-center text-center px-6" style={{ opacity: contentOpacity, y: contentY }}>
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-10 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/30">
            <Link to="/" className="transition-colors hover:text-white/60"><Home className="h-3 w-3" /></Link>
            <span>/</span><span>Products</span><span>/</span><span className="text-white/50">{categoryData.title}</span>
          </motion.nav>
          <motion.h1 className="font-display text-5xl font-bold tracking-[0.2em] text-white md:text-6xl lg:text-7xl xl:text-8xl" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }}>
            {categoryData.title}
          </motion.h1>
          <motion.div className="my-7 h-px w-16 bg-white/20" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.7 }} />
          <motion.p className="max-w-xl text-sm font-light tracking-widest uppercase text-white/45 md:text-base" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }}>
            {categoryData.heroSubtitle}
          </motion.p>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* PRODUCT GRID */}
      <section className="relative z-10 pb-20 md:pb-28">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mb-10 flex flex-wrap items-center gap-3">
            <FilterDropdown label="Application" options={applicationFilters} value={applicationFilter} onChange={setApplicationFilter} isOpen={isAppDropdownOpen} onToggle={() => { setIsAppDropdownOpen(p => !p); setIsPitchDropdownOpen(false); }} onClose={() => setIsAppDropdownOpen(false)} />
            <FilterDropdown label="Pixel Pitch" options={pixelPitchFilters} value={pixelPitchFilter} onChange={setPixelPitchFilter} isOpen={isPitchDropdownOpen} onToggle={() => { setIsPitchDropdownOpen(p => !p); setIsAppDropdownOpen(false); }} onClose={() => setIsPitchDropdownOpen(false)} />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-10 flex items-center justify-between border-b border-border/30 pb-4">
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}</p>
            {(applicationFilter !== "all" || pixelPitchFilter !== "all") && (
              <button onClick={() => { setApplicationFilter("all"); setPixelPitchFilter("all"); }} className="text-xs uppercase tracking-[0.15em] text-primary hover:text-foreground transition-colors">Clear Filters</button>
            )}
          </motion.div>

          {filteredProducts.length > 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredProducts.map((product: Product, index: number) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                  <Link to={`/products/${category}/${product.slug}`} className="group relative flex flex-col h-full overflow-hidden rounded-xl bg-black border border-white/[0.06] transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_40px_-12px_rgba(212,255,0,0.15)]">
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-white/[0.03] to-transparent">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-60" />
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                      />
                      {/* Floating badge */}
                      <div className="absolute top-3 left-3 z-20">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-primary">
                          <span className="h-1 w-1 rounded-full bg-primary animate-pulse" />
                          {product.pixelPitch === 'fine' ? 'Fine Pitch' : product.pixelPitch === 'standard' ? 'Standard' : 'Coarse'}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative flex flex-col flex-1 p-5">
                      <div className="mb-3">
                        <h3 className="font-display text-base font-semibold tracking-tight text-white/90 transition-colors group-hover:text-primary mb-1">{product.name}</h3>
                        <p className="text-[11px] uppercase tracking-wider text-white/30">{product.application}</p>
                      </div>

                      {/* Specs row */}
                      <div className="mt-auto pt-3 border-t border-white/[0.06] flex items-center justify-between">
                        <span className="text-xs text-white/40">View Details</span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.05] border border-white/[0.08] transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-black">
                          <svg className="h-3.5 w-3.5 text-white/60 transition-colors group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)' }} />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="text-muted-foreground text-lg mb-4">No products match the current filters.</p>
              <button onClick={() => { setApplicationFilter("all"); setPixelPitchFilter("all"); }} className="text-sm uppercase tracking-widest text-primary hover:text-foreground transition-colors">Clear Filters</button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
      <AnimatePresence>{isSearchOpen && <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />}</AnimatePresence>
    </main>
  );
};

export default ProductCategory;
