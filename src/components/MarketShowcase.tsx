import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

// Market category images
import xrImage from "@/assets/markets/xr-virtual-production.jpg";
import rentalImage from "@/assets/markets/rental-events.jpg";
import controlRoomsImage from "@/assets/markets/control-rooms.jpg";
import retailImage from "@/assets/markets/retail-experience.jpg";
import corporateImage from "@/assets/markets/corporate-spaces.jpg";
import doohImage from "@/assets/markets/dooh-public.jpg";

interface MarketCategory {
  id: string;
  label: string;
  shortLabel: string;
  image: string;
}

// These labels are industry keywords — NOT translated
const marketCategories: MarketCategory[] = [
  { id: "xrvp", label: "xR&VP", shortLabel: "xR&VP", image: xrImage },
  { id: "rental", label: "Rental", shortLabel: "Rental", image: rentalImage },
  { id: "control", label: "Control Rooms", shortLabel: "Control\nRooms", image: controlRoomsImage },
  { id: "retail", label: "Retail", shortLabel: "Retail", image: retailImage },
  { id: "corporate", label: "Corporate", shortLabel: "Corporate", image: corporateImage },
  { id: "dooh", label: "DOOH", shortLabel: "DOOH", image: doohImage },
];

const CARD_WIDTH = 280;
const CARD_HEIGHT = 420;
const HIDE_DELAY = 80;

const preloadImages = () => {
  marketCategories.forEach(cat => {
    const img = new Image();
    img.src = cat.image;
  });
};

