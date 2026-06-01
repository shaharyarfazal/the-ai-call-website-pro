import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Phone, Calendar, Users, Zap, ArrowRight, TrendingUp, Clock, BarChart3, Brain } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import callcenterHeroImg from '@/assets/call-center-hero.jpg';
import callcenterPhoneImg from '@/assets/hero-ai-phone.jpg';
import callcenterResultsImg from '@/assets/about-team.jpg';

export default function CallCenterCaseStudy() {
  const canonical = getCanonicalUrl('/industries/callcenter-case-study');

  const results = [
    {
      stat: "85%",
      label: "Reduction in hold times",
      icon: <Clock className="h-8 w-8 text-primary" />
    },
    {
      stat: "3x",
      label: "Agent capacity increase",
      icon: <Users className="h-8 w-8 text-primary" />
    },
    {
      stat: "94%",
      label: "First-call resolution rate",
      icon: <CheckCircle className="h-8 w-8 text-primary" />
    },
    {
      stat: "$2M+",
      label: "Annual savings per center",
      icon: <TrendingUp className="h-8 w-8 text-primary" />
    }
  ];

  const caseStudy1 = {
    title: "GlobalConnect Telecom",
    challenge: "35-minute average wait times, 60% agent turnover, and $5M+ annual call center costs.",
    solution: "Deployed AI agent for handling repetitive queries, account management, and basic troubleshooting.",
    outcome: "Wait times dropped to under 30 seconds, agent turnover fell by 45%, and saved $2.3M annually.",
    quote: "Our agents now focus on complex cases that truly need human empathy. Customer satisfaction skyrocketed.",
    quoteAuthor: "Robert Kim, VP of Customer Experience"
  };

  const caseStudy2 = {
    title: "FinanceFirst Bank",
    challenge: "High-volume call center struggling with balance inquiries, transfer requests, and card lockouts.",
    solution: "Implemented AI assistant for automated account services with full security verification.",
    outcome: "65% of calls now handled by AI instantly, reduced call center headcount needs by 40%, and improved NPS by 28 points.",
    quote: "The AI handles our most repetitive calls flawlessly while maintaining bank-level security standards.",
    quoteAuthor: "Amanda Richardson, Director of Digital Banking"
  };

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "Intelligent Call Routing",
      description: "AI understands context, intent, and urgency to route calls to the right agent or resolve them instantly."
    },
    {
      icon: <Phone className="h-8 w-8 text-primary" />,
      title: "Multi-Language Support",
      description: "Automatically detects and switches between languages to serve global customer bases seamlessly."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Real-Time Analytics",
      description: "Live call analytics, sentiment analysis, and performance metrics to continuously optimize operations."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Call Center AI Case Study | AI Agent Results for Contact Centers</title>
        <meta name="description" content="See how call centers reduced wait times by 85%, increased agent capacity by 3x, and saved $2M+ annually with AI agents. Real call center case studies." />
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
                  Call Center Case Study
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Call Center AI Success Stories
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Real transformation results from real call centers. See how AI agents are revolutionizing customer service operations worldwide.
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
                  src={callcenterHeroImg}
                  alt="Modern call center with AI technology"
                  className="rounded-2xl shadow-2xl w-full object-cover aspect-video"
                  width={1280}
                  height={720}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Results Stats */}
        <section className="py-20 px-4 bg-card/30">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Impact on Call Center Operations
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Aggregated results from 75+ call center deployments across industries.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {results.map((result, index) => (
                <Card key={index} className="border-border hover:border-primary/50 transition-colors text-center">
                  <CardHeader>
                    <div className="mb-4 flex justify-center">{result.icon}</div>
                    <CardTitle className="text-3xl text-primary">{result.stat}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base font-medium">{result.label}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Case Studies */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl space-y-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">Case Study #1</Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">{caseStudy1.title}</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-primary">Challenge</h3>
                    <p className="text-muted-foreground text-lg">{caseStudy1.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-primary">Solution</h3>
                    <p className="text-muted-foreground text-lg">{caseStudy1.solution}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-primary">Outcome</h3>
                    <p className="text-muted-foreground text-lg">{caseStudy1.outcome}</p>
                  </div>
                  <div className="bg-card/50 p-6 rounded-lg border-l-4 border-primary">
                    <p className="text-lg italic">"{caseStudy1.quote}"</p>
                    <p className="text-muted-foreground mt-2">— {caseStudy1.quoteAuthor}</p>
                  </div>
                </div>
              </div>
              <img
                src={callcenterPhoneImg}
                alt="Call center AI results"
                className="rounded-2xl shadow-xl w-full object-cover aspect-square"
                loading="lazy"
                width={800}
                height={800}
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src={callcenterResultsImg}
                  alt="Call center transformation results"
                  className="rounded-2xl shadow-xl w-full object-cover aspect-square"
                  loading="lazy"
                  width={800}
                  height={800}
                />
              </div>
              <div className="order-1 lg:order-2">
                <Badge variant="secondary" className="mb-4">Case Study #2</Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">{caseStudy2.title}</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-primary">Challenge</h3>
                    <p className="text-muted-foreground text-lg">{caseStudy2.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-primary">Solution</h3>
                    <p className="text-muted-foreground text-lg">{caseStudy2.solution}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-primary">Outcome</h3>
                    <p className="text-muted-foreground text-lg">{caseStudy2.outcome}</p>
                  </div>
                  <div className="bg-card/50 p-6 rounded-lg border-l-4 border-primary">
                    <p className="text-lg italic">"{caseStudy2.quote}"</p>
                    <p className="text-muted-foreground mt-2">— {caseStudy2.quoteAuthor}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="relative rounded-2xl overflow-hidden border border-primary/20">
              <img
                src={callcenterResultsImg}
                alt="Call center transformation"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
                loading="lazy"
                width={1280}
                height={720}
              />
              <div className="relative bg-gradient-to-r from-background/90 to-background/70 p-12 text-center">
                <Zap className="h-16 w-16 text-primary mx-auto mb-6" />
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Transform Your Call Center?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join the call centers already saving millions with AI agent technology.
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
