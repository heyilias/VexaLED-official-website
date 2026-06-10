import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Download, Send, Award, Check, Loader2, Monitor, Layers, Maximize2 } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { useContactForm } from "@/hooks/useContactForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";
import VXFoldingScreenHero from "@/components/VXFoldingScreenHero";
import ProductOverview from "@/components/ProductOverview";

import ledPosterFront from "@/assets/products/led-screen/poster/front.webp";
import ledPosterBack from "@/assets/products/led-screen/poster/back.webp";
import ledPosterDetails from "@/assets/products/led-screen/poster/details.webp";
import ledPosterOther from "@/assets/products/led-screen/poster/other1.webp";
import shoppingImg from "@/assets/products/led-screen/poster/Shopping.webp";
import exhibitionImg from "@/assets/products/led-screen/poster/Exhibition.webp";
import hotelImg from "@/assets/products/led-screen/poster/Hotel.webp";
import productVideo from "@/assets/products/led-screen/poster/video.webm";
import ledPosterImg from "@/assets/products/led-screen/hero.webp";

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

// Sub-components
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
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.6, ease: PREMIUM_EASE }}
        className={`mb-6 flex items-center gap-4 ${align === "center" ? "justify-center" : ""}`}
      >
        <div className="h-px w-12 bg-[#CCFF00]" />
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">{eyebrow}</span>
        <div className="h-px w-12 bg-[#CCFF00]" />
      </motion.div>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.1, ease: PREMIUM_EASE }}
      className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: PREMIUM_EASE }}
        className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/50 md:text-xl"
      >
        {description}
      </motion.p>
    )}
  </div>
);

const ApplicationCard = ({ image, title, index }: { image: string; title: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    transition={{ duration: 0.8, delay: index * 0.15, ease: PREMIUM_EASE }}
    className="group relative overflow-hidden rounded-xl"
  >
    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-60" />
      <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105" />
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
  </motion.div>
);

const FeatureCard = ({ icon, title, description, index }: { icon: React.ReactNode; title: string; description: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
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

const SpecRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between py-4 border-b border-white/[0.04] last:border-0">
    <span className="text-base text-white/40">{label}</span>
    <span className="text-base font-medium text-white">{value}</span>
  </div>
);

const VariantCard = ({ name, pixelPitch, brightness, cabinetSize, weight, index, isActive, onClick }: {
  name: string; pixelPitch: string; brightness: string; cabinetSize: string; weight: string;
  index: number; isActive?: boolean; onClick?: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: PREMIUM_EASE }}
    onClick={onClick}
    className={`cursor-pointer rounded-xl border p-6 transition-all duration-300 ${
      isActive ? "border-[#CCFF00]/50 bg-[#CCFF00]/[0.03]" : "border-white/[0.06] bg-transparent hover:border-white/20"
    }`}
  >
    <div className="mb-4 flex items-center justify-between">
      <h4 className={`font-semibold ${isActive ? "text-[#CCFF00]" : "text-white"}`}>{name}</h4>
      {isActive && (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#CCFF00]">
          <Check className="h-3 w-3 text-black" />
        </div>
      )}
    </div>
    <div className="space-y-2 text-sm text-white/60">
      <div className="flex justify-between"><span className="text-white/40">Pixel Pitch</span><span>{pixelPitch}</span></div>
      <div className="flex justify-between"><span className="text-white/40">Brightness</span><span>{brightness}</span></div>
      <div className="flex justify-between"><span className="text-white/40">Cabinet</span><span>{cabinetSize}</span></div>
      <div className="flex justify-between"><span className="text-white/40">Weight</span><span>{weight}</span></div>
    </div>
  </motion.div>
);

const DownloadCard = ({ title, type, size, index }: { title: string; type: string; size: string; index: number }) => (
  <motion.a
    href="#"
    onClick={(e) => e.preventDefault()}
    aria-disabled="true"
    title="Datasheet coming soon"
    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: PREMIUM_EASE }}
    className="group flex items-center gap-4 rounded-xl border border-white/[0.06] p-5 transition-all duration-300 hover:border-white/20"
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] transition-colors group-hover:border-[#CCFF00]/30 group-hover:bg-[#CCFF00]/5">
      <Download className="h-4 w-4 text-white/60 transition-colors group-hover:text-[#CCFF00]" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="truncate font-medium text-white transition-colors group-hover:text-[#CCFF00]">{title}</p>
      <p className="text-xs text-white/40">{type} · {size}</p>
    </div>
  </motion.a>
);

