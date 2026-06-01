import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Home, Calendar, Phone, MessageSquare, Users, Zap, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import heroImg from '@/assets/real-estate-hero.jpg';
import aiPhoneImg from '@/assets/real-estate-ai-phone.jpg';
import closingImg from '@/assets/real-estate-closing.jpg';

export default function RealEstateAiAssistant() {
  const canonical = getCanonicalUrl('/industries/real-estate-ai-assistant');

  const features = [
    {
      icon: <Home className="h-6 w-6 text-primary" />,
      title: "Property Inquiries",
      description: "Handle property questions, provide details, and schedule viewings automatically"
    },
    {
      icon: <Calendar className="h-6 w-6 text-primary" />,
      title: "Showing Scheduling",
      description: "Automatically schedule property showings and send confirmations to all parties"
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      title: "Lead Qualification",
      description: "Qualify potential buyers and sellers, capturing key information for follow-up"
    }
  ];

  const benefits = [
    "Capture 100% of leads 24/7",
    "Schedule 5x more property showings",
    "Reduce response time to under 2 minutes",
    "Qualify leads automatically",
    "Never miss a potential client call",
    "Integrate with MLS and CRM systems"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Real Estate AI Assistant | Automated Property Inquiries & Lead Management</title>
        <meta name="description" content="Transform your real estate business with AI. Handle property inquiries, schedule showings, and qualify leads 24/7 to never miss an opportunity." />
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
                  Real Estate AI Solution
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Real Estate AI Assistant
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Never miss a lead again. Handle property inquiries, schedule showings, and qualify prospects 24/7 with your intelligent real estate assistant.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
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
                  src={heroImg}
                  alt="Modern luxury property at golden hour"
                  className="rounded-2xl shadow-2xl w-full object-cover aspect-video"
                  width={1280}
                  height={720}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-card/30">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                AI Features for Real Estate
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Purpose-built AI capabilities designed specifically for real estate professionals.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-border hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Close More Deals Faster
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Convert more leads into clients with instant response times and 24/7 availability.
                </p>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                      <span className="text-lg">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <img
                  src={aiPhoneImg}
                  alt="AI assistant on smartphone showing property listings"
                  className="rounded-2xl shadow-xl w-full object-cover aspect-square"
                  loading="lazy"
                  width={800}
                  height={800}
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="relative rounded-2xl overflow-hidden border border-primary/20">
              <img
                src={closingImg}
                alt="Real estate agent closing a deal with happy clients"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
                loading="lazy"
                width={1280}
                height={720}
              />
              <div className="relative bg-gradient-to-r from-background/90 to-background/70 p-12 text-center">
                <Zap className="h-16 w-16 text-primary mx-auto mb-6" />
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Transform Your Real Estate Business?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join top-performing real estate agents and agencies already using AI to capture more leads and close more deals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="text-lg px-8 py-4" asChild>
                    <Link to="/demo">
                      Schedule Demo
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