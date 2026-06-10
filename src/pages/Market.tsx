import { useState, useCallback, useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";
import { ArrowRight, Zap, Shield, Clock, Palette, ChevronRight } from "lucide-react";
import { getMarketDetail } from "@/data/marketDetailData";

const differentiatorIcons = [
  <Zap className="h-5 w-5" />,
  <Shield className="h-5 w-5" />,
  <Clock className="h-5 w-5" />,
  <Palette className="h-5 w-5" />,
];

const Market = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.3], [1, 1.1]);
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, 100]);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  if (!slug) return <Navigate to="/" replace />;
  const market = getMarketDetail(slug);
  if (!market) return <Navigate to="/" replace />;

  return (
    <main ref={containerRef} className="min-h-screen bg-[#0a0a0f]">
      <SEOHead
        title={`${market.title} LED Displays`}
        description={market.description ?? `Explore VEXALED's LED display solutions for ${market.title}. High-brightness, reliable screens engineered for professional environments.`}
      />
      <Navbar onSearchClick={openSearch} isSearchOpen={isSearchOpen} onCloseSearch={closeSearch} />

      {/* HERO - Full Screen Cinematic */}
      <section className="relative h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ scale: heroScale, y: heroY, opacity: heroOpacity }}
        >
          <img
            src={market.heroImage}
            alt={market.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/80 via-transparent to-transparent" />
        </motion.div>

        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(212,255,0,0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(212,255,0,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 flex h-full items-end pb-20 md:pb-32">
          <div className="container-wide mx-auto px-6 md:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-medium uppercase tracking-widest text-primary backdrop-blur-sm border border-primary/20">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                {market.tag}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 max-w-4xl font-display text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
            >
              {market.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl"
            >
              {market.headline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <div className="flex flex-col items-center gap-2 text-white/30">
                <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="h-8 w-px bg-gradient-to-b from-primary/50 to-transparent"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SPECS BAR - Floating strip instead of full section */}
      <section className="relative -mt-16 z-20">
        <div className="container-wide mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-6 md:p-8"
          >
            <div className="grid gap-6 md:grid-cols-3">
              {market.keySpecs.map((spec, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="font-display text-sm font-bold">{i + 1}</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/40">{spec.label}</p>
                    <p className="font-display text-lg font-semibold text-white">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* DIFFERENTIATORS - Minimal List */}
      <section className="relative py-20 md:py-28">
        <div className="container-wide mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="mb-4 block text-xs font-medium uppercase tracking-[0.2em] text-primary">
                Why VEXALED
              </span>
              <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                Built for {market.title.split(' ')[0]}
              </h2>
            </motion.div>

            <div className="space-y-1">
              {market.differentiators.map((diff, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group flex items-center gap-4 border-b border-white/5 py-5 transition-colors hover:border-primary/20"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110">
                    {differentiatorIcons[i % differentiatorIcons.length]}
                  </div>
                  <p className="flex-1 text-base text-white/70 transition-colors group-hover:text-white">
                    {diff}
                  </p>
                  <ChevronRight className="h-4 w-4 text-white/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS - Horizontal Cards */}
      <section className="relative py-20 md:py-28 border-y border-white/5">
        <div className="container-wide mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <span className="mb-4 block text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Solutions
            </span>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
              Recommended Products
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {market.recommendedSolutions.map((sol, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link
                  to={`/products/${sol.category}/${sol.slug}`}
                  className="group relative block overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] transition-all duration-500 hover:border-primary/30"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={sol.image}
                      alt={sol.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 font-display text-xl font-semibold text-white transition-colors group-hover:text-primary">
                      {sol.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/50">
                      {sol.fitReason}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS GALLERY - Simplified */}
      <section className="relative py-20 md:py-28">
        <div className="container-wide mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <span className="mb-4 block text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Portfolio
            </span>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
              Featured Projects
            </h2>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2">
            {market.typicalProjects.slice(0, 2).map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative aspect-[16/9] overflow-hidden rounded-2xl"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/90 via-[#0a0a0f]/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="mb-2 h-px w-12 bg-primary translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
                  <h3 className="font-display text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Full Bleed */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, rgba(212,255,0,0.1) 0%, transparent 70%)" }}
          />
        </div>

        <div className="container-wide relative mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {market.ctaTitle}
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-white/50">
              {market.ctaDescription}
            </p>
            <Link
              to="/configurator"
              className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-display text-sm font-semibold uppercase tracking-wider text-[#0a0a0f] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      {isSearchOpen && <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />}
    </main>
  );
};

export default Market;
