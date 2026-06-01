import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Phone, Brain, DollarSign, Clock, Shield, Users, Zap, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import faqImg from '@/assets/services-hero.jpg';

const faqs = [
  { q: "What is Voice AI and how does it work?", a: "Voice AI uses artificial intelligence to understand and generate human speech in real-time conversations. It combines Natural Language Processing (NLP) with speech recognition and synthesis to handle phone calls, chat, and voice interactions automatically." },
  { q: "How much can Voice AI reduce my call center costs?", a: "Businesses typically reduce call center costs by 40-60% with Voice AI. The exact savings depend on your call volume and complexity, but most clients see ROI within the first 3 months." },
  { q: "Can Voice AI handle complex customer inquiries?", a: "Yes! Modern Voice AI can handle complex inquiries by understanding context, accessing your knowledge base, and escalating to human agents when needed. It works best for common queries and progressively learns from interactions." },
  { q: "How long does it take to set up Voice AI?", a: "Our standard setup takes 48-72 hours. Custom integrations may take 1-2 weeks depending on your tech stack complexity. We handle everything from configuration to testing." },
  { q: "Is Voice AI HIPAA compliant?", a: "Yes, our platform is fully HIPAA compliant. We support encrypted communications, audit trails, and secure data handling required for healthcare applications." },
  { q: "Can Voice AI integrate with my existing CRM?", a: "Absolutely. We integrate natively with Salesforce, HubSpot, Pipedrive, and 500+ other platforms via Zapier. Custom API integrations are also supported." },
  { q: "What happens if Voice AI can't answer a question?", a: "The AI gracefully escalates the call to a human agent, transferring all conversation context so the customer doesn't have to repeat themselves." },
  { q: "Can Voice AI handle multiple languages?", a: "Yes! Our Voice AI supports 50+ languages with real-time translation. It can automatically detect the caller's language and respond accordingly." },
  { q: "How many calls can Voice AI handle simultaneously?", a: "Our platform scales to handle unlimited concurrent calls. Whether you need 10 or 100,000 simultaneous conversations, the system auto-scales to meet demand." },
  { q: "What kind of support do you provide?", a: "We provide 24/7 technical support, dedicated account management for enterprise clients, ongoing AI optimization, and regular performance reports." }
];

export default function FAQExpanded() {
  const canonical = getCanonicalUrl('/resources/faq-expanded');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Voice AI FAQ | Frequently Asked Questions About AI Voice</title>
        <meta name="description" content="Frequently asked questions about Voice AI. Learn about setup, pricing, integration, HIPAA compliance, and more." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Header />
      <main className="flex-grow">
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <Badge variant="secondary" className="mb-6">FAQ</Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">Everything you need to know about Voice AI. Can't find your answer? Contact our team.</p>
          </div>
        </section>
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-3xl">
            {faqs.map((faq, i) => (
              <div key={i} className="mb-4 border-b border-border pb-4 last:border-0">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex items-center justify-between w-full text-left py-4"
                >
                  <span className="text-xl font-semibold">{faq.q}</span>
                  {openIndex === i ? <ChevronUp className="h-5 w-5 text-primary" /> : <ChevronDown className="h-5 w-5 text-primary" />}
                </button>
                {openIndex === i && (
                  <p className="text-muted-foreground leading-relaxed pb-4">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>
        <section className="py-20 px-4 bg-card/30">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-6">Still Have Questions?</h2>
            <p className="text-xl text-muted-foreground mb-8">Our team is ready to help.</p>
            <div className="flex flex-col sm:flex gap-4 justify-center">
              <Button size="lg" asChild><Link to="/demo">Talk to an Expert</Link></Button>
              <Button variant="outline" size="lg" asChild><Link to="/contact">Contact Sales</Link></Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
