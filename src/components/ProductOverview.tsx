import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

// Animation configurations
const PREMIUM_EASE = [0.25, 0.1, 0.25, 1];

interface ProductView {
  id: string;
  label: string;
  image: string;
  description?: string;
}

interface ProductSpec {
  label: string;
  value: string;
}

interface ProductOverviewProps {
  views: ProductView[];
  specs?: ProductSpec[];
  eyebrow?: string;
  title?: string;
  description?: string;
}

const defaultSpecs: ProductSpec[] = [
  { label: "Display Size", value: "640 × 1920 mm" },
  { label: "Pixel Pitch", value: "P1.25 - P3.91" },
  { label: "Brightness", value: "600-800 nits" },
  { label: "Refresh Rate", value: "3840 Hz" },
  { label: "Weight", value: "35.5 kg" },
  { label: "Thickness", value: "62 mm (folded)" },
];

export default function ProductOverview({
  views,
  specs = defaultSpecs,
  eyebrow = "PRODUCT OVERVIEW",
  title = "Every Angle. Every Detail.",
  description = "Meticulously engineered with premium materials and cutting-edge LED technology for stunning visual performance.",
}: ProductOverviewProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const activeView = views[activeIndex];

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (e.key === "Escape") setIsLightboxOpen(false);
        if (e.key === "ArrowLeft") {
          setLightboxIndex((prev) => (prev > 0 ? prev - 1 : views.length - 1));
        }
        if (e.key === "ArrowRight") {
          setLightboxIndex((prev) => (prev < views.length - 1 ? prev + 1 : 0));
        }
      } else {
        if (e.key === "ArrowLeft") {
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : views.length - 1));
        }
        if (e.key === "ArrowRight") {
          setActiveIndex((prev) => (prev < views.length - 1 ? prev + 1 : 0));
        }
      }
    },
    [isLightboxOpen, views.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const goToNext = () => {
    setLightboxIndex((prev) => (prev < views.length - 1 ? prev + 1 : 0));
  };

  const goToPrev = () => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : views.length - 1));
  };

  return (
    <>
      <section className="relative bg-black py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: PREMIUM_EASE }}
            className="mb-10 text-center"
          >
            {/* Eyebrow */}
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[#CCFF00]">
              {eyebrow}
            </span>

            {/* Title */}
            <h2 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl">
              {title}
            </h2>

            {/* Description */}
            <p className="mx-auto max-w-xl text-base text-white/50">
              {description}
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:gap-8">
            {/* Left Side - Image Display */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: PREMIUM_EASE }}
              className="flex flex-col"
            >
              {/* Main Image Area */}
              <div
                className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-xl bg-neutral-900 lg:aspect-[16/10]"
                onClick={() => openLightbox(activeIndex)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeView.id}
                    src={activeView.image}
                    alt={activeView.label}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: PREMIUM_EASE }}
                    className="h-full w-full object-contain"
                  />
                </AnimatePresence>

                {/* View Label Overlay - Only show if label exists */}
                {activeView.label && (
                  <div className="absolute bottom-4 left-4 rounded-lg bg-black/60 px-4 py-2 backdrop-blur-sm">
                    <span className="text-sm font-medium text-white">
                      {activeView.label}
                    </span>
                  </div>
                )}

                {/* Zoom Icon */}
                <div className="absolute right-4 top-4 rounded-full bg-black/60 p-2 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <ZoomIn className="h-5 w-5 text-white" />
                </div>

                {/* Navigation Arrows (Desktop) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex((prev) =>
                      prev > 0 ? prev - 1 : views.length - 1
                    );
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white opacity-0 transition-all duration-300 hover:bg-[#CCFF00] hover:text-black lg:group-hover:opacity-100"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex((prev) =>
                      prev < views.length - 1 ? prev + 1 : 0
                    );
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white opacity-0 transition-all duration-300 hover:bg-[#CCFF00] hover:text-black lg:group-hover:opacity-100"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              {/* Thumbnail Gallery */}
              <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
                {views.map((view, index) => (
                  <button
                    key={view.id}
                    onClick={() => setActiveIndex(index)}
                    className={`group relative overflow-hidden rounded-lg transition-all duration-300 ${
                      index === activeIndex
                        ? "ring-2 ring-[#CCFF00] ring-offset-2 ring-offset-black"
                        : "ring-1 ring-white/10 hover:ring-white/30"
                    }`}
                  >
                    <div className="aspect-square w-16 overflow-hidden bg-neutral-800 sm:w-20">
                      <img
                        src={view.image}
                        alt={view.label}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    {/* Active Indicator */}
                    {index === activeIndex && (
                      <motion.div
                        layoutId="activeThumb"
                        className="absolute inset-0 border-2 border-[#CCFF00]"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    {/* Label - Only show if exists */}
                    {view.label && (
                      <span className="mt-2 block text-center text-xs text-white/60 sm:text-sm">
                        {view.label}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: PREMIUM_EASE }}
              className="flex flex-col"
            >
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 lg:p-6">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Technical Specifications
                </h3>

                {/* Specs List */}
                <div className="space-y-3">
                  {specs.map((spec, index) => (
                    <motion.div
                      key={spec.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: 0.4 + index * 0.1,
                        ease: PREMIUM_EASE,
                      }}
                      className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0"
                    >
                      <span className="text-xs text-white/50">{spec.label}</span>
                      <span className="text-xs font-medium text-white">
                        {spec.value}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Additional Info */}
                <div className="mt-6 rounded-lg bg-[#CCFF00]/5 p-3">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-[#CCFF00]" />
                    <div>
                      <h4 className="text-xs font-medium text-white">
                        Premium Build Quality
                      </h4>
                      <p className="mt-0.5 text-xs text-white/50">
                        Die-cast aluminum cabinet with magnetic folding borders.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-transparent py-2.5 text-xs font-medium text-white transition-all duration-300 hover:border-[#CCFF00] hover:bg-[#CCFF00]/5">
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>View Full Gallery</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute right-6 top-6 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Main Image */}
            <div
              className="relative max-h-[85vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightboxIndex}
                  src={views[lightboxIndex].image}
                  alt={views[lightboxIndex].label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="max-h-[85vh] max-w-[90vw] object-contain"
                />
              </AnimatePresence>

              {/* Label */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-6 py-2 text-center backdrop-blur-sm">
                <span className="text-sm font-medium text-white">
                  {views[lightboxIndex].label}
                </span>
                <span className="ml-2 text-sm text-white/50">
                  {lightboxIndex + 1} / {views.length}
                </span>
              </div>
            </div>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white transition-all hover:bg-[#CCFF00] hover:text-black"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white transition-all hover:bg-[#CCFF00] hover:text-black"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Thumbnail Strip (Bottom) */}
            <div
              className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              {views.map((view, index) => (
                <button
                  key={view.id}
                  onClick={() => setLightboxIndex(index)}
                  className={`overflow-hidden rounded-lg transition-all duration-300 ${
                    index === lightboxIndex
                      ? "ring-2 ring-[#CCFF00]"
                      : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <img
                    src={view.image}
                    alt={view.label}
                    className="h-14 w-14 object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
