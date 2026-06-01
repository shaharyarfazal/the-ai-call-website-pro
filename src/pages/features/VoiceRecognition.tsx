
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCircle, Phone, Calendar, Headphones } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import voiceHeroImg from '@/assets/voice-recognition-hero.jpg';

export default function VoiceRecognition() {
  const canonical = typeof window !== 'undefined' ? window.location.href : 'https://example.com/features/voice-recognition';
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'What is a voice AI phone answering service?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'It is software that answers calls, speaks in a natural voice, routes callers, and books meetings for your business.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Does it work for small businesses?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. Small businesses use it to answer every call, take messages, and schedule appointments 24/7.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Can it book appointments for my team?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. It connects to your calendar and books, reschedules, or cancels appointments automatically.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Where do you serve?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'We serve businesses across the USA, including Dallas, Frisco, and all of Texas.'
        }
      }
    ]
  } as const;

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Voice AI for Business | AI Phone Answering Service USA</title>
        <meta name="description" content="Simple voice AI for business calls. Fast, friendly AI phone answering and call handling across the USA." />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 pt-32 pb-16 sm:pt-40 sm:pb-24">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Voice AI for Business</h1>
          <p className="mt-4 text-lg text-muted-foreground">AI phone answering service for faster, friendlier calls in the USA.</p>
        </header>

        <div className="mb-12">
          <img src={voiceHeroImg} alt="Voice AI recognition technology with sound waveform" className="rounded-2xl shadow-xl w-full object-cover aspect-video" width={1280} height={720} />
        </div>

        <section className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Phone, title: 'Answer & Route Every Call', desc: 'No missed calls. Greet callers, route to the right person, or take a message.' },
            { icon: Calendar, title: 'Automated Appointment Scheduling', desc: 'Book, reschedule, and cancel meetings without back-and-forth.' },
            { icon: Headphones, title: '24/7 Support With a Human Tone', desc: 'Natural, helpful conversations that feel human and on-brand.' },
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
            { title: 'Voice AI for Small Business', desc: 'Answer calls, take orders, and set appointments so you can focus on work.' },
            { title: 'Restaurants', desc: 'Handle bookings, hours, menus, and takeout questions automatically.' },
            { title: 'Medical Offices', desc: 'Verify patients, answer questions, and schedule visits with ease.' },
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
          <p>We help businesses replace missed calls with quick, helpful answers. Our automated phone system speaks clearly, understands callers, and gets things done. It is simple to set up and easy to use.</p>
          <p>Serving the United States nationwide — Dallas, Frisco, Texas, and beyond.</p>
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
