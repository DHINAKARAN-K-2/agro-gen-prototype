import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LanguageSelection from "./components/LanguageSelection";
import Home from "./pages/Home";
import Register from "./pages/Register";
import FarmerDashboard from "./pages/FarmerDashboard";
import RetailerDashboard from "./pages/RetailerDashboard";
import ConsumerDashboard from "./pages/ConsumerDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    // You could store this in localStorage for persistence
    localStorage.setItem('selectedLanguage', languageCode);
  };

  // Show language selection if no language is selected
  if (!selectedLanguage) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <LanguageSelection onLanguageSelect={handleLanguageSelect} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home currentLanguage={selectedLanguage} onLanguageChange={() => setSelectedLanguage('')} />} />
            <Route path="/register/:userType" element={<Register currentLanguage={selectedLanguage} onLanguageChange={() => setSelectedLanguage('')} />} />
            <Route path="/dashboard/farmer" element={<FarmerDashboard currentLanguage={selectedLanguage} onLanguageChange={() => setSelectedLanguage('')} />} />
            <Route path="/dashboard/retailer" element={<RetailerDashboard currentLanguage={selectedLanguage} onLanguageChange={() => setSelectedLanguage('')} />} />
            <Route path="/dashboard/consumer" element={<ConsumerDashboard currentLanguage={selectedLanguage} onLanguageChange={() => setSelectedLanguage('')} />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
