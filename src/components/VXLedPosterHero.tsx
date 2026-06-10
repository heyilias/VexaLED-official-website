import { motion } from "framer-motion";
import { Sun, Shield, Leaf, ArrowRight } from "lucide-react";
import heroPoster from "@/assets/hero/Hero_poster.webp";
import heroProduct from "@/assets/products/led-screen/poster/hero_product.webp";

const PREMIUM_EASE = [0.25, 0.1, 0.25, 1];

interface VXLedPosterHeroProps {
  onExploreClick?: () => void;
  onWatchVideoClick?: () => void;
}

export default function VXLedPosterHero({ onExploreClick }: VXLedPosterHeroProps) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroPoster} alt="" className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%, transparent 60%)` }} />
        <div className="absolute bottom-0 left-0 right-0 h-[200px]" style={{ background: `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 100%)` }} />
      </div>

      <div className="relative z-10 mx-auto h-screen w-full max-w-[1600px] px-6 lg:px-12">
        {/* Mobile: column — image top, content bottom. Desktop: row — content left, image right */}
        <div className="flex h-full flex-col lg:flex-row lg:items-center lg:justify-between">

          {/* Product image — first on mobile (order-first), right side on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: PREMIUM_EASE }}
            className="order-first flex items-end justify-center pt-20 lg:order-last lg:w-[55%] lg:items-center lg:pt-0"
            style={{ marginRight: "0" }}
          >
            <div className="relative">
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[420px] lg:w-[400px] lg:h-[600px] rounded-full opacity-50"
                style={{ background: `radial-gradient(ellipse at center, rgba(204,255,0,0.2) 0%, rgba(139,0,255,0.15) 40%, transparent 70%)`, filter: "blur(60px)" }}
              />
              <img
                src={heroProduct}
                alt="VX-LED Poster Display"
                className="relative z-10 h-auto w-full max-w-[260px] lg:max-w-[460px] object-contain drop-shadow-[0_0_80px_rgba(139,0,255,0.3)]"
              />
            </div>
          </motion.div>

          {/* Text content — second on mobile (order-last), left side on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: PREMIUM_EASE }}
            className="order-last flex flex-col justify-center pb-10 lg:order-first lg:w-[40%] lg:pb-0"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: PREMIUM_EASE }}
              className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#CCFF00]"
            >
              VX-LED Series
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: PREMIUM_EASE }}
              className="text-5xl font-bold leading-[1.05] tracking-tight text-white lg:text-6xl"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              LED Poster
              <span className="block text-[#CCFF00]">Display</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: PREMIUM_EASE }}
              className="mt-5 max-w-md text-base leading-relaxed text-white/60"
            >
              Premium foldable LED display with smart cluster management.
              Designed for retail, events, and advertising.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: PREMIUM_EASE }}
              className="mt-6 flex flex-wrap gap-3"
            >
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <Sun className="h-4 w-4 text-[#CCFF00]" />
                <span className="text-sm text-white/80">High Brightness</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <Shield className="h-4 w-4 text-[#CCFF00]" />
                <span className="text-sm text-white/80">Built to Last</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <Leaf className="h-4 w-4 text-[#CCFF00]" />
                <span className="text-sm text-white/80">Energy Efficient</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: PREMIUM_EASE }}
              className="mt-8"
            >
              <button
                onClick={onExploreClick}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#CCFF00] px-6 py-4 font-bold text-black transition-all duration-300 hover:bg-[#CCFF00]/90 lg:w-auto"
              >
                <span>Explore Now</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
