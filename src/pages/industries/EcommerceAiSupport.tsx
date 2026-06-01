import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ShoppingCart, MessageSquare, Clock, Users, BarChart3, Zap, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import ecommerceHeroImg from '@/assets/ecommerce-hero.jpg';

export default function EcommerceAiSupport() {
  const canonical = getCanonicalUrl('/industries/ecommerce-ai-support');

  const features = [
    {
      icon: <ShoppingCart className="h-6 w-6 text-primary" />,
      title: "Order Management",
      description: "Handle order inquiries, tracking, returns, and exchanges automatically"
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      title: "Product Support",
      description: "Answer product questions, provide recommendations, and resolve issues"
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "24/7 Customer Service",
      description: "Provide round-the-clock support without increasing operational costs"
    }
  ];

  const benefits = [
    "Reduce customer service costs by 70%",
    "Handle unlimited concurrent conversations",
    "Improve response times to under 30 seconds",
    "Increase customer satisfaction scores",
    "Scale support without hiring staff",
    "Integrate with existing e-commerce platforms"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>E-commerce AI Customer Support | Automated Online Retail Bot</title>
        <meta name="description" content="Deploy custom AI customer support agents for your e-commerce store. Handle order tracking queries, returns, product details, and billing 24/7." />
        <meta name="keywords" content="e-commerce AI customer support, online retail voice bot, order tracking automation, automated store support, Shopify AI receptionist" />
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:title" content="E-commerce AI Customer Support | Automated Online Retail Bot" />
        <meta property="og:description" content="Deploy custom AI customer support agents for your e-commerce store. Handle order tracking queries, returns, product details, and billing 24/7." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://theaicall.pro/uploads/logo-96.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="E-commerce AI Answering & Support Agent" />
        <meta name="twitter:description" content="Cut online store customer care costs by 70% with intelligent concurrent dialog systems." />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "E-commerce AI Support Solutions",
            "description": "High-performance custom automated conversational bots managing order tracking, refund requests, and product queries for e-commerce checkouts.",
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
            <div className="text-center animate-fade-in">
              <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border border-primary/20">
                E-commerce AI Solution
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent leading-tight">
                E-commerce AI Support
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Automate order tracking, processing, and buyer support for your online store. Handle checkouts, shipping questions, and product inquiries 24/7 with zero human overhead.
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
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-card/10 border-y border-foreground/[0.04]">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                E-commerce AI Features
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Specialized AI capabilities designed for online retail customer support and purchase flow optimization.
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
                  Scale Your Customer Support
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Handle infinite concurrent customer questions, drop response times, and elevate shopper satisfaction scores instantly.
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
              <div className="space-y-8 animate-fade-in">
                <div className="relative group rounded-2xl overflow-hidden shadow-2xl border border-foreground/[0.06]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
                  <img 
                    src={ecommerceHeroImg} 
                    alt="Intelligent e-commerce customer support AI answering shipping queries on a laptop dashboard" 
                    className="w-full object-cover aspect-video hover:scale-[1.02] transition-transform duration-700" 
                    loading="lazy" 
                    width={1280} 
                    height={720} 
                  />
                </div>  <div className="bg-card/50 p-8 rounded-lg border border-border">
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">70%</div>
                    <div className="text-muted-foreground">Cost Reduction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-muted-foreground">Availability</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">30s</div>
                    <div className="text-muted-foreground">Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">98%</div>
                    <div className="text-muted-foreground">Resolution Rate</div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-12 rounded-2xl border border-primary/20">
              <Zap className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Automate Your Support?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of e-commerce businesses using AI to provide better customer support at scale.
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
        </section>
      </main>
      
      <Footer />
    </div>
  );
}