import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Phone, Users, Calendar, Workflow, Headphones, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import servicesHeroImg from '@/assets/services-hero.jpg';

export default function Services() {
  const canonical = getCanonicalUrl('/services');
  
  const services = [
    {
      icon: Users,
      title: "AI Voice Agents for Lead Qualification",
      description: "Automate lead qualification with AI voice agents that engage prospects and boost sales efficiency for your business.",
      features: ["Intelligent lead scoring", "Real-time prospect engagement", "Seamless CRM integration", "24/7 availability"],
      url: "/services/ai-voice-agents-lead-qualification",
      cta: "Schedule Demo"
    },
    {
      icon: Phone,
      title: "24/7 AI Phone Answering Service",
      description: "Never miss a call with our AI phone answering service providing human-like conversations and after-hours support.",
      features: ["Human-like conversations", "After-hours coverage", "Call routing & transfer", "Message taking"],
      url: "/services/ai-phone-answering-service",
      cta: "Start Free Trial"
    },
    {
      icon: Headphones,
      title: "Call Center Automation & AI Call Handling",
      description: "Improve call handling efficiency and reduce wait times with AI-powered call center automation solutions.",
      features: ["Smart call routing", "Queue management", "Performance analytics", "Agent assistance"],
      url: "/services/call-center-automation",
      cta: "Request Demo"
    },
    {
      icon: Calendar,
      title: "Automated Appointment Scheduling",
      description: "Streamline your scheduling process with AI-powered automated appointment scheduling tailored for your business.",
      features: ["Calendar integration", "Automatic reminders", "Rescheduling handling", "Timezone management"],
      url: "/services/automated-appointment-scheduling",
      cta: "Book Demo"
    },
    {
      icon: Workflow,
      title: "Workflow & Task Automation",
      description: "Boost productivity with AI-driven workflow and voice-powered task management solutions for SMEs.",
      features: ["Process automation", "Task prioritization", "Team coordination", "Progress tracking"],
      url: "/services/workflow-task-automation",
      cta: "Learn More"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>AI Voice Agents & Phone Answering Services | Complete Business Automation</title>
        <meta name="description" content="Explore our AI voice agents, 24/7 AI phone answering service, call center automation, and workflow automation solutions designed for USA SMEs." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Complete AI Voice Solutions for Your Business</h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
              From lead qualification to customer service, our comprehensive suite of AI voice services automates every aspect of your phone operations.
            </p>
            <div className="flex gap-4 justify-center mt-8">
              <Button asChild size="lg">
                <Link to="/demo">Request Demo</Link>
              </Button>
            </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8">
              {services.map((service, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-8 p-8">
                    <div>
                      <CardHeader className="p-0 mb-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <service.icon className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle className="text-2xl">{service.title}</CardTitle>
                        </div>
                        <p className="text-muted-foreground text-lg">{service.description}</p>
                      </CardHeader>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-3">Key Features:</h4>
                          <ul className="space-y-2">
                            {service.features.map((feature, j) => (
                              <li key={j} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                          <Button asChild>
                            <Link to={service.url} className="flex items-center gap-2">
                              {service.cta}
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg overflow-hidden">
                      <img src={servicesHeroImg} alt="AI voice solutions suite" className="w-full h-full object-cover aspect-video rounded-lg" loading="lazy" width={1280} height={720} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <header className="text-center mb-12">
              <h2 className="text-3xl font-bold">Why Choose Our AI Voice Solutions?</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Comprehensive automation that scales with your business
              </p>
            </header>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Seamless Integration",
                  description: "Connect with your existing CRM, calendar, and business tools",
                  benefit: "No disruption to current workflows"
                },
                {
                  title: "Scalable Solutions",
                  description: "From small businesses to enterprise call centers",
                  benefit: "Grows with your business needs"
                },
                {
                  title: "Proven ROI",
                  description: "Average 60% reduction in operational costs",
                  benefit: "Measurable business impact"
                }
              ].map((benefit, i) => (
                <Card key={i} className="text-center">
                  <CardHeader>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{benefit.description}</p>
                    <p className="text-sm font-medium text-primary">{benefit.benefit}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="bg-card rounded-lg p-8 text-center border">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business Operations?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover how our AI voice solutions can automate your customer interactions and boost productivity.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/demo">Request Demo</Link>
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