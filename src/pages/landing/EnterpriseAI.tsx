import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Building2, Shield, TrendingUp, Star, Users, Zap, BarChart3, Lock, Globe } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import enterpriseAIImg from '@/assets/automate-hero.jpg';

export default function EnterpriseAI() {
  const canonical = getCanonicalUrl('/landing/enterprise-ai');

  const trustBadges = [
    { icon: Shield, text: "SOC 2 Certified" },
    { icon: Lock, text: "Enterprise Security" },
    { icon: Globe, text: "Global Deployment" },
    { icon: BarChart3, text: "Custom SLAs" }
  ];

  const testimonials = [
    {
      name: "David Park",
      role: "CTO, EnterpriseGlobal",
      text: "The enterprise AI platform handled our global call volume across 12 languages seamlessly. Best technology investment we've made."
    },
    {
      name: "Lisa Chang",
      role: "VP Digital, Fortune 500 Corp",
      text: "Integration was effortless. Our existing systems work together with the AI platform without any disruption."
    },
    {
      name: "Ahmed Hassan",
      role: "Director IT, MegaBank",
      text: "Security and compliance were our top concerns. This platform exceeded every requirement while delivering real results."
    }
  ];

  const features = [
    {
      icon: Building2,
      title: "Enterprise Architecture",
      description: "Built for large-scale deployments with custom infrastructure, dedicated support, and SLA guarantees."
    },
    {
      icon: Shield,
      title: "Advanced Security",
      description: "SOC 2 Type II, HIPAA, GDPR compliance with end-to-end encryption and audit trails."
    },
    {
      icon: TrendingUp,
      title: "Scalable Infrastructure",
      description: "Handle millions of calls simultaneously with auto-scaling infrastructure and zero downtime."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Enterprise AI | Secure AI Voice Platform for Large Organizations</title>
        <meta name="description" content="Enterprise-grade AI voice platform with SOC 2 certification, custom SLAs, and global deployment. Trusted by Fortune 500 companies." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <div className="animate-fade-in">
              <Badge variant="secondary" className="mb-6">Enterprise Platform</Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Enterprise AI
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Mission-critical AI voice platform built for enterprise scale. SOC 2 certified, globally deployable, and backed by dedicated support.
              </p>
              <div className="flex flex-col sm:flex gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-4" asChild>
                  <Link to="/demo">
                    Request Enterprise Info
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Enterprise-Grade Features</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Built for the demands of large organizations with uncompromising reliability and security.</p>
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Enterprise Success Stories</h2>
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Scale Your Enterprise?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Get a custom enterprise proposal with pricing tailored to your needs.</p>
              <div className="flex flex-col sm:flex gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-4" asChild>
                  <Link to="/demo">Request Enterprise Info</Link>
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
