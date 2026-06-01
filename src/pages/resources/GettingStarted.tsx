import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, BookOpen, ArrowDown, Brain, Shield, Zap, Clock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import gettingStartedImg from '@/assets/about-team.jpg';

export default function GettingStarted() {
  const canonical = getCanonicalUrl('/resources/getting-started');

  const steps = [
    {
      num: "1",
      icon: BookOpen,
      title: "Understand Your Needs",
      desc: " PDF document that outlines your current call volume, pain points, and business goals."
    },
    {
      num: "2",
      icon: Brain,
      title: "Get Your Custom AI Strategy",
      desc: "Our experts analyze your needs and create a tailored AI voice implementation plan with ROI projections."
    },
    {
      num: "3",
      icon: Shield,
      title: "Setup & Integration",
      desc: "We configure your AI voice system, integrate with your CRM, and set up custom call flows."
    },
    {
      num: "4",
      icon: Zap,
      title: "Go Live & Optimize",
      desc: "Launch your AI voice system and continuously optimize based on performance data and customer feedback."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Getting Started with Voice AI | Step-by-Step Implementation Guide</title>
        <meta name="description" content="Complete guide to implementing Voice AI for your business. From assessment to go-live in simple steps." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Header />
      
      <main className="flex-grow">
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <Badge variant="secondary" className="mb-6">Getting Started</Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Getting Started
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Your step-by-step guide to implementing Voice AI for your business. From understanding your needs to going live with AI voice.
            </p>
          </div>
        </section>

        <section className="py-20 px-4 bg-card/30">
          <div className="container mx-auto max-w-4xl">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6 mb-12 last:mb-0">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="text-2xl">Step {step.num}: {step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">{step.desc}</CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Begin?</h2>
            <p className="text-xl text-muted-foreground mb-8 mx-auto">Schedule a free consultation and get your custom AI voice plan.</p>
            <div className="flex flex-col sm:flex gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/demo">Start Free Consultation</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
