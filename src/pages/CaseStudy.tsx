import { useState, useCallback } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";
import { ArrowLeft, ArrowRight, MapPin, Check, Cpu, Video, Umbrella, Sun, Shield, Maximize, Eye, Palette, Sliders } from "lucide-react";
import { usePageTranslations } from "@/i18n/usePageTranslations";
import { getCaseStudy } from "@/data/caseStudyData";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, any> = { Cpu, Video, Umbrella, Sun, Shield, Maximize, Eye, Palette, Sliders, Check };

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] },
};

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pt = usePageTranslations();
  const t = pt.cases;

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  const study = slug ? getCaseStudy(slug) : null;

  if (!slug || !study) {
    return <Navigate to="/case-studies" replace />;
  }

  return (
    <main className="min-h-screen bg-background font-sans selection:bg-primary/20">
      <Navbar onSearchClick={openSearch} isSearchOpen={isSearchOpen} onCloseSearch={closeSearch} />

      {/* HERO */}
      <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img src={study.image} alt={study.title} className="h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
        </div>
        <div className="container-wide relative mx-auto flex h-full flex-col justify-end px-5 pb-20 md:px-8 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="max-w-4xl">
            <Link to="/case-studies" className="mb-8 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-white/70 transition-colors hover:text-white">
              <ArrowLeft className="h-4 w-4" />{t.backToCases}
            </Link>
            <div className="mb-4 flex flex-wrap items-center gap-4 text-sm font-medium tracking-widest uppercase text-primary">
              <span>{study.tag}</span>
              <span className="h-1 w-1 rounded-full bg-primary" />
              <span className="flex items-center gap-1.5 text-white/80"><MapPin className="h-3.5 w-3.5" />{study.location}</span>
            </div>
            <h1 className="mb-6 font-display text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">{study.title}</h1>
            <p className="max-w-2xl text-xl leading-relaxed text-white/80 md:text-2xl">{study.valueStatement}</p>
          </motion.div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="section-padding bg-background">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-24">
            <motion.div {...fadeUp}>
              <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-muted-foreground">{t.projectContext}</h2>
              <p className="text-xl leading-relaxed text-foreground">{study.description}</p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="rounded-2xl border border-border/40 bg-card p-8 shadow-sm">
              <h3 className="mb-6 font-display text-xl font-semibold">{t.keyFacts}</h3>
              <div className="space-y-4">
                {study.keyFacts.map((fact, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-border/30 pb-3 last:border-0 last:pb-0">
                    <span className="text-sm font-medium text-muted-foreground">{fact.label}</span>
                    <span className="font-semibold text-foreground">{fact.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TECHNICAL SNAPSHOT */}
      <section className="border-y border-border/30 bg-card/30 py-16">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <motion.div {...fadeUp} className="mb-10 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">{t.technicalSpecs}</span>
          </motion.div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {study.technicalSnapshot.map((spec, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="group relative overflow-hidden rounded-xl border border-border/40 bg-background p-6 transition-all hover:border-primary/20 hover:shadow-lg">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{spec.label}</p>
                <p className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">{spec.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CHALLENGE & SOLUTION */}
      <section className="section-padding bg-background">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <motion.div {...fadeUp} className="relative">
              <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-destructive/50 to-transparent lg:-left-8" />
              <h2 className="mb-6 font-display text-3xl font-bold md:text-4xl">{t.theChallenge}</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">{study.challengePromise}</p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="relative">
              <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-primary to-transparent lg:-left-8" />
              <h2 className="mb-6 font-display text-3xl font-bold md:text-4xl">{t.theSolution}</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">{study.solutionPromise}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* KEY HIGHLIGHTS */}
      <section className="section-padding bg-card text-card-foreground">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <motion.div {...fadeUp} className="mb-16 max-w-2xl">
            <h2 className="mb-6 font-display text-3xl font-bold md:text-4xl">{t.whyItWorked}</h2>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            {study.keyHighlights.map((highlight, i) => {
              const Icon = highlight.icon && iconMap[highlight.icon] ? iconMap[highlight.icon] : Check;
              return (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.15 }} className="group rounded-2xl border border-border/40 bg-background p-8 transition-all hover:border-primary/30 hover:shadow-xl">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform"><Icon className="h-6 w-6" /></div>
                  <h3 className="mb-3 font-display text-xl font-bold">{highlight.title}</h3>
                  <p className="text-muted-foreground">{highlight.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="py-20 bg-background border-b border-border/30">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10 text-center">
          <motion.h3 {...fadeUp} className="mb-8 text-sm font-bold uppercase tracking-widest text-muted-foreground">{t.relatedApplications}</motion.h3>
          <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="flex flex-wrap justify-center gap-3">
            {study.typicalApplications.map((app, i) => (
              <span key={i} className="rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary cursor-default">{app}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section-padding bg-background">
        <div className="container-wide mx-auto px-5 md:px-8 lg:px-10">
          <motion.h2 {...fadeUp} className="mb-12 font-display text-3xl font-bold md:text-4xl text-center">{t.galleryTitle}</motion.h2>
          <div className="grid gap-6 md:grid-cols-2">
            {study.gallery.map((item, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className={`relative overflow-hidden rounded-2xl bg-muted ${i === 0 && study.gallery.length % 2 !== 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-[4/3]'}`}>
                <img src={item.src} alt={item.caption || study.title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                {item.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
                    <p className="text-white font-medium">{item.caption}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-primary/5">
        <div className="container-wide mx-auto px-5 text-center md:px-8 lg:px-10">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl">
            <h2 className="mb-6 font-display text-3xl font-bold md:text-4xl lg:text-5xl">{t.readyToBuild}</h2>
            <p className="mb-10 text-xl text-muted-foreground">{t.ctaDescription}</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="min-w-[200px] text-base h-12">
                {t.startConfiguration}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="min-w-[200px] text-base h-12">{t.talkToEngineer}</Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <AnimatePresence>{isSearchOpen && <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />}</AnimatePresence>
    </main>
  );
};

export default CaseStudy;
