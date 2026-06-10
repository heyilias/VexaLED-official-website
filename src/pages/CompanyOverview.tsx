import { useState, useCallback, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";
import { AnimatePresence } from "framer-motion";
import {
  Cpu, Layers, Shield, Wrench, HeartHandshake,
  Target, Eye, Award, Globe2, Users, ArrowRight, CheckCircle2,
} from "lucide-react";
import vexaledLogo from "@/assets/vexaled-logo.png";

const Reveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay, ease: [0.215, 0.61, 0.355, 1] }} className={className}>
      {children}
    </motion.div>
  );
};

const coreExpertise = [
  { icon: Cpu, title: "LED Display Engineering", desc: "Deep expertise in chip-on-board, surface-mount, and micro-LED architectures. We design for the full optical chain—from die selection to viewing-angle optimization.", accent: "From architecture to optics" },
  { icon: Wrench, title: "Custom Solutions for Complex Environments", desc: "Bespoke mechanical, optical, and thermal designs for curved facades, transparent installations, and venues where off-the-shelf fails.", accent: "Where standard stops, we start" },
  { icon: Shield, title: "Reliability at Scale", desc: "Proven 24/7 operation across extreme climates—from 50°C desert heat to sub-zero polar installations. Uptime isn't a feature, it's the foundation.", accent: "99.99% uptime heritage" },
  { icon: Layers, title: "Precision Manufacturing", desc: "Vertically integrated production with ISO 9001 certification. Every module is traceable from incoming component to outgoing shipment.", accent: "Full traceability, zero compromise" },
  { icon: HeartHandshake, title: "End-to-End Project Lifecycle", desc: "From feasibility study and site survey through commissioning to multi-year maintenance contracts—one partner for the entire journey.", accent: "Single point of accountability" },
];

