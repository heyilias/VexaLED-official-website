import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

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
const ProductCategory = lazy(() => import("./pages/ProductCategory"));
const Product = lazy(() => import("./pages/Product"));
const FoldingScreen = lazy(() => import("./pages/FoldingScreen"));

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
            <Route path="/products/folding-screen" element={<FoldingScreen />} />
            <Route path="/products/:category/:slug" element={<Product />} />
            <Route path="/products/:category" element={<ProductCategory />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
