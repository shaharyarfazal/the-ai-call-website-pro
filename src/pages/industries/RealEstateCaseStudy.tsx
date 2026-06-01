import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Home, Phone, Calendar, Users, Zap, ArrowRight, TrendingUp, Clock, Building2 } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import realEstateCaseImg from '@/assets/real-estate-hero.jpg';
import realEstatePhoneImg from '@/assets/real-estate-ai-phone.jpg';
import realEstateResultsImg from '@/assets/real-estate-closing.jpg';

export default function RealEstateCaseStudy() {
  const canonical = getCanonicalUrl('/industries/realestate-case-study');

  const results = [
    {
      stat: "4.5x",
      label: "More leads captured 24/7",
      icon: <Users className="h-8 w-8 text-primary" />
    },
    {
      stat: "98%",
      label: "Lead response within 60 seconds",
      icon: <Clock className="h-8 w-8 text-primary" />
    },
    {
      stat: "35%",
      label: "Increase in showings booked",
      icon: <Calendar className="h-8 w-8 text-primary" />
    },
    {
      stat: "$180K",
      label: "Avg. saved monthly per agent",
      icon: <TrendingUp className="h-8 w-8 text-primary" />
    }
  ];

  const caseStudy1 = {
    title: "Premier Realty Group",
    challenge: "Top-producing agents missing 30% of after-hours calls and losing deals to faster competitors.",
    solution: "Deployed AI assistant for instant lead capture, property information, and showing scheduling.",
    outcome: "Captured 200+ additional leads monthly, increased showing bookings by 40%, and closed $12M in extra deals.",
    quote: "Our AI assistant qualifies leads so perfectly that our agents only talk to serious buyers. Game-changer.",
    quoteAuthor: "Michael Torres, Broker Owner"
  };

  const caseStudy2 = {
    title: "LuxeHomes Property Developers",
    challenge: "Luxury development struggling to follow up with high-net-worth international buyers across time zones.",
    solution: "Implemented AI concierge with multilingual support and property portfolio management.",
    outcome: "Response time dropped to under 30 seconds globally, pre-sales increased 55%, and agent efficiency doubled.",
    quote: "The AI handles our global inquiries flawlessly across 8 languages. Our VIP clients never wait.",
    quoteAuthor: "Sarah Williams, VP of Sales"
  };

  const features = [
    {
      icon: <Home className="h-8 w-8 text-primary" />,
      title: "Instant Property Tours",
      description: "AI guides prospects through virtual property tours, answering questions about features, pricing, and availability in real-time."
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Smart Showing Scheduling",
      description: "Automated appointment booking that syncs with agent calendars and sends instant confirmations to all parties."
    },
    {
      icon: <Building2 className="h-8 w-8 text-primary" />,
      title: "Lead Qualification Engine",
      description: "AI assesses buyer readiness, budget, timeline, and preferences to prioritize the hottest leads for your agents."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Real Estate AI Case Study | AI Assistant Results for Property Professionals</title>
        <meta name="description" content="See how real estate agencies captured 4.5x more leads and increased showings by 35% with AI assistants. Real real estate case studies." />
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
                  Real Estate Case Study
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Real Estate AI Success Stories
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Real growth results from real estate professionals. See how AI assistants are capturing more leads, booking more showings, and closing more deals.
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
                  src={realEstateCaseImg}
                  alt="Real estate professional using AI assistant"
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
                Impact on Real Estate Business
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Aggregated results from 60+ real estate agencies using our AI assistant platform.
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
                src={realEstatePhoneImg}
                alt="Real estate AI results"
                className="rounded-2xl shadow-xl w-full object-cover aspect-square"
                loading="lazy"
                width={800}
                height={800}
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src={realEstateResultsImg}
                  alt="Real estate growth results"
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
                src={realEstateResultsImg}
                alt="Real estate transformation"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
                loading="lazy"
                width={1280}
                height={720}
              />
              <div className="relative bg-gradient-to-r from-background/90 to-background/70 p-12 text-center">
                <Zap className="h-16 w-16 text-primary mx-auto mb-6" />
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Grow Your Real Estate Business?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join the real estate agencies already capturing more leads and closing more deals with AI.
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
