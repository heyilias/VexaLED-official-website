import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { useContactForm } from "@/hooks/useContactForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";
import {
  ArrowRight,
  Download,
  Send,
  Award,
  ChevronRight,
  Check,
  Loader2,
  ArrowUpRight,
  Zap,
  Monitor,
  Layers,
  Maximize2,
  Eye,
  Clock,
  Cpu,
} from "lucide-react";
import { getProductDetail } from "@/data/productDetailData";
import VXLedPosterHero from "@/components/VXLedPosterHero";
import ProductOverview from "@/components/ProductOverview";
import ledPosterFront from "@/assets/products/led-screen/poster/front.png";
import ledPosterBack from "@/assets/products/led-screen/poster/back.png";
import ledPosterDetails from "@/assets/products/led-screen/poster/details.png";
import ledPosterOther from "@/assets/products/led-screen/poster/other1.png";

// Application images
import shoppingImg from "@/assets/products/led-screen/poster/Shopping.png";
import exhibitionImg from "@/assets/products/led-screen/poster/Exhibition.png";
import hotelImg from "@/assets/products/led-screen/poster/Hotel.png";
import productVideo from "@/assets/products/led-screen/poster/video.webm";

// Premium Animation Configurations
const PREMIUM_EASE = [0.25, 0.1, 0.25, 1];
const PREMIUM_DURATION = 1;

const fadeInUp = {
  initial: { opacity: 0, y: 80 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: PREMIUM_DURATION, ease: PREMIUM_EASE },
};

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: PREMIUM_DURATION, ease: PREMIUM_EASE },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: PREMIUM_DURATION, ease: PREMIUM_EASE },
};

// Section Header Component
interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

const SectionHeader = ({ eyebrow, title, description, align = "center" }: SectionHeaderProps) => (
  <div className={`${align === "center" ? "text-center" : ""} mb-20 md:mb-24`}>
    {eyebrow && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: PREMIUM_EASE }}
        className={`mb-6 flex items-center gap-4 ${align === "center" ? "justify-center" : ""}`}
      >
        <div className="h-px w-12 bg-[#CCFF00]" />
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">
          {eyebrow}
        </span>
        <div className="h-px w-12 bg-[#CCFF00]" />
      </motion.div>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.1, ease: PREMIUM_EASE }}
      className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: PREMIUM_EASE }}
        className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/50 md:text-xl"
      >
        {description}
      </motion.p>
    )}
  </div>
);

// Application Card Component
interface ApplicationCardProps {
  image: string;
  title: string;
  index: number;
}

const ApplicationCard = ({ image, title, index }: ApplicationCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: index * 0.15, ease: PREMIUM_EASE }}
    className="group relative overflow-hidden rounded-xl"
  >
    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-60" />
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
      />
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
  </motion.div>
);

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: PREMIUM_EASE }}
    className="group"
  >
    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] transition-colors group-hover:border-[#CCFF00]/30 group-hover:bg-[#CCFF00]/5">
      {icon}
    </div>
    <h3 className="mb-3 text-lg font-semibold text-white">{title}</h3>
    <p className="text-base leading-relaxed text-white/50">{description}</p>
  </motion.div>
);

// Spec Row Component
interface SpecRowProps {
  label: string;
  value: string;
}

const SpecRow = ({ label, value }: SpecRowProps) => (
  <div className="flex items-center justify-between py-4 border-b border-white/[0.04] last:border-0">
    <span className="text-base text-white/40">{label}</span>
    <span className="text-base font-medium text-white">{value}</span>
  </div>
);

// Variant Card Component
interface VariantCardProps {
  name: string;
  pixelPitch: string;
  brightness: string;
  cabinetSize: string;
  weight: string;
  index: number;
  isActive?: boolean;
  onClick?: () => void;
}

