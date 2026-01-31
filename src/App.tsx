import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import AIScan from "./pages/AIScan";
import KidsMode from "./pages/KidsMode";
import EatingAdvisor from "./pages/EatingAdvisor";
import AIChat from "./pages/AIChat";
import Pricing from "./pages/Pricing";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Legal from "./pages/Legal";
import Features from "./pages/Features";
import Solutions from "./pages/Solutions";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Community from "./pages/Community";
import CityPage from "./pages/CityPage";
import DoctorProfile from "./pages/DoctorProfile";
import SeminarPage from "./pages/SeminarPage";
import DoctorDashboard from "./pages/DoctorDashboard";
import Blog from "./pages/Blog";
import WebinarLibrary from "./pages/WebinarLibrary";
import SuccessStories from "./pages/SuccessStories";
import Partners from "./pages/Partners";
import CommunityGuidelines from "./pages/CommunityGuidelines";
import DoctorPolicy from "./pages/DoctorPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Marketing */}
          <Route path="/" element={<Landing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Core App */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scan" element={<AIScan />} />
          <Route path="/kids" element={<KidsMode />} />
          <Route path="/advisor" element={<EatingAdvisor />} />
          <Route path="/chat" element={<AIChat />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Community & Doctors */}
          <Route path="/community" element={<Community />} />
          <Route path="/city/:city" element={<CityPage />} />
          <Route path="/doctors/profile" element={<DoctorProfile />} />
          <Route path="/seminar/:id" element={<SeminarPage />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          
          {/* Growth Pages */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/webinars" element={<WebinarLibrary />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/partners" element={<Partners />} />
          
          {/* Legal */}
          <Route path="/legal" element={<Legal />} />
          <Route path="/community-guidelines" element={<CommunityGuidelines />} />
          <Route path="/doctor-policy" element={<DoctorPolicy />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
