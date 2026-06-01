import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MessageSquare, Phone, DollarSign, Settings, Clock, Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import faqHero from '@/assets/faq-hero.jpg';

export default function Faq() {
  const canonical = getCanonicalUrl('/faq');
  
  const faqCategories = [
    {
      category: "General Questions",
      icon: <MessageSquare className="h-5 w-5" />,
      faqs: [
        {
          question: "What is an AI phone answering service?",
          answer: "An AI phone answering service uses artificial intelligence to handle incoming calls automatically. It can answer questions, schedule appointments, take messages, and route calls to the right team members, providing 24/7 phone support for your business."
        },
        {
          question: "How does voice AI work?",
          answer: "Voice AI uses natural language processing and machine learning to understand spoken language, interpret caller intent, and respond naturally. It can handle complex conversations, understand context, and provide relevant information just like a human receptionist."
        },
        {
          question: "What industries benefit most from AI phone services?",
          answer: "Healthcare practices, real estate agencies, law firms, e-commerce businesses, marketing agencies, and service-based companies see the greatest benefits. Any business that receives regular phone inquiries can benefit from AI phone automation."
        }
      ]
    },
    {
      category: "Features & Capabilities",
      icon: <Phone className="h-5 w-5" />,
      faqs: [
        {
          question: "Can AI handle complex customer inquiries?",
          answer: "Yes, our AI is trained to handle complex inquiries, understand context, and provide detailed responses. For situations beyond its capabilities, it seamlessly transfers calls to human team members with full context."
        },
        {
          question: "Does the AI sound natural?",
          answer: "Absolutely. Our AI uses advanced voice synthesis technology to sound natural and professional. Most callers can't tell they're speaking with AI until they're told."
        },
        {
          question: "Can I customize the AI's responses?",
          answer: "Yes, you can fully customize the AI's personality, responses, and behavior to match your brand voice and business needs. We provide easy-to-use tools for customization."
        }
      ]
    },
    {
      category: "Pricing & Setup",
      icon: <DollarSign className="h-5 w-5" />,
      faqs: [
        {
          question: "How much does AI phone service cost?",
          answer: "Our pricing is based on usage and features needed. Basic plans start at $99/month for small businesses. We offer custom enterprise pricing for larger organizations. Contact us for a personalized quote."
        },
        {
          question: "Is there a setup fee?",
          answer: "No setup fees for our standard packages. We include free onboarding, training, and configuration. Custom integrations may have additional one-time fees depending on complexity."
        },
        {
          question: "How long does implementation take?",
          answer: "Most businesses are up and running within 24-48 hours. Complex integrations with existing systems may take 1-2 weeks. We handle all the technical setup for you."
        }
      ]
    },
    {
      category: "Integration & Security",
      icon: <Settings className="h-5 w-5" />,
      faqs: [
        {
          question: "Can AI integrate with my existing systems?",
          answer: "Yes, we integrate with popular CRM systems, calendar applications, appointment scheduling software, and phone systems. We also offer API access for custom integrations."
        },
        {
          question: "Is my data secure?",
          answer: "Absolutely. We use enterprise-grade encryption, comply with GDPR and CCPA regulations, and maintain SOC 2 Type II certification. Your data is stored securely and never shared with third parties."
        },
        {
          question: "Can I keep my existing phone number?",
          answer: "Absolutely. We can work with your existing phone numbers and system, or provide new numbers if needed."
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>FAQ | AI Phone Answering Service Questions & Help</title>
        <meta name="description" content="Frequently asked questions about AI phone answering service, voice AI solutions, pricing, and implementation." />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="FAQ | The AI Call" />
        <meta property="og:description" content="Answers about AI phone answering service, pricing, and implementation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqCategories.flatMap(c => c.faqs).map(f => ({
              "@type": "Question",
              "name": f.question,
              "acceptedAnswer": { "@type": "Answer", "text": f.answer }
            }))
          })}
        </script>
      </Helmet>
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-20 text-center">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Frequently Asked Questions</h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about our AI phone answering service, implementation, and pricing.
          </p>
        </header>

        <div className="max-w-4xl mx-auto mb-12">
          <img
            src={faqHero}
            alt="Glowing question mark illustrating common questions"
            className="rounded-2xl shadow-xl w-full object-cover aspect-video"
            width={1280}
            height={720}
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* FAQ Categories */}
        <div className="grid gap-8 max-w-4xl mx-auto">
          {faqCategories.map((category, i) => (
            <Card key={i} className="text-left">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  {category.icon}
                  {category.category}
                </CardTitle>
                <CardDescription>
                  Common questions about {category.category.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq, j) => (
                    <AccordionItem key={j} value={`item-${i}-${j}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-2xl border border-primary/20">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6">
            Our team is here to help you understand how AI can transform your business communications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/contact">Contact Our Team</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/demo">Book Free Demo</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}