
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  services: {
    title: 'Services',
    items: [
      { label: 'AI Phone Answering', href: '/services/ai-phone-answering-service' },
      { label: 'Lead Qualification', href: '/services/ai-voice-agents-lead-qualification' },
      { label: 'Call Center Automation', href: '/services/call-center-automation' },
      { label: 'Appointment Scheduling', href: '/services/automated-appointment-scheduling' },
      { label: 'Custom Voice Agents', href: '/services/custom-voice-agents' },
      { label: 'Workflow Automation', href: '/services/workflow-task-automation' },
      { label: 'Voice AI Consultation', href: '/services/voice-ai-consultation' },
      { label: 'AI Phone Integration', href: '/services/ai-phone-integration' },
    ],
  },
  industries: {
    title: 'Industries',
    items: [
      { label: 'Healthcare', href: '/industries/healthcare-ai-receptionist' },
      { label: 'Real Estate', href: '/industries/real-estate-ai-assistant' },
      { label: 'E-commerce', href: '/industries/ecommerce-ai-support' },
      { label: 'Marketing Agencies', href: '/industries/marketing-agency-ai' },
      { label: 'Call Centers', href: '/industries/call-center-automation' },
      { label: 'Retail', href: '/industries/retail-ai-assistant' },
    ],
  },
  resources: {
    title: 'Resources',
    items: [
      { label: 'Case Studies', href: '/resources/case-studies' },
      { label: 'ROI Calculator', href: '/resources/roi-calculator' },
      { label: 'Integration Guides', href: '/resources/integration-guides' },
      { label: 'AI Glossary', href: '/resources/ai-glossary' },
      { label: 'Industry Trends', href: '/resources/ai-industry-trends' },
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  company: {
    title: 'Company',
    items: [
      { label: 'About Us', href: '/about' },
      { label: 'Demo', href: '/demo' },
      { label: 'Contact', href: '/contact' },
      { label: 'Partnership', href: '/partnership' },
      { label: 'Careers', href: '/company/careers' },
      { label: 'Book Appointment', href: '/book-appointment' },
      { label: 'LLM Friendly', href: '/llms' },
    ],
  },
};

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-card/50 border-t border-foreground/[0.05] text-foreground relative z-10" role="contentinfo">
      <div className="container mx-auto max-w-5xl px-4 sm:px-5 pt-14 sm:pt-16 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">

          {/* Brand column */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group" aria-label="The AI Call Home">
              <img
                src="/lovable-uploads/logo-96.png"
                alt="The AI Call Logo"
                width="44"
                height="44"
                loading="lazy"
                className="h-[50px] w-[50px] sm:h-11 sm:w-11 object-contain transition-all duration-300"
              />
              <span className="font-bold font-heading tracking-tight text-foreground text-2xl sm:text-xl">The AI Call</span>
            </Link>
            <p className="text-sm text-foreground/85 leading-relaxed mb-6 max-w-xs">
              AI voice agents that answer every call in under 1 second. Qualify leads, book appointments, and close deals — 24/7. Certified Retell AI Partner.
            </p>

            <address className="not-italic space-y-2.5 mb-6">
              <a href="mailto:info@theaicall.pro" className="flex items-center gap-2.5 text-sm text-foreground/80 hover:text-primary transition-colors group">
                <Mail className="h-3.5 w-3.5 text-foreground/60 group-hover:text-primary transition-colors" />
                <span>info@theaicall.pro</span>
              </a>
              <a href="tel:+19032092622" className="flex items-center gap-2.5 text-sm text-foreground/80 hover:text-primary transition-colors group">
                <Phone className="h-3.5 w-3.5 text-foreground/60 group-hover:text-primary transition-colors" />
                <span>+1 (903) 209-2622</span>
              </a>
              <div className="flex items-start gap-2.5 text-sm text-foreground/75">
                <MapPin className="h-3.5 w-3.5 text-foreground/60 mt-0.5 shrink-0" />
                <span>United States</span>
              </div>
            </address>

            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61575554008800"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-foreground/[0.08] flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                aria-label="Follow The AI Call on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/the-ai-call"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-foreground/[0.08] flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                aria-label="Follow The AI Call on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>

            {/* Upwork Top Rated Badge */}
            <a
              href="https://www.upwork.com/freelancers/sherry"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 mt-4 px-3 py-2 rounded-xl border border-emerald-600/30 bg-emerald-500/[0.04] dark:border-emerald-500/30 dark:bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/60 transition-all duration-300 w-fit"
              aria-label="View our verified Upwork reviews — Top Rated On Upwork"
            >
              {/* Profile photo */}
              <img
                src="/lovable-uploads/sherry-profile.png"
                alt="Muhammad Shaharyar — Top Rated on Upwork"
                width="32"
                height="32"
                loading="lazy"
                className="h-8 w-8 rounded-full object-cover shrink-0 ring-1 ring-emerald-500/40 group-hover:ring-emerald-500/70 transition-all duration-300"
              />
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11.5px] font-semibold text-foreground/95 group-hover:text-primary transition-colors">Top Rated On Upwork</span>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-2.5 w-2.5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5 text-[9.5px] text-foreground/80">
                  <span>100% Job Success</span>
                  <span>•</span>
                  <span className="group-hover:underline text-emerald-700 dark:text-emerald-400 font-semibold">View Reviews →</span>
                </div>
              </div>
            </a>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-foreground tracking-[0.15em] uppercase mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 inline-block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-12 mb-8 py-6 border-t border-b border-foreground/[0.05]">
          {[
            { value: '500+', label: 'Businesses Served' },
            { value: '50,000+', label: 'Calls Answered Daily' },
            { value: '<1s', label: 'Average Answer Time' },
            { value: '4.9★', label: 'Client Rating' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-2 text-center">
              <span className="text-sm sm:text-base font-bold text-amber-700 dark:text-primary">{stat.value}</span>
              <span className="text-[10px] sm:text-[11px] text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; {currentYear} The AI Call. All Rights Reserved.</p>
          <nav className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center" aria-label="Legal">
            {legalLinks.map((link) => (
              <Link key={link.href} to={link.href} className="hover:text-primary transition-colors">{link.label}</Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
