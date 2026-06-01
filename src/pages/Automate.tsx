
import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Phone, MessageSquare, Calendar, BarChart3, Clock, DollarSign } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import automateHeroImg from '@/assets/automate-hero.jpg';

const automationFeatures = [
  {
    icon: Phone,
    title: "Automated Call Handling",
    description: "Handle incoming calls 24/7 with intelligent voice AI that never misses a lead."
  },
  {
    icon: MessageSquare,
    title: "Customer Support",
    description: "Provide instant responses to common questions and route complex issues to human agents."
  },
  {
    icon: Calendar,
    title: "Appointment Scheduling",
    description: "Let AI manage your calendar, book appointments, and send reminders automatically."
  },
  {
    icon: BarChart3,
    title: "Lead Qualification",
    description: "Automatically qualify leads and route hot prospects to your sales team."
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Your business never sleeps with AI that works around the clock."
  },
  {
    icon: DollarSign,
    title: "Cost Reduction",
    description: "Reduce operational costs by up to 70% while improving customer satisfaction."
  }
];

export default function Automate() {
  const canonical = typeof window !== 'undefined' ? window.location.href : 'https://example.com/automate';
  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Business Call Automation | AI Phone Answering (USA)</title>
        <meta name="description" content="Automate calls, support, and scheduling with voice AI. Simple setup for US businesses." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Automate Your Business</h1>
          <p className="mt-4 text-lg text-primary">Transform Operations with Voice AI</p>
          <p className="mt-2 text-muted-foreground max-w-3xl mx-auto">
            Stop losing leads and start growing your business with intelligent voice automation. 
            Our AI solutions handle calls, schedule appointments, and qualify leads while you focus on what matters most.
          </p>
        </div>

        <div className="mb-12 animate-fade-in">
          <img src={automateHeroImg} alt="Business automation dashboard" className="rounded-2xl shadow-xl w-full object-cover aspect-video" width={1280} height={720} />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {automationFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <Icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-muted/50 rounded-lg p-8 mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get started with business automation in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto mb-4">1</div>
              <h3 className="font-semibold mb-2">Consultation</h3>
              <p className="text-muted-foreground">We analyze your business needs and design a custom automation strategy.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto mb-4">2</div>
              <h3 className="font-semibold mb-2">Implementation</h3>
              <p className="text-muted-foreground">Our team sets up and configures your voice AI solution with full integration.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto mb-4">3</div>
              <h3 className="font-semibold mb-2">Optimization</h3>
              <p className="text-muted-foreground">Continuous monitoring and improvement to maximize your ROI.</p>
            </div>
          </div>
        </div>

        <div className="text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <h2 className="text-3xl font-bold mb-4">Ready to Automate?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that have transformed their operations with our voice AI solutions. 
            Start your automation journey today.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/book-appointment">Book a Demo</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Get Quote</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
