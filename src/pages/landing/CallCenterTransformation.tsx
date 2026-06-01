import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Phone, Headphones, TrendingUp, Shield, Star, Users, Clock, Zap, BarChart3 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import callCenterTransformImg from '@/assets/call-center-hero.jpg';

export default function CallCenterTransformation() {
  const canonical = getCanonicalUrl('/landing/call-center-transformation');

  const trustBadges = [
    { icon: Shield, text: "HIPAA Compliant" },
    { icon: Clock, text: "Sub-second Response" },
    { icon: Headphones, text: "24/7 Availability" },
    { icon: TrendingUp, text: "94% Satisfaction Rate" }
  ];

  const testimonials = [
    {
      name: "Robert Kim",
      role: "VP Customer Experience, TelecomCorp",
      text: "Our call center costs dropped 45% while customer satisfaction went up. The AI handles our most repetitive calls flawlessly."
    },
    {
      name: "Maria Santos",
      role: "Operations Director, FinanceFirst",
      text: "We went from 35-minute wait times to under 30 seconds. Our agents are happier and more productive than ever."
    },
    {
      name: "James Wilson",
      role: "CTO, RetailMax",
      text: "During holiday season, the AI handled 10x our normal volume without breaking a sweat. No hiring needed."
    }
  ];

  const features = [
    {
      icon: Phone,
      title: "Intelligent Call Routing",
      description: "AI understands caller intent and routes to the right agent or resolves issues instantly."
    },
    {
      icon: Headphones,
      title: "Automated Call Handling",
      description: "AI agents handle balance inquiries, order status, and appointment scheduling 24/7."
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Live dashboards show call metrics, sentiment, and conversion rates in real-time."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Call Center Transformation | AI-Powered Contact Center Solutions</title>
        <meta name="description" content="Transform your call center with AI. Reduce costs by 45%, eliminate wait times, and boost satisfaction. HIPAA-compliant, 24/7, and proven results." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <div className="animate-fade-in">
              <Badge variant="secondary" className="mb-6">Contact Center Solution</Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Call Center Transformation
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Replace overwhelmed call centers with intelligent AI agents. Reduce costs, eliminate wait times, and delight customers 24/7.
              </p>
              <div className="flex flex-col sm:flex gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-4" asChild>
                  <Link to="/demo">
                    See Results
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

        {/* Trust Badges */}
        <section className="py-12 px-4 bg-card/30">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center justify-center gap-3">
                  <badge.icon className="h-6 w-6 text-primary" />
                  <span className="font-medium">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Transform Your Contact Center</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Everything you need to modernize your customer service operations.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-border hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="mb-4">{React.createElement(feature.icon, { className: "h-8 w-8 text-primary" })}</div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 bg-card/30">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Clients Say</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="pt-6">
                    <div className="flex gap-1 mb-4">
                      {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}
                    </div>
                    <p className="text-lg mb-4 italic">"{t.text}"</p>
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-muted-foreground">{t.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing CTA */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-12 rounded-2xl border border-primary/20">
              <Zap className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Call Center?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">See how much you can save with our ROI calculator. Free consultation included.</p>
              <div className="flex flex-col sm:flex gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-4" asChild>
                  <Link to="/demo">Get Started</Link>
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
