import React, { useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Menu, Phone, ChevronRight, ChevronDown, X } from 'lucide-react';
import { cn } from "@/lib/utils";
import { ThemeToggle } from './ThemeToggle';

/* ── Menu data ────────────────────────────────── */
interface MenuItem { label: string; href: string; desc?: string }
interface MenuCategory { label: string; href: string; items: MenuItem[] }

const menuCategories: MenuCategory[] = [
  {
    label: 'Services',
    href: '/services',
    items: [
      { label: 'AI Phone Answering', href: '/services/ai-phone-answering-service', desc: '24/7 AI-powered call handling' },
      { label: 'Lead Qualification', href: '/services/ai-voice-agents-lead-qualification', desc: 'Automated lead scoring & routing' },
      { label: 'Call Center Automation', href: '/services/call-center-automation', desc: 'Scale operations with AI' },
      { label: 'Appointment Scheduling', href: '/services/automated-appointment-scheduling', desc: 'AI-powered booking system' },
      { label: 'Custom Voice Agents', href: '/services/custom-voice-agents', desc: 'Tailored AI voice solutions' },
      { label: 'Workflow Automation', href: '/services/workflow-task-automation', desc: 'Automate business processes' },
    ],
  },
  {
    label: 'Consulting',
    href: '/services/voice-ai-consultation',
    items: [
      { label: 'Voice AI Consultation', href: '/services/voice-ai-consultation', desc: 'Expert strategy sessions' },
      { label: 'AI Phone Integration', href: '/services/ai-phone-integration', desc: 'Connect AI to your phone system' },
      { label: 'Automation Audit', href: '/services/ai-automation-audit', desc: 'Identify automation opportunities' },
      { label: 'AI Onboarding', href: '/services/voice-ai-onboarding', desc: 'Get up and running fast' },
    ],
  },
  {
    label: 'Industries',
    href: '/industries/healthcare-ai-receptionist',
    items: [
      { label: 'Healthcare', href: '/industries/healthcare-ai-receptionist', desc: 'AI receptionists for clinics' },
      { label: 'Real Estate', href: '/industries/real-estate-ai-assistant', desc: 'AI assistants for agents' },
      { label: 'E-commerce', href: '/industries/ecommerce-ai-support', desc: '24/7 customer support' },
      { label: 'Marketing Agencies', href: '/industries/marketing-agency-ai', desc: 'AI for agency workflows' },
      { label: 'Call Centers', href: '/industries/call-center-automation', desc: 'Automate call operations' },
      { label: 'Retail', href: '/industries/retail-ai-assistant', desc: 'In-store & online AI support' },
    ],
  },
  {
    label: 'Resources',
    href: '/resources',
    items: [
      { label: 'Case Studies', href: '/resources/case-studies', desc: 'Customer success stories' },
      { label: 'ROI Calculator', href: '/resources/roi-calculator', desc: 'Calculate your savings' },
      { label: 'Integration Guides', href: '/resources/integration-guides', desc: 'Step-by-step setup' },
      { label: 'Blog', href: '/blog', desc: 'News & insights' },
      { label: 'FAQ', href: '/faq', desc: 'Common questions answered' },
    ],
  },
  {
    label: 'Company',
    href: '/about',
    items: [
      { label: 'About Us', href: '/about', desc: 'Our mission & team' },
      { label: 'Demo', href: '/demo', desc: 'See AI in action' },
      { label: 'Contact', href: '/contact', desc: 'Get in touch' },
      { label: 'Partnership', href: '/partnership', desc: 'Partner with us' },
      { label: 'Careers', href: '/company/careers', desc: 'Join our team' },
    ],
  },
];

