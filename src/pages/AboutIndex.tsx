import { useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";
import { AnimatePresence } from "framer-motion";
import { usePageTranslations } from "@/i18n/usePageTranslations";
import {
  Target, Eye, Zap, Cpu, Building2, Sparkles, Box, LayoutGrid, Layers,
} from "lucide-react";

const timelineMilestones = [
  { year: "2006", title: "Foundation", desc: "Vexaled founded with focus on LED display engineering.", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop" },
  { year: "2010", title: "COB Breakthrough", desc: "Early COB module development and first commercial deployments.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop" },
  { year: "2015", title: "Global Expansion", desc: "EMEA and Americas offices; ISO 9001 certification.", image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=300&fit=crop" },
  { year: "2019", title: "Fine-Pitch Leadership", desc: "P1.2 and below product lines; control room dominance.", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop" },
  { year: "2023", title: "Immersive & XR", desc: "Virtual production and XR-ready display solutions.", image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop" },
];

export default function AboutIndex() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2006");
  const pt = usePageTranslations();
  const t = pt.about;

  const overviewRef = useRef(null);
  const statsRef = useRef(null);
  const timelineRef = useRef(null);
  const pillarsRef = useRef(null);
  const identityRef = useRef(null);
  const isOverviewInView = useInView(overviewRef, { once: true, margin: "-80px" });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-80px" });
  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-80px" });
  const isPillarsInView = useInView(pillarsRef, { once: true, margin: "-80px" });
  const isIdentityInView = useInView(identityRef, { once: true, margin: "-80px" });

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  const selectedMilestone = timelineMilestones.find((m) => m.year === selectedYear) || timelineMilestones[0];

  return (
    <main className="min-h-screen bg-background">
      <Navbar onSearchClick={openSearch} isSearchOpen={isSearchOpen} onCloseSearch={closeSearch} />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `radial-gradient(ellipse 80% 50% at 50% 20%, hsl(var(--primary) / 0.12) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 60%, hsl(var(--primary) / 0.06) 0%, transparent 40%)` }} />
        <div className="absolute inset-0 overflow-hidden">
          <motion.div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L30 60M0 30L60 30' stroke='%23fff' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")` }} animate={{ x: [0, 15], y: [0, 8] }} transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }} />
        </div>
        <div className="container-wide relative z-10 mx-auto px-5 pt-28 pb-20 md:px-8 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mx-auto max-w-4xl text-center">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.2em] text-primary">
              {t.ourStory}
            </motion.span>
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl xl:text-7xl">
              {t.heroTitle}
            </h1>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-4 text-lg text-primary md:text-xl">
              {t.heroSubtitle}
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t.heroDescription}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-8">
              <Link to="/about/overview" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25">
                {t.learnMore}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section ref={overviewRef} className="section-padding bg-card/20 border-t border-border/30">
        <div className="container-wide mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isOverviewInView ? { opacity: 1, y: 0 } : {}} className="mb-10 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {t.companyOverview}
          </motion.h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: Target, title: t.overview.mission, text: t.overview.missionDesc },
              { icon: Eye, title: t.overview.vision, text: t.overview.visionDesc },
              { icon: Zap, title: t.overview.globalImpact, text: t.overview.globalImpactDesc },
            ].map((block, i) => (
              <motion.div key={block.title} initial={{ opacity: 0, y: 24 }} animate={isOverviewInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }} className="rounded-xl border border-border/40 bg-card/50 p-6 transition-all hover:border-primary/20 hover:bg-card/80">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <block.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{block.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{block.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Numbers */}
      <section ref={statsRef} className="section-padding bg-background">
        <div className="container-wide mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isStatsInView ? { opacity: 1, y: 0 } : {}} className="mb-12 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {t.keyAchievements}
          </motion.h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {t.stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.95 }} animate={isStatsInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: i * 0.1 }} className="rounded-xl border border-border/40 bg-card/50 px-6 py-8 text-center transition-all hover:border-primary/25 hover:shadow-lg hover:shadow-primary/[0.06]">
                <span className="font-display text-3xl font-bold text-primary md:text-4xl lg:text-5xl" style={{ textShadow: "0 0 40px hsl(var(--primary) / 0.2)" }}>{stat.value}</span>
                <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Timeline */}
      <section ref={timelineRef} className="section-padding border-t border-border/30 bg-card/20">
        <div className="container-wide mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isTimelineInView ? { opacity: 1, y: 0 } : {}} className="mb-6 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {t.developmentTimeline}
          </motion.h2>
          <p className="mb-10 max-w-2xl text-muted-foreground">{t.timelineDescription}</p>
          <div className="flex flex-wrap gap-2">
            {timelineMilestones.map((m) => (
              <button key={m.year} onClick={() => setSelectedYear(m.year)} className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${selectedYear === m.year ? "border-primary bg-primary/20 text-primary" : "border-border/40 bg-card/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"}`}>
                {m.year}
              </button>
            ))}
          </div>
          <motion.div key={selectedYear} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mt-8 overflow-hidden rounded-xl border border-border/40 bg-card/50 transition-all hover:border-primary/20">
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-video md:aspect-auto md:min-h-[280px]">
                <img src={selectedMilestone.image} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-black/40 md:to-transparent" />
                <span className="absolute left-4 top-4 rounded bg-primary/90 px-3 py-1 font-display text-lg font-bold text-primary-foreground">{selectedMilestone.year}</span>
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <h3 className="font-display text-xl font-semibold text-foreground">{selectedMilestone.title}</h3>
                <p className="mt-2 text-muted-foreground">{selectedMilestone.desc}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand & Technology Pillars */}
      <section ref={pillarsRef} className="section-padding bg-background">
        <div className="container-wide mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isPillarsInView ? { opacity: 1, y: 0 } : {}} className="mb-6 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {t.brandTechnologyPillars}
          </motion.h2>
          <p className="mb-10 max-w-2xl text-muted-foreground">{t.pillarsDescription}</p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Cpu, title: t.pillars.coreTechnology, desc: t.pillars.coreTechnologyDesc, link: "/products/cob" },
              { icon: Building2, title: t.pillars.applications, desc: t.pillars.applicationsDesc, link: "/market/sports" },
              { icon: Sparkles, title: t.pillars.innovationPlatform, desc: t.pillars.innovationPlatformDesc, link: "/#products" },
            ].map((pillar, i) => (
              <motion.div key={pillar.title} initial={{ opacity: 0, y: 24 }} animate={isPillarsInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}>
                <Link to={pillar.link} className="group block h-full rounded-xl border border-border/40 bg-card/50 p-6 transition-all hover:-translate-y-1 hover:border-primary/25 hover:bg-card/80 hover:shadow-lg">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary transition-colors group-hover:bg-primary/25">
                    <pillar.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{pillar.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Identity */}
      <section ref={identityRef} className="section-padding border-t border-border/30 bg-card/20">
        <div className="container-wide mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isIdentityInView ? { opacity: 1, y: 0 } : {}} className="mb-4 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Visual Identity
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={isIdentityInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="mb-12 max-w-xl text-muted-foreground">
            Our design philosophy: from the smallest pixel to the largest surface, every element is intentional.
          </motion.p>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: Box, title: "Pixel / Point", sub: "The unit of light", desc: "Precision at the smallest scale." },
              { icon: LayoutGrid, title: "Structure / Pole", sub: "The framework", desc: "Modular, reliable, scalable." },
              { icon: Layers, title: "Surface / Plane", sub: "The canvas", desc: "Seamless, immersive, limitless." },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={isIdentityInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 + i * 0.1 }} className="flex flex-col items-center rounded-xl border border-border/40 bg-background/60 px-6 py-10 text-center transition-all hover:border-primary/20">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-primary">{item.sub}</p>
                <p className="mt-3 text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <AnimatePresence>{isSearchOpen && <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />}</AnimatePresence>
    </main>
  );
}
