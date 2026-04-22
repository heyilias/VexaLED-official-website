import { useState, useCallback, useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";
import { Home, ArrowRight, Download, Send, Award, ChevronRight, MapPin, Zap, Shield, Cpu } from "lucide-react";
import { getProductDetail } from "@/data/productDetailData";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};
const stagger = (i: number) => ({ ...fadeUp, transition: { ...fadeUp.transition, delay: i * 0.12 } });

const Product = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  if (!slug || !category) return <Navigate to="/" replace />;
  const product = getProductDetail(slug, category);
  if (!product) return <Navigate to="/" replace />;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar onSearchClick={openSearch} isSearchOpen={isSearchOpen} onCloseSearch={closeSearch} />

      {/* HERO */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden bg-black">
        <motion.div className="absolute inset-0" style={{ opacity: heroOpacity, scale: heroScale }}>
          <img src={product.heroImage} alt={product.title} className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />
        </motion.div>
        <div className="container-wide relative mx-auto flex h-full flex-col justify-end px-5 pb-20 md:px-8 md:pb-24 lg:px-10">
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8 flex items-center gap-2.5 text-xs uppercase tracking-[0.15em] text-white/40">
            <Link to="/" className="flex items-center gap-2 transition-colors hover:text-white/70"><Home className="h-3.5 w-3.5" /><span>Home</span></Link>
            <ChevronRight className="h-3 w-3" />
            <Link to={`/products/${category}`} className="capitalize transition-colors hover:text-white/70">{category}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/60">{product.title}</span>
          </motion.nav>
          <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="mb-6 font-display text-5xl font-bold uppercase tracking-[0.15em] text-white md:text-6xl lg:text-7xl xl:text-8xl">
            {product.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="max-w-2xl text-base font-light leading-relaxed text-white/70 md:text-lg lg:text-xl">
            {product.tagline}
          </motion.p>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="relative bg-background py-20 md:py-28 lg:py-32">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
            <motion.div {...fadeUp}>
              <span className="mb-5 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">Product Overview</span>
              <h2 className="mb-6 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">{product.overviewTitle}</h2>
              <p className="text-lg leading-[1.8] text-muted-foreground">{product.overviewDescription}</p>
            </motion.div>
            <motion.div {...fadeUp} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/20">
              <img src={product.overviewImage} alt={`${product.title} detail`} className="h-full w-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="relative bg-muted/20 py-20 md:py-28">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <motion.div {...fadeUp} className="mb-16 text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">Application Scenarios</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">Where It Shines</h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {product.applications.map((app, i) => (
              <motion.div key={i} {...stagger(i)} className="group relative aspect-[3/2] overflow-hidden rounded-xl border border-border/20 bg-card">
                <img src={app.image} alt={app.label} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6"><h3 className="text-lg font-semibold text-white">{app.label}</h3></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="relative bg-background py-20 md:py-28">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <motion.div {...fadeUp} className="mb-16 text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">Core Advantages</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">Why {product.title}</h2>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {product.valueProps.map((vp, i) => {
              const icons = [Shield, Zap, Cpu];
              const Icon = icons[i % icons.length];
              return (
                <motion.div key={i} {...stagger(i)} className="group overflow-hidden rounded-2xl border border-border/20 bg-card/50 p-8 transition-colors hover:border-primary/30">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10"><Icon className="h-7 w-7 text-primary" strokeWidth={1.5} /></div>
                  <h3 className="mb-3 text-xl font-bold text-foreground">{vp.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{vp.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative bg-muted/20 py-20 md:py-28 lg:py-32">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <motion.div {...fadeUp} className="mb-16 text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">Technology</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">Technical Excellence</h2>
          </motion.div>
          <div className="space-y-24 md:space-y-32">
            {product.features.map((feature, i) => {
              const isReversed = i % 2 === 1;
              return (
                <motion.div key={i} {...fadeUp} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                  <div className={`relative aspect-[16/10] overflow-hidden rounded-2xl border border-border/20 ${isReversed ? "lg:order-2" : ""}`}>
                    <img src={feature.image} alt={feature.title} className="h-full w-full object-cover" />
                  </div>
                  <div className={isReversed ? "lg:order-1" : ""}>
                    <h3 className="mb-5 text-2xl font-bold tracking-tight text-foreground md:text-3xl">{feature.title}</h3>
                    <p className="text-lg leading-[1.8] text-muted-foreground">{feature.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="relative bg-background py-20 md:py-28">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <motion.div {...fadeUp} className="mb-14 text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">Certifications</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">Compliance & Standards</h2>
          </motion.div>
          <motion.div {...fadeUp} className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {product.certifications.map((cert, i) => (
              <div key={i} className="flex min-w-[140px] flex-col items-center gap-3 rounded-xl border border-border/20 bg-card/40 px-8 py-6 text-center transition-colors hover:border-primary/20">
                <Award className="h-7 w-7 text-primary" strokeWidth={1.5} />
                <span className="text-sm font-bold text-foreground">{cert.label}</span>
                <span className="text-xs text-muted-foreground">{cert.description}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* VARIANTS TABLE */}
      {product.variants.length > 0 && (
        <section className="relative bg-muted/20 py-20 md:py-28">
          <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
            <motion.div {...fadeUp} className="mb-14 text-center">
              <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">Configuration</span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">Available Variants</h2>
            </motion.div>
            <motion.div {...fadeUp} className="overflow-hidden rounded-xl border border-border/20 bg-card">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead><tr className="border-b border-border/20 bg-muted/30">
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Model</th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pixel Pitch</th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Brightness</th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cabinet Size</th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Weight</th>
                  </tr></thead>
                  <tbody>
                    {product.variants.map((v, i) => (
                      <tr key={i} className="border-b border-border/10 transition-colors last:border-0 hover:bg-muted/20">
                        <td className="px-6 py-4 font-semibold text-foreground">{v.name}</td>
                        <td className="px-6 py-4 text-muted-foreground">{v.pixelPitch}</td>
                        <td className="px-6 py-4 text-muted-foreground">{v.brightness}</td>
                        <td className="px-6 py-4 text-muted-foreground">{v.cabinetSize}</td>
                        <td className="px-6 py-4 text-muted-foreground">{v.weight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* SPECS */}
      <section className="relative bg-background py-20 md:py-28">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <motion.div {...fadeUp} className="mb-14 text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">Specifications</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">Product Parameters</h2>
          </motion.div>
          <motion.div {...fadeUp} className="mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-xl border border-border/20 bg-card/30">
              {product.parameters.map((param, i) => (
                <div key={i} className={`flex items-center justify-between border-b border-border/10 px-6 py-5 last:border-0 ${i % 2 === 0 ? "bg-muted/10" : "bg-transparent"}`}>
                  <span className="text-sm font-medium text-muted-foreground">{param.label}</span>
                  <span className="text-sm font-semibold text-foreground">{param.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* INQUIRY */}
      <section className="relative bg-muted/20 py-20 md:py-28">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <div className="mx-auto max-w-2xl">
            <motion.div {...fadeUp} className="mb-12 text-center">
              <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">Get in Touch</span>
              <h2 className="mb-5 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">Request Information</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">Interested in {product.title}? Send us your project details.</p>
            </motion.div>
            <motion.form {...fadeUp} onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground">Full Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full rounded-lg border border-border/40 bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Your name" />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground">Email</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full rounded-lg border border-border/40 bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="name@company.com" />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground">Company</label>
                <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full rounded-lg border border-border/40 bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Company name (optional)" />
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground">Project Details</label>
                <textarea rows={5} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full resize-none rounded-lg border border-border/40 bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Tell us about your installation requirements..." />
              </div>
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90">
                <Send className="h-4 w-4" /> Send Inquiry
              </button>
              {formSubmitted && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-sm font-medium text-primary">Thank you! We'll be in touch shortly.</motion.p>}
            </motion.form>
          </div>
        </div>
      </section>

      {/* DOWNLOADS */}
      {product.relatedDownloads.length > 0 && (
        <section className="relative bg-background py-20 md:py-28">
          <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
            <motion.div {...fadeUp} className="mb-12">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">Resources</span>
              <h3 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">Technical Downloads</h3>
            </motion.div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {product.relatedDownloads.map((dl, i) => (
                <motion.a key={i} href="#" {...stagger(i)} className="flex items-center gap-5 rounded-xl border border-border/20 bg-card p-6 transition-colors hover:border-primary/30 hover:bg-card/80">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10"><Download className="h-6 w-6 text-primary" /></div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-foreground">{dl.title}</p>
                    <p className="text-xs text-muted-foreground">{dl.type} · {dl.size}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <AnimatePresence>{isSearchOpen && <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />}</AnimatePresence>
    </main>
  );
};

export default Product;