// Hardcoded product data
const title = "VX Folding Screen";
const tagline = "Modular folding LED display system for large-format video walls, events, and permanent installations.";

const applications = [
  { image: shoppingImg, title: "Live Events & Concerts" },
  { image: exhibitionImg, title: "Corporate Presentations" },
  { image: hotelImg, title: "Trade Shows & Exhibitions" },
];

const valueProps = [
  { title: "4-in-1 Direct Splicing", text: "One cabinet supports flat, curved, flexible, and 45° right-angle configurations. 500mm and 1000mm cabinets share the same rear cover for maximum versatility." },
  { title: "Hot-Swap in Under 30 Seconds", text: "Modular rear cover design lets you swap the power supply or receiving card in under 30 seconds without tools — minimising downtime on live events." },
  { title: "Single Cabinet ~4.5 kg", text: "Aluminum alloy construction keeps each cabinet at just 4.35 kg (curved) / 4.1 kg (flat) — high-strength, resistant to deformation, and easy for a single technician to handle." },
];

const features = [
  { title: "Precision Locking & Seam Technology", text: "Stainless steel buckle latches deliver stronger tension and tighter seams than standard clips. Ball-bearing positioning prevents stacking and jamming even on uneven surfaces.", image: ledPosterDetails },
  { title: "Built for Transport & Protection", text: "Anti-collision bumps on the bottom protect LED beads when cabinets are placed on the ground. Corner protectors provide secondary LED protection during shipping.", image: ledPosterBack },
];

const certifications = [
  { label: "CE", description: "European Conformity" },
  { label: "RoHS", description: "Hazardous Substances Free" },
  { label: "FCC", description: "US Compliance" },
  { label: "IP54", description: "Dust & Splash Protection" },
];

const variants = [
  { name: "VX-FS P1.6", pixelPitch: "1.6mm", brightness: "1000 nits", cabinetSize: "500×500mm", weight: "4.35kg" },
  { name: "VX-FS P1.9", pixelPitch: "1.9mm", brightness: "1000 nits", cabinetSize: "500×500mm", weight: "4.35kg" },
  { name: "VX-FS P2.6", pixelPitch: "2.6mm", brightness: "1000 nits", cabinetSize: "500×500mm", weight: "4.35kg" },
  { name: "VX-FS P2.9", pixelPitch: "2.9mm", brightness: "1200 nits", cabinetSize: "500×500mm", weight: "4.35kg" },
  { name: "VX-FS P3.9", pixelPitch: "3.9mm", brightness: "1500 nits", cabinetSize: "500×500mm", weight: "4.1kg" },
  { name: "VX-FS P4.8", pixelPitch: "4.8mm", brightness: "1500 nits", cabinetSize: "500×500mm", weight: "4.1kg" },
];

const parameters = [
  { label: "Cabinet Size", value: "500mm × 500mm × 71mm" },
  { label: "Module Size", value: "250mm × 250mm" },
  { label: "Material", value: "Aluminum Alloy" },
  { label: "Weight (Curved)", value: "4.35 kg" },
  { label: "Weight (Flat)", value: "4.1 kg" },
  { label: "Power Supply Width", value: "≤ 60mm (narrow)" },
  { label: "Receiver Card", value: "Nova A-Series (A4–A10)" },
  { label: "Environment", value: "Indoor / Semi-outdoor" },
  { label: "Brightness", value: "1000–1500 nits" },
  { label: "Viewing Angle", value: "H: 160° / V: 140°" },
  { label: "Contrast Ratio", value: "5000:1" },
  { label: "Refresh Rate", value: "3840 Hz" },
  { label: "Frame Frequency", value: "50/60 Hz" },
  { label: "Gray Scale", value: "16 bit" },
  { label: "Max Consumption", value: "350W/m²" },
  { label: "Avg Consumption", value: "120W/m²" },
  { label: "Power Voltage", value: "AC100-240V, 50/60Hz" },
  { label: "IP Rating", value: "IP54" },
  { label: "Working Temp", value: "-20°C to 50°C" },
  { label: "Lifespan", value: "100,000 hrs" },
];

const relatedDownloads = [
  { title: "VX Folding Screen Datasheet", type: "PDF", size: "3.8 MB" },
  { title: "Rigging & Installation Guide", type: "PDF", size: "5.1 MB" },
  { title: "Flight Case Dimensions", type: "PDF", size: "1.4 MB" },
];

