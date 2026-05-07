import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { Analytics } from "@vercel/analytics/react";
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
import HabitsReminders from "./pages/HabitsReminders";
import ProgressAchievements from "./pages/ProgressAchievements";
import FamilyDashboard from "./pages/FamilyDashboard";
import RiskForecast from "./pages/RiskForecast";
import StatusPage from "./pages/StatusPage";
import Changelog from "./pages/Changelog";
import Roadmap from "./pages/Roadmap";
import PressKit from "./pages/PressKit";
import Careers from "./pages/Careers";
import Accessibility from "./pages/Accessibility";
// New pages
import LearningCenter from "./pages/LearningCenter";
import BlogPage from "./pages/BlogPage";
import CommunityHub from "./pages/CommunityHub";
import ForumPost from "./pages/ForumPost";
import ForProfessionals from "./pages/ForProfessionals";
import PublicDentistProfile from "./pages/PublicDentistProfile";
import LiveSessions from "./pages/LiveSessions";
import SessionDetail from "./pages/SessionDetail";
import BrandPartnership from "./pages/BrandPartnership";
import CookiesPolicy from "./pages/CookiesPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ChildProfiles from "./pages/ChildProfiles";
import AdminPanel from "./pages/AdminPanel";
import CitySeoPage from "./pages/CitySeoPage";
import TopicSeoPage from "./pages/TopicSeoPage";
import SeoIndex from "./pages/SeoIndex";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Analytics />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/features" element={<Features />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/scan" element={<AIScan />} />
            <Route path="/kids" element={<KidsMode />} />
            <Route path="/advisor" element={<EatingAdvisor />} />
            <Route path="/chat" element={<AIChat />} />
            <Route path="/settings" element={<Settings />} />

            <Route path="/habits" element={<HabitsReminders />} />
            <Route path="/progress" element={<ProgressAchievements />} />
            <Route path="/family" element={<FamilyDashboard />} />
            <Route path="/kids/profiles" element={<ChildProfiles />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/in" element={<SeoIndex />} />
            <Route path="/in/:city" element={<CitySeoPage />} />
            <Route path="/guides" element={<SeoIndex />} />
            <Route path="/guides/:topic" element={<TopicSeoPage />} />
            <Route path="/forecast" element={<RiskForecast />} />

            {/* Learning + Blog */}
            <Route path="/learning" element={<LearningCenter />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/news" element={<Blog />} />
            <Route path="/webinars" element={<WebinarLibrary />} />
            <Route path="/success-stories" element={<SuccessStories />} />

            {/* Community */}
            <Route path="/community" element={<CommunityHub />} />
            <Route path="/community/post/:id" element={<ForumPost />} />
            <Route path="/community/explore" element={<Community />} />
            <Route path="/city/:city" element={<CityPage />} />

            {/* Dentists / Professionals */}
            <Route path="/for-professionals" element={<ForProfessionals />} />
            <Route path="/dentists/:id" element={<PublicDentistProfile />} />
            <Route path="/doctors/profile" element={<DoctorProfile />} />
            <Route path="/dentist-dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />

            {/* Live sessions */}
            <Route path="/sessions" element={<LiveSessions />} />
            <Route path="/sessions/:id" element={<SessionDetail />} />
            <Route path="/seminar/:id" element={<SeminarPage />} />

            {/* Brand */}
            <Route path="/brands" element={<BrandPartnership />} />
            <Route path="/partners" element={<Partners />} />

            {/* Trust pages */}
            <Route path="/status" element={<StatusPage />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/press" element={<PressKit />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/accessibility" element={<Accessibility />} />

            {/* Legal */}
            <Route path="/legal" element={<Legal />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/cookies" element={<CookiesPolicy />} />
            <Route path="/community-guidelines" element={<CommunityGuidelines />} />
            <Route path="/doctor-policy" element={<DoctorPolicy />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
