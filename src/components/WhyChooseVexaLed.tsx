import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Globe, Map, Shield, ArrowRight } from 'lucide-react';
import { whyChooseConfig } from '../config';
import { useLanguage } from '@/i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = {
  award: Award,
  globe: Globe,
  map: Map,
  shield: Shield,
};

const WhyChooseVexaLed = () => {
  const { t } = useLanguage();
  const isEmpty = whyChooseConfig.statCards.length === 0;

  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!sectionRef.current || isEmpty) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => setIsVisible(true),
    });

    scrollTriggerRef.current = st;
    return () => { st.kill(); };
  }, [isEmpty]);

  useEffect(() => {
    if (!isVisible || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.querySelectorAll('.stat-card') || [],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isVisible]);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  if (isEmpty) return null;

  return (
    <section
      id="whychoose"
      ref={sectionRef}
      className="relative w-full min-h-screen py-20 overflow-hidden"
      style={{ backgroundColor: '#0a0a0f' }}
    >
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #111118 50%, #0a0a0f 100%)' }} />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div ref={contentRef} className="relative z-20 max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 text-center">
          <p className="font-tech text-xs text-primary uppercase tracking-wider mb-4">
            {t.whyChoose.sectionLabel}
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-foreground">
            {t.whyChoose.sectionTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {whyChooseConfig.statCards.map((stat, index) => {
            const IconComponent = ICON_MAP[stat.icon as keyof typeof ICON_MAP];
            const translatedCard = t.whyChoose.statCards[index];
            return (
              <div
                key={stat.id}
                className="stat-card group relative p-8 rounded-2xl bg-foreground/5 backdrop-blur-sm border border-foreground/10 hover:border-primary/50 hover:bg-foreground/10 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <p className="font-display text-4xl md:text-5xl text-foreground mb-2 group-hover:text-primary transition-colors">
                  {stat.value}
                </p>
                <p className="font-tech text-sm text-primary uppercase tracking-wider mb-3">
                  {translatedCard?.label || stat.label}
                </p>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {translatedCard?.description || stat.description}
                </p>
                <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {t.whyChoose.pillars.map((pillar, index) => (
            <div key={index} className="stat-card p-6 rounded-xl border border-foreground/5 hover:border-primary/30 transition-colors">
              <div className="w-2 h-2 rounded-full bg-primary mb-4" />
              <h3 className="font-display text-lg text-foreground mb-2">{pillar.title}</h3>
              <p className="text-sm text-foreground/50">{pillar.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="font-tech text-sm text-foreground/50 mb-6">{t.whyChoose.bottomNote}</p>
          <button
            onClick={scrollToContact}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-display text-sm uppercase tracking-wider rounded-full hover:bg-primary/80 transition-colors"
          >
            <span>{t.whyChoose.bottomCtaText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseVexaLed;
