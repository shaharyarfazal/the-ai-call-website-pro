import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ShoppingBag, Phone, MessageSquare, Users, Zap, ArrowRight, Tag, Clock, Store, CreditCard } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import retailHeroImg from '@/assets/marketing-hero.jpg';
import retailPhoneImg from '@/assets/hero-ai-phone.jpg';
import retailClosingImg from '@/assets/about-team.jpg';

export default function RetailAiAssistant() {
  const canonical = getCanonicalUrl('/industries/retail-ai-assistant');

  const features = [
    {
      icon: <ShoppingBag className="h-8 w-8 text-primary" />,
      title: "Product Recommendations",
      description: "AI-powered product suggestions based on customer preferences, purchase history, and browsing behavior."
    },
    {
      icon: <Tag className="h-8 w-8 text-primary" />,
      title: "Promotions & Discounts",
      description: "Automatically communicate current deals, flash sales, and personalized discounts to interested buyers."
    },
    {
      icon: <Phone className="h-8 w-8 text-primary" />,
      title: "24/7 Sales Assistance",
      description: "Never miss a sale opportunity with round-the-clock AI sales support that engages every visitor."
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Order Tracking",
      description: "Real-time order status updates, shipping notifications, and delivery estimates via AI chat."
    },
    {
      icon: <CreditCard className="h-8 w-8 text-primary" />,
      title: "Cart Abandonment Recovery",
      description: "Automatically follow up with customers who abandon their cart with personalized reminders and incentives."
    },
    {
      icon: <Store className="h-8 w-8 text-primary" />,
      title: "Inventory Lookup",
      description: "Instant access to stock levels, alternatives, and warehouse locations for seamless shopping experiences."
    }
  ];

  const benefits = [
    "Increase conversion rates by up to 45%",
    "Reduce cart abandonment by 30%",
    "Handle 10x more customer inquiries simultaneously",
    "Provide personalized recommendations at scale",
    "Cut customer service costs by 60%",
    "Capture lead data for retargeting campaigns"
  ];

  const useCases = [
    {
      title: "E-Commerce Stores",
      description: "Boost online sales with AI product advisors, automated checkout assistance, and personalized shopping experiences.",
      icon: <ShoppingBag className="h-6 w-6 text-primary" />
    },
    {
      title: "Retail Chains",
      description: "Bridge online and offline with AI assistants that help customers find products in-store and online.",
      icon: <Store className="h-6 w-6 text-primary" />
    },
    {
      title: "DTC Brands",
      description: "Elevate direct-to-consumer experience with AI brand ambassadors that embody your brand voice.",
      icon: <Zap className="h-6 w-6 text-primary" />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Retail AI Assistant | Automated Sales & Customer Service for Retail</title>
        <meta name="description" content="Transform your retail business with AI. Automate product recommendations, cart recovery, and 24/7 customer service to increase sales by up to 45%." />
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
                  Retail AI Solution
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Retail AI Assistant
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Turn every visitor into a customer. AI-driven product recommendations, cart recovery, and 24/7 sales support that never sleeps.
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
                  src={retailHeroImg}
                  alt="Modern retail environment with AI technology"
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
                AI Features for Retail
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Purpose-built AI capabilities designed to maximize every sale opportunity in your retail business.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  Boost Revenue Around the Clock
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Retail businesses using our AI assistant see immediate increases in conversions, average order value, and customer satisfaction.
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
                  src={retailPhoneImg}
                  alt="AI retail assistant helping customer on smartphone"
                  className="rounded-2xl shadow-xl w-full object-cover aspect-square"
                  loading="lazy"
                  width={800}
                  height={800}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 px-4 bg-card/30">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Perfect for Every Retail Business
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                From online stores to physical retail chains, our AI adapts to your unique retail environment.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <Card key={index} className="border-border hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="mb-4">{useCase.icon}</div>
                    <CardTitle className="text-xl">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {useCase.description}
                    </CardDescription>
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
              <img
                src={retailClosingImg}
                alt="Happy customer shopping with AI assistance"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
                loading="lazy"
                width={1280}
                height={720}
              />
              <div className="relative bg-gradient-to-r from-background/90 to-background/70 p-12 text-center">
                <Zap className="h-16 w-16 text-primary mx-auto mb-6" />
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Supercharge Your Retail Sales?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of retailers already using AI to increase conversions, reduce costs, and delight customers.
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
