import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Phone, ArrowRight, Smartphone, Mic, Globe, Users, Clock, Zap } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import integrationHeroImg from '@/assets/lead-qualification-hero.jpg';

export default function AiPhoneIntegration() {
  const canonical = getCanonicalUrl('/services/ai-phone-integration');

  const benefits = [
    {
      icon: Smartphone,
      title: "Seamless Phone Integration",
      description: "Connect AI voice capabilities to your existing phone system, CRM, and communication tools."
    },
    {
      icon: Globe,
      title: "Multi-Channel Presence",
      description: "Unified voice, SMS, and web chat experience across all customer touchpoints."
    },
    {
      icon: Phone,
      title: "Custom Voice Design",
      description: "Bespoke voice profiles, brand-aligned personality, and custom call flows for your business."
    },
    {
      icon: Zap,
      title: "Instant Deployment",
      description: "Go from consultation to production in days, not months, with our rapid integration framework."
    }
  ];

  const features = [
    {
      title: "Telephony Integration",
      description: "Native integration with Twilio, Plivo, Vonage, and SIP-based phone systems.",
      items: ["Twilio SIP trunking", "Plivo number provisioning", "Vonage API connectivity", "Custom PBX integration"]
    },
    {
      title: "CRM & Data Sync",
      description: "Two-way sync with your CRM for real-time lead capture and customer data enrichment.",
      items: ["Salesforce Lightning", "HubSpot workflows", "Pipedrive automations", "Custom API webhooks"]
    },
    {
      title: "Intelligent Routing",
      description: "Smart call routing based on caller history, intent, and agent availability.",
      items: ["Skill-based routing", "Priority caller queuing", "Overflow handling", "After-hours routing"]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>AI Phone Integration | Custom Voice AI Phone System Setup</title>
        <meta name="description" content="Custom AI phone integration connecting voice AI to your existing phone system, CRM, and workflows. Rapid deployment with custom voice profiles." />
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
                  AI Integration Service
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  AI Phone Integration
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Transform your existing phone system with AI-powered voice capabilities. Custom integration that works with your current technology stack.
                </p>
                <div className="flex flex-col sm:flex gap-4">
                  <Button size="lg" className="text-lg px-8 py-4" asChild>
                    <Link to="/demo">
                      See Demo
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 py--4" asChild>
                    <Link to="/contact">Contact Sales</Link>
                  </Button>
                </div>
              </div>
              <div className="animate-fade-in">
                <img
                  src={integrationHeroImg}
                  alt="AI phone integration dashboard"
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
                Seamless Integration, Powerful Results
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our integration service connects AI voice to your existing infrastructure for maximum impact.
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
                Integration Capabilities
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                From telephony systems to CRMs, we connect your AI voice to everything that matters.
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
                  Ready to Transform Your Phone System?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Go from traditional phone to AI-powered voice in days with our rapid integration framework.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
