import { useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";
import { ArrowRight, MapPin } from "lucide-react";
import { usePageTranslations } from "@/i18n/usePageTranslations";
import { getCaseStudies } from "@/data/caseStudyData";

const Reveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 36 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.215, 0.61, 0.355, 1] }} className={className}>
      {children}
    </motion.div>
  );
};

const CaseStudies = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pt = usePageTranslations();
  const t = pt.cases;

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  const studies = getCaseStudies();

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.7], [0, -50]);

  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        title="LED Display Case Studies"
        description="Explore VEXALED's real-world LED display installations across retail, corporate, sports, and entertainment venues worldwide."
      />
      <Navbar onSearchClick={openSearch} isSearchOpen={isSearchOpen} onCloseSearch={closeSearch} />

      {/* HERO */}
      <section ref={heroRef} className="relative flex h-[70vh] min-h-[520px] w-full items-center overflow-hidden bg-black">
        <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
          <img src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1920&h=1080&fit=crop" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-35" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/80" />
        <motion.div className="container-wide relative z-10 mx-auto px-5 md:px-8 lg:px-10" style={{ opacity: contentOpacity, y: contentY }}>
          <motion.span className="mb-6 inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-white/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>{t.heroTag}</motion.span>
          <motion.h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}>{t.heroTitle}</motion.h1>
          <motion.div className="my-6 h-px w-16 bg-white/20" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.6 }} style={{ transformOrigin: "left" }} />
          <motion.p className="max-w-xl text-base leading-[1.8] text-white/55 md:text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>{t.heroDescription}</motion.p>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* INTRODUCTION */}
      <section className="py-20 md:py-28">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-xl leading-[1.8] text-muted-foreground md:text-2xl">{t.introText}</p>
            <p className="mt-6 text-base leading-[1.8] text-muted-foreground/70">{t.introSubtext}</p>
          </Reveal>
        </div>
      </section>

      {/* GRID */}
      <section className="pb-28 md:pb-36">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <div className="mb-14 border-t border-border/30" />
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
            {studies.map((study, i) => (
              <Reveal key={study.slug} delay={i * 0.08}>
                <Link to={`/case-study/${study.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                    <img src={study.image} alt={study.title} className="h-full w-full object-cover transition-transform duration-[1s] ease-out group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                  <div className="mt-6 flex items-center gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/70">{study.tag}</span>
                    <span className="h-3 w-px bg-border/50" />
                    <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground/60">
                      <MapPin className="h-3 w-3" />{study.location}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold text-foreground transition-colors group-hover:text-primary md:text-2xl">{study.title}</h3>
                  <p className="mt-3 text-sm leading-[1.75] text-muted-foreground line-clamp-2">{study.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-primary/70 transition-colors group-hover:text-primary">
                    {t.viewProject}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3} className="mt-20 text-center">
            <p className="text-sm text-muted-foreground/50">{t.comingSoon}</p>
          </Reveal>
        </div>
      </section>

      <Footer />
      <AnimatePresence>{isSearchOpen && <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />}</AnimatePresence>
    </main>
  );
};

export default CaseStudies;
