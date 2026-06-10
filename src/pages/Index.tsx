import { useState, useCallback, lazy, Suspense } from "react";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import WhyChooseVexaLed from "@/components/WhyChooseVexaLed";
// ParallaxGallery uses GSAP ScrollTrigger pinning + dynamic scrollWidth measurement.
// Lazy-loading made it mount AFTER initial layout, so its measurements were stale and
// its "Blogs" gallery title bled into the section above. Keep it eager.
import ParallaxGallery from "@/components/ParallaxGallery";
import ContactFooter from "@/components/ContactFooter";
import FloatingActions from "@/components/FloatingActions";
import { AnimatePresence } from "framer-motion";

// MarketCube pulls Three.js + R3F + drei (~864 KB) — biggest single chunk, lazy is safe
// because it's a self-contained canvas (no scroll pinning that depends on outer layout).
const MarketCube = lazy(() => import("@/components/MarketCube"));
// SearchOverlay only mounts when the user opens search — always lazy.
const SearchOverlay = lazy(() => import("@/components/SearchOverlay"));

// Invisible placeholder that holds vertical space while a chunk loads, preventing layout shift.
const LazyFallback = ({ minHeight = "60vh" }: { minHeight?: string }) => (
  <div style={{ minHeight }} aria-hidden />
);

const Index = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "VEXALED",
    "url": "https://vexaled.com",
    "logo": "https://vexaled.com/og-image.png",
    "description": "VEXALED delivers cutting-edge LED display technology for indoor and outdoor applications.",
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
        description="VEXALED delivers cutting-edge LED display technology for indoor and outdoor applications. Explore our full range of high-brightness, energy-efficient LED screens."
        jsonLd={organizationJsonLd}
      />
      <Navbar onSearchClick={openSearch} isSearchOpen={isSearchOpen} onCloseSearch={closeSearch} />
      <HeroSection />
      <Suspense fallback={<LazyFallback minHeight="100vh" />}>
        <MarketCube />
      </Suspense>
      <ProductsSection />
      <WhyChooseVexaLed />
      <ParallaxGallery />
      <ContactFooter />
      <FloatingActions />

      <AnimatePresence>
        {isSearchOpen && (
          <Suspense fallback={null}>
            <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />
          </Suspense>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Index;
