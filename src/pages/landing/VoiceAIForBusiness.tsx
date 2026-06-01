import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Phone, Building2, TrendingUp, Shield, Star, Users, Zap, Clock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import voiceAIBusinessImg from '@/assets/services-hero.jpg';

export default function VoiceAIForBusiness() {
  const canonical = getCanonicalUrl('/landing/voice-ai-for-business');

  const trustBadges = [
    { icon: Shield, text: "Enterprise-Grade Security" },
    { icon: Clock, text: "99.99% Uptime SLA" },
    { icon: Users, text: "500+ Businesses Trust Us" },
    { icon: Star, text: "4.9/5 Customer Rating" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "VP Operations, TechCorp",
      text: "Voice AI reduced our customer service costs by 60% in just 3 months. The ROI was visible from day one."
    },
    {
      name: "Marcus Johnson",
      role: "CEO, ScaleUp Inc",
      text: "We scaled from 500 to 5000 calls monthly without adding a single agent. Game changer for our growth."
    },
    {
      name: "Priya Patel",
      role: "Director, Global Retail",
      text: "Customer satisfaction actually improved when we switched to AI. Our customers love the instant responses."
    }
  ];

  const features = [
    {
      icon: Phone,
      title: "Intelligent Voice Routing",
      description: "AI understands complex context and routes calls to the right department or resolves them instantly."
    },
    {
      icon: Building2,
      title: "Business Process Automation",
      description: "Automate high-volume calls like customer account inquiries, shipping updates, and booking requests."
    },
    {
      icon: TrendingUp,
      title: "Revenue-Driven Conversations",
      description: "Voice bots trained to identify upselling opportunities, cross-sell services, and qualify active leads."
    }
  ];

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "The AI Call Pro Voice AI for Business",
    "description": "High-performance enterprise voice AI receptionists and lead qualifying callers built for modern operations.",
    "brand": {
      "@type": "Brand",
      "name": "The AI Call Pro"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": canonical
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Voice AI for Business | Custom Enterprise AI Voice Solutions</title>
        <meta name="description" content="Deploy professional, custom-tuned voice AI receptionists and lead generation assistants. Achieve sub-second latency, HIPAA compliance, and custom CRM sync." />
        <meta name="keywords" content="voice AI for business, enterprise voice agents, custom voice bot, AI phone answering service, automatic CRM voice logger" />
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:title" content="Voice AI for Business | Custom Enterprise AI Voice Solutions" />
        <meta property="og:description" content="Professional voice AI solutions tailored for scaling teams. Reduce operational costs by 60% with custom CRM integration and sub-second latency." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://theaicall.pro/uploads/logo-96.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Voice AI for Business | The AI Call Pro" />
        <meta name="twitter:description" content="Deploy customized AI voice receptionists for customer service, appointment scheduling, and outbound lead follow-up." />

        <script type="application/ld+json">
          {JSON.stringify(businessSchema)}
        </script>
      </Helmet>
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 animate-fade-in text-left">
                <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border border-primary/20">
                  Enterprise Solution
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent leading-tight">
                  Voice AI Built for Professional Operations
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                  Transform client communication with custom voice agents. Instantly qualify inbound leads, automate scheduling, and reduce call center overhead by up to 60%.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-lg px-8 py-4" asChild>
                    <Link to="/demo">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                    <Link to="/contact">Contact Sales</Link>
                  </Button>
                </div>
              </div>
              
              <div className="lg:col-span-5 relative group rounded-2xl overflow-hidden shadow-2xl border border-foreground/[0.06] animate-fade-in">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />
                <img 
                  src={voiceAIBusinessImg} 
                  alt="High-performance AI voice agents suite interface displaying analytics dashboards and real-time call tracking software" 
                  className="w-full object-cover aspect-square hover:scale-[1.02] transition-transform duration-700" 
                  width={800} 
                  height={800}
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-12 px-4 bg-card/10 border-y border-foreground/[0.04]">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center justify-center gap-3">
                  <badge.icon className="h-6 w-6 text-primary flex-shrink-0" />
                  <span className="font-semibold text-base">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <header className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Enterprise-Ready Architecture</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Everything your business needs to deploy, manage, and optimize AI voice channels at scale.</p>
            </header>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-border hover:border-primary/50 transition-colors bg-card/30">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      {React.createElement(feature.icon, { className: "h-6 w-6 text-primary" })}
                    </div>
                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed text-muted-foreground">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 bg-card/10 border-t border-foreground/[0.04]">
          <div className="container mx-auto max-w-5xl">
            <header className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Trusted by Scaling Operations</h2>
            </header>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, index) => (
                <Card key={index} className="border-border bg-card/25 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}
                    </div>
                    <p className="text-base md:text-lg mb-4 italic text-foreground/90 font-light leading-relaxed">"{t.text}"</p>
                    <footer className="mt-6 border-t border-foreground/[0.06] pt-4">
                      <p className="font-semibold text-foreground text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
                    </footer>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing CTA */}
        <section className="py-20 px-4 bg-gradient-to-b from-transparent to-primary/[0.02]">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-12 rounded-2xl border border-primary/20">
              <Zap className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Automate Your Voice Channels?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">Start with a customized architecture consultation and see how voice AI can secure more meetings and improve customer care.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-4" asChild>
                  <Link to="/demo">Get Started</Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
