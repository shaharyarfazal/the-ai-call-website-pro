import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Handshake, Building2, Users, Zap, Shield, TrendingUp, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import partnershipImg from '@/assets/about-team.jpg';

export default function Partnership() {
  const canonical = getCanonicalUrl('/partnership');

  const partnershipTypes = [
    {
      icon: Building2,
      title: "Technology Partner",
      desc: "Integrate our Voice AI platform into your existing solutions and offer robust automation to your customers."
    },
    {
      icon: Users,
      title: "Reseller Partner",
      desc: "Sell our Voice AI solutions under your brand with white-label options, marketing collateral, and competitive margins."
    },
    {
      icon: Handshake,
      title: "Strategic Alliance",
      desc: "Co-develop specialized industry voice bots and go to market together for mutual business growth."
    }
  ];

  const benefits = [
    "Up to 30% recurring revenue share",
    "Dedicated developer and partner support team",
    "Co-marketing funds & white-labeled collateral",
    "Complete technical enablement & sales training",
    "Beta access to next-gen voice synthesis algorithms",
    "Custom Service Level Agreements (SLAs)"
  ];

  const partnershipSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "The AI Call Pro Strategic Partnership Program",
    "description": "Collaborative reseller, technology, and strategic partnership program for advanced AI voice automation agents and custom integrations.",
    "url": canonical,
    "publisher": {
      "@type": "Organization",
      "name": "The AI Call Pro",
      "url": "https://theaicall.pro"
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Voice AI Partnership Program | Reseller & Technology Partners</title>
        <meta name="description" content="Join The AI Call Pro strategic partnership program. Exceptional reseller, technology integration, and referral options with competitive recurring revenue shares." />
        <meta name="keywords" content="voice AI partner program, AI reseller program, white label voice agent, strategic AI partnership, Twilio Retell AI integration partners" />
        <link rel="canonical" href={canonical} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Voice AI Partnership Program | Reseller & Technology Partners" />
        <meta property="og:description" content="Strategic partner options including technology integration, reselling, and strategic alliances with up to 30% recurring revenue shares." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://theaicall.pro/uploads/logo-96.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Voice AI Strategic Partnership Program" />
        <meta name="twitter:description" content="Build and scale your agency with cutting-edge custom voice bots. White-label and technology integration plans available." />
        
        <script type="application/ld+json">
          {JSON.stringify(partnershipSchema)}
        </script>
      </Helmet>
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border border-primary/20">
              Partnership Program
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Partner With Us
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Join our growing global ecosystem of strategic partners and accelerate your revenue with our industry-leading custom Voice AI platform.
            </p>
          </div>
        </section>

        {/* Partnership Types */}
        <section className="py-20 px-4 bg-card/10 border-y border-foreground/[0.04]">
          <div className="container mx-auto max-w-5xl">
            <header className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Flexible Collaboration Pathways</h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-base">Select the partnership track that matches your agency or product goals.</p>
            </header>
            <div className="grid md:grid-cols-3 gap-8">
              {partnershipTypes.map((p, i) => (
                <Card key={i} className="border-border hover:border-primary/50 transition-colors bg-card/30">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <p.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{p.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed text-muted-foreground">
                      {p.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Benefits & Team Image */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Empowering Partners to Lead the Voice AI Revolution
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  We supply comprehensive tech enablement, top-tier engineering support, and lucrative margins so you can focus entirely on scaling your client relationships.
                </p>
                <div className="space-y-4">
                  {benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-base font-medium">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative group rounded-2xl overflow-hidden shadow-2xl border border-foreground/[0.06]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 opacity-70 group-hover:opacity-50 transition-opacity duration-300" />
                <img 
                  src={partnershipImg} 
                  alt="Strategic partners collaborating on custom AI voice integration solutions in a modern office" 
                  className="w-full object-cover aspect-video hover:scale-[1.02] transition-transform duration-700" 
                  width={1280} 
                  height={720}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-transparent to-primary/[0.02]">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-12 rounded-2xl border border-primary/20">
              <Handshake className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Join the Partnership Program?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Connect with our partnership directors to design your custom program and begin reselling cutting-edge call automation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-4" asChild>
                  <Link to="/contact">Contact Partnership Team</Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                  <Link to="/demo">See Platform Demo</Link>
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
