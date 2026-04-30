import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { AuthProvider } from "@/hooks/useAuth";
import { GuestRoute, ProtectedRoute } from "@/components/common/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SplashScreen } from "@/components/common/SplashScreen";
import { SupportChatbot } from "@/components/common/SupportChatbot";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import Onboarding from "./pages/Onboarding";
import Discover from "./pages/dashboard/Discover";
import Chat from "./pages/dashboard/Chat";
import Friends from "./pages/dashboard/Friends";
import Calls from "./pages/dashboard/Calls";
import Profile from "./pages/dashboard/Profile";
import Premium from "./pages/Premium";
import Notifications from "./pages/Notifications";
import SafetyGuidelines from "./pages/SafetyGuidelines";
import SafetyCode from "./pages/SafetyCode";
import SafetyCenter from "./pages/SafetyCenter";
import Compliance from "./pages/Compliance";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import About from "./pages/About";
import HealthDataPrivacy from "./pages/HealthDataPrivacy";
import OpenSourceLicenses from "./pages/OpenSourceLicenses";
import RefundPolicy from "./pages/RefundPolicy";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner position="top-center" richColors closeButton />
      <SplashScreen />
      <BrowserRouter>
        <SupportChatbot />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
            <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />

            <Route path="/onboarding" element={<ProtectedRoute requireOnboarding={false}><Onboarding /></ProtectedRoute>} />

            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="/dashboard/discover" replace />} />
              <Route path="discover" element={<Discover />} />
              <Route path="chat" element={<Chat />} />
              <Route path="chat/:userId" element={<Chat />} />
              <Route path="friends" element={<Friends />} />
              <Route path="calls" element={<Calls />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="/premium" element={<Premium />} />
            <Route path="/safety" element={<SafetyGuidelines />} />
            <Route path="/safety-code" element={<SafetyCode />} />
            <Route path="/safety-center" element={<SafetyCenter />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/about" element={<About />} />
            <Route path="/health-data-privacy" element={<HealthDataPrivacy />} />
            <Route path="/open-source-licenses" element={<OpenSourceLicenses />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
