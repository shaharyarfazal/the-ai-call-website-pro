
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DollarSign, PieChart } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import roiHero from '@/assets/roi-calculator-hero.jpg';

export default function RoiCalculator() {
  const canonical = typeof window !== 'undefined' ? window.location.href : 'https://example.com/resources/roi-calculator';
  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>AI Phone ROI Calculator | Save vs Human Receptionist</title>
        <meta name="description" content="Estimate savings with voice AI vs traditional phone systems. Simple ROI for US businesses." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 pt-32 pb-16 sm:pt-40 sm:pb-24">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">ROI Calculator</h1>
          <p className="mt-4 text-lg text-muted-foreground">See how much you can save with an AI phone system.</p>
        </header>

        <div className="mb-12">
          <img
            src={roiHero}
            alt="Calculator with rising ROI growth chart"
            className="rounded-2xl shadow-xl w-full object-cover aspect-video"
            width={1280}
            height={720}
            loading="lazy"
            decoding="async"
          />
        </div>

        <section className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader><CardTitle>What You Can Measure</CardTitle></CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                <li>Missed calls vs answered calls</li>
                <li>Bookings created by AI</li>
                <li>Cost vs traditional phone systems</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Why It Matters</CardTitle></CardHeader>
            <CardContent>
              <p className="text-muted-foreground">AI reduces wait times, lowers costs, and keeps customers happy. Many US businesses break even fast.</p>
            </CardContent>
          </Card>
        </section>

        <div className="text-center">
          <Button asChild size="lg"><Link to="/book-appointment">Book a Demo</Link></Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
