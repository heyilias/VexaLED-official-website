import { useState, useCallback } from "react";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarketCube from "@/components/MarketCube";
import ParallaxGallery from "@/components/ParallaxGallery";
import ProductsSection from "@/components/ProductsSection";
import WhyChooseVexaLed from "@/components/WhyChooseVexaLed";
import ContactFooter from "@/components/ContactFooter";
import FloatingActions from "@/components/FloatingActions";
import SearchOverlay from "@/components/SearchOverlay";
import { AnimatePresence } from "framer-motion";

const Index = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "VexaLED",
    "url": "https://vexaled.com",
    "logo": "https://vexaled.com/og-image.png",
    "description": "VexaLED delivers cutting-edge LED display technology for indoor and outdoor applications.",
    "sameAs": [
      "https://www.linkedin.com/company/vexaled",
      "https://twitter.com/vexaled"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "sales",
      "email": "info@vexaled.com"
    }
  };

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <SEOHead
        title="Premium LED Display Solutions"
        description="VexaLED delivers cutting-edge LED display technology for indoor and outdoor applications. Explore our full range of high-brightness, energy-efficient LED screens."
        jsonLd={organizationJsonLd}
      />
      <Navbar onSearchClick={openSearch} isSearchOpen={isSearchOpen} onCloseSearch={closeSearch} />
      <HeroSection />
      <MarketCube />
      <ProductsSection />
      <WhyChooseVexaLed />
      <ParallaxGallery />
      <ContactFooter />
      <FloatingActions />

      <AnimatePresence>{isSearchOpen && <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />}</AnimatePresence>
    </main>
  );
};

export default Index;
