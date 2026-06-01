import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Rocket, TrendingUp, Star, Users, Zap, Calendar, DollarSign, BarChart3 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import startupAIImg from '@/assets/lead-qualification-hero.jpg';

export default function StartupAI() {
  const canonical = getCanonicalUrl('/landing/startup-ai');

  const trustBadges = [
    { icon: DollarSign, text: "No Long-Term Contract" },
    { icon: Calendar, text: "Setup in 24 Hours" },
    { icon: Users, text: "Startup-Friendly Pricing" },
    { icon: TrendingUp, text: "Scale as You Grow" }
  ];

  const testimonials = [
    {
      name: "Alex Rivera",
      role: "Founder, SpeedLaunch",
      text: "We started with 100 calls/month and grew to 10,000 without changing providers. The scaling was seamless."
    },
    {
      name: "Emma Liu",
      role: "CEO, QuickServe",
      text: "At startup pricing, we got enterprise-grade AI voice. Our customer acquisition cost dropped 40% in the first quarter."
    },
    {
      name: "Tom Bradley",
      role: "Co-founder, GrowthLab",
      text: "No contract lock-in gave us freedom. But we never wanted to leave — the results speak for themselves."
    }
  ];

  const features = [
    {
      icon: Rocket,
      title: "Rapid Deployment",
      description: "Go live in 24 hours with pre-configured templates and guided setup. No technical expertise needed."
    },
    {
      icon: DollarSign,
      title: "Pay-As-You-Grow",
      description: "Startup-friendly pricing with no long-term contracts. Scale up or down as your business evolves."
    },
    {
      icon: BarChart3,
      title: "Built-In Analytics",
      description: "Track conversions, customer satisfaction, and ROI with our intuitive analytics dashboard."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>AI for Startups | Affordable AI Voice Solutions for Growing Businesses</title>
        <meta name="description" content="Affordable AI voice solutions for startups. Setup in 24 hours, pay-as-you-grow pricing, no long-term contracts. Scale seamlessly as you grow." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <div className="animate-fade-in">
              <Badge variant="secondary" className="mb-6">Startup Solution</Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                AI for Startups
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Enterprise-grade AI voice at startup prices. Setup in 24 hours, no long-term contracts, and pricing that scales with you.
              </p>
              <div className="flex flex-col sm:flex gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py--4" asChild>
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything You Need</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Powerful features at a price that makes sense for growing businesses.</p>
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Startup Success Stories</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="pt-6">
                    <div className=" flex gap-1 mb-4">
                      {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Accelerate Your Startup?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Start with a free plan and scale as your business grows. No credit card required.</p>
              <div className="flex flex-col sm:flex gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-4" asChild>
                  <Link to="/demo">Get Started Free</Link>
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
