import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, FileSearch, TrendingUp, Users, Zap, BarChart3, Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import auditHeroImg from '@/assets/analytics-dashboard-hero.jpg';

export default function AIAutomationAudit() {
  const canonical = getCanonicalUrl('/services/ai-automation-audit');

  const benefits = [
    {
      icon: FileSearch,
      title: "Process Discovery",
      description: "Comprehensive mapping of all customer interactions and internal processes for automation opportunities."
    },
    {
      icon: TrendingUp,
      title: "ROI Prioritization",
      description: "Data-driven ranking of automation opportunities by implementation complexity and business impact."
    },
    {
      icon: BarChart3,
      title: "Performance Baseline",
      description: "Establish current metrics to measure improvement after AI implementation."
    },
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "Identify potential integration risks, compliance concerns, and change management challenges."
    }
  ];

  const features = [
    {
      title: "Call Center Analysis",
      description: "Deep analysis of call volumes, types, durations, and resolution rates.",
      items: ["Call type classification", "Average handling time", "First-call resolution rate", "Customer satisfaction trends"]
    },
    {
      title: "Customer Journey Mapping",
      description: "End-to-end mapping of customer touchpoints to identify AI automation opportunities.",
      items: ["Touchpoint inventory", "Pain point identification", "Conversion gap analysis", "Abandonment point mapping"]
    },
    {
      title: "Implementation Roadmap",
      description: "Prioritized recommendations with timelines, costs, and expected outcomes.",
      items: ["Quick wins identification", "Phased rollout plan", "Budget estimation", "Success metrics definition"]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>AI Automation Audit | Comprehensive AI Readiness Assessment</title>
        <meta name="description" content="Comprehensive AI automation audit mapping your business processes, ROI opportunities, and implementation roadmap. Discover where AI delivers the most value." />
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
                  Strategic Audit
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  AI Automation Audit
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Discover exactly where AI automation can transform your business. Our comprehensive audit identifies high-ROI opportunities and provides a prioritized implementation roadmap.
                </p>
                <div className="flex flex-col sm:flex gap-4">
                  <Button size="lg" className="text-lg px-8 py-4" asChild>
                    <Link to="/demo">
                      Start Audit
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
                  src={auditHeroImg}
                  alt="AI automation audit dashboard"
                  className="rounded-2xl shadow-2xl w-full object-cover aspect-video"
                  width={1280}
                  height={720}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 bg-card/30">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                What You'll Get
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A detailed report with actionable recommendations, ROI projections, and an implementation roadmap.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-border hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="mb-4">{React.createElement(benefit.icon, { className: "h-8 w-8 text-primary" })}</div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Features */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Audit Components
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Three comprehensive modules covering every aspect of your AI automation readiness.
              </p>
            </div>
            <div className="space-y-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-border hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-lg mb-4 leading-relaxed">{feature.description}</CardDescription>
                    <div className="grid md:grid-cols-2 gap-4">
                      {feature.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
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
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5" />
              <div className="relative p-12 text-center">
                <Zap className="h-16 w-16 text-primary mx-auto mb-6" />
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Discover Your AI Opportunities?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Get a comprehensive audit report within 5 business days with clear ROI projections and prioritized recommendations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="text-lg px-8 py-4" asChild>
                    <Link to="/demo">
                      Start Your Audit
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
