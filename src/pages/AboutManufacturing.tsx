import { useState, useCallback, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";
import { AnimatePresence } from "framer-motion";
import { usePageTranslations } from "@/i18n/usePageTranslations";
import { Cpu, Layers, Box, Ruler, Microscope, Thermometer, Activity, Zap, ShieldCheck, CheckCircle2, ArrowRight, Settings } from "lucide-react";

const Reveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay, ease: [0.215, 0.61, 0.355, 1] }} className={className}>
      {children}
    </motion.div>
  );
};

const capabilityIcons = [Cpu, Layers, Box, Ruler];
const testingIcons = [Microscope, Thermometer, Activity, Zap];

const AboutManufacturing = () => {
  const pt = usePageTranslations();
  const t = pt.manufacturing;

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="min-h-screen bg-black font-sans selection:bg-primary/20 text-foreground">
      <Navbar onSearchClick={openSearch} isSearchOpen={isSearchOpen} onCloseSearch={closeSearch} />

      {/* HERO */}
      <section ref={heroRef} className="relative flex h-[85vh] min-h-[600px] w-full items-center justify-center overflow-hidden bg-black">
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&h=1080&fit=crop" alt="Manufacturing" className="h-full w-full object-cover opacity-50 grayscale" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
        <motion.div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto" style={{ opacity: heroOpacity }}>
          <Reveal>
            <span className="mb-6 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary/80 backdrop-blur-sm">{t.hero.tag}</span>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-7xl mb-6">
              {t.hero.title}<br /><span className="text-white/40">{t.hero.subtitle}</span>
            </h1>
            <p className="max-w-2xl text-lg font-light leading-relaxed text-slate-300 md:text-xl">{t.hero.description}</p>
          </Reveal>
        </motion.div>
        <motion.div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">{t.hero.scroll}</span>
          <motion.div className="h-12 w-px bg-gradient-to-b from-white/30 to-transparent" animate={{ scaleY: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
      </section>

      {/* CAPABILITIES */}
      <section className="py-24 bg-neutral-950 border-t border-white/5">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <Reveal className="mb-16">
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">{t.capabilities.title}</h2>
            <p className="mt-4 max-w-2xl text-lg text-slate-400">{t.capabilities.description}</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {t.capabilities.items.map((cap, i) => {
              const Icon = capabilityIcons[i] || Cpu;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="group h-full rounded-xl border border-white/5 bg-white/[0.02] p-8 transition-colors hover:border-primary/20 hover:bg-white/[0.04]">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-6 w-6" /></div>
                    <h3 className="mb-3 font-display text-lg font-bold text-white group-hover:text-primary transition-colors">{cap.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{cap.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10 relative z-10">
          <Reveal className="mb-20 text-center">
            <span className="mb-4 inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-primary/70">{t.workflow.tag}</span>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">{t.workflow.title}</h2>
          </Reveal>
          <div className="relative border-l border-white/10 ml-4 md:ml-0 md:border-l-0 md:border-t md:grid md:grid-cols-6 md:gap-0">
            {t.workflow.steps.map((step, i) => (
              <Reveal key={i} delay={i * 0.1} className="relative pl-12 pb-12 md:pl-0 md:pb-0 md:pt-12 md:pr-4">
                <div className="absolute left-[-5px] top-0 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-black md:left-0 md:top-[-5px]" />
                <span className="mb-2 block text-xs font-mono text-white/30">0{i + 1}</span>
                <h3 className="mb-3 text-lg font-bold text-white">{step.title}</h3>
                <p className="text-xs leading-relaxed text-slate-400">{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY CONTROL */}
      <section className="py-24 bg-neutral-950 border-y border-white/5">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <span className="mb-4 inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-primary/70">{t.quality.tag}</span>
              <h2 className="mb-6 font-display text-3xl font-bold leading-tight text-white md:text-4xl">{t.quality.title}</h2>
              <p className="mb-10 text-lg leading-relaxed text-slate-400">{t.quality.description}</p>
              <div className="grid gap-6 sm:grid-cols-2">
                {t.quality.items.map((test, i) => {
                  const Icon = testingIcons[i] || Microscope;
                  return (
                    <div key={i} className="flex gap-4">
                      <div className="shrink-0 mt-1"><Icon className="h-5 w-5 text-primary/60" /></div>
                      <div>
                        <h4 className="font-bold text-white text-sm mb-1">{test.title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{test.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
            <Reveal delay={0.2} className="relative aspect-square lg:aspect-[4/5] overflow-hidden rounded-2xl bg-white/5">
              <img src="https://images.unsplash.com/photo-1581093458791-9f302e6d8c97?w=800&h=1000&fit=crop" alt="Quality control" className="h-full w-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-3 rounded-lg bg-black/80 p-4 border border-white/10 backdrop-blur-md">
                  <ShieldCheck className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-sm font-bold text-white">{t.quality.protocol.title}</p>
                    <p className="text-xs text-slate-400">{t.quality.protocol.desc}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CALIBRATION */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <Settings className="h-12 w-12 text-primary/20 mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl mb-6">{t.calibration.title}</h2>
            <p className="text-lg text-slate-400">{t.calibration.description}</p>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {t.calibration.stats.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1} className="p-8 text-center rounded-xl bg-white/[0.02] border border-white/5">
                <div className="font-mono text-4xl font-bold text-primary mb-2">{stat.val}</div>
                <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold">{stat.title}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLIANCE */}
      <section className="py-24 bg-neutral-950 border-t border-white/5">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10 text-center">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-white mb-10">{t.compliance.title}</h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {t.compliance.standards.map((std, i) => (
                <div key={i} className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-slate-300">{std}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CLOSING */}
      <section className="py-32 bg-black text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
        <div className="container-wide relative mx-auto px-5">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-white md:text-5xl mb-8">{t.closing.title}</h2>
            <p className="max-w-2xl mx-auto text-xl text-slate-400 mb-12">{t.closing.description}</p>
            <Link to="/#products" className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wider text-black transition-all hover:bg-primary/90 hover:scale-105">
              {t.closing.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
      <AnimatePresence>{isSearchOpen && <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />}</AnimatePresence>
    </main>
  );
};

export default AboutManufacturing;
