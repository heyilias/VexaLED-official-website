import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Configurator = lazy(() => import("./pages/Configurator"));
const AboutIndex = lazy(() => import("./pages/AboutIndex"));
const About = lazy(() => import("./pages/About"));
const AboutManufacturing = lazy(() => import("./pages/AboutManufacturing"));
const AboutSustainability = lazy(() => import("./pages/AboutSustainability"));
const Blog = lazy(() => import("./pages/Blog"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const CompanyOverview = lazy(() => import("./pages/CompanyOverview"));
const Market = lazy(() => import("./pages/Market"));
const LedScreens = lazy(() => import("./pages/LedScreens"));
const LedScreenProduct = lazy(() => import("./pages/LedScreenProduct"));
const LightingPlaceholder = lazy(() => import("./pages/LightingPlaceholder"));
const Product = lazy(() => import("./pages/Product"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to main content
        </a>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/configurator" element={<Configurator />} />
            <Route path="/about" element={<AboutIndex />} />
            <Route path="/about/overview" element={<CompanyOverview />} />
            <Route path="/about/manufacturing" element={<AboutManufacturing />} />
            <Route path="/about/sustainability" element={<AboutSustainability />} />
            <Route path="/about/:slug" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-study/:slug" element={<CaseStudy />} />
            <Route path="/market/:slug" element={<Market />} />
            {/* Product routes */}
            <Route path="/products" element={<Navigate to="/products/led-screens" replace />} />
            <Route path="/products/led-screens" element={<LedScreens />} />
            {/* Rich product pages — specific routes before generic :slug */}
            <Route path="/products/led-screens/led-poster-display" element={<Product />} />
            <Route path="/products/led-screens/city-light-series" element={<Product />} />
            <Route path="/products/led-screens/:slug" element={<LedScreenProduct />} />
            <Route path="/products/lighting" element={<LightingPlaceholder />} />
            {/* Redirects — old City Light slugs */}
            <Route path="/products/led-screens/city-light-500x500" element={<Navigate to="/products/led-screens/city-light-series" replace />} />
            <Route path="/products/led-screens/city-light-500x500-flexible" element={<Navigate to="/products/led-screens/city-light-series" replace />} />
            <Route path="/products/led-screens/city-light-500x500-right-angle" element={<Navigate to="/products/led-screens/city-light-series" replace />} />
            {/* Redirects — merged indoor */}
            <Route path="/products/led-screens/indoor-rental" element={<Navigate to="/products/led-screens/indoor-rental-fixed" replace />} />
            <Route path="/products/led-screens/indoor-regular" element={<Navigate to="/products/led-screens/indoor-rental-fixed" replace />} />
            <Route path="/products/led-screens/indoor-soft-board" element={<Navigate to="/products/led-screens/indoor-creative" replace />} />
            <Route path="/products/led-screens/indoor-mirror-screen" element={<Navigate to="/products/led-screens/indoor-creative" replace />} />
            <Route path="/products/led-screens/transparent-screen" element={<Navigate to="/products/led-screens/indoor-creative" replace />} />
            <Route path="/products/folding-screen" element={<Navigate to="/products/led-screens/indoor-creative" replace />} />
            {/* Redirects — merged outdoor */}
            <Route path="/products/led-screens/outdoor-small-pitch" element={<Navigate to="/products/led-screens/outdoor-fixed" replace />} />
            <Route path="/products/led-screens/outdoor-regular" element={<Navigate to="/products/led-screens/outdoor-fixed" replace />} />
            <Route path="/products/led-screens/outdoor-inline" element={<Navigate to="/products/led-screens/outdoor-fixed" replace />} />
            {/* Legacy poster redirect */}
            <Route path="/products/led-screen/vx-led-poster" element={<Navigate to="/products/led-screens/led-poster-display" replace />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