const VariantCard = ({
  name,
  pixelPitch,
  brightness,
  cabinetSize,
  weight,
  index,
  isActive,
  onClick,
}: VariantCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: PREMIUM_EASE }}
    onClick={onClick}
    className={`cursor-pointer rounded-xl border p-6 transition-all duration-300 ${
      isActive
        ? "border-[#CCFF00]/50 bg-[#CCFF00]/[0.03]"
        : "border-white/[0.06] bg-transparent hover:border-white/20"
    }`}
  >
    <div className="mb-4 flex items-center justify-between">
      <h4 className={`font-semibold ${isActive ? "text-[#CCFF00]" : "text-white"}`}>
        {name}
      </h4>
      {isActive && (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#CCFF00]">
          <Check className="h-3 w-3 text-black" />
        </div>
      )}
    </div>
    <div className="space-y-2 text-sm text-white/60">
      <div className="flex justify-between">
        <span className="text-white/40">Pixel Pitch</span>
        <span>{pixelPitch}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-white/40">Brightness</span>
        <span>{brightness}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-white/40">Cabinet</span>
        <span>{cabinetSize}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-white/40">Weight</span>
        <span>{weight}</span>
      </div>
    </div>
  </motion.div>
);

// Download Card Component
interface DownloadCardProps {
  title: string;
  type: string;
  size: string;
  index: number;
}

const DownloadCard = ({ title, type, size, index }: DownloadCardProps) => (
  <motion.a
    href="#"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: PREMIUM_EASE }}
    className="group flex items-center gap-4 rounded-xl border border-white/[0.06] p-5 transition-all duration-300 hover:border-white/20"
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] transition-colors group-hover:border-[#CCFF00]/30 group-hover:bg-[#CCFF00]/5">
      <Download className="h-4 w-4 text-white/60 transition-colors group-hover:text-[#CCFF00]" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="truncate font-medium text-white transition-colors group-hover:text-[#CCFF00]">
        {title}
      </p>
      <p className="text-xs text-white/40">
        {type} · {size}
      </p>
    </div>
  </motion.a>
);

