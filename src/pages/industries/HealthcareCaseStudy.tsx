import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Stethoscope, Phone, Calendar, Users, Zap, ArrowRight, Heart, Shield, Activity } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import healthcareCaseImg from '@/assets/healthcare-hero.jpg';
import healthcarePhoneImg from '@/assets/hero-ai-phone.jpg';
import healthcareResultImg from '@/assets/about-team.jpg';

export default function HealthcareAiCaseStudy() {
  const canonical = getCanonicalUrl('/industries/healthcare-case-study');

  const results = [
    {
      stat: "73%",
      label: "Reduction in missed appointments",
      icon: <Calendar className="h-8 w-8 text-primary" />
    },
    {
      stat: "$120K",
      label: "Annual savings per clinic",
      icon: <Shield className="h-8 w-8 text-primary" />
    },
    {
      stat: "4.9/5",
      label: "Patient satisfaction score",
      icon: <Heart className="h-8 w-8 text-primary" />
    },
    {
      stat: "24/7",
      label: "Always-available support",
      icon: <Zap className="h-8 w-8 text-primary" />
    }
  ];

  const caseStudy1 = {
    title: "City General Hospital",
    challenge: "Overwhelmed front desk handling 2,000+ daily calls with 40% abandonment rate.",
    solution: "Deployed AI receptionist for appointment scheduling, insurance verification, and triage.",
    outcome: "Reduced call abandonment by 82%, saved $240K annually, and improved patient satisfaction.",
    quote: "The AI receptionist handles our overnight volume flawlessly. Our staff can focus on in-person care.",
    quoteAuthor: "Dr. Sarah Chen, Medical Director"
  };

  const caseStudy2 = {
    title: "Bright Smiles Dental Group",
    challenge: "Patient no-show rate of 28% costing the practice $85K monthly in lost revenue.",
    solution: "Implemented AI-powered appointment confirmations, rescheduling, and reminders.",
    outcome: "No-show rate dropped to 4%, recovered $60K monthly, and increased patient retention by 35%.",
    quote: "Patients love the instant confirmations. Our front desk finally has breathing room.",
    quoteAuthor: "Mark Torres, Office Manager"
  };

  const features = [
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Smart Scheduling",
      description: "AI manages complex appointment calendars with intelligent conflict resolution and automatic reminders."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "HIPAA-Compliant",
      description: "Full HIPAA compliance with encrypted communications and audit trails for all patient interactions."
    },
    {
      icon: <Activity className="h-8 w-8 text-primary" />,
      title: "Patient Triage",
      description: "Intelligent symptom assessment routes patients to the right provider and urgency level automatically."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Healthcare AI Case Study | HIPAA-Compliant Patient Communication Results</title>
        <meta name="description" content="See how healthcare practices saved $120K annually and reduced missed appointments by 73% with our AI receptionist. HIPAA-compliant patient communication." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <Badge variant="secondary" className="mb-6">
                  Healthcare Case Study
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Healthcare AI Success Stories
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Real results from real healthcare practices. See how AI receptionists are transforming patient care, reducing costs, and saving lives.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-lg px-8 py-4" asChild>
                    <Link to="/demo">
                      See Demo
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                    <Link to="/contact">Contact Sales</Link>
                  </Button>
                </div>
              </div>
              <div className="animate-fade-in">
                <img
                  src={healthcareCaseImg}
                  alt="Healthcare professional using AI technology"
                  className="rounded-2xl shadow-2xl w-full object-cover aspect-video"
                  width={1280}
                  height={720}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Results Stats */}
        <section className="py-20 px-4 bg-card/30">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Impact Across Healthcare
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Aggregated results from 50+ healthcare deployments worldwide.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {results.map((result, index) => (
                <Card key={index} className="border-border hover:border-primary/50 transition-colors text-center">
                  <CardHeader>
                    <div className="mb-4 flex justify-center">{result.icon}</div>
                    <CardTitle className="text-3xl text-primary">{result.stat}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base font-medium">{result.label}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Case Studies */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl space-y-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">Case Study #1</Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">{caseStudy1.title}</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-primary">Challenge</h3>
                    <p className="text-muted-foreground text-lg">{caseStudy1.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-primary">Solution</h3>
                    <p className="text-muted-foreground text-lg">{caseStudy1.solution}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-primary">Outcome</h3>
                    <p className="text-muted-foreground text-lg">{caseStudy1.outcome}</p>
                  </div>
                  <div className="bg-card/50 p-6 rounded-lg border-l-4 border-primary">
                    <p className="text-lg italic">"{caseStudy1.quote}"</p>
                    <p className="text-muted-foreground mt-2">— {caseStudy1.quoteAuthor}</p>
                  </div>
                </div>
              </div>
              <img
                src={healthcarePhoneImg}
                alt="Healthcare AI results dashboard"
                className="rounded-2xl shadow-xl w-full object-cover aspect-square"
                loading="lazy"
                width={800}
                height={800}
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src={healthcareResultImg}
                  alt="Healthcare professional with AI assistant"
                  className="rounded-2xl shadow-xl w-full object-cover aspect-square"
                  loading="lazy"
                  width={800}
                  height={800}
                />
              </div>
              <div className="order-1 lg:order-2">
                <Badge variant="secondary" className="mb-4">Case Study #2</Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">{caseStudy2.title}</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-primary">Challenge</h3>
                    <p className="text-muted-foreground text-lg">{caseStudy2.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-primary">Solution</h3>
                    <p className="text-muted-foreground text-lg">{caseStudy2.solution}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-primary">Outcome</h3>
                    <p className="text-muted-foreground text-lg">{caseStudy2.outcome}</p>
                  </div>
                  <div className="bg-card/50 p-6 rounded-lg border-l-4 border-primary">
                    <p className="text-lg italic">"{caseStudy2.quote}"</p>
                    <p className="text-muted-foreground mt-2">— {caseStudy2.quoteAuthor}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="relative rounded-2xl overflow-hidden border border-primary/20">
              <img
                src={healthcareResultImg}
                alt="Healthcare success story"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
                loading="lazy"
                width={1280}
                height={720}
              />
              <div className="relative bg-gradient-to-r from-background/90 to-background/70 p-12 text-center">
                <Zap className="h-16 w-16 text-primary mx-auto mb-6" />
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready for Your Healthcare Success Story?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join the healthcare practices already transforming patient care with our AI receptionist.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="text-lg px-8 py-4" asChild>
                    <Link to="/demo">
                      Schedule Demo
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                    <Link to="/contact">Contact Sales</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
