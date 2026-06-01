import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, Zap } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import { CallbackForm } from '@/components/home/CallbackForm';
import demoRequestImg from '@/assets/services-hero.jpg';

export default function DemoRequest() {
  const canonical = getCanonicalUrl('/demo-request');

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Request a Demo | See Our Voice AI Platform in Action</title>
        <meta name="description" content="Request a personalized demo of our Voice AI platform. See how AI voice can transform your business with a live demonstration." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Header />
      <main className="flex-grow">
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <Badge variant="secondary" className="mb-6">Request a Demo</Badge>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  See Voice AI in Action
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Get an instant AI demo call. Enter your details and our AI voice agent will call you within seconds — experience it live, no credit card required.
                </p>
              </div>
              <div className="animate-fade-in">
                <img
                  src={demoRequestImg}
                  alt="Voice AI demo"
                  className="rounded-2xl shadow-2xl w-full object-cover aspect-video"
                  width={1280}
                  height={720}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Unified Callback Form — 3 fields: Name, Email, Phone (US only) */}
        <CallbackForm idPrefix="demo-req" />

        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">What You'll Get</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Zap, title: "Live Demo", desc: "See our platform in action with your specific use case." },
                { icon: Phone, title: "ROI Projection", desc: "Custom ROI analysis based on your call volume and goals." },
                { icon: Mail, title: "Implementation Plan", desc: "Step-by-step deployment roadmap tailored to your business." }
              ].map((item, i) => (
                <Card key={i} className="border-border">
                  <CardHeader>
                    <item.icon className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent><CardDescription>{item.desc}</CardDescription></CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
