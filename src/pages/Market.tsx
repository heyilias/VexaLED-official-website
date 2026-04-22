import { useState, useCallback } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";
import { Home, ChevronRight, ArrowRight, Ruler, Sun, Eye, Wrench, Activity, CheckCircle2 } from "lucide-react";
import { getMarketDetail } from "@/data/marketDetailData";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6 },
};
const stagger = (i: number) => ({ ...fadeUp, transition: { ...fadeUp.transition, delay: i * 0.1 } });

const snapshotIcons = [
  <Ruler className="h-5 w-5" />,
  <Sun className="h-5 w-5" />,
  <Eye className="h-5 w-5" />,
  <Wrench className="h-5 w-5" />,
  <Activity className="h-5 w-5" />,
];

const flowStepColors = [
  "from-primary/20 to-primary/5",
  "from-blue-500/20 to-blue-500/5",
  "from-emerald-500/20 to-emerald-500/5",
  "from-amber-500/20 to-amber-500/5",
];

const Market = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  if (!slug) return <Navigate to="/" replace />;
  const market = getMarketDetail(slug);
  if (!market) return <Navigate to="/" replace />;

  return (
    <main className="min-h-screen bg-background">
      <Navbar onSearchClick={openSearch} isSearchOpen={isSearchOpen} onCloseSearch={closeSearch} />

      {/* HERO */}
      <section className="relative h-[65vh] min-h-[480px] max-h-[750px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={market.heroImage} alt={market.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
        </div>
        <div className="container-wide relative mx-auto flex h-full flex-col justify-end px-5 pb-14 md:px-8 lg:px-10">
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-5 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="flex items-center gap-1 hover:text-foreground transition-colors"><Home className="h-3.5 w-3.5" /><span>Home</span></Link>
            <ChevronRight className="h-3 w-3" />
            <span>Markets</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">{market.title}</span>
          </motion.nav>
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-3 inline-block w-fit rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            {market.capabilityTag}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }} className="mb-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {market.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="max-w-2xl text-lg text-muted-foreground md:text-xl">
            {market.positioningStatement}
          </motion.p>
        </div>
      </section>

      {/* SNAPSHOT */}
      <section className="py-16 md:py-20">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <motion.div {...fadeUp} className="mb-10 max-w-2xl">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">At a Glance</span>
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">Market Snapshot</h2>
            <p className="text-muted-foreground leading-relaxed">{market.description}</p>
          </motion.div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {Object.entries(market.snapshot).map(([key, value], i) => (
              <motion.div key={key} {...stagger(i)} className="rounded-xl border border-border/30 bg-card/40 p-5 text-center transition-colors hover:border-primary/20">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">{snapshotIcons[i]}</div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{key}</p>
                <p className="text-sm font-bold text-foreground">{value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section className="py-16 md:py-20 border-t border-border/20 bg-card/20">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <motion.div {...fadeUp} className="mb-10">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our Expertise</span>
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Why This Market Is Different</h2>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2">
            {market.differentiators.map((diff, i) => (
              <motion.div key={i} {...stagger(i)} className="flex items-start gap-4 rounded-xl border border-border/30 bg-background/60 p-5 transition-colors hover:border-primary/20">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p className="text-foreground leading-relaxed">{diff}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RECOMMENDED SOLUTIONS */}
      <section className="py-20 md:py-28 border-t border-border/20">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <motion.div {...fadeUp} className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">Solutions</span>
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">Recommended Products</h2>
            <p className="mx-auto max-w-xl text-muted-foreground">Purpose-built solutions for {market.title}</p>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {market.recommendedSolutions.map((sol, i) => (
              <motion.div key={i} {...stagger(i)}>
                <Link to={`/products/${sol.category}/${sol.slug}`} className="group block overflow-hidden rounded-2xl border border-border/30 bg-card/40 transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={sol.image} alt={sol.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="mb-2 text-lg font-bold text-foreground group-hover:text-primary transition-colors">{sol.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{sol.fitReason}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">View Product <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FLOW */}
      <section className="py-20 md:py-28 border-t border-border/20 bg-card/10">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <motion.div {...fadeUp} className="mb-14 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">Workflow</span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">How It's Used</h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {market.applicationFlow.map((step, i) => (
              <motion.div key={i} {...stagger(i)} className="relative rounded-2xl border border-border/30 bg-background/60 p-6 text-center">
                <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${flowStepColors[i]}`}>
                  <span className="text-lg font-bold text-foreground">{step.step}</span>
                </div>
                <h3 className="mb-2 text-base font-bold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                {i < market.applicationFlow.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 text-muted-foreground/30">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TYPICAL PROJECTS */}
      <section className="py-20 md:py-28 border-t border-border/20">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <motion.div {...fadeUp} className="mb-12">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">Real World</span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Typical Projects</h2>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {market.typicalProjects.map((project, i) => (
              <motion.div key={i} {...stagger(i)} className="group relative aspect-[3/2] overflow-hidden rounded-xl border border-border/30">
                <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4"><h3 className="text-sm font-semibold text-white">{project.title}</h3></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 border-t border-border/20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, hsl(66 95% 55% / 0.06) 0%, transparent 50%)" }} />
        <div className="container-wide relative mx-auto px-5 md:px-8 lg:px-10">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">Get Started</span>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">{market.ctaLabel}</h2>
            <p className="mb-8 text-muted-foreground leading-relaxed">{market.ctaDescription}</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/configurator" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 group">
                {market.ctaLabel} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <AnimatePresence>{isSearchOpen && <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />}</AnimatePresence>
    </main>
  );
};

export default Market;
