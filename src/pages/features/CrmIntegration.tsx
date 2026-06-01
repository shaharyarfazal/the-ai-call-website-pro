
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { PlugZap, Link2, UserCheck, Workflow, CheckCircle2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import crmHeroImg from '@/assets/crm-integration-hero.jpg';

export default function CrmIntegration() {
  const canonical = typeof window !== 'undefined' ? window.location.href : 'https://example.com/features/crm-integration';
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      { '@type': 'Question', 'name': 'Which CRMs do you support?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'We support HubSpot, Salesforce, Pipedrive, Zoho, and more via flexible APIs.' } },
      { '@type': 'Question', 'name': 'What data is synced?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Contacts, calls, notes, bookings, and lead status can be synced both ways.' } },
      { '@type': 'Question', 'name': 'Is setup hard?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'No. Our team sets up your integrations and tests everything end-to-end.' } }
    ]
  } as const;

  const features = [
    { icon: PlugZap, title: 'Fast CRM Setup', desc: 'Connect HubSpot, Salesforce, Pipedrive, or Zoho in minutes.' },
    { icon: Link2, title: 'Two-Way Sync', desc: 'Keep contacts, notes, and bookings up-to-date automatically.' },
    { icon: UserCheck, title: 'Lead Enrichment', desc: 'Qualify leads and update fields based on AI phone calls.' },
    { icon: Workflow, title: 'Automation Triggers', desc: 'Kick off workflows when a call ends or a meeting is booked.' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>CRM Integration for Voice AI | HubSpot, Salesforce, Zoho</title>
        <meta name="description" content="Connect your AI phone system to HubSpot, Salesforce, Pipedrive, or Zoho. Two-way sync for calls, contacts, and bookings across the USA." />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 pt-32 pb-16 sm:pt-40 sm:pb-24">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">CRM Integration</h1>
          <p className="mt-4 text-lg text-muted-foreground">Keep your CRM current with every call and booking.</p>
        </header>

        <div className="mb-12">
          <img src={crmHeroImg} alt="CRM integration dashboard with connected business tools" className="rounded-2xl shadow-xl w-full object-cover aspect-video" width={1280} height={720} />
        </div>

        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((f, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-center gap-3"><f.icon className="h-5 w-5 text-primary" aria-hidden="true" /><CardTitle>{f.title}</CardTitle></div>
              </CardHeader>
              <CardContent>
                <CardDescription>{f.desc}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { title: 'HubSpot', desc: 'Contacts, calls, and meetings logged to the timeline.' },
            { title: 'Salesforce', desc: 'Accounts, leads, and tasks updated in real time.' },
            { title: 'Zoho & Pipedrive', desc: 'Flexible fields and custom workflows supported.' },
          ].map((p, i) => (
            <Card key={i}><CardHeader><CardTitle>{p.title}</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">{p.desc}</p></CardContent></Card>
          ))}
        </section>

        <article className="prose dark:prose-invert max-w-none mb-8">
          <h2>Why connect your AI phone system to a CRM?</h2>
          <p>It saves time and makes follow-up fast. Your team sees every call, note, and booking in one place. No double entry.</p>
        </article>

        <div className="text-center">
          <Button asChild size="lg"><Link to="/book-appointment">Book a Demo</Link></Button>
          <p className="text-sm text-muted-foreground mt-3 flex items-center justify-center gap-2"><CheckCircle2 className="h-4 w-4" /> Setup included</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
