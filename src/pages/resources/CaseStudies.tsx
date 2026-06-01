
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Helmet } from 'react-helmet-async';
import caseStudiesHero from '@/assets/case-studies-hero.jpg';

export default function CaseStudies() {
  const canonical = typeof window !== 'undefined' ? window.location.href : 'https://example.com/resources/case-studies';
  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>AI Phone System Case Studies (USA) | Better Than Traditional</title>
        <meta name="description" content="Real stories from US businesses using AI phone systems to answer faster and book more meetings." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow p-4 pt-24 container mx-auto">
        <div className="text-center animate-fade-in mb-8">
          <h1 className="text-5xl font-bold mb-4">Case Studies</h1>
          <p className="text-lg text-muted-foreground">See how businesses like yours win with AI phone support.</p>
        </div>

        <img
          src={caseStudiesHero}
          alt="Business success dashboard with growth chart"
          className="rounded-2xl shadow-xl w-full max-w-5xl object-cover aspect-video mb-12"
          width={1280}
          height={720}
          loading="lazy"
          decoding="async"
        />

        <section className="grid md:grid-cols-3 gap-6 w-full mb-8">
          {[
            { title: 'Dental Office', desc: 'Cut missed calls by 60% and booked more hygiene visits.' },
            { title: 'Restaurant Group', desc: 'Automated reservations and takeout questions across 5 locations.' },
            { title: 'Real Estate Team', desc: 'Captured more leads after hours and set weekend tours.' },
          ].map((c, i) => (
            <Card key={i}><CardHeader><CardTitle>{c.title}</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">{c.desc}</p></CardContent></Card>
          ))}
        </section>

        <Card className="w-full mb-12 border-primary/40">
          <CardHeader>
            <CardTitle>AI CRM with Multi-Agent Lead Generation</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-muted-foreground text-left">
              How we built a 24/7 AI CRM that scrapes leads, enriches data, calls prospects, sends emails & SMS, and books meetings — autonomously.
            </p>
            <Button asChild><Link to="/case-studies/ai-crm-multi-agent">Watch Case Study</Link></Button>
          </CardContent>
        </Card>

        <Button asChild size="lg"><Link to="/book-appointment">Book a Demo</Link></Button>
      </main>
      <Footer />
    </div>
  );
}
