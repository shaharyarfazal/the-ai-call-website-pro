
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar, Clock, Bell, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import appointmentHeroImg from '@/assets/appointment-booking-hero.jpg';

export default function AppointmentBooking() {
  const canonical = typeof window !== 'undefined' ? window.location.href : 'https://example.com/features/appointment-booking';
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      { '@type': 'Question', 'name': 'What is automated appointment scheduling?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'AI books, reschedules, and cancels appointments by phone without manual work.' } },
      { '@type': 'Question', 'name': 'Does it sync with our calendar?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. It syncs with popular calendars so your team sees every booking in real time.' } },
      { '@type': 'Question', 'name': 'Can it send reminders?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. It can send friendly reminders to reduce no-shows.' } },
      { '@type': 'Question', 'name': 'Do you serve the USA?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. We support businesses across the United States.' } },
    ]
  } as const;

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Automated Appointment Scheduling | Voice AI Booking USA</title>
        <meta name="description" content="AI that books, reschedules, and cancels appointments for your business across the USA." />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 pt-32 pb-16 sm:pt-40 sm:pb-24">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Automated Appointment Scheduling</h1>
          <p className="mt-4 text-lg text-muted-foreground">Let callers book meetings instantly. No waiting. No back-and-forth.</p>
        </header>

        <div className="mb-12">
          <img src={appointmentHeroImg} alt="Appointment scheduling interface on tablet" className="rounded-2xl shadow-xl w-full object-cover aspect-video" width={1280} height={720} />
        </div>

        <section className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Calendar, title: 'Book From Any Call', desc: 'AI books, reschedules, and cancels in seconds.' },
            { icon: Clock, title: 'Works With Your Calendar', desc: 'Syncs with popular calendars so your team stays in sync.' },
            { icon: Bell, title: 'Smart Reminders', desc: 'Send reminders to cut no-shows and fill your day.' },
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

        <section className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { title: 'Medical Offices', desc: 'Reduce hold times and schedule patients quickly.' },
            { title: 'Coaches & Consultants', desc: 'Auto-book discovery calls and paid sessions.' },
            { title: 'Salons & Spas', desc: 'Fill your calendar even after hours.' },
          ].map((f, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" aria-hidden="true" />
                  <CardTitle className="text-base md:text-lg">{f.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <article className="prose dark:prose-invert max-w-none mb-8">
          <p>With voice AI appointment booking, your business can serve every caller right away. It is fast, friendly, and reliable.</p>
          <p>We support customers across the USA.</p>
        </article>

        <div className="flex gap-3 justify-center">
          <Button asChild size="lg">
            <Link to="/book-appointment">Book a Demo</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/contact">Contact Sales</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
