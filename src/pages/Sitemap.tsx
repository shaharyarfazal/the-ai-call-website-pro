import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Link } from 'react-router-dom';
import { getCanonicalUrl } from '@/lib/seo';

const urls: { path: string; label?: string }[] = [
  // Main Pages
  { path: '/' },
  { path: '/about' },
  { path: '/about-us' },
  { path: '/contact' },
  { path: '/book-appointment' },
  { path: '/automate' },
  { path: '/services' },
  { path: '/demo' },
  { path: '/demo-request' },
  { path: '/faq' },
  { path: '/resources' },
  { path: '/sitemap' },
  { path: '/partnership' },
  
  // Services
  { path: '/services' },
  { path: '/services/ai-voice-agents-lead-qualification' },
  { path: '/services/ai-phone-answering-service' },
  { path: '/services/automated-appointment-scheduling' },
  { path: '/services/call-center-automation' },
  { path: '/services/workflow-task-automation' },
  { path: '/services/voice-ai-consultation' },
  { path: '/services/ai-phone-integration' },
  { path: '/services/custom-voice-agents' },
  { path: '/services/ai-automation-audit' },
  { path: '/services/voice-ai-onboarding' },

  // Industries
  { path: '/industries/healthcare-ai-receptionist' },
  { path: '/industries/real-estate-ai-assistant' },
  { path: '/industries/ecommerce-ai-support' },
  { path: '/industries/marketing-agency-ai' },
  { path: '/industries/call-center-automation' },
  { path: '/industries/retail-ai-assistant' },
  { path: '/industries/healthcare-case-study' },
  { path: '/industries/ecommerce-case-study' },
  { path: '/industries/callcenter-case-study' },
  { path: '/industries/real-estate-case-study' },

  // Features
  { path: '/features/appointment-booking' },
  { path: '/features/analytics-dashboard' },
  { path: '/features/crm-integration' },
  { path: '/features/voice-recognition' },

  // Resources
  { path: '/resources' },
  { path: '/resources/case-studies' },
  { path: '/resources/roi-calculator' },
  { path: '/resources/integration-guides' },
  { path: '/resources/ai-glossary' },
  { path: '/resources/getting-started' },
  { path: '/resources/integration-hub' },
  { path: '/resources/blog-post-template' },
  { path: '/resources/ai-industry-trends' },
  { path: '/resources/faq-expanded' },

  // Landing Pages
  { path: '/landing/voice-ai-for-business' },
  { path: '/landing/call-center-transformation' },
  { path: '/landing/enterprise-ai' },
  { path: '/landing/startup-ai' },
  { path: '/landing/ai-consultation' },

  // Company
  { path: '/company/careers' },

  // Auth & Admin
  { path: '/auth' },
  { path: '/dashboard' },
  { path: '/privacy-policy' },
  { path: '/terms-of-service' },
];

export default function Sitemap() {
  const canonical = getCanonicalUrl('/sitemap');
  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>HTML Sitemap | The AI Call Pro</title>
        <meta name="description" content="Browse all public pages of The AI Call Pro website via our human-readable HTML sitemap." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 pt-32 pb-16 sm:pt-40 sm:pb-24">
          <header className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">HTML Sitemap</h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Quick access to all key pages on the site. For search engines, see robots.txt for XML/TXT sitemap locations.</p>
          </header>

          <nav aria-label="Sitemap" className="max-w-3xl mx-auto">
            <ul className="grid sm:grid-cols-2 gap-3 list-disc pl-6">
              {urls.map((u) => (
                <li key={u.path}>
                  <Link className="text-primary hover:underline" to={u.path}>
                    {getCanonicalUrl(u.path)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      </main>
      <Footer />
    </div>
  );
}