export default function MarketShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const optionsZoneRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isInOptionsZone, setIsInOptionsZone] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 50, stiffness: 800, mass: 0.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const rotateX = useSpring(0, { damping: 50, stiffness: 200 });
  const rotateY = useSpring(0, { damping: 50, stiffness: 200 });

  const [displayedImages, setDisplayedImages] = useState<{ current: string | null; previous: string | null }>({
    current: null,
    previous: null,
  });

  useEffect(() => { preloadImages(); }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
        if (!entry.isIntersecting) {
          setShowCard(false);
          setIsInOptionsZone(false);
          setActiveCategory(null);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!activeCategory) return;
    const activeMarket = marketCategories.find((m) => m.id === activeCategory);
    if (activeMarket && activeMarket.image !== displayedImages.current) {
      setDisplayedImages({
        current: activeMarket.image,
        previous: displayedImages.current,
      });
    }
  }, [activeCategory, displayedImages.current]);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!isInOptionsZone || !isSectionVisible) return;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      rotateY.set(((e.clientX - centerX) / centerX) * 4);
      rotateX.set(-((e.clientY - centerY) / centerY) * 3);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isInOptionsZone, isSectionVisible, isMobile, mouseX, mouseY, rotateX, rotateY]);

  useEffect(() => {
    return () => { if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current); };
  }, []);

  const handleZoneEnter = useCallback(() => {
    if (hideTimeoutRef.current) { clearTimeout(hideTimeoutRef.current); hideTimeoutRef.current = null; }
    setIsInOptionsZone(true);
  }, []);

  const handleZoneLeave = useCallback(() => {
    hideTimeoutRef.current = setTimeout(() => {
      setIsInOptionsZone(false);
      setShowCard(false);
      setActiveCategory(null);
      rotateX.set(0);
      rotateY.set(0);
    }, HIDE_DELAY);
  }, [rotateX, rotateY]);

  const handleLabelEnter = useCallback((categoryId: string, e: React.MouseEvent) => {
    if (isMobile) return;
    if (hideTimeoutRef.current) { clearTimeout(hideTimeoutRef.current); hideTimeoutRef.current = null; }
    setActiveCategory(categoryId);
    setIsInOptionsZone(true);
    setShowCard(true);
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [isMobile, mouseX, mouseY]);

  const handleMobileTap = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
    setShowCard(true);
  }, []);

  const activeMarket = activeCategory ? marketCategories.find((m) => m.id === activeCategory) : null;

  const DesktopLayout = () => (
    <div 
      ref={optionsZoneRef}
      onMouseEnter={handleZoneEnter}
      onMouseLeave={handleZoneLeave}
      className="relative flex justify-between items-end w-full px-4 lg:px-8 min-h-[50vh] py-8"
    >
      {marketCategories.map((category, index) => (
        <motion.button
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={(e) => handleLabelEnter(category.id, e)}
          className="group relative focus:outline-none px-3 py-4 z-20"
          style={{ cursor: showCard ? "none" : "pointer" }}
        >
          <span
            className="block transition-colors duration-200 ease-out whitespace-pre-line leading-[0.85]"
            style={{ 
              writingMode: "vertical-rl", 
              textOrientation: "mixed",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(64px, 8vw, 140px)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              color: activeCategory === category.id ? "#707580" : "#D0D5DB",
            }}
          >
            {category.shortLabel}
          </span>
        </motion.button>
      ))}
    </div>
  );

  const MobileLayout = () => (
    <div className="flex flex-col items-center gap-8 py-8 px-4">
      {marketCategories.map((category, index) => (
        <motion.button
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => handleMobileTap(category.id)}
          className="focus:outline-none w-full text-center"
        >
          <span
            className="block transition-colors duration-200 ease-out whitespace-pre-line"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(32px, 10vw, 48px)",
              fontWeight: activeCategory === category.id ? 500 : 300,
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
              color: activeCategory === category.id ? "#1A1D21" : "#C0C5CC",
            }}
          >
            {category.label}
          </span>
        </motion.button>
      ))}

      <AnimatePresence>
        {showCard && displayedImages.current && isSectionVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[280px] mx-auto mt-4"
          >
            <div 
              className="relative rounded-2xl overflow-hidden"
              style={{
                aspectRatio: `${CARD_WIDTH}/${CARD_HEIGHT}`,
                boxShadow: "0 20px 50px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.08)",
              }}
            >
              <AnimatePresence>
                {displayedImages.previous && (
                  <motion.img key={displayedImages.previous + "-prev"} src={displayedImages.previous} alt="" className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 1 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} />
                )}
              </AnimatePresence>
              <motion.img key={displayedImages.current} src={displayedImages.current} alt={activeMarket?.label || ""} className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5 pointer-events-none" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden py-24 lg:py-32" style={{ backgroundColor: "#F5F5F3" }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 lg:mb-32"
        >
          <h2 
            className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight mb-6"
            style={{ color: "#101316", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}
          >
            {t.marketShowcase.title1}
            <br />
            {t.marketShowcase.title2}
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto font-light" style={{ color: "#525A65", fontFamily: "'Space Grotesk', sans-serif" }}>
            {t.marketShowcase.subtitle}
          </p>
        </motion.div>

        {isMobile ? <MobileLayout /> : <DesktopLayout />}
      </div>

      {/* Desktop floating preview card */}
      {!isMobile && (
        <AnimatePresence mode="sync">
          {showCard && displayedImages.current && isSectionVisible && (
            <motion.div
              className="fixed pointer-events-none z-10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ left: smoothX, top: smoothY, x: "-50%", y: "-50%", rotateX, rotateY, perspective: 1000, width: CARD_WIDTH, height: CARD_HEIGHT }}
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.18), 0 8px 16px rgba(0,0,0,0.1)" }}>
                  <AnimatePresence>
                    {displayedImages.previous && (
                      <motion.img key={displayedImages.previous + "-prev"} src={displayedImages.previous} alt="" className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 1 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} />
                    )}
                  </AnimatePresence>
                  <motion.img key={displayedImages.current} src={displayedImages.current} alt={activeMarket?.label || ""} className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} />
                  <div className="absolute inset-3 rounded-xl pointer-events-none" style={{ boxShadow: "inset 0 0 30px rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5 pointer-events-none" />
                </div>
                <div className="absolute -inset-4 rounded-[1.5rem] -z-10" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%)", filter: "blur(12px)" }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Custom cursor */}
      {!isMobile && (
        <AnimatePresence>
          {showCard && isSectionVisible && (
            <motion.div
              className="fixed pointer-events-none z-[100]"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.12 }}
              style={{ left: smoothX, top: smoothY, x: "-50%", y: "-50%" }}
            >
              <motion.div className="absolute rounded-full" style={{ width: 28, height: 28, left: -14, top: -14, border: "1px solid rgba(100, 180, 255, 0.35)", boxShadow: "0 0 6px rgba(100, 180, 255, 0.25)" }} animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.3, 0.5] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
              <motion.div className="absolute rounded-full" style={{ width: 6, height: 6, left: -3, top: -3, background: "rgba(100, 180, 255, 0.8)", boxShadow: "0 0 4px rgba(100, 180, 255, 0.5)" }} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
}