const industries = [
  { label: "Sports & Arenas", image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=1000&fit=crop", href: "/market/sports", stat: "50,000+ seat venues" },
  { label: "Advertising & DOOH", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=1000&fit=crop", href: "/market/advertising", stat: "24/7 outdoor networks" },
  { label: "Events & Staging", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=1000&fit=crop", href: "/market/events", stat: "Global touring systems" },
  { label: "Virtual Production", image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=1000&fit=crop", href: "/market/virtual-production", stat: "In-camera VFX stages" },
  { label: "Corporate & Control Rooms", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=1000&fit=crop", href: "/market/corporate", stat: "Mission-critical displays" },
];

const values = [
  { icon: Award, title: "Engineering Excellence", desc: "Every product is designed, tested, and validated to exceed the most demanding international standards." },
  { icon: Shield, title: "Reliability Under Pressure", desc: "Engineered for always-on, business-critical environments where downtime means lost revenue." },
  { icon: Users, title: "Long-Term Partnerships", desc: "We invest in relationships measured in years, not transactions—supporting clients across the full project lifecycle." },
  { icon: Target, title: "Precision & Consistency", desc: "Uniform brightness, color fidelity, and mechanical tolerance across millions of pixels, every time." },
  { icon: Globe2, title: "Global Standards, Local Execution", desc: "International engineering standards applied with regional expertise and on-the-ground support." },
];

const CompanyOverview = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="min-h-screen bg-background font-sans selection:bg-primary/20">
      <SEOHead
        title="Company Overview"
        description="Learn about VexaLED — a global leader in professional LED display solutions. Discover our engineering expertise, values, and commitment to delivering world-class visual experiences."
      />
      <Navbar onSearchClick={openSearch} isSearchOpen={isSearchOpen} onCloseSearch={closeSearch} />

      {/* HERO */}
      <section ref={heroRef} className="relative flex h-screen min-h-[700px] w-full items-center justify-center overflow-hidden bg-black">
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-35" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        <motion.div className="relative z-10 flex flex-col items-center text-center px-6" style={{ opacity: heroOpacity }}>
          <motion.div initial={{ opacity: 0, scale: 0.7, filter: "blur(20px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1.4, ease: [0.215, 0.61, 0.355, 1] }} className="mb-10">
            <img src={vexaledLogo} alt="VEXALED" className="h-24 w-auto md:h-32 lg:h-36 drop-shadow-2xl" />
          </motion.div>
          <motion.h1 className="font-display text-5xl font-bold tracking-[0.15em] text-white md:text-6xl lg:text-7xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}>
            VEXALED
          </motion.h1>
          <motion.div className="my-7 h-px w-16 bg-white/30" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.9 }} />
          <motion.p className="max-w-xl text-base font-light tracking-widest uppercase text-white/60 md:text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.1 }}>
            Engineering visual certainty for the world's most demanding environments
          </motion.p>
        </motion.div>
        <motion.div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Scroll</span>
          <motion.div className="h-12 w-px bg-gradient-to-b from-white/30 to-transparent" animate={{ scaleY: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
      </section>

      {/* INTRODUCTION */}
      <section className="py-28 md:py-36 lg:py-44 bg-background">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="mb-8 inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-primary/70">Who We Are</span>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-[2.75rem]">
              VEXALED is a specialist manufacturer of professional LED display systems—serving markets where{" "}
              <span className="text-primary">image quality</span>,{" "}
              <span className="text-primary">structural reliability</span>, and{" "}
              <span className="text-primary">operational uptime</span> are non-negotiable.
            </h2>
          </Reveal>
          <Reveal className="mx-auto mt-10 max-w-2xl text-center" delay={0.2}>
            <p className="text-lg leading-[1.8] text-muted-foreground">
              From stadiums and concert halls to broadcast studios and digital-out-of-home networks, we design, engineer, and support display solutions that perform under pressure—day after day, pixel by pixel.
            </p>
          </Reveal>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-card/40 border-y border-border/20" />
        <div className="container-wide relative mx-auto px-5 md:px-8 lg:px-10">
          <div className="grid lg:grid-cols-2">
            <div className="border-b border-border/20 py-24 md:py-32 lg:border-b-0 lg:border-r lg:pr-16 xl:pr-24">
              <Reveal>
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"><Target className="h-5 w-5 text-primary" /></div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary/70">Our Mission</span>
                </div>
                <h2 className="mb-8 font-display text-3xl font-bold leading-tight md:text-4xl">To deliver LED display technology that professionals <em className="not-italic text-primary">can depend on.</em></h2>
                <p className="text-lg leading-[1.8] text-muted-foreground">Engineered for clarity. Built for durability. Backed by a team that understands what's at stake when the lights come on and fifty thousand people are watching.</p>
              </Reveal>
            </div>
            <div className="py-24 md:py-32 lg:pl-16 xl:pl-24">
              <Reveal delay={0.15}>
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"><Eye className="h-5 w-5 text-primary" /></div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary/70">Our Vision</span>
                </div>
                <h2 className="mb-8 font-display text-3xl font-bold leading-tight md:text-4xl">To set the global standard for <em className="not-italic text-primary">visual reliability.</em></h2>
                <p className="text-lg leading-[1.8] text-muted-foreground">Where every pixel is predictable. Every installation is engineered. And every client relationship is measured in decades, not deployments.</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CORE EXPERTISE */}
      <section className="py-28 md:py-36 lg:py-44 bg-background">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <Reveal className="mb-20 max-w-2xl">
            <span className="mb-4 inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-primary/70">Core Disciplines</span>
            <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl lg:text-[2.75rem]">What We Do Best</h2>
          </Reveal>
          <div className="space-y-0">
            {coreExpertise.map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className={`group grid items-start gap-8 border-t border-border/30 py-12 md:grid-cols-12 md:gap-12 md:py-16 ${i === coreExpertise.length - 1 ? "border-b" : ""}`}>
                  <div className="flex items-center gap-5 md:col-span-1">
                    <span className="font-display text-sm font-bold text-muted-foreground/40">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="md:col-span-4">
                    <div className="mb-3 flex items-center gap-4">
                      <item.icon className="h-5 w-5 text-primary/60" />
                      <h3 className="font-display text-xl font-bold tracking-tight">{item.title}</h3>
                    </div>
                    <span className="text-xs font-medium uppercase tracking-widest text-primary/50">{item.accent}</span>
                  </div>
                  <div className="md:col-span-7">
                    <p className="text-base leading-[1.8] text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="relative overflow-hidden bg-black py-28 md:py-36 lg:py-44">
        <div className="container-wide relative mx-auto px-5 md:px-8 lg:px-10">
          <Reveal className="mb-16 text-center">
            <span className="mb-4 inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">Proven In</span>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-[2.75rem]">Industries We Serve</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {industries.map((ind, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <Link to={ind.href} className="group relative block aspect-[3/4] overflow-hidden rounded-xl">
                  <img src={ind.image} alt={ind.label} className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 transition-colors group-hover:text-primary/70">{ind.stat}</p>
                    <h3 className="font-display text-base font-bold text-white">{ind.label}</h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-28 md:py-36 lg:py-44 bg-background">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <Reveal className="mb-20 max-w-2xl">
            <span className="mb-4 inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-primary/70">Principles</span>
            <h2 className="mb-6 font-display text-3xl font-bold leading-tight md:text-4xl lg:text-[2.75rem]">Values & Standards</h2>
            <p className="text-lg leading-[1.8] text-muted-foreground">These aren't marketing statements. They're the operational standards every project is measured against—internally, before anything ships.</p>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border/30 bg-border/30 md:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="flex h-full flex-col bg-card p-8 md:p-10 transition-colors hover:bg-card/80">
                  <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary"><v.icon className="h-5 w-5" /></div>
                  <h3 className="mb-3 font-display text-lg font-bold">{v.title}</h3>
                  <p className="text-sm leading-[1.75] text-muted-foreground">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL PRESENCE */}
      <section className="relative overflow-hidden border-y border-border/20 bg-card/30">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <div className="grid items-center gap-0 lg:grid-cols-2">
            <div className="py-24 md:py-32 lg:pr-16 xl:pr-24">
              <Reveal>
                <span className="mb-4 inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-primary/70">Reach</span>
                <h2 className="mb-8 font-display text-3xl font-bold leading-tight md:text-4xl lg:text-[2.75rem]">
                  Global Presence, <span className="text-primary">Local Execution</span>
                </h2>
                <p className="mb-10 text-lg leading-[1.8] text-muted-foreground">With projects delivered across six continents, VEXALED combines global manufacturing scale with regional engineering support.</p>
                <ul className="space-y-4">
                  {["Headquarters & manufacturing in Foshan, Guangdong, China", "Engineering team with 20+ years of LED display expertise", "Global delivery to projects in 50+ countries", "Certified to IEC, UL, CE, and FCC standards"].map((item, i) => (
                    <Reveal key={i} delay={i * 0.08}>
                      <li className="flex items-start gap-4 text-foreground"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary/60" /><span className="text-base">{item}</span></li>
                    </Reveal>
                  ))}
                </ul>
              </Reveal>
            </div>
            <Reveal delay={0.15} className="relative h-full min-h-[400px] lg:min-h-0">
              <div className="absolute inset-0 lg:relative lg:aspect-auto">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=900&fit=crop" alt="Global operations" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-card/30 to-transparent lg:from-card/60" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="relative py-32 md:py-40 lg:py-48 bg-background overflow-hidden">
        <div className="container-wide relative mx-auto px-5 text-center md:px-8 lg:px-10">
          <Reveal className="mx-auto max-w-3xl">
            <div className="mb-8 h-px w-16 mx-auto bg-primary/30" />
            <h2 className="mb-8 font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              Built to Perform.<br /><span className="text-primary">Engineered to Last.</span>
            </h2>
            <p className="mb-12 text-xl leading-[1.8] text-muted-foreground">VEXALED exists to remove uncertainty from large-format visual experiences. When the stakes are highest, our technology delivers.</p>
            <Link to="/products/cob" className="group inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.15em] text-primary transition-colors hover:text-foreground">
              Explore Our Solutions <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
      <AnimatePresence>{isSearchOpen && <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />}</AnimatePresence>
    </main>
  );
};

export default CompanyOverview;
