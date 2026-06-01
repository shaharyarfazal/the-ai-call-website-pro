import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from '@/components/ui/accordion';
import {
  Linkedin, Database, Phone, Mail, MessageSquare, Workflow, Bot, Calendar,
  CheckCircle2, Sparkles, Users, Zap,
} from 'lucide-react';
import heroImg from '@/assets/ai-crm-case-study-hero.jpg';
import { getCanonicalUrl } from '@/lib/seo';

const agents = [
  {
    icon: Linkedin,
    title: 'LinkedIn Lead Generation Agent',
    desc: 'Continuously scrapes and discovers targeted B2B leads from LinkedIn, filtered by industry, state, company type, and location.',
    points: ['Autonomous LinkedIn scraping', 'Industry & geo filters', 'Runs 24/7 in background', 'Fresh leads pushed to CRM'],
  },
  {
    icon: Database,
    title: 'Lead Enrichment Agent',
    desc: 'Enriches every lead with websites, emails, phones, socials, company info, and job roles for precise targeting.',
    points: ['Email & phone discovery', 'Social profile lookup', 'Company data enrichment', 'Role & seniority detection'],
  },
  {
    icon: Phone,
    title: 'AI Calling Agent',
    desc: 'Performs human-like outbound calls, books meetings, summarises conversations, and tracks every outcome.',
    points: ['Human-like voice calls', 'Calendar booking', 'Call summaries & outcomes', 'Cal.com / Google Calendar sync'],
  },
  {
    icon: Mail,
    title: 'AI Email Outreach Agent',
    desc: 'Sends hyper-personalised cold emails using enriched lead data, with full activity tracking inside the CRM.',
    points: ['Personalised sequences', 'Open & reply tracking', 'CRM activity logging', 'Auto follow-ups'],
  },
  {
    icon: MessageSquare,
    title: 'AI SMS Agent',
    desc: 'Runs personalised SMS campaigns and two-way messaging via Twilio and verified providers.',
    points: ['Personalised text campaigns', 'Automated follow-ups', 'Two-way messaging', 'Twilio integration'],
  },
];

const workflow = [
  'AI scrapes LinkedIn leads',
  'AI enriches contact data',
  'AI personalises outreach',
  'AI calls prospects',
  'AI sends emails & SMS',
  'AI books appointments',
  'Everything syncs inside the CRM',
];

const features = [
  { icon: Bot, title: 'Autonomous Operation', desc: 'Runs 24/7 without manual effort.' },
  { icon: Sparkles, title: 'Hyper-Personalised Outreach', desc: 'Every interaction tailored using enriched data.' },
  { icon: Users, title: 'Omnichannel Communication', desc: 'Calls, emails, SMS, and CRM in one system.' },
  { icon: Calendar, title: 'AI Appointment Booking', desc: 'Meetings booked directly into your calendar.' },
  { icon: Zap, title: 'Scalable Lead Generation', desc: 'Continuously generates fresh B2B leads.' },
  { icon: Workflow, title: 'Unified Workflow', desc: 'All agents collaborate inside a single ecosystem.' },
];

const technologies = [
  'OpenAI', 'Voice AI', 'LinkedIn Automation', 'CRM Automation', 'Twilio', 'Cal.com',
  'Multi-Agent AI', 'Workflow Automation', 'Custom APIs', 'Google Calendar',
];

