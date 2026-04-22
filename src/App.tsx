import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Configurator from "./pages/Configurator";
import AboutIndex from "./pages/AboutIndex";
import About from "./pages/About";
import AboutManufacturing from "./pages/AboutManufacturing";
import AboutSustainability from "./pages/AboutSustainability";
import Blog from "./pages/Blog";
import CaseStudies from "./pages/CaseStudies";
import CaseStudy from "./pages/CaseStudy";
import CompanyOverview from "./pages/CompanyOverview";
import Market from "./pages/Market";
import ProductCategory from "./pages/ProductCategory";
import Product from "./pages/Product";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          <Route path="/products/:category/:slug" element={<Product />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
