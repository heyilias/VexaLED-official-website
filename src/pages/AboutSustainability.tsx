import { useState, useCallback, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";
import { AnimatePresence } from "framer-motion";
import { usePageTranslations } from "@/i18n/usePageTranslations";
import { Zap, Thermometer, Sun, Recycle, Wrench, CheckCircle2, ArrowRight } from "lucide-react";

const Reveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
};

const efficiencyIcons = [Zap, Thermometer, Sun];

const AboutSustainability = () => {
  const pt = usePageTranslations();
  const t = pt.sustainability;

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] font-sans selection:bg-emerald-500/20 text-foreground">
      <Navbar onSearchClick={openSearch} isSearchOpen={isSearchOpen} onCloseSearch={closeSearch} />

      {/* HERO */}
      <section ref={heroRef} className="relative flex h-[80vh] min-h-[600px] w-full items-center justify-center overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-emerald-900/10 mix-blend-screen" />
          <img src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1920&h=1080&fit=crop" alt="Sustainability" className="h-full w-full object-cover opacity-50 grayscale blur-[2px]" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)]" />
        <motion.div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto" style={{ opacity: heroOpacity }}>
          <Reveal>
            <span className="mb-6 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-emerald-400 backdrop-blur-sm">{t.hero.tag}</span>
            <h1 className="font-display text-4xl font-light tracking-tight text-white md:text-6xl lg:text-7xl mb-6">
              {t.hero.title}<br /><span className="font-bold text-white">{t.hero.subtitle}</span>
            </h1>
            <p className="max-w-2xl text-lg font-light leading-relaxed text-neutral-400 md:text-xl">{t.hero.description}</p>
          </Reveal>
        </motion.div>
        <motion.div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/20">{t.hero.scroll}</span>
          <motion.div className="h-12 w-px bg-gradient-to-b from-white/20 to-transparent" animate={{ scaleY: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
      </section>

      {/* ENERGY EFFICIENCY */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <h2 className="font-display text-3xl font-semibold text-white md:text-4xl mb-6">
                {t.efficiency.title}<br /><span className="text-neutral-500">{t.efficiency.subtitle}</span>
              </h2>
              <p className="text-lg leading-relaxed text-neutral-400 mb-8">{t.efficiency.description}</p>
              <div className="space-y-8">
                {t.efficiency.features.map((feat, i) => {
                  const Icon = efficiencyIcons[i] || Zap;
                  return (
                    <div key={i} className="flex gap-5">
                      <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/5">
                        <Icon className="h-4 w-4 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                        <p className="text-sm leading-relaxed text-neutral-500 max-w-md">{feat.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
            <Reveal delay={0.2} className="relative aspect-[4/5] lg:aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-white/5">
              <img src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=1000&fit=crop" alt="Efficiency" className="h-full w-full object-cover opacity-50 contrast-125 grayscale mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-black/80 backdrop-blur-md border border-emerald-500/20 p-6 rounded-xl">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold text-white">{t.efficiency.graphic.value}</span>
                    <span className="text-sm font-medium text-emerald-400">{t.efficiency.graphic.label}</span>
                  </div>
                  <p className="text-xs text-neutral-400">{t.efficiency.graphic.desc}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* LONGEVITY */}
      <section className="py-24 bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.03),transparent_60%)]" />
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10 relative z-10">
          <Reveal className="mb-20 text-center max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-semibold text-white md:text-4xl mb-6">{t.longevity.title}</h2>
            <p className="text-lg leading-relaxed text-neutral-400">{t.longevity.description}</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {t.longevity.benefits.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="h-full bg-white/[0.02] border border-white/5 rounded-xl p-8 hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold text-white">{item.val}</span>
                    <span className="text-sm font-medium text-emerald-500/80">{item.unit}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-500">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIALS */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-500/60 mb-4 block">{t.materials.tag}</span>
                <h2 className="font-display text-3xl font-semibold text-white mb-6">{t.materials.title}<br />{t.materials.subtitle}</h2>
                <p className="text-base text-neutral-400 leading-relaxed mb-8">{t.materials.description}</p>
                <ul className="space-y-4">
                  {t.materials.standards.map((std, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-neutral-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      {std}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
              {t.materials.cards.map((card, i) => {
                const Icon = i === 0 ? Recycle : Wrench;
                return (
                  <Reveal key={i} delay={(i + 1) * 0.1}>
                    <div className="p-8 rounded-xl bg-neutral-900/50 border border-white/5 h-full">
                      <Icon className="h-8 w-8 text-neutral-500 mb-6" />
                      <h3 className="text-lg font-bold text-white mb-3">{card.title}</h3>
                      <p className="text-sm text-neutral-500 leading-relaxed">{card.desc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="py-32 bg-[#050505] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.05),transparent_70%)]" />
        <div className="container-wide relative mx-auto px-5">
          <Reveal>
            <h2 className="font-display text-2xl font-light text-white md:text-4xl mb-8 max-w-4xl mx-auto">{t.closing.title}</h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/about/manufacturing" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10">
                {t.closing.ctaManufacturing}
              </Link>
              <Link to="/#products" className="group inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-500">
                {t.closing.ctaEngineering}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
      <AnimatePresence>{isSearchOpen && <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />}</AnimatePresence>
    </main>
  );
};

export default AboutSustainability;