const faqs = [
  { q: 'What is an AI CRM?', a: 'An AI CRM combines a traditional contact database with autonomous AI agents that actively generate, enrich, and engage leads across calls, email, and SMS — instead of just storing data.' },
  { q: 'How are the AI agents different from each other?', a: 'Each agent owns a single job: scraping, enrichment, calling, email, or SMS. They share data through the CRM so the next agent always picks up the freshest context.' },
  { q: 'Can it integrate with my existing tools?', a: 'Yes. The system connects to HubSpot, Salesforce, Pipedrive, Zoho, Google Calendar, Cal.com, Twilio, and most modern APIs.' },
  { q: 'How long does deployment take?', a: 'Most clients are live in 2–4 weeks. We configure agents, integrations, and personalisation templates around your ICP.' },
  { q: 'Is the outreach compliant?', a: 'Yes. We follow opt-out, calling-window, and regional compliance rules (TCPA, GDPR) and integrate verified senders for email and SMS.' },
];

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'AI CRM Case Study: Multi-Agent Lead Generation & Outreach',
  description: 'How we built a 24/7 AI-powered CRM with autonomous agents for lead generation, enrichment, calling, email, and SMS outreach.',
  image: heroImg,
  author: { '@type': 'Organization', name: 'The AI Call' },
  publisher: { '@type': 'Organization', name: 'The AI Call' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function AiCrmCaseStudy() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>AI CRM Case Study | Multi-Agent Lead Generation</title>
        <meta name="description" content="See how we built a 24/7 AI CRM with autonomous agents for LinkedIn lead gen, enrichment, AI calling, email, and SMS outreach." />
        <link rel="canonical" href={getCanonicalUrl('/case-studies/ai-crm-multi-agent')} />
        <meta property="og:title" content="AI CRM Case Study | Multi-Agent Lead Generation" />
        <meta property="og:description" content="A custom AI CRM with autonomous agents that scrape, enrich, call, email, and book — 24/7." />
        <meta property="og:image" content={heroImg} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 pt-32 pb-20 text-center">
        {/* Hero */}
        <section className="max-w-4xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-4">Case Study</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            AI CRM Powered by Autonomous AI Agents
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            How we built a 24/7 AI-powered lead generation & outreach engine.
          </p>
          <p className="text-base text-muted-foreground mb-8 max-w-2xl mx-auto">
            An intelligent AI CRM that continuously scrapes leads, enriches data, makes outbound AI calls,
            sends hyper-personalised emails, and books appointments — automatically.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg"><Link to="/book-appointment">Book a Demo</Link></Button>
            <Button asChild size="lg" variant="outline"><Link to="/demo">Talk to an AI Agent</Link></Button>
            <Button asChild size="lg" variant="ghost"><Link to="/dashboard">See Live Dashboard</Link></Button>
          </div>
        </section>

        {/* Loom video */}
        <section className="max-w-5xl mx-auto mb-16">
          <div style={{ position: 'relative', paddingBottom: '64.62829736211032%', height: 0 }} className="rounded-2xl overflow-hidden shadow-xl border border-border">
            <iframe
              src="https://www.loom.com/embed/b8b6ca431d3b47f1972f191ca82ad90f"
              title="AI CRM Multi-Agent Case Study Walkthrough"
              loading="lazy"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            />
          </div>
        </section>

        {/* Hero image */}
        <section className="max-w-5xl mx-auto mb-20">
          <img
            src={heroImg}
            alt="AI CRM dashboard with multiple autonomous AI agents collaborating"
            className="rounded-2xl shadow-xl w-full object-cover aspect-video"
            width={1280}
            height={720}
            loading="lazy"
            decoding="async"
          />
        </section>

        {/* Problem */}
        <section className="max-w-3xl mx-auto mb-20 text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">The Problem</h2>
          <p className="text-muted-foreground mb-4 text-center">Most businesses struggle with:</p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              'Manually finding qualified leads',
              'Researching contact details',
              'Personalising outreach at scale',
              'Following up consistently',
              'Managing disconnected outreach systems',
            ].map((p) => (
              <li key={p} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-foreground font-medium">
            Traditional CRMs only store data. They don't actively generate pipeline.
          </p>
        </section>

        {/* Solution / Architecture */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Solution</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            A custom AI-powered CRM with multiple autonomous AI agents collaborating inside one ecosystem —
            each owning a specific task in the outbound sales workflow.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {agents.map((a) => (
              <Card key={a.title} className="border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <a.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{a.title}</CardTitle>
                  <CardDescription>{a.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {a.points.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Workflow */}
        <section className="mb-20 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">The Workflow</h2>
          <ol className="grid md:grid-cols-2 gap-4 text-left">
            {workflow.map((step, i) => (
              <li key={step} className="flex items-start gap-4 p-4 rounded-lg border border-border bg-card">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  {i + 1}
                </span>
                <span className="pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Key features */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {features.map((f) => (
              <Card key={f.title}>
                <CardHeader>
                  <div className="mb-3"><f.icon className="h-8 w-8 text-primary" /></div>
                  <CardTitle className="text-xl">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{f.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Technologies */}
        <section className="mb-20 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Technologies Used</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {technologies.map((t) => (
              <Badge key={t} variant="secondary" className="text-sm px-3 py-1">{t}</Badge>
            ))}
          </div>
        </section>

        {/* Results */}
        <section className="mb-20 max-w-3xl mx-auto text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Results & Impact</h2>
          <ul className="space-y-3 text-muted-foreground">
            {[
              'Continuous lead generation',
              'Automated outbound outreach',
              'Reduced manual prospecting',
              'Faster appointment booking',
              'Scalable B2B automation',
              'Centralised outreach management',
            ].map((r) => (
              <li key={r} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="mb-20 max-w-3xl mx-auto text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">FAQ</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Final CTA */}
        <section className="max-w-3xl mx-auto rounded-2xl border border-border bg-card p-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Build Your Own AI Sales Engine</h2>
          <p className="text-muted-foreground mb-8">
            We help businesses deploy custom AI agents for calling, lead generation, CRM automation,
            appointment setting, outbound sales, and omnichannel outreach.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg"><Link to="/book-appointment">Book a Strategy Call</Link></Button>
            <Button asChild size="lg" variant="outline"><Link to="/demo-request">Request a Demo</Link></Button>
            <Button asChild size="lg" variant="ghost"><Link to="/demo">Speak With Our AI Agent</Link></Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
