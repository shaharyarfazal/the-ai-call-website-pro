import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Headphones, BarChart3, Users, Zap, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import callCenterHeroImg from '@/assets/call-center-hero.jpg';

export default function CallCenterAutomation() {
  const canonical = getCanonicalUrl('/services/call-center-automation');

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Call Center Automation & AI Call Handling | Scale Your Operations</title>
        <meta name="description" content="Transform your call center with AI automation. Smart call routing, queue management, performance analytics, and agent assistance for improved efficiency." />
        <meta name="keywords" content="call center automation, AI call handling, smart routing, queue management, call center AI" />
        <link rel="canonical" href={canonical} />
        
        <meta property="og:title" content="Call Center Automation & AI Call Handling | Scale Your Operations" />
        <meta property="og:description" content="Transform your call center with AI automation. Smart call routing, queue management, performance analytics, and agent assistance for improved efficiency." />
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
                Call Center Automation & AI Call Handling
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Transform your call center operations with intelligent AI automation. Reduce wait times, 
                improve customer satisfaction, and scale efficiently with smart call routing and management.
              </p>
              <div className="flex gap-4">
                <Button asChild size="lg">
                  <Link to="/demo">Request Demo</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img src={callCenterHeroImg} alt="AI-powered call center with modern technology" className="w-full object-cover aspect-video" width={1280} height={720} />
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <header className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Advanced Call Center Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive automation tools designed for modern call centers.
              </p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Smart Call Routing",
                  description: "Intelligent routing based on caller intent, agent skills, and availability for optimal matching."
                },
                {
                  icon: Clock,
                  title: "Queue Management",
                  description: "Dynamic queue prioritization and wait time optimization to improve customer experience."
                },
                {
                  icon: BarChart3,
                  title: "Performance Analytics",
                  description: "Real-time dashboards and detailed reporting on call metrics, agent performance, and efficiency."
                },
                {
                  icon: Users,
                  title: "Agent Assistance",
                  description: "AI-powered support tools to help agents handle calls more effectively and efficiently."
                }
              ].map((feature, i) => (
                <Card key={i} className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Transform Your Call Center Operations</h2>
                <div className="space-y-4">
                  {[
                    "Reduce average wait times by up to 70%",
                    "Increase first-call resolution rates by 40%",
                    "Improve agent productivity by 50%",
                    "Lower operational costs by 35%",
                    "Enhance customer satisfaction scores",
                    "Scale operations without proportional staffing increases"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">70%</div>
                    <div className="font-medium">Faster Response</div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Average reduction in customer wait times
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">50%</div>
                    <div className="font-medium">Higher Productivity</div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Improvement in agent efficiency
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <header className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Seamless integration with your existing call center infrastructure.
              </p>
            </header>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Integration & Setup",
                  description: "Connect with your existing phone system and configure routing rules and automation workflows."
                },
                {
                  step: "2",
                  title: "AI Processing",
                  description: "AI analyzes incoming calls, determines intent, and routes to the most appropriate agent or automated solution."
                },
                {
                  step: "3",
                  title: "Continuous Optimization",
                  description: "System learns from interactions and continuously improves routing decisions and performance."
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
              <h2 className="text-3xl font-bold mb-4">Ready to Automate Your Call Center?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover how AI automation can transform your call center operations and improve customer satisfaction.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/demo" className="flex items-center gap-2">
                    Request Demo
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