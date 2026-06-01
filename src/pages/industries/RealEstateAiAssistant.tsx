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
        <title>Real Estate AI Assistant | Automated Showings & Lead Qualifiers</title>
        <meta name="description" content="Boost agent productivity with custom real estate AI assistants. Automatically qualify active buyers, manage property inquiries 24/7, and schedule showings." />
        <meta name="keywords" content="real estate AI assistant, property showings coordinator bot, MLS voice integration, lead qualifying bot real estate, virtual agent assistant" />
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:title" content="Real Estate AI Assistant | Automated Showings & Lead Qualifiers" />
        <meta property="og:description" content="Capture 100% of incoming leads 24/7. Handle property inquiries, MLS data queries, showing calendars, and CRM syncing automatically." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://theaicall.pro/uploads/logo-96.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Real Estate AI Answering & Showing Assistant" />
        <meta name="twitter:description" content="Bridge MLS listings and active showing schedules with low-latency custom conversational agents." />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Real Estate AI Assistant Solutions",
            "description": "Bespoke AI voice agents managing property inquiry logs, outbound lead qualification, and automated showing calendar updates.",
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
                <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border border-primary/20">
                  Real Estate AI Solution
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent leading-tight">
                  Real Estate AI Assistant
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Never miss an inbound listing lead. Instantly resolve property inquiries, coordinate showing calendars, and log qualified buyer needs to your CRM 24/7.
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
              <div className="animate-fade-in relative group rounded-2xl overflow-hidden shadow-2xl border border-foreground/[0.06]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
                <img
                  src={heroImg}
                  alt="Luxury real estate property optimized for showings scheduled by custom voice AI agent"
                  className="w-full object-cover aspect-video hover:scale-[1.02] transition-transform duration-700"
                  width={1280}
                  height={720}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-card/10 border-y border-foreground/[0.04]">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                AI Features for Real Estate
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Purpose-built AI capabilities designed specifically for high-performing real estate teams and brokerage offices.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-border hover:border-primary/50 transition-colors bg-card/30">
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed text-muted-foreground">
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
                  Close More Listing Deals Faster
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Maximize transaction volume by qualifying every buyer immediately, scheduling bookings, and notifying key agents.
                </p>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                      <span className="text-lg font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative group rounded-2xl overflow-hidden shadow-xl border border-foreground/[0.06]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
                <img
                  src={aiPhoneImg}
                  alt="High-performance real estate AI voice assistant showing virtual property listing on a smartphone app interface"
                  className="w-full object-cover aspect-square hover:scale-[1.02] transition-transform duration-700"
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
                alt="Happy home buyers successfully closing property transaction coordinated by real estate voice assistant"
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