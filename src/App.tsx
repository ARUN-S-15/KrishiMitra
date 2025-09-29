import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Information from "./pages/Information";
import CropDetail from "./pages/CropDetail";
import Community from "./pages/Community";
import Chatbot from "./pages/Chatbot";
import Equipment from "./pages/Equipment";
import Schemes from "./pages/Schemes";
import Weather from "./pages/Weather";
import SoilHealth from "./pages/SoilHealth";
import Profile from "./pages/Profile";
import Labour from "./pages/Labour";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="information" element={<Information />} />
            <Route path="crop/:id" element={<CropDetail />} />
            <Route path="community" element={<Community />} />
            <Route path="chatbot" element={<Chatbot />} />
            <Route path="equipments" element={<Equipment />} />
            <Route path="schemes" element={<Schemes />} />
            <Route path="weather" element={<Weather />} />
            <Route path="soil" element={<SoilHealth />} />
            <Route path="profile" element={<Profile />} />
            <Route path="labour" element={<Labour />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