/* ── Mega Menu Panel (Upwork-style) ───────────── */
function MegaMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const [activeCategory, setActiveCategory] = useState(0);

  // Reset to first category when menu opens
  useEffect(() => { if (open) setActiveCategory(0); }, [open]);

  if (!open) return null;

  const active = menuCategories[activeCategory];

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="fixed top-0 left-0 right-0 z-[95] pt-[72px] px-3 sm:px-4 animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="container mx-auto max-w-5xl bg-background/98 backdrop-blur-2xl border border-foreground/[0.08] rounded-2xl shadow-2xl shadow-black/20 overflow-hidden">
          <div className="flex min-h-[340px]">

            {/* Left sidebar — categories */}
            <div className="w-[200px] shrink-0 border-r border-foreground/[0.06] py-3 px-2 bg-foreground/[0.02]">
              <p className="px-3 py-2 text-[10px] font-semibold text-muted-foreground/50 tracking-[0.2em] uppercase">Categories</p>
              {menuCategories.map((cat, i) => (
                <button
                  key={cat.label}
                  onMouseEnter={() => setActiveCategory(i)}
                  onClick={() => setActiveCategory(i)}
                  className={cn(
                    "flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-all duration-150 text-left",
                    activeCategory === i
                      ? "text-primary bg-primary/5 font-medium"
                      : "text-foreground/70 hover:text-foreground hover:bg-foreground/[0.03]"
                  )}
                >
                  <span>{cat.label}</span>
                  <ChevronRight className={cn("h-3.5 w-3.5 transition-opacity", activeCategory === i ? "opacity-60" : "opacity-20")} />
                </button>
              ))}
            </div>

            {/* Right content panel */}
            <div className="flex-1 p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-semibold text-muted-foreground/50 tracking-[0.2em] uppercase">{active.label}</p>
                <Link
                  to={active.href}
                  onClick={onClose}
                  className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  View all
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                {active.items.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={onClose}
                    className={cn(
                      "group flex flex-col px-3 py-2.5 rounded-xl transition-all duration-150",
                      pathname === item.href
                        ? "bg-primary/5"
                        : "hover:bg-foreground/[0.03]"
                    )}
                  >
                    <span className={cn(
                      "text-sm font-medium transition-colors",
                      pathname === item.href ? "text-primary" : "text-foreground/80 group-hover:text-foreground"
                    )}>
                      {item.label}
                    </span>
                    {item.desc && (
                      <span className="text-[12px] text-muted-foreground mt-0.5 leading-snug">{item.desc}</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Mobile nav ───────────────────────────────── */
function MobileNavSection({ cat, pathname }: { cat: MenuCategory; pathname: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
      >
        <span>{cat.label}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 opacity-40 transition-transform duration-200", expanded && "rotate-180")} />
      </button>
      {expanded && (
        <div className="ml-3 pl-3 border-l border-foreground/[0.06] mb-2 mt-0.5">
          {cat.items.map((item) => (
            <SheetClose asChild key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  "block px-3 py-1.5 text-[13px] rounded-lg transition-colors",
                  pathname === item.href ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            </SheetClose>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mega menu on route change
  useEffect(() => { setMegaOpen(false); }, [location.pathname]);

  // Close on Escape
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMegaOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [megaOpen]);

  const toggleMega = useCallback(() => setMegaOpen((v) => !v), []);

  return (
    <>
      <header className={cn("fixed top-0 left-0 right-0 z-[100] px-3 sm:px-4 transition-all duration-500", scrolled ? "py-2" : "py-3 sm:py-4")} role="banner">
        <nav className={cn("container mx-auto max-w-5xl flex items-center justify-between relative px-4 sm:px-5 rounded-2xl transition-all duration-500", scrolled ? "py-2 bg-background/70 backdrop-blur-xl border border-foreground/[0.06] shadow-lg shadow-black/5" : "py-2.5 bg-background/40 backdrop-blur-md border border-foreground/[0.03] shadow-sm")} aria-label="Main navigation">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 z-10 hover:opacity-80 transition-opacity shrink-0" aria-label="The AI Call — Home">
            <img src="/lovable-uploads/logo-96.png" alt="The AI Call" width="44" height="44" fetchPriority="high" className={cn("object-contain transition-all duration-300", scrolled ? "h-11 w-11 sm:h-9 sm:w-9" : "h-[50px] w-[50px] sm:h-11 sm:w-11")} />
            <span className={cn("font-bold font-heading tracking-tight text-foreground transition-all duration-300", scrolled ? "text-xl sm:text-lg" : "text-2xl sm:text-xl")}>The AI Call</span>
          </Link>

          {/* Desktop — simple trigger links */}
          <div className="hidden lg:flex items-center gap-1">
            <button
              onClick={toggleMega}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium rounded-lg transition-colors duration-200",
                megaOpen ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Explore
              <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", megaOpen && "rotate-180")} />
            </button>
            <Link to="/demo" className="px-3 py-1.5 text-[13px] font-medium rounded-lg text-muted-foreground hover:text-foreground transition-colors">Demo</Link>
            <Link to="/blog" className="px-3 py-1.5 text-[13px] font-medium rounded-lg text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
            <Link to="/contact" className="px-3 py-1.5 text-[13px] font-medium rounded-lg text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <ThemeToggle />
            <Button asChild size="sm" className="rounded-full px-5 h-9 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20 border-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] font-semibold text-sm tracking-wide">
              <Link to="/demo">Book a Demo</Link>
            </Button>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-1.5">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[320px] flex flex-col p-0">
                <div className="sr-only">
                  <SheetTitle>Navigation Menu</SheetTitle>
                  <SheetDescription>Site navigation</SheetDescription>
                </div>
                <div className="flex items-center gap-2.5 px-5 py-4 border-b border-border">
                  <img src="/lovable-uploads/logo-96.png" alt="The AI Call" width="40" height="40" className="h-10 w-10 object-contain" />
                  <span className="font-bold text-xl font-heading tracking-tight">The AI Call</span>
                </div>
                <nav className="flex-1 px-3 py-3 overflow-y-auto" aria-label="Mobile navigation">
                  <div className="flex flex-col gap-0.5">
                    {menuCategories.map((cat) => (
                      <MobileNavSection key={cat.label} cat={cat} pathname={location.pathname} />
                    ))}
                  </div>
                </nav>
                <div className="mt-auto border-t border-border px-3 py-4">
                  <SheetClose asChild>
                    <Button asChild className="w-full h-11 text-sm rounded-xl font-semibold">
                      <Link to="/demo">
                        <Phone className="h-4 w-4 mr-2" />
                        Book a Demo
                      </Link>
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      {/* Mega menu panel */}
      <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} pathname={location.pathname} />
    </>
  );
}
