import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, Globe, Settings, Shield } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const icons = [Clock, Globe, Settings, Shield];

export default function TrustBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  return (
    <section ref={ref} className="relative border-y border-border/50 bg-card/30">
      <div className="container-wide mx-auto px-6 py-16 md:px-12 lg:px-24">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {t.trustBar.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/5">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="font-display text-3xl font-bold text-foreground md:text-4xl">
                  {item.value}
                </span>
                <span className="mt-1 text-sm uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
