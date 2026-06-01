
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ListChecks, PlugZap, Scale } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import integrationHero from '@/assets/integration-guides-hero.jpg';

export default function IntegrationGuides() {
  const canonical = typeof window !== 'undefined' ? window.location.href : 'https://example.com/resources/integration-guides';
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      { '@type': 'Question', 'name': 'AI phone system vs human receptionist?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'AI answers right away, scales 24/7, and costs less. Humans give a personal touch. Many teams use both.' } },
      { '@type': 'Question', 'name': 'Automated vs manual phone answering?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Automated is faster and more reliable for common tasks. Manual is best for complex, rare cases.' } }
    ]
  } as const;

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>AI Phone System Comparison & Setup Guides (USA)</title>
        <meta name="description" content="Simple guides to set up voice AI, connect calendars and CRMs, and compare AI vs traditional phone systems." />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 pt-32 pb-16 sm:pt-40 sm:pb-24">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Integration Guides</h1>
          <p className="mt-4 text-lg text-muted-foreground">Set up voice AI fast. Compare your options with clear steps.</p>
        </header>

        <div className="mb-12">
          <img
            src={integrationHero}
            alt="Connected app integrations and API network"
            className="rounded-2xl shadow-xl w-full object-cover aspect-video"
            width={1280}
            height={720}
            loading="lazy"
            decoding="async"
          />
        </div>

        <section className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: PlugZap, title: 'Calendar & CRM', desc: 'Connect Google, Outlook, HubSpot, and more.' },
            { icon: ListChecks, title: 'Best Practices', desc: 'Scripts, routing, and call flows that work.' },
            { icon: Scale, title: 'AI Phone System Comparison', desc: 'See when AI beats traditional systems—and when to blend both.' },
          ].map((f, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <f.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <CardTitle>{f.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <aside className="text-center space-x-3">
          <Button asChild size="lg"><Link to="/features/appointment-booking">Appointment Scheduling</Link></Button>
          <Button asChild variant="outline" size="lg"><Link to="/features/voice-recognition">Voice AI for Business</Link></Button>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
