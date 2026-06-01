import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users, Phone, Target, Zap, BarChart3, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import leadHeroImg from '@/assets/lead-qualification-hero.jpg';

export default function AiVoiceAgentsLeadQualification() {
  const canonical = getCanonicalUrl('/services/ai-voice-agents-lead-qualification');

  const benefits = [
    {
      icon: Target,
      title: "Intelligent Lead Scoring",
      description: "AI agents evaluate leads based on custom criteria and automatically prioritize high-quality prospects."
    },
    {
      icon: Zap,
      title: "Real-time Engagement",
      description: "Connect with prospects instantly while they're hot, increasing conversion rates by up to 300%."
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Detailed insights and reporting on lead quality, conversion rates, and agent performance."
    },
    {
      icon: Clock,
      title: "24/7 Lead Capture",
      description: "Never miss a potential customer with round-the-clock lead qualification and follow-up."
    }
  ];

  const features = [
    {
      title: "Smart Qualification Logic",
      description: "Customizable qualifying questions and scoring algorithms tailored to your business needs",
      items: ["Budget qualification", "Decision-maker identification", "Timeline assessment", "Need evaluation"]
    },
    {
      title: "CRM Integration",
      description: "Seamlessly integrates with popular CRM platforms for automatic lead management",
      items: ["Salesforce integration", "HubSpot connectivity", "Pipedrive sync", "Custom API endpoints"]
    },
    {
      title: "Natural Conversations",
      description: "Human-like interactions that build rapport and gather essential qualification data",
      items: ["Natural language processing", "Contextual responses", "Personality matching", "Objection handling"]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>AI Voice Agents for Lead Qualification | Automate Sales Prospecting</title>
        <meta name="description" content="Automate lead qualification with AI voice agents. Intelligent lead scoring, real-time prospect engagement, and seamless CRM integration for better sales results." />
        <meta name="keywords" content="AI voice agents, lead qualification, sales automation, prospect engagement, lead scoring, CRM integration" />
        <link rel="canonical" href={canonical} />
        
        <meta property="og:title" content="AI Voice Agents for Lead Qualification | Automate Sales Prospecting" />
        <meta property="og:description" content="Automate lead qualification with AI voice agents. Intelligent lead scoring, real-time prospect engagement, and seamless CRM integration for better sales results." />
        <meta property="og:type" content="service" />
        <meta property="og:url" content={canonical} />
      </Helmet>
      
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-32 pb-16 sm:pt-40 sm:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                AI Voice Agents for Lead Qualification
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Transform your sales process with intelligent AI voice agents that qualify leads, engage prospects, 
                and boost your conversion rates 24/7. Never lose another potential customer again.
              </p>
              <div className="flex gap-4">
                <Button asChild size="lg">
                  <Link to="/demo">Schedule Demo</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img src={leadHeroImg} alt="AI voice agent qualifying leads with holographic data" className="w-full object-cover aspect-video" width={1280} height={720} />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <header className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why AI Lead Qualification?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Automate your lead qualification process and focus your sales team on closing deals, not chasing unqualified prospects.
              </p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, i) => (
                <Card key={i} className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <header className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Advanced Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive lead qualification capabilities designed for modern sales teams.
              </p>
            </header>

            <div className="grid lg:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <header className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Simple setup, powerful results in three easy steps.
              </p>
            </header>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Setup & Configure",
                  description: "Define your qualification criteria, connect your CRM, and customize conversation flows."
                },
                {
                  step: "2",
                  title: "AI Agent Engages",
                  description: "Our AI voice agents call leads, conduct natural conversations, and gather qualification data."
                },
                {
                  step: "3",
                  title: "Qualified Leads Delivered",
                  description: "Receive scored, qualified leads directly in your CRM with detailed conversation summaries."
                }
              ].map((step, i) => (
                <Card key={i} className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                      {step.step}
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-card rounded-lg p-8 text-center border">
              <h2 className="text-3xl font-bold mb-4">Ready to Qualify More Leads?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                See how AI voice agents can transform your lead qualification process and boost your sales performance.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/demo" className="flex items-center gap-2">
                    Schedule Demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
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