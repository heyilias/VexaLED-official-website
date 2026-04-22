import { useState, useCallback } from "react";
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

  return (
    <main className="min-h-screen bg-background">
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
