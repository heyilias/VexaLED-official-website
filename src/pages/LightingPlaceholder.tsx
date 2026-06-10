import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";

const LightingPlaceholder = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  return (
    <main id="main-content" className="min-h-screen bg-[#0a0a0f]">
      <SEOHead
        title="Lighting Products"
        description="VEXALED's professional lighting product line is coming soon. Stay tuned for innovative LED lighting solutions."
      />
      <Navbar onSearchClick={openSearch} isSearchOpen={isSearchOpen} onCloseSearch={closeSearch} />

      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="h-full w-full bg-gradient-to-b from-black via-[#0a0a0f] to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(204,255,0,0.05)_0%,transparent_65%)]" />
        </div>

        {/* Grid lines */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Animated glyph */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <div className="relative flex h-24 w-24 items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-[#CCFF00]/10"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-dashed border-[#CCFF00]/15"
              />
              <span className="text-3xl text-[#CCFF00]/60 select-none">✦</span>
            </div>
          </motion.div>

          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="mb-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/20"
          >
            <Link to="/" className="hover:text-white/40 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products/led-screens" className="hover:text-white/40 transition-colors">Products</Link>
            <span>/</span>
            <span className="text-white/35">Lighting</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 flex items-center gap-3"
          >
            <div className="h-px w-8 bg-[#CCFF00]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#CCFF00]">Coming Soon</span>
            <div className="h-px w-8 bg-[#CCFF00]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
          >
            Lighting
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.55 }}
            className="mb-12 max-w-md text-base leading-relaxed text-white/35"
          >
            Our lighting product line is coming soon. VEXALED is developing a new range of professional LED lighting solutions — engineered to the same standards as our display products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center gap-4"
          >
            <Link
              to="/products/led-screens"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white/55 backdrop-blur-md transition-all hover:border-white/20 hover:text-white"
            >
              Browse LED Screens
            </Link>
            <Link
              to="/"
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/25 transition-colors hover:text-[#CCFF00]"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      {isSearchOpen && <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />}
    </main>
  );
};

export default LightingPlaceholder;
