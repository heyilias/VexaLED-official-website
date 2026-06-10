import { useState, useCallback, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";
import { AnimatePresence } from "framer-motion";
import {
  Target, Eye, Zap, Cpu, Building2, Sparkles, Box, LayoutGrid, Layers,
  Users, Award, Globe, TrendingUp, ArrowRight, ChevronRight, Lightbulb,
  Monitor, Radio, PartyPopper, Hexagon, Star, Diamond
} from "lucide-react";

// ─── Animated Counter Component ───
const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

// ─── Floating Particle Component ───
const FloatingParticle = ({ delay, size, x, duration }: { delay: number; size: number; x: string; duration: number }) => (
  <motion.div
    className="absolute rounded-full bg-primary/20"
    style={{
      width: size,
      height: size,
      left: x,
      filter: "blur(1px)",
    }}
    initial={{ y: "100vh", opacity: 0 }}
    animate={{
      y: "-10vh",
      opacity: [0, 0.6, 0.6, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

// ─── Staggered Text Reveal ───
const StaggeredText = ({ text, className = "" }: { text: string; className?: string }) => {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

// ─── Magnetic Button ───
const MagneticButton = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── Data ───
const expertiseAreas = [
  {
    icon: Monitor,
    title: "LED Display Technology",
    desc: "Deep expertise in fine-pitch LED, COB, and custom display architectures built over decades of engineering leadership.",
    stat: "20+",
    statLabel: "Years Experience"
  },
  {
    icon: Radio,
    title: "Broadcast & Virtual Production",
    desc: "Pioneering XR stages and virtual production environments for film studios and broadcast networks worldwide.",
    stat: "500+",
    statLabel: "Projects Delivered"
  },
  {
    icon: PartyPopper,
    title: "Live Events & Installations",
    desc: "From stadium screens to concert touring rigs — our team has powered some of the world's most iconic visual experiences.",
    stat: "50+",
    statLabel: "Countries Reached"
  }
];

const brandPillars = [
  {
    icon: Cpu,
    title: "Engineering First",
    desc: "Every product begins with rigorous R&D. We don't follow trends — we set them through technical innovation.",
    link: "/products/led-screen"
  },
  {
    icon: Building2,
    title: "Market-Driven Solutions",
    desc: "From corporate boardrooms to stadium arenas, we architect displays that solve real-world visual challenges.",
    link: "/market/corporate"
  },
  {
    icon: Sparkles,
    title: "Future-Ready Design",
    desc: "Built for tomorrow's content. Our platforms are designed to evolve with emerging display technologies.",
    link: "/products"
  }
];

const values = [
  { icon: Target, title: "Precision", desc: "Pixel-perfect execution in everything we build." },
  { icon: Lightbulb, title: "Innovation", desc: "Pushing boundaries of what's possible with LED." },
  { icon: Globe, title: "Global Vision", desc: "Engineered in Foshan, Guangdong. Built for the world." },
  { icon: Award, title: "Excellence", desc: "No compromise on quality, ever." },
];

const stats = [
  { value: 20, suffix: "+", label: "Years Combined Experience" },
  { value: 500, suffix: "+", label: "Projects Worldwide" },
  { value: 50, suffix: "+", label: "Countries Served" },
  { value: 2026, suffix: "", label: "VEXALED Founded" },
];

export default function AboutIndex() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const heroRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef(null);
  const statsRef = useRef(null);
  const expertiseRef = useRef(null);
  const pillarsRef = useRef(null);
  const identityRef = useRef(null);
  const valuesRef = useRef(null);
  const ctaRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.5], [1, 1.15]);
  const heroY = useTransform(smoothProgress, [0, 0.5], [0, 150]);
  const textY = useTransform(smoothProgress, [0, 0.3], [0, -80]);

  // Mouse parallax for hero
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const isOverviewInView = useInView(overviewRef, { once: true, margin: "-80px" });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-80px" });
  const isExpertiseInView = useInView(expertiseRef, { once: true, margin: "-80px" });
  const isPillarsInView = useInView(pillarsRef, { once: true, margin: "-80px" });
  const isIdentityInView = useInView(identityRef, { once: true, margin: "-80px" });
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-80px" });
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-80px" });

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  return (
    <main className="min-h-screen bg-[#0a0a0f] overflow-x-hidden">
      <SEOHead
        title="About VEXALED"
        description="Discover VEXALED — a global LED display company built on engineering excellence, precision manufacturing, and long-term partnerships across 50+ countries."
      />
      <Navbar onSearchClick={openSearch} isSearchOpen={isSearchOpen} onCloseSearch={closeSearch} />

      {/* ═══════════════════════════════════════
          HERO - Ultra Cinematic with Particles
          ═══════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ scale: heroScale, y: heroY, opacity: heroOpacity }}
        >
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0a0a0f]/95 to-[#0a0a0f]/80" />

          {/* Animated grid */}
          <motion.div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `linear-gradient(rgba(212,255,0,0.5) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(212,255,0,0.5) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
              x: mousePosition.x * 0.5,
              y: mousePosition.y * 0.5,
            }}
          />

          {/* Large orbiting glow orbs with mouse parallax */}
          <motion.div
            className="absolute top-1/4 right-1/4 h-[600px] w-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(212,255,0,0.12) 0%, transparent 70%)",
              x: mousePosition.x * 2,
              y: mousePosition.y * 2,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/4 h-[500px] w-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(212,255,0,0.08) 0%, transparent 70%)",
              x: mousePosition.x * -1.5,
              y: mousePosition.y * -1.5,
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(212,255,0,0.15) 0%, transparent 60%)",
            }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating particles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <FloatingParticle
              key={i}
              delay={i * 1.2}
              size={Math.random() * 4 + 2}
              x={`${Math.random() * 100}%`}
              duration={Math.random() * 10 + 15}
            />
          ))}

          {/* Rotating geometric shapes */}
          <motion.div
            className="absolute top-[15%] left-[10%] text-primary/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <Hexagon className="h-24 w-24" strokeWidth={0.5} />
          </motion.div>
          <motion.div
            className="absolute bottom-[20%] right-[15%] text-primary/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <Diamond className="h-16 w-16" strokeWidth={0.5} />
          </motion.div>
          <motion.div
            className="absolute top-[60%] left-[80%] text-primary/5"
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Star className="h-20 w-20" strokeWidth={0.5} />
          </motion.div>
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="container-wide mx-auto px-6 md:px-8 lg:px-12">
            <motion.div
              className="mx-auto max-w-5xl text-center"
              style={{ y: textY }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="mb-8"
              >
                <motion.span
                  className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-primary backdrop-blur-sm border border-primary/20"
                  whileHover={{ scale: 1.05, borderColor: "rgba(212,255,0,0.4)" }}
                >
                  <motion.span
                    className="h-2 w-2 rounded-full bg-primary"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  About VEXALED
                </motion.span>
              </motion.div>

              {/* Title with character animation */}
              <motion.h1
                className="font-display text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl xl:text-8xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  New Brand.
                </motion.span>
                <motion.span
                  className="block text-primary"
                  initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  Proven Expertise.
                </motion.span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/50 md:text-xl"
              >
                VEXALED was born in 2026 from a collective of industry veterans with over
                two decades of experience in LED display technology. We're not starting from
                scratch — we're starting from experience.
              </motion.p>

              {/* Buttons with magnetic effect */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="mt-10 flex flex-wrap items-center justify-center gap-4"
              >
                <MagneticButton>
                  <Link
                    to="/products"
                    className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-display text-sm font-semibold uppercase tracking-wider text-[#0a0a0f] transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                  >
                    Explore Products
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-8 py-4 font-display text-sm font-semibold uppercase tracking-wider text-white/70 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:text-white"
                  >
                    Get in Touch
                  </Link>
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator with enhanced animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-white/30"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            <div className="relative h-10 w-5 rounded-full border border-white/20 p-1">
              <motion.div
                className="h-2 w-1.5 rounded-full bg-primary/60 mx-auto"
                animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          STATS BAR - Floating with Counter Animation
          ═══════════════════════════════════════ */}
      <section ref={statsRef} className="relative -mt-24 z-20">
        <div className="container-wide mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-8 md:p-12"
          >
            <div className="grid gap-8 md:grid-cols-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                  className="relative text-center group"
                >
                  <motion.div
                    className="font-display text-4xl font-bold text-primary md:text-5xl"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {stat.suffix ? (
                      <>
                        <AnimatedCounter target={stat.value} />
                        {stat.suffix}
                      </>
                    ) : (
                      stat.value
                    )}
                  </motion.div>
                  <motion.p
                    className="mt-2 text-xs uppercase tracking-wider text-white/40"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    {stat.label}
                  </motion.p>
                  {/* Hover glow line */}
                  <motion.div
                    className="absolute -bottom-2 left-1/2 h-px bg-primary/50"
                    initial={{ width: 0, x: "-50%" }}
                    whileHover={{ width: "60%", x: "-50%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MISSION & VISION - Staggered Reveal
          ═══════════════════════════════════════ */}
      <section ref={overviewRef} className="relative py-28 md:py-36">
        <div className="container-wide mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span
                className="mb-4 block text-xs font-medium uppercase tracking-[0.2em] text-primary"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Our Purpose
              </motion.span>
              <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                <StaggeredText text="Mission & Vision" />
              </h2>
              <motion.div
                className="mt-6 h-px w-20 bg-primary/30"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </motion.div>

            {/* Right Column - Cards */}
            <div className="space-y-8">
              {[
                { icon: Target, title: "Our Mission", text: "To deliver next-generation LED display solutions that transform how the world experiences visual content. We combine cutting-edge technology with uncompromising quality to create displays that inspire, engage, and perform." },
                { icon: Eye, title: "Our Vision", text: "To become the global benchmark for LED display excellence. We envision a world where every visual experience — from intimate corporate presentations to massive stadium events — is powered by VEXALED innovation." },
                { icon: Zap, title: "Global Impact", text: "Though VEXALED is new, our team's legacy spans continents and industries. We've delivered landmark projects across Europe, the Americas, Asia, and beyond — and now we're channeling that expertise into one focused brand." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ x: 8 }}
                  className="group cursor-default"
                >
                  <div className="flex items-start gap-5">
                    <motion.div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon className="h-7 w-7" />
                    </motion.div>
                    <div>
                      <h3 className="mb-2 font-display text-xl font-semibold text-white group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="leading-relaxed text-white/50">
                        {item.text}
                      </p>
                    </div>
                  </div>
                  {i < 2 && (
                    <motion.div
                      className="ml-[4.5rem] mt-8 h-px bg-white/5"
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          EXPERTISE AREAS - Enhanced Tabs
          ═══════════════════════════════════════ */}
      <section ref={expertiseRef} className="relative border-y border-white/5 py-28 md:py-36">
        {/* Background decoration */}
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, rgba(212,255,0,0.1) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="container-wide relative mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <motion.span
              className="mb-4 block text-xs font-medium uppercase tracking-[0.2em] text-primary"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              What We Know
            </motion.span>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              <StaggeredText text="Decades of Expertise" />
            </h2>
            <motion.p
              className="mt-4 max-w-2xl text-lg text-white/50"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Our team brings unparalleled experience across every major LED display discipline.
            </motion.p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-12">
            {/* Tab buttons */}
            <div className="lg:col-span-4 space-y-3">
              {expertiseAreas.map((area, i) => (
                <motion.button
                  key={area.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  onClick={() => setActiveTab(i)}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group flex w-full items-center gap-4 rounded-xl border p-5 text-left transition-all duration-300 ${
                    activeTab === i
                      ? "border-primary/30 bg-primary/10"
                      : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
                  }`}
                >
                  <motion.div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      activeTab === i ? "bg-primary/20 text-primary" : "bg-white/5 text-white/40 group-hover:text-white/60"
                    }`}
                    animate={activeTab === i ? { rotate: [0, 5, -5, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <area.icon className="h-5 w-5" />
                  </motion.div>
                  <div className="flex-1">
                    <p className={`font-display text-sm font-semibold transition-colors ${
                      activeTab === i ? "text-white" : "text-white/70"
                    }`}>
                      {area.title}
                    </p>
                  </div>
                  <motion.div
                    animate={activeTab === i ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </motion.div>
                </motion.button>
              ))}
            </div>

            {/* Tab content */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 30, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -30, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8 md:p-12"
                >
                  {/* Animated corner accent */}
                  <motion.div
                    className="absolute top-0 right-0 h-24 w-24"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="absolute top-0 right-0 h-px w-full bg-gradient-to-l from-primary/30 to-transparent" />
                    <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-primary/30 to-transparent" />
                  </motion.div>

                  <div className="flex items-center gap-5 mb-8">
                    <motion.div
                      className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      {(() => {
                        const Icon = expertiseAreas[activeTab].icon;
                        return <Icon className="h-8 w-8" />;
                      })()}
                    </motion.div>
                    <div>
                      <motion.h3
                        className="font-display text-2xl font-bold text-white"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                      >
                        {expertiseAreas[activeTab].title}
                      </motion.h3>
                    </div>
                  </div>
                  <motion.p
                    className="text-lg leading-relaxed text-white/50 mb-10"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {expertiseAreas[activeTab].desc}
                  </motion.p>
                  <motion.div
                    className="flex items-center gap-8 border-t border-white/5 pt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div>
                      <motion.p
                        className="font-display text-4xl font-bold text-primary"
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                      >
                        {expertiseAreas[activeTab].stat}
                      </motion.p>
                      <p className="text-xs uppercase tracking-wider text-white/40">
                        {expertiseAreas[activeTab].statLabel}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BRAND PILLARS - 3D Tilt Cards
          ═══════════════════════════════════════ */}
      <section ref={pillarsRef} className="relative py-28 md:py-36">
        <div className="container-wide mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <motion.span
              className="mb-4 block text-xs font-medium uppercase tracking-[0.2em] text-primary"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Our Approach
            </motion.span>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              <StaggeredText text="Brand Pillars" />
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {brandPillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={pillar.link} className="group block h-full">
                  <motion.div
                    className="relative h-full overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8"
                    whileHover={{
                      y: -8,
                      borderColor: "rgba(212,255,0,0.2)",
                      transition: { duration: 0.3 }
                    }}
                  >
                    {/* Hover glow */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: "radial-gradient(circle at 50% 0%, rgba(212,255,0,0.08) 0%, transparent 60%)"
                      }}
                    />

                    <motion.div
                      className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <pillar.icon className="h-7 w-7" />
                    </motion.div>
                    <h3 className="relative mb-3 font-display text-xl font-semibold text-white transition-colors group-hover:text-primary">
                      {pillar.title}
                    </h3>
                    <p className="relative leading-relaxed text-white/50">
                      {pillar.desc}
                    </p>
                    <motion.div
                      className="relative mt-6 flex items-center gap-2 text-sm text-primary"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <span className="font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">Learn more</span>
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.span>
                    </motion.div>

                    {/* Bottom progress line */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-primary"
                      initial={{ width: "0%" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CORE VALUES - Flip Cards
          ═══════════════════════════════════════ */}
      <section ref={valuesRef} className="relative border-y border-white/5 py-28 md:py-36">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(212,255,0,0.04) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container-wide relative mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <motion.span
              className="mb-4 block text-xs font-medium uppercase tracking-[0.2em] text-primary"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              What Drives Us
            </motion.span>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              <StaggeredText text="Core Values" />
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div className="flex flex-col items-center rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-12 text-center transition-all duration-500 hover:border-primary/20 hover:bg-white/[0.04]">
                  <motion.div
                    className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary"
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                  >
                    <value.icon className="h-8 w-8" />
                  </motion.div>
                  <h3 className="font-display text-lg font-semibold text-white group-hover:text-primary transition-colors duration-300">
                    {value.title}
                  </h3>
                  <motion.div
                    className="my-3 h-px w-8 bg-primary/30"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  />
                  <p className="text-sm text-white/50">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          VISUAL IDENTITY - Parallax Cards
          ═══════════════════════════════════════ */}
      <section ref={identityRef} className="relative py-28 md:py-36">
        <div className="container-wide mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <motion.span
              className="mb-4 block text-xs font-medium uppercase tracking-[0.2em] text-primary"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Design Philosophy
            </motion.span>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              <StaggeredText text="Visual Identity" />
            </h2>
            <motion.p
              className="mt-4 max-w-xl text-lg text-white/50"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              From the smallest pixel to the largest surface, every element is intentional.
            </motion.p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Box, title: "Pixel / Point", sub: "The unit of light", desc: "Precision at the smallest scale. Every pixel is calibrated for perfect color accuracy and brightness uniformity." },
              { icon: LayoutGrid, title: "Structure / Pole", sub: "The framework", desc: "Modular, reliable, scalable. Our structural systems adapt to any environment while maintaining structural integrity." },
              { icon: Layers, title: "Surface / Plane", sub: "The canvas", desc: "Seamless, immersive, limitless. Creating visual surfaces that dissolve the boundary between content and reality." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-500 hover:border-primary/20">
                  {/* Number watermark */}
                  <motion.span
                    className="absolute -right-2 -top-4 font-display text-8xl font-bold text-white/[0.02]"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    0{i + 1}
                  </motion.span>

                  <motion.div
                    className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <item.icon className="h-8 w-8" />
                  </motion.div>
                  <h3 className="relative font-display text-xl font-semibold text-white group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="relative mt-1 text-xs uppercase tracking-wider text-primary">{item.sub}</p>
                  <p className="relative mt-4 text-sm leading-relaxed text-white/50">{item.desc}</p>

                  {/* Corner accent on hover */}
                  <motion.div
                    className="absolute bottom-0 right-0 h-16 w-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  >
                    <div className="absolute bottom-3 right-3 h-px w-8 bg-primary/40" />
                    <div className="absolute bottom-3 right-3 h-8 w-px bg-primary/40" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA SECTION - Dramatic Finale
          ═══════════════════════════════════════ */}
      <section ref={ctaRef} className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(212,255,0,0.06) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          {/* Animated rings */}
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute left-1/2 top-1/2 rounded-full border border-primary/10"
              style={{
                width: `${ring * 200}px`,
                height: `${ring * 200}px`,
                marginLeft: `-${ring * 100}px`,
                marginTop: `-${ring * 100}px`,
              }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4 + ring, repeat: Infinity, delay: ring * 0.5 }}
            />
          ))}
        </div>

        <div className="container-wide relative mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.span
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-primary backdrop-blur-sm border border-primary/20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Users className="h-3.5 w-3.5" />
              Join the Journey
            </motion.span>

            <h2 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              <StaggeredText text="Experience Meets Innovation" />
            </h2>

            <motion.p
              className="mb-10 text-lg leading-relaxed text-white/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              VEXALED may be a new name, but our team's legacy speaks for itself.
              Let's create something extraordinary together.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <MagneticButton>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-display text-sm font-semibold uppercase tracking-wider text-[#0a0a0f] transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                >
                  Start a Project
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-8 py-4 font-display text-sm font-semibold uppercase tracking-wider text-white/70 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:text-white"
                >
                  View Products
                </Link>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <AnimatePresence>{isSearchOpen && <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />}</AnimatePresence>
    </main>
  );
}
