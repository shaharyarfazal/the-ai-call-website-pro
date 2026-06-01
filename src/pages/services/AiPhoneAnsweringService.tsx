import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Phone, Clock, Shield, Users, MessageSquare, ArrowRight, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import heroImg from '@/assets/hero-ai-phone.jpg';

export default function AiPhoneAnsweringService() {
  const canonical = getCanonicalUrl('/services/ai-phone-answering-service');

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>24/7 AI Phone Answering Service | Custom Voice Receptionist USA</title>
        <meta name="description" content="Professional custom-built AI phone answering service with human-like conversation latency. Achieve 24/7 coverage, CRM logging, and instant booking." />
        <meta name="keywords" content="AI phone answering service, AI voice receptionist, 24/7 phone automation, virtual AI receptionist, clinical AI answering bot" />
        <link rel="canonical" href={canonical} />
        
        <meta property="og:title" content="24/7 AI Phone Answering Service | Custom Voice Receptionist" />
        <meta property="og:description" content="Professional custom-built AI phone answering service with human-like conversation latency. Achieve 24/7 coverage, CRM logging, and instant booking." />
        <meta property="og:type" content="service" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://theaicall.pro/uploads/logo-96.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="24/7 AI Phone Answering Service" />
        <meta name="twitter:description" content="Scale your phone operations with custom voice agents. Instant answers, CRM syncing, and smart booking." />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "AI Phone Answering Service",
            "description": "High-performance custom AI voice receptionist and automated calling service with sub-second latency.",
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
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-32 pb-16 sm:pt-40 sm:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                24/7 AI Phone Answering Service
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Never miss another important call. Our AI phone answering service provides professional, 
                human-like conversations with 24/7 availability, call routing, and message taking.
              </p>
              <div className="flex gap-4">
                <Button asChild size="lg">
                  <Link to="/demo">Start Free Trial</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img src={heroImg} alt="Professional using AI phone answering service" className="w-full h-full object-cover aspect-video" width={1280} height={720} />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <header className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Professional Call Handling</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every call is handled with the professionalism your business deserves.
              </p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Clock,
                  title: "24/7 Availability",
                  description: "Round-the-clock coverage ensures no call goes unanswered, even outside business hours."
                },
                {
                  icon: MessageSquare,
                  title: "Human-like Conversations",
                  description: "Natural, professional interactions that represent your brand with excellence."
                },
                {
                  icon: Shield,
                  title: "Call Routing & Transfer",
                  description: "Intelligent call routing to the right person or department based on caller needs."
                },
                {
                  icon: Users,
                  title: "Message Taking",
                  description: "Detailed message capture with instant delivery via email or text notification."
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
                <h2 className="text-3xl font-bold mb-6">Why Choose AI Phone Answering?</h2>
                <div className="space-y-4">
                  {[
                    "Reduce missed calls by 100% with 24/7 coverage",
                    "Save up to 60% compared to traditional answering services",
                    "Improve customer satisfaction with instant response",
                    "Scale effortlessly during busy periods",
                    "Maintain professional image at all times",
                    "Get detailed call analytics and reporting"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">60%</div>
                  <div className="text-lg font-medium mb-4">Cost Savings</div>
                  <p className="text-muted-foreground">
                    Average savings compared to traditional answering services while providing superior coverage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="bg-card rounded-lg p-8 text-center border">
              <h2 className="text-3xl font-bold mb-4">Ready to Never Miss Another Call?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Start your free trial today and experience the difference professional AI phone answering can make.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/demo" className="flex items-center gap-2">
                    Start Free Trial
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