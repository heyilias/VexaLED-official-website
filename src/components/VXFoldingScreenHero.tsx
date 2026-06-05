import { motion } from "framer-motion";
import { Shield, Zap, Layers, ArrowRight, Play } from "lucide-react";
import heroPoster from "@/assets/hero/Hero_poster.webp";
import heroProduct from "@/assets/products/led-screen/poster/hero_product.png";

const PREMIUM_EASE = [0.25, 0.1, 0.25, 1];

interface VXFoldingScreenHeroProps {
  onExploreClick?: () => void;
  onWatchVideoClick?: () => void;
}

export default function VXFoldingScreenHero({ onExploreClick, onWatchVideoClick }: VXFoldingScreenHeroProps) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <img
          src={heroPoster}
          alt="VX Folding Screen Background"
          className="h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%, transparent 60%)` }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-[200px]"
          style={{ background: `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 100%)` }}
        />
      </div>

      <div className="relative z-10 mx-auto h-screen w-full max-w-[1600px] px-6 lg:px-12">
        <div className="flex h-full flex-col lg:flex-row lg:items-center lg:justify-between">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: PREMIUM_EASE }}
            className="flex flex-col justify-center pt-24 lg:pt-0 lg:w-[40%]"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: PREMIUM_EASE }}
              className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-white/50"
            >
              VX-LED Series
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: PREMIUM_EASE }}
              className="text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Folding Screen
              <span className="block text-[#CCFF00]">Display</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: PREMIUM_EASE }}
              className="mt-6 max-w-md text-base leading-relaxed text-white/60"
            >
              Modular die-cast panels connect in seconds. Built for touring events, corporate video walls, and permanent installations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: PREMIUM_EASE }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <Shield className="h-4 w-4 text-[#CCFF00]" />
                <span className="text-sm text-white/80">IP54 Rated</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <Zap className="h-4 w-4 text-[#CCFF00]" />
                <span className="text-sm text-white/80">Tool-Free Setup</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <Layers className="h-4 w-4 text-[#CCFF00]" />
                <span className="text-sm text-white/80">1500 Nits</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: PREMIUM_EASE }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={onExploreClick}
                className="group flex items-center gap-2 rounded-lg bg-[#CCFF00] px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-[#CCFF00]/90"
              >
                <span className="text-sm font-bold">Explore Now</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={onWatchVideoClick}
                className="group flex items-center gap-2 text-white transition-colors duration-300 hover:text-[#CCFF00]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 transition-colors duration-300 group-hover:border-[#CCFF00]">
                  <Play className="h-4 w-4 fill-white" />
                </div>
                <span className="text-sm font-medium">Watch Video</span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8, ease: PREMIUM_EASE }}
              className="mt-12 flex items-center gap-3"
            >
              <span className="rounded bg-[#CCFF00] px-2 py-1 text-xs font-bold uppercase text-black">
                New
              </span>
              <span className="text-sm text-white/40">Just Released</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: PREMIUM_EASE }}
            className="relative flex items-center justify-center lg:w-[55%]"
            style={{ marginRight: "8%", marginTop: "4rem" }}
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[600px] rounded-full opacity-50"
              style={{
                background: `radial-gradient(ellipse at center, rgba(204, 255, 0, 0.2) 0%, rgba(139, 0, 255, 0.15) 40%, transparent 70%)`,
                filter: "blur(60px)",
              }}
            />
            <div className="relative">
              <img
                src={heroProduct}
                alt="VX Folding Screen Display"
                className="relative z-10 h-auto w-full max-w-[460px] object-contain drop-shadow-[0_0_80px_rgba(139,0,255,0.3)]"
              />
              <div
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-[60px] opacity-30"
                style={{
                  background: `radial-gradient(ellipse at center, rgba(255, 0, 128, 0.4) 0%, transparent 70%)`,
                  filter: "blur(20px)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
