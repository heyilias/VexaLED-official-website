import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function ConfigurationCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, hsl(66 95% 55% / 0.08) 0%, transparent 50%)' }} />
      <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(hsl(0 0% 30% / 0.2) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 30% / 0.2) 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />

      <div className="container-wide relative mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl text-center">
          <span className="mb-6 inline-block text-sm uppercase tracking-widest text-primary">{t.cta.tag}</span>
          <h2 className="heading-lg mb-6 text-foreground">{t.cta.title}</h2>
          <p className="body-lg mx-auto mb-10 max-w-xl">{t.cta.subtitle}</p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="hero" size="xl" className="group">
              {t.cta.startConfig}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="heroOutline" size="xl" className="group">
              <MessageCircle className="mr-2 h-5 w-5" />
              {t.cta.talkEngineer}
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-wider text-muted-foreground">
            {t.cta.badges.map((badge) => (
              <span key={badge} className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
