import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Ticket, ArrowRight } from 'lucide-react';
import { parallaxGalleryConfig } from '../config';
import { useLanguage } from '@/i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const ParallaxGallery = () => {
  const { t } = useLanguage();
  const isEmpty =
    parallaxGalleryConfig.parallaxImagesTop.length === 0 &&
    parallaxGalleryConfig.galleryImages.length === 0;

  const sectionRef = useRef<HTMLDivElement>(null);
  const parallaxContainerRef = useRef<HTMLDivElement>(null);
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRefs = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    if (!sectionRef.current || isEmpty) return;

    const ctx = gsap.context(() => {
      if (topRowRef.current && bottomRowRef.current) {
        const st1 = ScrollTrigger.create({
          trigger: parallaxContainerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            if (topRowRef.current) gsap.set(topRowRef.current, { x: -progress * 300 });
            if (bottomRowRef.current) gsap.set(bottomRowRef.current, { x: progress * 300 - 150 });
          },
        });
        scrollTriggerRefs.current.push(st1);
      }

      if (galleryRef.current && galleryTrackRef.current) {
        const trackWidth = galleryTrackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;

        const st2 = ScrollTrigger.create({
          trigger: galleryRef.current,
          start: 'top top',
          end: () => `+=${trackWidth - viewportWidth}`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            if (galleryTrackRef.current) {
              const x = -self.progress * (trackWidth - viewportWidth);
              gsap.set(galleryTrackRef.current, { x });
            }
          },
        });
        scrollTriggerRefs.current.push(st2);
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      scrollTriggerRefs.current.forEach((st) => st.kill());
      scrollTriggerRefs.current = [];
    };
  }, [isEmpty]);

  if (isEmpty) return null;

  return (
    <section id="gallery" ref={sectionRef} className="relative w-full" style={{ backgroundColor: '#0a0a0f' }}>
      {/* Parallax Strips */}
      <div ref={parallaxContainerRef} className="relative py-20 overflow-hidden">
        <div className="px-12 mb-12">
          <p className="font-tech text-xs text-primary/60 uppercase tracking-wider mb-2">
            {t.parallaxGallery.sectionLabel}
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            {t.parallaxGallery.sectionTitle}
          </h2>
        </div>

        <div ref={topRowRef} className="flex gap-4 mb-4 will-change-transform">
          {parallaxGalleryConfig.parallaxImagesTop.map((image) => (
            <div key={image.id} className="relative flex-shrink-0 w-[400px] h-[250px] overflow-hidden rounded-lg image-hover-scale">
              <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          ))}
        </div>

        <div ref={bottomRowRef} className="flex gap-4 will-change-transform" style={{ transform: 'translateX(-150px)' }}>
          {parallaxGalleryConfig.parallaxImagesBottom.map((image) => (
            <div key={image.id} className="relative flex-shrink-0 w-[400px] h-[250px] overflow-hidden rounded-lg image-hover-scale">
              <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="relative py-8 overflow-hidden" style={{ backgroundColor: '#111118' }}>
        <div className="animate-marquee flex whitespace-nowrap">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="flex items-center gap-8 mx-8 text-2xl font-display text-foreground/20">
              {t.parallaxGallery.marqueeTexts.map((text, j) => (
                <span key={j}>{text}</span>
              ))}
              <Ticket className="w-6 h-6" />
              <ArrowRight className="w-6 h-6" />
            </span>
          ))}
        </div>
      </div>

      {/* Horizontal Gallery */}
      <div ref={galleryRef} className="relative h-screen overflow-hidden">
        <div className="absolute top-12 left-12 z-20">
          <p className="font-tech text-xs text-primary/60 uppercase tracking-wider mb-2">
            {t.parallaxGallery.galleryLabel}
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            {t.parallaxGallery.galleryTitle}
          </h2>
        </div>

        <div ref={galleryTrackRef} className="flex items-center gap-8 h-full px-12 pt-24 will-change-transform">
          {parallaxGalleryConfig.galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="relative flex-shrink-0 group cursor-pointer"
              style={{ marginTop: index % 2 === 0 ? '0' : '60px' }}
            >
              <div className="relative w-[450px] h-[300px] overflow-hidden rounded-xl">
                <img src={image.src} alt={t.parallaxGallery.galleryTitles[index] || image.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="font-tech text-xs text-primary/80 mb-1">{image.date}</p>
                  <h3 className="font-display text-2xl text-foreground">{t.parallaxGallery.galleryTitles[index] || image.title}</h3>
                </div>
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
              </div>
              <div className="absolute -top-8 -left-4 font-tech text-7xl text-foreground/5 font-bold">
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
          ))}

          <div className="flex-shrink-0 flex flex-col items-center justify-center w-[300px] h-[300px]">
            <button className="group flex flex-col items-center gap-4 text-foreground hover:text-primary transition-colors">
              <div className="w-20 h-20 rounded-full border border-foreground/20 group-hover:border-primary flex items-center justify-center transition-colors">
                <ArrowRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
              </div>
              <span className="font-display text-lg uppercase tracking-wider">{t.parallaxGallery.endCtaText}</span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-12 left-12 right-12 h-px bg-foreground/10">
          <div className="h-full bg-primary/50 w-0" id="gallery-progress" />
        </div>
      </div>
    </section>
  );
};

export default ParallaxGallery;