// Main Product Component
const Product = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [activeVariant, setActiveVariant] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const contactForm = useContactForm();

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  // Static routes have no :slug param — derive the slug from the pathname
  const pathname = window.location.pathname;
  const resolvedSlug = slug ?? pathname.split('/').pop() ?? 'led-poster-display';
  const resolvedCategory = category ?? 'led-screens';
  if (!resolvedSlug) return <Navigate to="/" replace />;
  const product = getProductDetail(resolvedSlug, resolvedCategory);
  if (!product) return <Navigate to="/" replace />;

  // If the product has configuration tabs (e.g. city-light-series), overlay tab data
  const currentTab = product.tabs?.[activeTab];
  const activeValueProps = currentTab?.valueProps ?? product.valueProps;
  const activeFeatures = currentTab?.features ?? product.features;
  const activeVariants = currentTab?.variants ?? product.variants;
  const activeParameters = currentTab?.parameters ?? product.parameters;
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await contactForm.mutateAsync({
      name: formState.name,
      email: formState.email,
      company: formState.company,
      phone: formState.phone,
      message: formState.message,
    });
    if (!contactForm.isError) {
      setFormState({ name: "", email: "", company: "", phone: "", message: "" });
    }
  };

  const featureIcons = [
    <Monitor className="h-5 w-5 text-[#CCFF00]" key="monitor" />,
    <Layers className="h-5 w-5 text-[#CCFF00]" key="layers" />,
    <Maximize2 className="h-5 w-5 text-[#CCFF00]" key="maximize" />,
  ];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.tagline,
    "brand": { "@type": "Brand", "name": "VexaLED" },
    "category": product.category,
    "image": product.heroImage,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://vexaled.com" },
      { "@type": "ListItem", "position": 2, "name": "Products", "item": `https://vexaled.com/products/${product.category}` },
      { "@type": "ListItem", "position": 3, "name": product.title, "item": `https://vexaled.com/products/${product.category}/${product.slug}` },
    ],
  };

  return (
    <main id="main-content" className="min-h-screen bg-black">
      <SEOHead
        title={product.title}
        description={product.tagline}
        ogImage={product.heroImage}
        jsonLd={[productJsonLd, breadcrumbJsonLd] as unknown as object}
      />
      <Navbar onSearchClick={openSearch} isSearchOpen={isSearchOpen} onCloseSearch={closeSearch} />

      {/* HERO SECTION - Custom hero for VX-LED Poster */}
      {product.slug === 'vx-led-poster' || product.slug === 'led-poster-display' || product.slug === 'led-screen' ? (
        <VXLedPosterHero
          onExploreClick={() => {
            document.getElementById('product-overview')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onWatchVideoClick={() => {
            document.getElementById('product-video')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      ) : (
        /* Default Hero Section for other products */
        <section
          ref={heroRef}
          className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
        >
          {/* Background gradient */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-neutral-950" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#CCFF00]/[0.03] blur-[150px]" />
          </div>

          {/* Hero Content */}
          <motion.div
            className="relative z-10 w-full"
            style={{ opacity: heroOpacity, scale: heroScale }}
          >
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute top-8 left-8 flex items-center gap-2 text-xs text-white/30"
            >
              <Link to="/" className="hover:text-white/60 transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3" />
              <Link to={`/products/${resolvedCategory}`} className="capitalize hover:text-white/60 transition-colors">
                {resolvedCategory.replace('-', ' ')}
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/60">{product.title}</span>
            </motion.div>

            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: PREMIUM_EASE }}
              className="flex justify-center px-4"
            >
              <div className="relative">
                <img
                  src={product.heroImage}
                  alt={product.title}
                  className="h-[60vh] md:h-[65vh] w-auto object-contain drop-shadow-[0_0_60px_rgba(204,255,0,0.15)]"
                />
              </div>
            </motion.div>

            {/* Title */}
            <div className="text-center px-6 mt-8">
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: PREMIUM_EASE }}
                className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white"
              >
                {product.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: PREMIUM_EASE }}
                className="mt-6 text-lg md:text-xl text-white/50 max-w-2xl mx-auto"
              >
                {product.tagline}
              </motion.p>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
              <div className="h-10 w-px bg-gradient-to-b from-white/40 to-transparent" />
            </motion.div>
          </motion.div>
        </section>
      )}

      {/* PRODUCT OVERVIEW - Multiple Views Gallery */}
      {(product.slug === 'vx-led-poster' || product.slug === 'led-poster-display' || product.slug === 'led-screen') && (
        <ProductOverview
          views={[
            { id: "front", label: "Front View", image: ledPosterFront },
            { id: "back", label: "Back View", image: ledPosterBack },
            { id: "details", label: "Detail View", image: ledPosterDetails },
            { id: "other", label: "", image: ledPosterOther },
          ]}
          specs={[
            { label: "Display Size", value: "640 × 1920 mm" },
            { label: "Pixel Pitch", value: "P1.25 - P3.91" },
            { label: "Brightness", value: "600-800 nits" },
            { label: "Refresh Rate", value: "3840 Hz" },
            { label: "Weight", value: "35.5 kg" },
            { label: "Thickness", value: "62 mm (folded)" },
          ]}
        />
      )}

      {/* APPLICATIONS / WHERE IT SHINES */}
      {(product.slug === 'vx-led-poster' || product.slug === 'led-poster-display' || product.slug === 'led-screen') ? (
        <section className="py-24 md:py-32 bg-neutral-950">
          <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
            <SectionHeader
              eyebrow="Applications"
              title="Where It Shines"
              description="Discover how the VX-LED Poster transforms spaces across diverse industries and applications."
            />

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { image: shoppingImg, title: "Retail & Shopping" },
                { image: exhibitionImg, title: "Events & Exhibitions" },
                { image: hotelImg, title: "Hotels & Restaurant Lobbies" },
              ].map((app, i) => (
                <ApplicationCard key={i} image={app.image} title={app.title} index={i} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-32 md:py-40 bg-neutral-950">
          <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
            <SectionHeader
              eyebrow="Applications"
              title="Where It Shines"
              description={`Discover how the ${product.title} transforms spaces across diverse industries and applications.`}
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {product.applications.map((app, i) => (
                <ApplicationCard key={i} image={app.image} title={app.label} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PRODUCT VIDEO SECTION */}
      {(product.slug === 'vx-led-poster' || product.slug === 'led-poster-display' || product.slug === 'led-screen') && (
        <section className="relative bg-black py-24 lg:py-32">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: PREMIUM_EASE }}
              className="mb-12 text-center"
            >
              <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[#CCFF00]">
                Product Demo
              </span>
              <h2 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl">
                See It In Action
              </h2>
              <p className="mx-auto max-w-xl text-base text-white/50">
                Watch how the VX-LED Poster transforms any space with stunning visuals.
              </p>
            </motion.div>

            <div className="relative rounded-2xl bg-neutral-900">
              <video
                ref={videoRef}
                src={productVideo}
                controls
                playsInline
                preload="none"
                className="w-full aspect-video rounded-2xl"
                onPlay={() => setVideoStarted(true)}
              >
                Your browser does not support the video tag.
              </video>
              {!videoStarted && (
                <div
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => { videoRef.current?.play(); }}
                >
                  <img src={ledPosterFront} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                      <Play className="h-7 w-7 fill-white text-white ml-1" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CONFIGURATION TABS (city-light-series and similar multi-tab products) */}
      {product.tabs && product.tabs.length > 1 && (
        <section className="py-12 bg-black border-b border-white/[0.06]">
          <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
            <div className="flex flex-wrap gap-3">
              {product.tabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveTab(i); setActiveVariant(0); }}
                  className={`rounded-xl border px-6 py-3 text-sm font-semibold transition-all duration-200 ${
                    activeTab === i
                      ? 'border-[#CCFF00]/50 bg-[#CCFF00]/10 text-[#CCFF00]'
                      : 'border-white/[0.08] bg-transparent text-white/45 hover:border-white/20 hover:text-white/70'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
            {currentTab?.tagline && (
              <p className="mt-4 text-sm text-white/40">{currentTab.tagline}</p>
            )}
          </div>
        </section>
      )}

      {/* CORE FEATURES GRID */}
      <section className="py-32 md:py-40 bg-black">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
          <SectionHeader eyebrow="Features" title="Engineered for Excellence" />

          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {activeValueProps.map((vp, i) => (
              <FeatureCard
                key={i}
                icon={featureIcons[i % featureIcons.length]}
                title={vp.title}
                description={vp.text}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* DETAILED FEATURES - ALTERNATING */}
      <section className="py-32 md:py-40 bg-neutral-950">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
          <div className="space-y-40 md:space-y-56">
            {activeFeatures.map((feature, i) => {
              const isReversed = i % 2 === 1;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: PREMIUM_EASE }}
                  className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                >
                  {/* Image */}
                  <div className={isReversed ? "lg:order-2" : ""}>
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-neutral-900">
                      <span className="absolute top-4 left-4 z-10 text-6xl md:text-7xl font-bold text-white/10">
                        0{i + 1}
                      </span>
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={isReversed ? "lg:order-1" : ""}>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                      {feature.title}
                    </h3>
                    <p className="text-lg leading-relaxed text-white/50">
                      {feature.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUCT VARIANTS */}
      {activeVariants.length > 0 && (
        <section className="py-32 md:py-40 bg-black">
          <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
            <SectionHeader
              eyebrow="Configuration"
              title="Choose Your Model"
              description="Multiple pixel pitch options to suit various viewing distances and application requirements."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {activeVariants.map((variant, i) => (
                <VariantCard
                  key={i}
                  {...variant}
                  index={i}
                  isActive={activeVariant === i}
                  onClick={() => setActiveVariant(i)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TECHNICAL SPECIFICATIONS */}
      <section className="py-32 md:py-40 bg-neutral-950">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
          <SectionHeader eyebrow="Specifications" title="Technical Parameters" />

          <motion.div {...fadeIn} className="max-w-3xl mx-auto">
            <div className="rounded-xl border border-white/[0.06] p-8 md:p-10">
              {activeParameters.map((param, i) => (
                <SpecRow key={i} label={param.label} value={param.value} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="py-24 md:py-32 bg-black">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">Certifications</span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold text-white">
              Compliance & Standards
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {product.certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center gap-3 px-6 py-4 rounded-xl border border-white/[0.06]"
              >
                <Award className="h-5 w-5 text-[#CCFF00]" />
                <div>
                  <div className="font-semibold text-white">{cert.label}</div>
                  <div className="text-xs text-white/40">{cert.description}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-32 md:py-40 bg-neutral-950">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-2xl mx-auto">
            <SectionHeader
              eyebrow="Contact"
              title="Request Information"
              description={`Interested in the ${product.title}? Our team is ready to help you find the perfect solution.`}
            />

            <motion.form
              {...fadeIn}
              onSubmit={handleFormSubmit}
              className="space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className="block text-sm text-white/60 mb-2">Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleFormChange}
                    className="w-full rounded-lg border border-white/[0.08] bg-black/50 px-4 py-4 text-white placeholder:text-white/30 focus:border-[#CCFF00]/30 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm text-white/60 mb-2">Email *</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleFormChange}
                    className="w-full rounded-lg border border-white/[0.08] bg-black/50 px-4 py-4 text-white placeholder:text-white/30 focus:border-[#CCFF00]/30 focus:outline-none transition-colors"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-company" className="block text-sm text-white/60 mb-2">Company</label>
                  <input
                    id="contact-company"
                    type="text"
                    name="company"
                    value={formState.company}
                    onChange={handleFormChange}
                    className="w-full rounded-lg border border-white/[0.08] bg-black/50 px-4 py-4 text-white placeholder:text-white/30 focus:border-[#CCFF00]/30 focus:outline-none transition-colors"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-sm text-white/60 mb-2">Phone</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={formState.phone}
                    onChange={handleFormChange}
                    className="w-full rounded-lg border border-white/[0.08] bg-black/50 px-4 py-4 text-white placeholder:text-white/30 focus:border-[#CCFF00]/30 focus:outline-none transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm text-white/60 mb-2">Message *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={handleFormChange}
                  className="w-full resize-none rounded-lg border border-white/[0.08] bg-black/50 px-4 py-4 text-white placeholder:text-white/30 focus:border-[#CCFF00]/30 focus:outline-none transition-colors"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={contactForm.isPending}
                className="w-full rounded-lg bg-[#CCFF00] px-8 py-4 text-base font-semibold text-black transition-all hover:bg-[#CCFF00]/90 disabled:opacity-70"
              >
                {contactForm.isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send className="h-4 w-4" />
                    Send Inquiry
                  </span>
                )}
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* DOWNLOADS */}
      {product.relatedDownloads.length > 0 && (
        <section className="py-24 md:py-32 bg-black">
          <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
            <motion.div {...fadeInUp} className="mb-12">
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">Resources</span>
              <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold text-white">
                Technical Downloads
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {product.relatedDownloads.map((dl, i) => (
                <DownloadCard key={i} {...dl} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RELATED PRODUCTS */}
      {product.relatedProducts.length > 0 && (
        <section className="py-24 md:py-32 bg-neutral-950">
          <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
            <motion.div {...fadeInUp} className="mb-12 flex items-end justify-between">
              <div>
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">
                  Related
                </span>
                <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold text-white">
                  You May Also Like
                </h2>
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.relatedProducts.map((rp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link
                    to={`/products/${rp.category}/${rp.slug}`}
                    className="group block"
                  >
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900 mb-4">
                      <img
                        src={rp.image}
                        alt={rp.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-semibold text-white group-hover:text-[#CCFF00] transition-colors">
                      {rp.name}
                    </h3>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <AnimatePresence>
        {isSearchOpen && <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />}
      </AnimatePresence>
    </main>
  );
};

export default Product;
