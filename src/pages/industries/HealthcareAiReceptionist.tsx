
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Phone, Calendar, Clock, Users, Shield, MessageSquare, Zap, ArrowRight, Stethoscope, Heart, Activity } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import healthcareHeroImg from '@/assets/healthcare-hero.jpg';

export default function HealthcareAiReceptionist() {
  const location = useLocation();
  
  // Dynamic page title based on route
  const getPageTitle = () => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);
    
    if (segments.includes('healthcare-ai-receptionist')) {
      return 'Healthcare AI Receptionist';
    }
    
    // Fallback title
    return 'AI Receptionist Solution';
  };

  const pageTitle = getPageTitle();
  const canonical = getCanonicalUrl('/industries/healthcare-ai-receptionist');
  const features = [
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Smart Appointment Scheduling",
      description: "Automatically schedule, reschedule, and manage patient appointments 24/7 with intelligent conflict resolution."
    },
    {
      icon: <Phone className="h-8 w-8 text-primary" />,
      title: "HIPAA-Compliant Communication",
      description: "Secure patient interactions with full HIPAA compliance, protecting sensitive health information."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      title: "Multi-Channel Support",
      description: "Handle patient inquiries via phone, SMS, email, and web chat from a single AI interface."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Insurance Verification",
      description: "Automatically verify patient insurance coverage and eligibility before appointments."
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Prescription Reminders",
      description: "Send automated medication reminders and refill notifications to improve patient compliance."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Patient Pre-Registration",
      description: "Collect and verify patient information, medical history, and forms before visits."
    }
  ];

  const benefits = [
    "Reduce administrative costs by up to 70%",
    "Increase patient satisfaction scores",
    "Eliminate missed appointments with smart reminders",
    "Handle unlimited concurrent patient calls",
    "Provide 24/7 patient support availability",
    "Integrate seamlessly with existing EHR systems"
  ];

  const useCases = [
    {
      title: "Primary Care Practices",
      description: "Streamline routine appointments, follow-ups, and patient inquiries for family medicine and internal medicine practices.",
      icon: <Stethoscope className="h-6 w-6 text-primary" />
    },
    {
      title: "Specialty Clinics",
      description: "Manage complex scheduling requirements for cardiology, dermatology, orthopedics, and other specialty practices.",
      icon: <Heart className="h-6 w-6 text-primary" />
    },
    {
      title: "Urgent Care Centers",
      description: "Handle high-volume patient inquiries and triage requests for urgent care and walk-in clinics.",
      icon: <Activity className="h-6 w-6 text-primary" />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Healthcare AI Receptionist | HIPAA-Compliant Medical Answering Bot</title>
        <meta name="description" content="Optimize clinical operations with HIPAA-compliant AI medical receptionists. Automate patient scheduling, reminders, and billing queries with 24/7 availability." />
        <meta name="keywords" content="healthcare AI receptionist, HIPAA compliant medical bot, patient appointment scheduling assistant, virtual clinic receptionist, AI medical answering service" />
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:title" content="Healthcare AI Receptionist | HIPAA-Compliant Medical Answering Bot" />
        <meta property="og:description" content="Optimize clinical operations with HIPAA-compliant AI medical receptionists. Automate patient scheduling, reminders, and billing queries with 24/7 availability." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://theaicall.pro/uploads/logo-96.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HIPAA-Compliant Healthcare AI Receptionist" />
        <meta name="twitter:description" content="Enhance patient experience and cut clinic administrative overheads with custom-built conversational health bots." />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Healthcare AI Receptionist Service",
            "description": "HIPAA-compliant, automated clinical appointment scheduling and patient query handling voice agent service.",
            "provider": {
              "@type": "Organization",
              "name": "The AI Call Pro",
              "url": "https://theaicall.pro"
            },
            "areaServed": "US",
            "hasCredential": "Certified Retell AI Partner"
          })}
        </script>
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-6">
                <Shield className="h-4 w-4" />
                HIPAA-Compliant AI Solution
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                {pageTitle}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Transform patient communication with an AI receptionist that handles appointments, inquiries, and administrative tasks while maintaining the highest standards of medical privacy and compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-4" asChild>
                  <Link to="/book-appointment">
                    Schedule Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                  <Link to="/contact">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-20 px-4 bg-card/30">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Purpose-Built for Healthcare
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Every feature is designed with medical practices in mind, ensuring compliance, efficiency, and exceptional patient care.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-border hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Measurable Results for Your Practice
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Healthcare practices using our AI receptionist see immediate improvements in efficiency, patient satisfaction, and cost reduction.
                </p>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                      <span className="text-lg">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <img src={healthcareHeroImg} alt="Modern healthcare reception with AI technology" className="rounded-2xl shadow-xl w-full object-cover aspect-video" loading="lazy" width={1280} height={720} />
                <div className="bg-card/50 p-8 rounded-lg border border-border">
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">70%</div>
                    <div className="text-muted-foreground">Cost Reduction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-muted-foreground">Availability</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">95%</div>
                    <div className="text-muted-foreground">Patient Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">100%</div>
                    <div className="text-muted-foreground">HIPAA Compliant</div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 px-4 bg-card/30">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Perfect for Every Healthcare Setting
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                From small family practices to large medical centers, our AI adapts to your specific needs and workflows.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <Card key={index} className="border-border hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="mb-4">{useCase.icon}</div>
                    <CardTitle className="text-xl">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {useCase.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-12 rounded-2xl border border-primary/20">
              <Zap className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Practice?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join hundreds of healthcare practices already using our AI receptionist to improve patient care and reduce administrative burden.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-4" asChild>
                  <Link to="/book-appointment">
                    Schedule Your Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                  <Link to="/contact">Contact Our Team</Link>
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
