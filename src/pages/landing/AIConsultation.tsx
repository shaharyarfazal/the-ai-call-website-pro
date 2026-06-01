import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Brain, Zap, Star, Users, Calendar, DollarSign, BarChart3, Clock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import aiConsultationImg from '@/assets/services-hero.jpg';

export default function AIConsultation() {
  const canonical = getCanonicalUrl('/landing/ai-consultation');

  const trustBadges = [
    { icon: Brain, text: "AI Experts" },
    { icon: Clock, text: "Response in 24 Hours" },
    { icon: Calendar, text: "Free Discovery Call" },
    { icon: BarChart3, text: "Proven ROI" }
  ];

  const testimonials = [
    {
      name: "Jennifer Wu",
      role: "COO, DataDriven Inc",
      text: "The consultation team mapped our entire customer journey and found 3 automation opportunities worth $200K in annual savings."
    },
    {
      name: "Carlos Mendez",
      role: "Founder, ServiceNow Solutions",
      text: "We were overwhelmed by AI options. The consultation team gave us a clear, actionable plan that we implemented in 2 weeks."
    },
    {
      name: "Nina Kowalski",
      role: "VP Ops, RetailPlus",
      text: "The ROI projections were spot-on. We hit our targets within the first month of implementation."
    }
  ];

  const features = [
    {
      icon: Brain,
      title: "AI Readiness Assessment",
      description: "Comprehensive audit of your business processes to identify the highest-impact AI opportunities."
    },
    {
      icon: Zap,
      title: "Custom Implementation Plan",
      description: "Step-by-step roadmap with timelines, budgets, and expected outcomes for your specific use case."
    },
    {
      icon: DollarSign,
      title: "ROI Projections",
      description: "Data-driven financial projections showing cost savings, revenue increases, and payback period."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>AI Consultation | Expert AI Strategy & Implementation Planning</title>
        <meta name="description" content="Expert AI consultation with custom implementation plans, ROI projections, and AI readiness assessments. Free discovery call included." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <div className="animate-fade-in">
              <Badge variant="secondary" className="mb-6">Expert Consultation</Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                AI Consultation
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Not sure where to start with AI? Our expert consultants assess your business, identify opportunities, and create a custom implementation plan with clear ROI.
              </p>
              <div className="flex flex-col sm:flex gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-4" asChild>
                  <Link to="/demo">
                    Book Free Consultation
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4">What's Included</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">A comprehensive consultation experience designed to give you clarity and confidence in your AI strategy.</p>
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Consultation Results</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="pt-6">
                    <div className="flex gap-1 mb-4">
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Discover Your AI Potential?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Book your free discovery call today and get a custom AI strategy with ROI projections.</p>
              <div className="flex flex-col sm:flex gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-4" asChild>
                  <Link to="/demo">Book Free Consultation</Link>
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
