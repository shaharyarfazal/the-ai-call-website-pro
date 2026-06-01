import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar, Clock, Bell, Globe, CheckCircle, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import appointmentHeroImg from '@/assets/appointment-booking-hero.jpg';

export default function AutomatedAppointmentScheduling() {
  const canonical = getCanonicalUrl('/services/automated-appointment-scheduling');

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Automated Appointment Scheduling | AI-Powered Booking System</title>
        <meta name="description" content="Streamline scheduling with AI-powered automated appointment booking. Calendar integration, automatic reminders, rescheduling handling, and timezone management." />
        <meta name="keywords" content="automated appointment scheduling, AI booking system, calendar integration, appointment automation" />
        <link rel="canonical" href={canonical} />
        
        <meta property="og:title" content="Automated Appointment Scheduling | AI-Powered Booking System" />
        <meta property="og:description" content="Streamline scheduling with AI-powered automated appointment booking. Calendar integration, automatic reminders, rescheduling handling, and timezone management." />
        <meta property="og:type" content="service" />
        <meta property="og:url" content={canonical} />
      </Helmet>
      
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-5xl text-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Automated Appointment Scheduling
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Streamline your booking process with intelligent AI-powered appointment scheduling. 
                Automatic calendar management, reminders, and rescheduling - all handled seamlessly.
              </p>
              <div className="flex gap-4">
                <Button asChild size="lg">
                  <Link to="/demo">Book Demo</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img src={appointmentHeroImg} alt="Automated appointment scheduling on tablet" className="w-full object-cover aspect-video" width={1280} height={720} />
            </div>
          </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <header className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Complete Scheduling Automation</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every aspect of appointment management handled automatically.
              </p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Calendar,
                  title: "Calendar Integration",
                  description: "Seamlessly syncs with Google Calendar, Outlook, and other popular calendar platforms."
                },
                {
                  icon: Bell,
                  title: "Automatic Reminders",
                  description: "Smart reminder system via email, SMS, and voice calls to reduce no-shows."
                },
                {
                  icon: Clock,
                  title: "Rescheduling Handling",
                  description: "AI manages cancellations and rescheduling requests automatically."
                },
                {
                  icon: Globe,
                  title: "Timezone Management",
                  description: "Intelligent timezone detection and conversion for global scheduling."
                }
              ].map((feature, i) => (
                <Card key={i} className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Why Automate Your Scheduling?</h2>
                <div className="space-y-4">
                  {[
                    "Eliminate double bookings and scheduling conflicts",
                    "Reduce no-shows by up to 80% with smart reminders",
                    "Save 10+ hours per week on administrative tasks",
                    "Provide 24/7 booking availability for customers",
                    "Integrate with existing business systems",
                    "Scale scheduling without additional staff"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">80%</div>
                  <div className="text-lg font-medium mb-4">Fewer No-Shows</div>
                  <p className="text-muted-foreground">
                    Intelligent reminder system dramatically reduces appointment cancellations and no-shows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <header className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Simple setup with powerful automation capabilities.
              </p>
            </header>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Setup & Configuration",
                  description: "Connect your calendar, set availability preferences, and customize booking workflows."
                },
                {
                  step: "2",
                  title: "Customer Booking",
                  description: "Customers book via phone, web, or AI voice agent with real-time availability checking."
                },
                {
                  step: "3",
                  title: "Automated Management",
                  description: "System handles confirmations, reminders, rescheduling, and calendar updates automatically."
                }
              ].map((step, i) => (
                <Card key={i} className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                      {step.step}
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-card rounded-lg p-8 text-center border">
              <h2 className="text-3xl font-bold mb-4">Ready to Automate Your Scheduling?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Transform your appointment booking process and save hours of administrative work every week.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/demo" className="flex items-center gap-2">
                    Book Demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}