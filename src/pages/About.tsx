import { useState, useCallback } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConfigurationCTA from "@/components/ConfigurationCTA";
import SearchOverlay from "@/components/SearchOverlay";
import { ArrowLeft, Check } from "lucide-react";
import { usePageTranslations } from "@/i18n/usePageTranslations";

const About = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pt = usePageTranslations();
  const t = pt.about;

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  const aboutData: Record<string, typeof t.overviewPage> = {
    overview: t.overviewPage,
  };

  const page = slug ? aboutData[slug] : null;

  if (!slug || !page) {
    return <Navigate to="/about" replace />;
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar onSearchClick={openSearch} isSearchOpen={isSearchOpen} onCloseSearch={closeSearch} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/30 bg-card/20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent" />
        <div className="container-wide relative mx-auto px-5 pt-24 pb-12 md:px-8 md:pt-28 md:pb-16 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
            <Link to="/about" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
              {t.backToAboutUs}
            </Link>
          </motion.div>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/40 bg-card shadow-xl">
              <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop" alt={page.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <span className="mb-4 inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">{page.tag}</span>
              <h1 className="mb-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">{page.title}</h1>
              <p className="text-lg text-muted-foreground md:text-xl">{page.longDescription}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="section-padding bg-background">
        <div className="container-wide mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {t.atAGlance}
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {page.specs.map((spec, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border/40 bg-card/50 px-5 py-4">
                <span className="text-sm text-muted-foreground">{spec.label}</span>
                <span className="font-medium text-foreground">{spec.value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key points */}
      <section className="section-padding border-t border-border/30 bg-card/20">
        <div className="container-wide mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {t.keyPoints}
          </motion.h2>
          <motion.ul initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid gap-3 sm:grid-cols-2">
            {page.points.map((point, i) => (
              <li key={i} className="flex items-center gap-3 rounded-lg border border-border/40 bg-card/30 px-4 py-3">
                <Check className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-foreground">{point}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      <ConfigurationCTA />
      <Footer />

      <AnimatePresence>
        {isSearchOpen && <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />}
      </AnimatePresence>
    </main>
  );
};

export default About;
