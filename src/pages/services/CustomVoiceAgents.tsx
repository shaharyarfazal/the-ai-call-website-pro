import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Brain, ArrowRight, Users, Phone, Zap, Target, Mic, Headphones } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import agentsHeroImg from '@/assets/services-hero.jpg';

export default function CustomVoiceAgents() {
  const canonical = getCanonicalUrl('/services/custom-voice-agents');

  const benefits = [
    {
      icon: Brain,
      title: "Bespoke AI Personas",
      description: "Custom-trained voice agents with unique personalities tailored to your brand and audience."
    },
    {
      icon: Users,
      title: "Multi-Agent Coordination",
      description: "Orchestrate multiple AI agents working together to handle complex customer journeys."
    },
    {
      icon: Phone,
      title: "Context-Aware Conversations",
      description: "Agents that remember context across calls and provide personalized, coherent interactions."
    },
    {
      icon: Target,
      title: "Goal-Oriented Design",
      description: "Every conversation engineered to achieve specific business outcomes: sales, support, or qualification."
    }
  ];

  const features = [
    {
      title: "Custom Voice Training",
      description: "Train AI agents with your brand guidelines, product knowledge, and tone of voice.",
      items: ["Brand voice modeling", "Product knowledge base", "Objection handling scripts", "Escalation protocols"]
    },
    {
      title: "Agent Swarms",
      description: "Deploy teams of specialized AI agents working in concert for complex workflows.",
      items: ["Dedicated sales agents", "Technical support bots", "Appointment coordinators", "Follow-up specialists"]
    },
    {
      title: "Continuous Learning",
      description: "Agents that improve over time by learning from every interaction and feedback loop.",
      items: ["Conversation analytics", "A/B testing variants", "Performance scoring", "Automated refinement"]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Custom AI Voice Agents Development | Bespoke Conversational Bots</title>
        <meta name="description" content="Design and deploy custom AI voice agents tailored to your brand personality. Implement multi-agent swarms, goal-oriented dialog, and full CRM integrations." />
        <meta name="keywords" content="custom voice agents, bespoke voice AI development, conversational AI swarm, brand voice modeling, custom AI voice bot company" />
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:title" content="Custom AI Voice Agents Development | Bespoke Conversational Bots" />
        <meta property="og:description" content="Design and deploy custom AI voice agents tailored to your brand personality. Implement multi-agent swarms, goal-oriented dialog, and full CRM integrations." />
        <meta property="og:type" content="service" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://theaicall.pro/uploads/logo-96.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Custom AI Voice Agents Development Services" />
        <meta name="twitter:description" content="Engage clients with custom-tuned emotion cues, unique brand cadence, and advanced context tracking." />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Custom AI Voice Agents Development",
            "description": "Bespoke engineering service specializing in custom voice modeling, semantic training, multi-agent orchestration, and complex workflow automation.",
            "provider": {
              "@type": "Organization",
              "name": "The AI Call Pro",
              "url": "https://theaicall.pro"
            },
            "areaServed": "US",
            "hasCredential": "Certified Retell AI Partner"
          })}
        </script>
      </Helmet>
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <Badge variant="secondary" className="mb-6">
                  Custom AI Development
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Custom Voice Agents
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Purpose-built AI voice agents designed to your exact specifications. Custom personalities, multi-agent coordination, and continuous improvement.
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
                  src={agentsHeroImg}
                  alt="Custom voice AI agents in action"
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
                Why Custom Voice Agents?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Off-the-shelf solutions don't fit every business. Our custom agents are built specifically for your needs.
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
                Agent Capabilities
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                From custom voice training to multi-agent orchestration, our agents deliver results.
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
                  Ready to Build Your Custom AI Voice Agents?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Let's design voice agents that embody your brand and deliver exceptional customer experiences.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="text-lg px-8 py-4" asChild>
                    <Link to="/demo">
                      Start Building
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
