
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppFallback } from "@/components/AppFallback";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LocalThemeProvider } from "@/components/LocalThemeProvider";
import { Analytics } from "@/components/Analytics";
import { GlobalBackground } from "@/components/layout/GlobalBackground";
import { ScrollToTop } from "@/components/ScrollToTop";

// Optimized for production

// Lazy load pages with error handling
import Index from "./pages/Index";

const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Demo = lazy(() => import("./pages/Demo"));
const Faq = lazy(() => import("./pages/Faq"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Services = lazy(() => import("./pages/services/Services"));

// Services pages
const AiVoiceAgentsLeadQualification = lazy(() => import("./pages/services/AiVoiceAgentsLeadQualification"));
const AiPhoneAnsweringService = lazy(() => import("./pages/services/AiPhoneAnsweringService"));
const AutomatedAppointmentScheduling = lazy(() => import("./pages/services/AutomatedAppointmentScheduling"));
const CallCenterAutomation = lazy(() => import("./pages/services/CallCenterAutomation"));
const WorkflowTaskAutomation = lazy(() => import("./pages/services/WorkflowTaskAutomation"));
const VoiceAIConsultation = lazy(() => import("./pages/services/VoiceAIConsultation"));
const AIPhoneIntegration = lazy(() => import("./pages/services/AIPhoneIntegration"));
const CustomVoiceAgents = lazy(() => import("./pages/services/CustomVoiceAgents"));
const AIAutomationAudit = lazy(() => import("./pages/services/AIAutomationAudit"));
const VoiceAIOnboarding = lazy(() => import("./pages/services/VoiceAIOnboarding"));

// Industries pages
const HealthcareAiReceptionist = lazy(() => import("./pages/industries/HealthcareAiReceptionist"));
const RealEstateAiAssistant = lazy(() => import("./pages/industries/RealEstateAiAssistant"));
const EcommerceAiSupport = lazy(() => import("./pages/industries/EcommerceAiSupport"));
const MarketingAgencyAi = lazy(() => import("./pages/industries/MarketingAgencyAi"));
const CallCenterAutomationIndustry = lazy(() => import("./pages/industries/CallCenterAutomation"));
const RetailAiAssistant = lazy(() => import("./pages/industries/RetailAiAssistant"));
const HealthcareCaseStudy = lazy(() => import("./pages/industries/HealthcareCaseStudy"));
const EcommerceCaseStudy = lazy(() => import("./pages/industries/EcommerceCaseStudy"));
const CallCenterCaseStudy = lazy(() => import("./pages/industries/CallCenterCaseStudy"));
const RealEstateCaseStudy = lazy(() => import("./pages/industries/RealEstateCaseStudy"));
const VoiceAIForBusiness = lazy(() => import("./pages/landing/VoiceAIForBusiness"));
const CallCenterTransformation = lazy(() => import("./pages/landing/CallCenterTransformation"));
const EnterpriseAI = lazy(() => import("./pages/landing/EnterpriseAI"));
const StartupAI = lazy(() => import("./pages/landing/StartupAI"));
const AIConsultation = lazy(() => import("./pages/landing/AIConsultation"));

// Resources pages
const Resources = lazy(() => import("./pages/Resources"));
const CaseStudies = lazy(() => import("./pages/resources/CaseStudies"));
const AIGlossary = lazy(() => import("./pages/resources/AIGlossary"));
const GettingStarted = lazy(() => import("./pages/resources/GettingStarted"));
const IntegrationHub = lazy(() => import("./pages/resources/IntegrationHub"));
const BlogPostTemplate = lazy(() => import("./pages/resources/BlogPostTemplate"));
const AIIndustryTrends = lazy(() => import("./pages/resources/AIIndustryTrends"));
const FAQExpanded = lazy(() => import("./pages/resources/FAQExpanded"));
const IntegrationGuides = lazy(() => import("./pages/resources/IntegrationGuides"));
const RoiCalculator = lazy(() => import("./pages/resources/RoiCalculator"));
const AiCrmCaseStudy = lazy(() => import("./pages/resources/AiCrmCaseStudy"));

// Features pages
const AppointmentBooking = lazy(() => import("./pages/features/AppointmentBooking"));
const AnalyticsDashboard = lazy(() => import("./pages/features/AnalyticsDashboard"));
const CrmIntegration = lazy(() => import("./pages/features/CrmIntegration"));
const VoiceRecognition = lazy(() => import("./pages/features/VoiceRecognition"));

// Company pages
const Careers = lazy(() => import("./pages/company/Careers"));

// Core/Auth pages
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const BookAppointment = lazy(() => import("./pages/BookAppointment"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const DemoRequest = lazy(() => import("./pages/DemoRequest"));
const Partnership = lazy(() => import("./pages/Partnership"));
const LlmFriendlyInfo = lazy(() => import("./pages/LlmFriendlyInfo"));
const FacebookLandingPage = lazy(() => import("./pages/FacebookLandingPage"));

// Admin pages
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminOverview = lazy(() => import("./pages/admin/AdminOverview"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const BookingManagement = lazy(() => import("./pages/admin/BookingManagement"));
const BlogManagement = lazy(() => import("./pages/admin/BlogManagement"));
const Settings = lazy(() => import("./pages/admin/Settings"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const App = () => {
  
  
  return (
    <QueryClientProvider client={queryClient}>
      <LocalThemeProvider>
        <TooltipProvider>
          <>
            <div className="hero-container flex flex-col min-h-screen text-foreground relative w-full overflow-x-hidden bg-background">
              <BrowserRouter>
                <ScrollToTop />
                <GlobalBackground />
                <Analytics />
                <ErrorBoundary fallback={<AppFallback />}>
                  <Suspense fallback={<AppFallback />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/demo" element={<Demo />} />
                  <Route path="/talk-to-ai-voice-agent" element={<Demo />} />
                  <Route path="/fb-lp" element={<FacebookLandingPage />} />
                  <Route path="/ai-voice-receptionist-demo" element={<FacebookLandingPage />} />
                  <Route path="/faq" element={<Faq />} />
                  
                  {/* Services routes */}
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/ai-voice-agents-lead-qualification" element={<AiVoiceAgentsLeadQualification />} />
                  <Route path="/services/ai-phone-answering-service" element={<AiPhoneAnsweringService />} />
                  <Route path="/services/automated-appointment-scheduling" element={<AutomatedAppointmentScheduling />} />
                  <Route path="/services/call-center-automation" element={<CallCenterAutomation />} />
                  <Route path="/services/workflow-task-automation" element={<WorkflowTaskAutomation />} />
                  <Route path="/services/voice-ai-consultation" element={<VoiceAIConsultation />} />
                  <Route path="/services/ai-phone-integration" element={<AIPhoneIntegration />} />
                  <Route path="/services/custom-voice-agents" element={<CustomVoiceAgents />} />
                  <Route path="/services/ai-automation-audit" element={<AIAutomationAudit />} />
                  <Route path="/services/voice-ai-onboarding" element={<VoiceAIOnboarding />} />
                  
                  {/* Industries routes */}
                  <Route path="/industries/healthcare-ai-receptionist" element={<HealthcareAiReceptionist />} />
                  <Route path="/industries/real-estate-ai-assistant" element={<RealEstateAiAssistant />} />
                  <Route path="/industries/ecommerce-ai-support" element={<EcommerceAiSupport />} />
                  <Route path="/industries/marketing-agency-ai" element={<MarketingAgencyAi />} />
                  <Route path="/industries/call-center-automation" element={<CallCenterAutomationIndustry />} />
                  <Route path="/industries/retail-ai-assistant" element={<RetailAiAssistant />} />
                  <Route path="/industries/healthcare-case-study" element={<HealthcareCaseStudy />} />
                  <Route path="/industries/ecommerce-case-study" element={<EcommerceCaseStudy />} />
                  <Route path="/industries/callcenter-case-study" element={<CallCenterCaseStudy />} />
                  <Route path="/industries/real-estate-case-study" element={<RealEstateCaseStudy />} />
                  
                  {/* Landing pages */}
                  <Route path="/landing/voice-ai-for-business" element={<VoiceAIForBusiness />} />
                  <Route path="/landing/call-center-transformation" element={<CallCenterTransformation />} />
                  <Route path="/landing/enterprise-ai" element={<EnterpriseAI />} />
                  <Route path="/landing/startup-ai" element={<StartupAI />} />
                  <Route path="/landing/ai-consultation" element={<AIConsultation />} />
                  
                  {/* Resources routes */}
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/resources/case-studies" element={<CaseStudies />} />
                  <Route path="/resources/ai-glossary" element={<AIGlossary />} />
                  <Route path="/resources/getting-started" element={<GettingStarted />} />
                  <Route path="/resources/integration-hub" element={<IntegrationHub />} />
                  <Route path="/resources/blog-post-template" element={<BlogPostTemplate />} />
                  <Route path="/resources/ai-industry-trends" element={<AIIndustryTrends />} />
                  <Route path="/resources/faq-expanded" element={<FAQExpanded />} />
                  <Route path="/resources/integration-guides" element={<IntegrationGuides />} />
                  <Route path="/resources/roi-calculator" element={<RoiCalculator />} />
                  <Route path="/case-studies/ai-crm-multi-agent" element={<AiCrmCaseStudy />} />
                  
                  {/* Features routes */}
                  <Route path="/features/appointment-booking" element={<AppointmentBooking />} />
                  <Route path="/features/analytics-dashboard" element={<AnalyticsDashboard />} />
                  <Route path="/features/crm-integration" element={<CrmIntegration />} />
                  <Route path="/features/voice-recognition" element={<VoiceRecognition />} />
                  
                  {/* Company routes */}
                  <Route path="/company/careers" element={<Careers />} />
                  
                  {/* Core/Auth routes */}
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                  <Route path="/book-appointment" element={<BookAppointment />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/sitemap" element={<Sitemap />} />
                  <Route path="/demo-request" element={<DemoRequest />} />
                  <Route path="/partnership" element={<Partnership />} />
                  <Route path="/llms" element={<LlmFriendlyInfo />} />
                  <Route path="/llms-txt" element={<LlmFriendlyInfo />} />
                  <Route path="/llms.txt" element={<LlmFriendlyInfo />} />
                  
                  {/* Admin routes */}
                  <Route path="/admin" element={<AdminDashboard />}>
                    <Route index element={<AdminOverview />} />
                    <Route path="users" element={<UserManagement />} />
                    <Route path="bookings" element={<BookingManagement />} />
                    <Route path="blog" element={<BlogManagement />} />
                    <Route path="settings" element={<Settings />} />
                  </Route>
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </BrowserRouter>
          <Toaster />
        </div>
        </>
      </TooltipProvider>
    </LocalThemeProvider>
  </QueryClientProvider>
);
};

export default App;
