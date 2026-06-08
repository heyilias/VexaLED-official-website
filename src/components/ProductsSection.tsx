import { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

// Maps each carousel product name → its product detail / category route.
// The LED SCREEN card routes to the LED Poster product page (the live flagship);
// lighting items route to the lighting category page until they ship.
const PRODUCT_LINKS: Record<string, string> = {
  'LED SCREEN':   '/products/led-screens/led-poster-display',
  'PUCK LIGHTS':  '/products/lighting',
  'WASH LIGHT':   '/products/lighting',
  'MOVING HEADS': '/products/lighting',
};
const DEFAULT_PRODUCT_LINK = '/products/led-screens';

interface Product {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  specs: string[];
  link: string;
}

const ProductsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const products: Product[] = (t.productsSection?.products || [
    { name: 'LED SCREEN', subtitle: 'High-Quality Display', description: 'Premium LED display screens engineered for stunning visuals in any environment, from corporate to entertainment.', specs: ['4K Resolution', '3840Hz Refresh', '5000:1 Contrast'] },
    { name: 'PUCK LIGHTS', subtitle: 'Compact Lighting', description: 'Versatile puck lighting solutions offering precise illumination for architectural and decorative applications.', specs: ['Dimmable', 'RGB+W', 'Surface Mount'] },
    { name: 'WASH LIGHT', subtitle: 'Professional Wash', description: 'Powerful wash lighting fixtures designed for stage productions, events, and architectural highlighting.', specs: ['Wide Beam', 'DMX Control', 'IP65 Rated'] },
    { name: 'MOVING HEADS', subtitle: 'Dynamic Fixtures', description: 'Intelligent moving head fixtures that bring dynamic movement and color to live events and installations.', specs: ['Pan/Tilt', 'Gobo Patterns', 'DMX512'] },
  ]).map((p: Product, i: number) => ({
    id: i + 1,
    name: p.name,
    subtitle: p.subtitle,
    description: p.description,
    image: `/images/product-${i + 1}.png`,
    specs: p.specs,
    // Honour an explicit link on the product if translations provide one,
    // otherwise look it up by name, otherwise fall back to the LED Screens list.
    link: (p as Product).link || PRODUCT_LINKS[p.name?.toUpperCase()] || DEFAULT_PRODUCT_LINK,
  }));

  const [activeIndex, setActiveIndex] = useState(Math.min(2, products.length - 1));
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => setIsVisible(true),
    });
    return () => { st.kill(); };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.product-card', { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out' });
      gsap.fromTo('.product-info-panel', { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power3.out' });
    }, sectionRef);
    return () => ctx.revert();
  }, [isVisible]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigateTo(activeIndex - 1);
      else if (e.key === 'ArrowRight') navigateTo(activeIndex + 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  const navigateTo = useCallback((index: number) => {
    const newIndex = Math.max(0, Math.min(index, products.length - 1));
    if (newIndex === activeIndex) return;
    setActiveIndex(newIndex);
  }, [activeIndex, products.length]);

  const handleMouseDown = (e: React.MouseEvent) => { setIsDragging(true); setStartX(e.clientX); };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    if (Math.abs(diff) > 80) {
      navigateTo(diff > 0 ? activeIndex - 1 : activeIndex + 1);
      setIsDragging(false);
    }
  };
  const handleMouseUp = () => setIsDragging(false);
  const handleTouchStart = (e: React.TouchEvent) => setStartX(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => {
    const diff = e.touches[0].clientX - startX;
    if (Math.abs(diff) > 80) {
      navigateTo(diff > 0 ? activeIndex - 1 : activeIndex + 1);
      setStartX(e.touches[0].clientX);
    }
  };

  const getProductStyle = (index: number) => {
    const diff = index - activeIndex;
    const absDiff = Math.abs(diff);
    const isCenter = diff === 0;
    const translateX = diff * 260;
    const translateZ = isCenter ? 100 : -absDiff * 160;
    const rotateY = diff * -30;
    const scale = isCenter ? 1 : 0.7 - absDiff * 0.08;
    const opacity = isCenter ? 1 : 0.35 - absDiff * 0.1;
    const blur = isCenter ? 0 : absDiff * 2.5;

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity: Math.max(opacity, 0.15),
      filter: `blur(${blur}px)`,
      zIndex: 20 - absDiff,
      transition: 'all 0.65s cubic-bezier(0.23, 1, 0.32, 1)',
    };
  };

  const activeProduct = products[activeIndex];

  if (!activeProduct) {
    return null;
  }

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative w-full min-h-screen py-16 md:py-20 overflow-hidden"
      style={{ backgroundColor: '#0a0a0f' }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-card/30 to-[#0a0a0f]" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Header */}
      <div className="relative z-10 text-center mb-10">
        <p className="font-tech text-xs text-primary uppercase tracking-widest mb-2">
          {t.productsSection?.tag || 'OUR PRODUCTS'}
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-foreground">
          {t.productsSection?.title || 'LED Solutions'}
        </h2>
      </div>

      {/* Main Content - Split Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[550px]">
          
          {/* LEFT: 3D Carousel */}
          <div
            ref={carouselRef}
            className="relative h-[400px] md:h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            style={{ perspective: '1400px' }}
          >
            <div className="relative flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="product-card absolute"
                  style={getProductStyle(index)}
                  onClick={() => navigateTo(index)}
                >
                  <div className={`relative w-[180px] md:w-[240px] h-[260px] md:h-[360px] rounded-2xl overflow-hidden ${index === activeIndex ? 'shadow-2xl shadow-primary/25' : ''}`}>
                    {index === activeIndex && (
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-primary/5 pointer-events-none z-10" />
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain bg-gradient-to-b from-card/80 to-[#0a0a0f]"
                      draggable={false}
                    />
                    {index === activeIndex && (
                      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-primary/15 to-transparent pointer-events-none" />
                    )}
                    {index !== activeIndex && (
                      <div className="absolute bottom-3 left-0 right-0 text-center">
                        <p className="font-tech text-[10px] text-foreground/40 uppercase tracking-wider">{product.name}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => navigateTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="absolute left-0 z-30 w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all disabled:opacity-15 disabled:cursor-not-allowed bg-background/50 backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigateTo(activeIndex + 1)}
              disabled={activeIndex === products.length - 1}
              className="absolute right-0 z-30 w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all disabled:opacity-15 disabled:cursor-not-allowed bg-background/50 backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* RIGHT: Product Info */}
          <div ref={infoRef} className="product-info-panel">
            <div className="bg-foreground/[0.03] backdrop-blur-sm rounded-2xl border border-foreground/10 p-6 md:p-8 relative overflow-hidden">
              {/* Glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[60px] pointer-events-none" />

              {/* Product Counter */}
              <div className="flex items-center gap-2 mb-4">
                <span className="font-tech text-2xl text-primary font-bold">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="font-tech text-sm text-foreground/30">/</span>
                <span className="font-tech text-sm text-foreground/30">
                  {String(products.length).padStart(2, '0')}
                </span>
              </div>

              {/* Name */}
              <h3 className="font-display text-3xl md:text-4xl text-foreground mb-1">{activeProduct.name}</h3>
              <p className="font-tech text-sm text-primary uppercase tracking-wider mb-5">{activeProduct.subtitle}</p>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{activeProduct.description}</p>

              {/* Specs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {activeProduct.specs.map((spec, i) => (
                  <span key={i} className="px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-xs font-tech text-primary">
                    {spec}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <Link
                to={activeProduct.link}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-display text-sm uppercase tracking-wider rounded-full hover:bg-primary/80 transition-colors"
              >
                <span>{t.productsSection?.learnMore || 'Learn More'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Pagination */}
              <div className="flex gap-2 mt-6 pt-6 border-t border-foreground/10">
                {products.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => navigateTo(index)}
                    className={`h-1 rounded-full transition-all duration-400 ${index === activeIndex ? 'w-6 bg-primary' : 'w-1 bg-muted-foreground/20 hover:bg-muted-foreground/40'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard hint */}
      <div className="relative z-10 text-center mt-6">
        <p className="text-xs text-muted-foreground/30 font-tech">{t.productsSection?.navHint || 'Use ← → arrow keys or drag to navigate'}</p>
      </div>
    </section>
  );
};

export default ProductsSection;
