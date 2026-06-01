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
      description: "AI understands context and routes calls to the right department or resolves them instantly."
    },
    {
      icon: Building2,
      title: "Business Process Automation",
      description: "Automate repetitive calls like account inquiries, order status, and appointment scheduling."
    },
    {
      icon: TrendingUp,
      title: "Revenue-Driven Conversations",
      description: "AI agents trained to upsell, cross-sell, and convert leads during every call."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Voice AI for Business | Enterprise AI Voice Solutions</title>
        <meta name="description" content="Transform your business with AI voice solutions. Enterprise-grade security, intelligent routing, and revenue-driven conversations. Trusted by 500+ businesses." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <div className="animate-fade-in">
              <Badge variant="secondary" className="mb-6">Enterprise Solution</Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Voice AI for Business
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Transform customer interactions with AI-powered voice. Reduce costs by 60%, scale infinitely, and never miss a call again.
              </p>
              <div className="flex flex-col sm:flex gap-4 justify-center">
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
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-12 px-4 bg-card/30">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center justify-center gap-3">
                  <badge.icon className="h-6 w-6 text-primary" />
                  <span className="font-medium">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Built for Business</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Everything your business needs to deploy AI voice at scale.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-border hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="mb-4">{React.createElement(feature.icon, { className: "h-8 w-8 text-primary" })}</div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 bg-card/30">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Trusted by Businesses Worldwide</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="pt-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}
                    </div>
                    <p className="text-lg mb-4 italic">"{t.text}"</p>
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-muted-foreground">{t.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing CTA */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-12 rounded-2xl border border-primary/20">
              <Zap className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Business?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Start with a free consultation and see how Voice AI can grow your revenue.</p>
              <div className="flex flex-col sm:flex gap-4 justify-center">
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
