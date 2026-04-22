import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, ShieldCheck, Globe, Headphones, Clock, Settings } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function WhyVexaled() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const icons = [Cpu, ShieldCheck, Globe, Headphones];
  const credentialIcons = [Clock, Globe, Settings, ShieldCheck];

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(45 12% 95%) 0%, hsl(40 10% 93%) 50%, hsl(45 12% 94%) 100%)" }}
    >
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />

      <div className="container-wide mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16 md:mb-20">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-surface-dark mb-6">{t.whyVexaled.title}</h2>
          <p className="text-lg md:text-xl text-surface-dark/70 max-w-3xl mx-auto leading-relaxed">{t.whyVexaled.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16 md:mb-20">
          {t.whyVexaled.features.map((feature, index) => {
            const Icon = icons[index];
            return (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.1 }} className="group relative bg-surface-dark rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-surface-light/20">
                <div className="w-14 h-14 rounded-xl border border-primary/30 bg-primary/5 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_hsl(66_95%_52%/0.15)]">
                  <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="bg-surface-dark rounded-3xl p-8 md:p-12 mb-16 md:mb-20 border border-surface-light/20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {t.whyVexaled.credentials.map((item, index) => {
              const Icon = credentialIcons[index];
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }} className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/5 shadow-[0_0_20px_hsl(66_95%_52%/0.15)]">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="font-display text-3xl md:text-4xl font-bold text-foreground">{item.value}</span>
                  <span className="mt-1 text-sm uppercase tracking-wider text-muted-foreground">{item.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 }} className="text-center">
          <p className="text-xl md:text-2xl text-surface-dark/80 max-w-4xl mx-auto leading-relaxed font-light">
            {t.whyVexaled.closingQuote}<span className="text-surface-dark font-medium">{t.whyVexaled.closingHighlight}</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
