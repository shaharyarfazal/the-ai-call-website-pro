import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Handshake, Building2, Users, Zap, Shield, TrendingUp } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import partnershipImg from '@/assets/about-team.jpg';

export default function Partnership() {
  const canonical = getCanonicalUrl('/partnership');

  const partnershipTypes = [
    {
      icon: Building2,
      title: "Technology Partner",
      desc: "Integrate our Voice AI platform into your existing solutions and offer it to your customers."
    },
    {
      icon: Users,
      title: "Reseller Partner",
      desc: "Sell our Voice AI platform under your brand with white-label options and competitive margins."
    },
    {
      icon: Handshake,
      title: "Strategic Alliance",
      desc: "Co-develop solutions and go to market together for mutual business growth."
    }
  ];

  const benefits = [
    "Up to 30% revenue share",
    "Dedicated partner support team",
    "Marketing co-op funds",
    "Technical enablement training",
    "Early access to new features",
    "Custom SLA agreements"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Partnership Program | Reseller, Technology & Strategic Partners</title>
        <meta name="description" content="Join our Voice AI partner program. Reseller, technology, and strategic partnership opportunities with competitive revenue shares." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Header />
      <main className="flex-grow">
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <Badge variant="secondary" className="mb-6">Partnership Program</Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Partner With Us
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join our growing ecosystem of partners and grow your business with our Voice AI platform.
            </p>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-3 gap-8">
              {partnershipTypes.map((p, i) => (
                <Card key={i} className="border-border hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <p.icon className="h-10 w-10 text-primary mb-4" />
                    <CardTitle className="text-2xl">{p.title}</CardTitle>
                  </CardHeader>
                  <CardContent><CardDescription className="text-lg leading-relaxed">{p.desc}</CardDescription></CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-card/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Partner Benefits</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-lg">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Partner?</h2>
            <p className="text-xl text-muted-foreground mb-8">Get in touch and let's build something great together.</p>
            <div className="flex flex-col sm:flex gap-4 justify-center">
              <Button size="lg" asChild><Link to="/contact">Contact Partnership Team</Link></Button>
              <Button variant="outline" size="lg" asChild><Link to="/demo">See Platform Demo</Link></Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
