import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Phone, Calendar, Zap, Users, Clock, Headphones } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import onboardingHeroImg from '@/assets/appointment-booking-hero.jpg';

export default function VoiceAIOnboarding() {
  const canonical = getCanonicalUrl('/services/voice-ai-onboarding');

  const benefits = [
    {
      icon: Phone,
      title: "Guided Setup",
      description: "Step-by-step onboarding with dedicated specialists to configure your AI voice system."
    },
    {
      icon: Calendar,
      title: "Rapid Deployment",
      description: "Go from kickoff to live production in as little as 48 hours with our streamlined process."
    },
    {
      icon: Headphones,
      title: "Training & Support",
      description: "Complete team training on managing, monitoring, and optimizing your AI voice agents."
    },
    {
      icon: Zap,
      title: "Continuous Optimization",
      description: "Ongoing performance monitoring and AI refinement to maximize results over time."
    }
  ];

  const features = [
    {
      title: "Discovery & Configuration",
      description: "Deep dive into your requirements, brand voice, and call flows to configure your AI perfectly.",
      items: ["Requirements workshop", "Brand voice calibration", "Call flow design", "Integration configuration"]
    },
    {
      title: "Testing & Validation",
      description: "Rigorous testing across scenarios before going live to ensure quality and accuracy.",
      items: ["Scenario testing", "Voice quality validation", "CRM integration verification", "Performance benchmarking"]
    },
    {
      title: "Launch & Handover",
      description: "Smooth launch with monitoring, team training, and documentation for long-term success.",
      items: ["Go-live monitoring", "Team training sessions", "Admin documentation", "Optimization roadmap"]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Voice AI Onboarding | Rapid AI Voice System Setup & Training</title>
        <meta name="description" content="Complete Voice AI onboarding with guided setup, rapid deployment in 48 hours, team training, and continuous optimization support." />
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
                  Onboarding Service
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Voice AI Onboarding
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Seamless onboarding from kickoff to live production. Our dedicated specialists ensure your AI voice system is configured, tested, and optimized perfectly.
                </p>
                <div className="flex flex-col sm:flex gap-4">
                  <Button size="lg" className="text-lg px-8 py-4" asChild>
                    <Link to="/demo">
                      See Demo
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
                  src={onboardingHeroImg}
                  alt="Voice AI onboarding process"
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
                Frictionless Onboarding
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                From first call to full deployment, we handle everything so you can focus on results.
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
                Onboarding Process
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Three structured phases ensure your AI voice system is deployed flawlessly.
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
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Begin your Voice AI journey today. Our onboarding team will guide you every step of the way.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="text-lg px-8 py-4" asChild>
                    <Link to="/demo">
                      Start Onboarding
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
