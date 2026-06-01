
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart2, PhoneCall, TrendingUp } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import analyticsHeroImg from '@/assets/analytics-dashboard-hero.jpg';

export default function AnalyticsDashboard() {
  const canonical = typeof window !== 'undefined' ? window.location.href : 'https://example.com/features/analytics-dashboard';
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      { '@type': 'Question', 'name': 'What does the call analytics dashboard show?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'It shows answered calls, missed calls, bookings, and team performance in simple charts.' } },
      { '@type': 'Question', 'name': 'Is it hard to set up?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'No. It works out of the box and needs no IT team.' } },
      { '@type': 'Question', 'name': 'Can this help with business call automation?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. You see what works, fix what does not, and automate more tasks with confidence.' } }
    ]
  } as const;

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>AI Call Analytics | Business Call Automation Dashboard</title>
        <meta name="description" content="Track calls, answer rate, missed calls, and bookings. Simple dashboards that help you automate with confidence." />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 pt-32 pb-16 sm:pt-40 sm:pb-24">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">AI Call Analytics Dashboard</h1>
          <p className="mt-4 text-lg text-muted-foreground">See what happens on every call. Improve service and win more bookings.</p>
        </header>

        <div className="mb-12">
          <img src={analyticsHeroImg} alt="Business analytics dashboard with real-time call data" className="rounded-2xl shadow-xl w-full object-cover aspect-video" width={1280} height={720} />
        </div>

        <section className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: BarChart2, title: 'Real-Time Metrics', desc: 'Answer rate, handle time, hold time, and more.' },
            { icon: PhoneCall, title: 'Caller Journeys', desc: 'See why people call and where they get answers.' },
            { icon: TrendingUp, title: 'ROI Insights', desc: 'Connect calls to meetings and revenue.' },
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

        <article className="prose dark:prose-invert max-w-none mb-8">
          <p>Use clear data to grow. Fix missed calls, cut wait times, and boost bookings. No complex setup required.</p>
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
