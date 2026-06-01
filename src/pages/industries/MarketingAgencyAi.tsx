import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Target, Users, BarChart3, Phone, Calendar, Zap, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import marketingHeroImg from '@/assets/marketing-hero.jpg';

export default function MarketingAgencyAi() {
  const canonical = getCanonicalUrl('/industries/marketing-agency-ai');

  const features = [
    {
      icon: <Target className="h-6 w-6 text-primary" />,
      title: "Lead Qualification",
      description: "Automatically qualify leads and route them to the right team members"
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Client Communication",
      description: "Handle client inquiries and provide project updates professionally"
    },
    {
      icon: <Calendar className="h-6 w-6 text-primary" />,
      title: "Meeting Scheduling",
      description: "Automatically schedule consultations and client meetings"
    }
  ];

  const benefits = [
    "Qualify 10x more leads with AI automation",
    "Improve client response times by 90%",
    "Free up team time for strategic work",
    "Scale client communication without hiring",
    "Maintain consistent brand voice",
    "Integrate with existing CRM systems"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Marketing Agency AI | Automated Lead Qualification & Client Communication</title>
        <meta name="description" content="Scale your marketing agency with AI automation. Qualify leads, handle client communications, and schedule meetings 24/7 while focusing on strategy." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center animate-fade-in">
              <Badge variant="secondary" className="mb-6">
                Marketing Agency Solution
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Marketing Agency AI
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Scale your agency with intelligent lead qualification, client communication, and automated scheduling. Focus on strategy while AI handles operations.
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
        <section className="py-20 px-4 bg-card/30">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                AI Tools for Marketing Agencies
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Specialized AI capabilities designed to scale your agency operations.
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
                  Scale Your Agency Operations
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Handle more leads, improve client satisfaction, and grow your agency without proportional overhead increases.
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
              <div className="space-y-8">
                <img src={marketingHeroImg} alt="Marketing agency workspace with AI analytics" className="rounded-2xl shadow-xl w-full object-cover aspect-video" loading="lazy" width={1280} height={720} />
                <div className="bg-card/50 p-8 rounded-lg border border-border">
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">10x</div>
                    <div className="text-muted-foreground">Lead Processing</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">90%</div>
                    <div className="text-muted-foreground">Faster Response</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-muted-foreground">Availability</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">50%</div>
                    <div className="text-muted-foreground">Cost Savings</div>
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
                Ready to Scale Your Agency?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join successful marketing agencies already using AI to qualify more leads and serve more clients.
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