import { useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { useNewsletter } from "@/hooks/useNewsletter";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";
import { BookOpen, TrendingUp, Sparkles, ArrowRight, Mail } from "lucide-react";
import { usePageTranslations } from "@/i18n/usePageTranslations";

type Category = "all" | "led-technology" | "smart-displays" | "product-updates" | "case-studies" | "company-news";

const Reveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.215, 0.61, 0.355, 1] }} className={className}>
      {children}
    </motion.div>
  );
};

export default function Blog() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [email, setEmail] = useState("");
  const newsletter = useNewsletter();
  const pt = usePageTranslations();
  const t = pt.blog;

  const CATEGORIES: { id: Category; label: string }[] = [
    { id: "all", label: t.categories.all },
    { id: "led-technology", label: t.categories.ledTechnology },
    { id: "smart-displays", label: t.categories.smartDisplays },
    { id: "product-updates", label: t.categories.productUpdates },
    { id: "case-studies", label: t.categories.caseStudies },
    { id: "company-news", label: t.categories.companyNews },
  ];

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  const featuredPost = t.posts.find((p) => p.featured);
  const filteredPosts = t.posts.filter((p) => activeCategory === "all" || p.category === activeCategory);
  const gridPosts = filteredPosts.filter((p) => !p.featured);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    await newsletter.mutateAsync({ email });
    if (!newsletter.isError) {
      setEmail("");
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://vexaled.com" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://vexaled.com/blog" },
    ],
  };

  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        title="LED Display Knowledge Hub"
        description="Explore VEXALED's blog for the latest insights on LED technology, smart displays, product updates, and industry case studies."
        jsonLd={breadcrumbJsonLd}
      />
      <Navbar onSearchClick={openSearch} isSearchOpen={isSearchOpen} onCloseSearch={closeSearch} />

      {/* HERO */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/4 via-background to-background" />
        <div className="container-wide relative mx-auto px-5 md:px-8 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mx-auto max-w-3xl text-center">
            <span className="mb-5 inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-primary/60">{t.knowledgeHub}</span>
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">{t.title}</h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">{t.subtitle}</motion.p>
          </motion.div>

          {/* Featured */}
          {featuredPost && (
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }} className="mx-auto mt-14 max-w-4xl">
              <Link to="#" className="group block">
                <div className="grid overflow-hidden rounded-lg md:grid-cols-2">
                  <div className="relative aspect-video overflow-hidden md:aspect-auto md:min-h-[280px]">
                    <img src={featuredPost.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-col justify-center bg-card/60 p-7 md:p-10">
                    <span className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">{CATEGORIES.find((c) => c.id === featuredPost.category)?.label}</span>
                    <h2 className="font-display text-xl font-bold text-foreground transition-colors group-hover:text-primary md:text-2xl">{featuredPost.title}</h2>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{featuredPost.excerpt}</p>
                    <p className="mt-5 text-xs text-muted-foreground/60">{featuredPost.author} · {featuredPost.date}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* FILTERS */}
      <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center gap-2 overflow-x-auto border-b border-border/20 pb-4 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] transition-all ${activeCategory === cat.id ? "bg-primary/10 text-primary" : "text-muted-foreground/60 hover:text-foreground"}`}>
              {cat.label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* GRID */}
      <section className="py-16 md:py-20">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <AnimatePresence mode="wait">
            {gridPosts.length === 0 ? (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-16 text-center text-muted-foreground">{t.noArticles}</motion.p>
            ) : (
              <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {gridPosts.map((post, i) => (
                  <motion.article key={post.title + i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link to="#" className="group block">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                        <img src={post.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      <div className="mt-5 flex items-center gap-3">
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary/60">{CATEGORIES.find((c) => c.id === post.category)?.label}</span>
                        <span className="h-3 w-px bg-border/40" />
                        <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground/50">{post.date}</span>
                      </div>
                      <h3 className="mt-3 font-display text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">{post.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <Reveal delay={0.2} className="mt-14 text-center">
            <button className="rounded-full px-8 py-3 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground transition-all hover:text-foreground border border-border/30 hover:border-border/60">{t.loadMore}</button>
          </Reveal>
        </div>
      </section>

      {/* KNOWLEDGE */}
      <section className="py-20 md:py-28 border-t border-border/15">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <Reveal>
            <h2 className="mb-3 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">{t.knowledgeInnovation}</h2>
            <p className="mb-12 max-w-2xl text-sm leading-relaxed text-muted-foreground">{t.knowledgeDescription}</p>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {[BookOpen, TrendingUp, Sparkles].map((Icon, i) => (
              <Reveal key={t.resources[i].title} delay={i * 0.08}>
                <div className="p-6">
                  <Icon className="mb-4 h-5 w-5 text-primary/50" />
                  <h3 className="font-display text-base font-bold text-foreground">{t.resources[i].title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.resources[i].desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3} className="mt-10">
            <Link to="/#products" className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-primary/70 transition-colors hover:text-primary">
              {t.exploreSolutions}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 md:py-28">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <Reveal>
            <div className="mx-auto max-w-xl text-center">
              <Mail className="mx-auto mb-5 h-6 w-6 text-primary/40" />
              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">{t.stayUpdated}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.newsletterDescription}</p>
              <form onSubmit={handleSubscribe} className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-2">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="flex-1 rounded-full border border-border/30 bg-transparent px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/40 focus:outline-none" />
                <button type="submit" disabled={newsletter.isPending} className="shrink-0 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-60">
                  {newsletter.isPending ? t.subscribing : t.subscribe}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
      <AnimatePresence>{isSearchOpen && <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />}</AnimatePresence>
    </main>
  );
}