const relatedProducts = [
  { name: "VX-LED Poster", slug: "vx-led-poster", category: "led-screen", image: ledPosterImg },
];

const featureIcons = [
  <Monitor className="h-5 w-5 text-[#CCFF00]" key="monitor" />,
  <Layers className="h-5 w-5 text-[#CCFF00]" key="layers" />,
  <Maximize2 className="h-5 w-5 text-[#CCFF00]" key="maximize" />,
];

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "VEXALED",
  "url": "https://vexaled.com",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://vexaled.com" },
    { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://vexaled.com/products" },
    { "@type": "ListItem", "position": 3, "name": "VX Folding Screen", "item": "https://vexaled.com/products/folding-screen" },
  ],
};

const FoldingScreen = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeVariant, setActiveVariant] = useState(0);
  const [formState, setFormState] = useState({ name: "", email: "", company: "", phone: "", message: "" });
  const contactForm = useContactForm();

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await contactForm.mutateAsync(formState);
    if (!contactForm.isError) {
      setFormState({ name: "", email: "", company: "", phone: "", message: "" });
    }
  };

  return (
    <main id="main-content" className="min-h-screen bg-black">
      <SEOHead
        title={title}
        description={tagline}
        jsonLd={[orgJsonLd, breadcrumbJsonLd] as unknown as object}
      />
      <Navbar onSearchClick={openSearch} isSearchOpen={isSearchOpen} onCloseSearch={closeSearch} />

      {/* HERO */}
      <VXFoldingScreenHero
        onExploreClick={() => document.getElementById("product-overview")?.scrollIntoView({ behavior: "smooth" })}
        onWatchVideoClick={() => document.getElementById("product-video")?.scrollIntoView({ behavior: "smooth" })}
      />

      {/* PRODUCT OVERVIEW */}
      <div id="product-overview">
        <ProductOverview
          views={[
            { id: "front", label: "Front View", image: ledPosterFront },
            { id: "back", label: "Back View", image: ledPosterBack },
            { id: "details", label: "Detail View", image: ledPosterDetails },
            { id: "other", label: "", image: ledPosterOther },
          ]}
          specs={[
            { label: "Cabinet Size", value: "500 × 500 mm" },
            { label: "Pixel Pitch", value: "P2.6 - P4.8" },
            { label: "Brightness", value: "1000-1500 nits" },
            { label: "Refresh Rate", value: "3840 Hz" },
            { label: "Weight", value: "9.8 kg" },
            { label: "IP Rating", value: "IP54" },
          ]}
        />
      </div>

      {/* APPLICATIONS */}
      <section className="py-24 md:py-32 bg-neutral-950">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
          <SectionHeader
            eyebrow="Applications"
            title="Where It Shines"
            description="Discover how the VX Folding Screen transforms spaces across diverse industries and applications."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {applications.map((app, i) => (
              <ApplicationCard key={i} image={app.image} title={app.title} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section id="product-video" className="relative bg-black py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, ease: PREMIUM_EASE }}
            className="mb-12 text-center"
          >
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[#CCFF00]">Product Demo</span>
            <h2 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl">See It In Action</h2>
            <p className="mx-auto max-w-xl text-base text-white/50">Watch how the VX Folding Screen transforms any space with stunning visuals.</p>
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
              <div className="absolute inset-0 cursor-pointer" onClick={() => videoRef.current?.play()}>
                <img src={ledPosterFront} alt="" className="w-full h-full object-cover rounded-2xl" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <Play className="h-7 w-7 fill-white text-white ml-1" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="py-32 md:py-40 bg-black">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
          <SectionHeader eyebrow="Features" title="Engineered for Excellence" />
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {valueProps.map((vp, i) => (
              <FeatureCard key={i} icon={featureIcons[i % featureIcons.length]} title={vp.title} description={vp.text} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* DETAILED FEATURES */}
      <section className="py-32 md:py-40 bg-neutral-950">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
          <div className="space-y-40 md:space-y-56">
            {features.map((feature, i) => {
              const isReversed = i % 2 === 1;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: PREMIUM_EASE }}
                  className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                >
                  <div className={isReversed ? "lg:order-2" : ""}>
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-neutral-900">
                      <span className="absolute top-4 left-4 z-10 text-6xl md:text-7xl font-bold text-white/10">0{i + 1}</span>
                      <img src={feature.image} alt={feature.title} className="h-full w-full object-cover" />
                    </div>
                  </div>
                  <div className={isReversed ? "lg:order-1" : ""}>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{feature.title}</h3>
                    <p className="text-lg leading-relaxed text-white/50">{feature.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* VARIANTS */}
      <section className="py-32 md:py-40 bg-black">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
          <SectionHeader
            eyebrow="Configuration"
            title="Choose Your Model"
            description="Multiple pixel pitch options to suit various viewing distances and application requirements."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {variants.map((variant, i) => (
              <VariantCard key={i} {...variant} index={i} isActive={activeVariant === i} onClick={() => setActiveVariant(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* SPECS */}
      <section className="py-32 md:py-40 bg-neutral-950">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
          <SectionHeader eyebrow="Specifications" title="Technical Parameters" />
          <motion.div {...fadeIn} className="max-w-3xl mx-auto">
            <div className="rounded-xl border border-white/[0.06] p-8 md:p-10">
              {parameters.map((param, i) => (
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
            <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold text-white">Compliance & Standards</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
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
              description="Interested in the VX Folding Screen? Our team is ready to help you find the perfect solution."
            />
            <motion.form {...fadeIn} onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className="block text-sm text-white/60 mb-2">Name *</label>
                  <input id="contact-name" type="text" name="name" required value={formState.name} onChange={handleFormChange}
                    className="w-full rounded-lg border border-white/[0.08] bg-black/50 px-4 py-4 text-white placeholder:text-white/30 focus:border-[#CCFF00]/30 focus:outline-none transition-colors"
                    placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm text-white/60 mb-2">Email *</label>
                  <input id="contact-email" type="email" name="email" required value={formState.email} onChange={handleFormChange}
                    className="w-full rounded-lg border border-white/[0.08] bg-black/50 px-4 py-4 text-white placeholder:text-white/30 focus:border-[#CCFF00]/30 focus:outline-none transition-colors"
                    placeholder="you@company.com" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-company" className="block text-sm text-white/60 mb-2">Company</label>
                  <input id="contact-company" type="text" name="company" value={formState.company} onChange={handleFormChange}
                    className="w-full rounded-lg border border-white/[0.08] bg-black/50 px-4 py-4 text-white placeholder:text-white/30 focus:border-[#CCFF00]/30 focus:outline-none transition-colors"
                    placeholder="Company name" />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-sm text-white/60 mb-2">Phone</label>
                  <input id="contact-phone" type="tel" name="phone" value={formState.phone} onChange={handleFormChange}
                    className="w-full rounded-lg border border-white/[0.08] bg-black/50 px-4 py-4 text-white placeholder:text-white/30 focus:border-[#CCFF00]/30 focus:outline-none transition-colors"
                    placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm text-white/60 mb-2">Message *</label>
                <textarea id="contact-message" name="message" required rows={5} value={formState.message} onChange={handleFormChange}
                  className="w-full resize-none rounded-lg border border-white/[0.08] bg-black/50 px-4 py-4 text-white placeholder:text-white/30 focus:border-[#CCFF00]/30 focus:outline-none transition-colors"
                  placeholder="Tell us about your project..." />
              </div>
              <button type="submit" disabled={contactForm.isPending}
                className="w-full rounded-lg bg-[#CCFF00] px-8 py-4 text-base font-semibold text-black transition-all hover:bg-[#CCFF00]/90 disabled:opacity-70"
              >
                {contactForm.isPending ? (
                  <span className="flex items-center justify-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />Sending...</span>
                ) : (
                  <span className="flex items-center justify-center gap-2"><Send className="h-4 w-4" />Send Inquiry</span>
                )}
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* DOWNLOADS */}
      <section className="py-24 md:py-32 bg-black">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
          <motion.div {...fadeInUp} className="mb-12">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">Resources</span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold text-white">Technical Downloads</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedDownloads.map((dl, i) => (
              <DownloadCard key={i} {...dl} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section className="py-24 md:py-32 bg-neutral-950">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
          <motion.div {...fadeInUp} className="mb-12 flex items-end justify-between">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">Related</span>
              <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold text-white">You May Also Like</h2>
            </div>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rp, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Link to={`/products/${rp.category}/${rp.slug}`} className="group block">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900 mb-4">
                    <img src={rp.image} alt={rp.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-[#CCFF00] transition-colors">{rp.name}</h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <AnimatePresence>
        {isSearchOpen && <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />}
      </AnimatePresence>
    </main>
  );
};

export default FoldingScreen;
