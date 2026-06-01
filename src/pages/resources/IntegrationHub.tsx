import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Link2, Zap, Shield, Database, Cloud } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import integrationHubImg from '@/assets/automate-hero.jpg';

export default function IntegrationHub() {
  const canonical = getCanonicalUrl('/resources/integration-hub');

  const integrations = [
    { name: "Twilio", desc: "Global telephony platform for voice, SMS, and video", icon: "📞" },
    { name: "Retell AI", desc: "Open-source AI voice calling platform", icon: "🤖" },
    { name: "Salesforce", desc: "CRM platform for sales and customer management", icon: "☁️" },
    { name: "HubSpot", desc: "Inbound marketing and sales platform", icon: "🎯" },
    { name: "Zapier", desc: "Automate workflows between 6000+ apps", icon: "⚡" },
    { name: "n8n", desc: "Open-source workflow automation platform", icon: "🔄" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Integration Hub | Connect Voice AI to Your Tech Stack</title>
        <meta name="description" content="Connect our Voice AI platform to your existing tools. Integrations with Twilio, Retell AI, Salesforce, HubSpot, Zapier, and n8n." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Header />
      <main className="flex-grow">
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <Badge variant="secondary" className="mb-6">Resource</Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Integration Hub
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Connect our Voice AI to your existing tech stack. Seamless integrations with leading platforms.
            </p>
          </div>
        </section>
        <section className="py-20 px-4 bg-card/30">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-3 gap-8">
              {integrations.map((int, i) => (
                <Card key={i} className="border-border">
                  <CardHeader><CardTitle className="text-xl">{int.icon} {int.name}</CardTitle></CardHeader>
                  <CardContent><CardDescription>{int.desc}</CardDescription></CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-6">Need a Custom Integration?</h2>
            <p className="text-xl text-muted-foreground mb-8">We build custom integrations for any platform.</p>
            <Button size="lg" asChild><Link to="/contact">Request Custom Integration</Link></Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
