import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import careersHero from '@/assets/careers-hero.jpg';

export default function Careers() {
  const canonical = getCanonicalUrl('/company/careers');
  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Careers at The AI Call | Build Voice AI</title>
        <meta name="description" content="Join The AI Call to build voice AI that helps businesses across the USA." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 pt-32 pb-20 text-center">
        <div className="animate-fade-in max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Careers</h1>
          <p className="text-lg text-muted-foreground mb-8">Join our team and help us build the future of voice AI.</p>
          <img
            src={careersHero}
            alt="Diverse team collaborating on voice AI products"
            className="rounded-2xl shadow-xl w-full object-cover aspect-video mb-8"
            width={1280}
            height={720}
            loading="lazy"
            decoding="async"
          />
          <Button asChild size="lg">
            <Link to="/contact">Contact HR</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
