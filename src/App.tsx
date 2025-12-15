import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Services from "./pages/Services";
import ProjectDetail from "./pages/ProjectDetail";
import CaseStudies from "./pages/CaseStudies";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { PageTransition } from "@/components/animations/PageTransition";
import { useSmoothScroll } from "@/lib/animations/smoothScroll";
import { GlobalGrain } from "@/components/animations/GlobalGrain";

const queryClient = new QueryClient();

const AppContent = () => {
  // Initialize smooth scroll
  useSmoothScroll(true);

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor enabled={true} />
      <GlobalGrain />

      <PageTransition type="fade">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/project/:id" element={<ProjectDetail />} />

          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;