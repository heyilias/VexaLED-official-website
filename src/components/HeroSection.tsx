import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// JPEG fallback (older browsers / OS image previews)
import heroImage4 from "@/assets/hero/hero-4.jpeg";
import heroImage1 from "@/assets/hero/hero-1.jpeg";
// WebP — supported in 97%+ of browsers
import heroImage4Webp from "@/assets/hero/hero-4.webp";
import heroImage1Webp from "@/assets/hero/hero-1.webp";
// AVIF — best compression, modern browsers
import heroImage4Avif from "@/assets/hero/hero-4.avif";
import heroImage1Avif from "@/assets/hero/hero-1.avif";
import { useLanguage } from "@/i18n/LanguageContext";

const heroImages = [
  { jpeg: heroImage4, webp: heroImage4Webp, avif: heroImage4Avif },
  { jpeg: heroImage1, webp: heroImage1Webp, avif: heroImage1Avif },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([true, false, false]);
  const { t } = useLanguage();

  // Preload all hero images on mount (use the smallest format the browser supports — AVIF if available)
  useEffect(() => {
    heroImages.forEach((src, index) => {
      const img = new Image();
      img.onload = () => {
        setImagesLoaded((prev) => {
          const next = [...prev];
          next[index] = true;
          return next;
        });
      };
      // Browser will request whichever format works; AVIF first, fall back to webp/jpeg via <picture> below.
      img.src = src.avif ?? src.webp ?? src.jpeg;
    });
  }, []);

  // Auto-advance images every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="relative h-screen w-full overflow-hidden"
      style={{ 
        // Fallback background color matching hero palette - prevents white flash
        backgroundColor: "#0a0a0f" 
      }}
    >
      {/* Cinematic Background Images with Cross-fade */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{
              opacity: currentIndex === index ? 1 : 0,
            }}
            transition={{
              duration: 1.8,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="absolute inset-0"
          >
            <picture>
              <source srcSet={image.avif} type="image/avif" />
              <source srcSet={image.webp} type="image/webp" />
              <img
                src={image.jpeg}
                alt=""
                className="h-full w-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding={index === 0 ? "sync" : "async"}
              />
            </picture>
          </motion.div>
        ))}

        {/* Subtle gradient overlay for text readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(90deg, hsl(0 0% 0% / 0.5) 0%, hsl(0 0% 0% / 0.2) 40%, transparent 70%),
              linear-gradient(180deg, hsl(0 0% 0% / 0.3) 0%, transparent 30%, transparent 70%, hsl(0 0% 0% / 0.4) 100%)
            `,
          }}
        />

        {/* Smooth fade into next dark section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, #0a0a0f)",
          }}
        />
      </div>

      {/* Mobile: Text repositioned to bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-32 left-0 right-0 z-10 px-6 text-center md:hidden"
      >
        <p className="mx-auto max-w-[300px] text-sm leading-[1.8] tracking-wide" style={{ color: "hsl(0 0% 80%)" }}>
          {t.hero.tagline}
        </p>
      </motion.div>

      {/* Animated scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-white/60"
            animate={{
              y: [0, 12, 0],
              opacity: [0.6, 0.3, 0.6],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
