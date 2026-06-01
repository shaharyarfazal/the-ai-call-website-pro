import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Phone, ArrowRight, Target, Users, Clock, Zap } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import consultingHeroImg from '@/assets/services-hero.jpg';

export default function VoiceAIConsultation() {
  const canonical = getCanonicalUrl('/services/voice-ai-consultation');

  const benefits = [
    {
      icon: Target,
      title: " Voice AI Readiness Assessment",
      description: "Comprehensive analysis of your business to determine where voice AI can deliver the highest ROI."
    },
    {
      icon: Phone,
      title: "Custom Solution Architecture",
      description: "Tailored voice AI architecture design that aligns with your specific business goals and workflows."
    },
    {
      icon: Users,
      title: "Cross-Functional Strategy",
      description: "Align marketing, sales, and customer service strategies with a unified voice AI vision."
    },
    {
      icon: Zap,
      title: "Rapid Implementation Roadmap",
      description: "Prioritized rollout plan with clear milestones, budgets, and expected outcomes."
    }
  ];

  const features = [
    {
      title: "Current State Audit",
      description: "Deep dive into your existing call center, customer interactions, and pain points.",
      items: ["Call volume analysis", "Customer journey mapping", "Technology stack review", "Competitive benchmarking"]
    },
    {
      title: "ROI Projection",
      description: "Data-driven projections showing expected cost savings, revenue increases, and efficiency gains.",
      items: ["Cost-per-call analysis", "Conversion lift modeling", "Operational savings forecast", "Revenue attribution model"]
    },
    {
      title: "Vendor Evaluation",
      description: "Objective assessment of voice AI platforms and integration partners for your stack.",
      items: ["Platform comparison", "Technical fit analysis", "Security assessment", "Total cost of ownership"]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Voice AI Consultation | Expert Strategy & ROI Planning for Voice AI</title>
        <meta name="description" content="Expert Voice AI consultation to assess your readiness, design custom solutions, and build a strategic roadmap with projected ROI. Talk to our specialists today." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <Badge variant="secondary" className="mb-6">
                  Strategic Consultation
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Voice AI Consultation
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Before investing in voice AI, get expert guidance on the right strategy, ROI, and implementation roadmap tailored to your business.
                </p>
                <div className="flex flex-col sm:flex gap-4">
                  <Button size="lg" className="text-lg px-8 py-4" asChild>
                    <Link to="/demo">
                      Book Consultation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                    <Link to="/contact">Contact Sales</Link>
                  </Button>
                </div>
              </div>
              <div className="animate-fade-in">
                <img
                  src={consultingHeroImg}
                  alt="Voice AI consultation session"
                  className="rounded-2xl shadow-2xl w-full object-cover aspect-video"
                  width={1280}
                  height={720}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 bg-card/30">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Why Start with Consultation?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our consultation process ensures you invest in the right voice AI solution with clear ROI projections.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-border hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="mb-4">{React.createElement(benefit.icon, { className: "h-8 w-8 text-primary" })}</div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Features */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                What's Included
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A comprehensive assessment and strategy package designed to de-risk your voice AI investment.
              </p>
            </div>
            <div className="space-y-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-border hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-lg mb-4 leading-relaxed">{feature.description}</CardDescription>
                    <div className="grid md:grid-cols-2 gap-4">
                      {feature.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="relative rounded-2xl overflow-hidden border border-primary/20">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5" />
              <div className="relative p-12 text-center">
                <Zap className="h-16 w-16 text-primary mx-auto mb-6" />
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Explore Voice AI for Your Business?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Schedule a free 30-minute consultation and get a personalized voice AI strategy with ROI projections.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
