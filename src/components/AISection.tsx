import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Bot, Sparkles, Cpu } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const featureIcons = [Bot, Sparkles, Cpu];

export default function AISection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  return (
    <section id="ai" ref={ref} className="section-padding bg-background">
      <div className="container-wide mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-16 text-center">
          <span className="mb-4 inline-block text-sm uppercase tracking-widest text-primary">{t.ai.tag}</span>
          <h2 className="heading-lg mb-4 text-foreground">{t.ai.title}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">{t.ai.subtitle}</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {t.ai.features.map((feature, index) => {
            const Icon = featureIcons[index];
            return (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.15 }} className="group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-b from-card to-card/50 p-8">
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(ellipse at 50% 0%, hsl(66 95% 55% / 0.1) 0%, transparent 60%)' }} />
                <div className="relative z-10">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/5">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-3 font-display text-2xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="mb-6 leading-relaxed text-muted-foreground">{feature.description}</p>
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                    <span className="text-sm font-medium text-primary">{feature.highlight}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.6 }} className="mt-12 rounded-xl border border-border/30 bg-secondary/30 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{t.ai.noteHighlight}</span> {t.ai.note}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
