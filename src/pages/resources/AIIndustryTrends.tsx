import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Brain, Phone, Users, Shield, Zap, DollarSign, BarChart3, ArrowRight, Clock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import aiTrendsImg from '@/assets/services-hero.jpg';

export default function AIIndustryTrends() {
  const canonical = getCanonicalUrl('/resources/ai-industry-trends');

  const trends = [
    {
      icon: Phone,
      title: "Voice AI Adoption Surges",
      desc: "78% of enterprises plan to deploy voice AI within 12 months. The market is expected to reach $12B by 2027.",
      stat: "78%"
    },
    {
      icon: Brain,
      title: "Multimodal AI Emerges",
      desc: "Combining voice, text, and visual AI for richer customer experiences. The AI Call platform supports multimodal interactions natively.",
      stat: "3x richer"
    },
    {
      icon: Users,
      title: "AI Human Collaboration",
      desc: "The future isn't AI replacing humans — it's AI augmenting human agents for higher productivity and customer satisfaction.",
      stat: "3x output"
    },
    {
      icon: Shield,
      title: "AI Governance & Compliance",
      desc: "New regulations require transparent AI decision-making. Our platform is fully compliant with AI ethics standards.",
      stat: "100%"
    },
    {
      icon: DollarSign,
      title: "ROI Focus Intensifies",
      desc: "Businesses demand measurable ROI from AI investments. Our customers see 300-500% ROI within the first year.",
      stat: "500%"
    },
    {
      icon: Zap,
      title: "Real-Time AI Processing",
      desc: "Sub-second response times for AI conversations. Edge computing and improved models enable instant AI interactions.",
      stat: "<100ms"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>AI Industry Trends 2026 | Voice AI Market Research & Predictions</title>
        <meta name="description" content="Latest AI industry trends for 2026. Voice AI adoption, multimodal AI, ROI benchmarks, and market predictions for the Voice AI industry." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Header />
      <main className="flex-grow">
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <Badge variant="secondary" className="mb-6">Industry Research</Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              AI Industry Trends
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Stay ahead of the curve with the latest Voice AI industry trends, market research, and expert predictions for 2026 and beyond.
            </p>
          </div>
        </section>
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trends.map((t, i) => (
                <Card key={i} className="border-border hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <t.icon className="h-8 w-8 text-primary" />
                      <Badge variant="secondary" className="text-lg font-bold">{t.stat}</Badge>
                    </div>
                    <CardTitle className="text-xl">{t.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">{t.desc}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 px-4 bg-card/30">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Leverage These Trends?</h2>
            <p className="text-xl text-muted-foreground mb-8">Get ahead of your competition with AI voice technology.</p>
            <Button size="lg" asChild><Link to="/demo">Get Started</Link></Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
