import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, BookOpen, Brain, Languages, Shield, Zap, Clock, Users } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import aiGlossaryImg from '@/assets/automate-hero.jpg';

export default function AIGlossary() {
  const canonical = getCanonicalUrl('/resources/ai-glossary');

  const categories = [
    {
      title: "Voice AI Terms",
      icon: <Brain className="h-8 w-8 text-primary" />,
      terms: [
        { term: "Voice AI", def: "Artificial intelligence that can understand and generate human speech in real-time conversations." },
        { term: "NLP (Natural Language Processing)", def: "Technology that enables computers to understand, interpret, and generate human language." },
        { term: "TTS (Text-to-Speech)", def: "Technology that converts written text into natural-sounding spoken words." },
        { term: "ASR (Automatic Speech Recognition)", def: "Technology that transcribes spoken language into text in real-time." },
        { term: "Call Routing", def: "Directing incoming calls to the appropriate agent or system based on predefined criteria." },
      ]
    },
    {
      title: "AI Technology Terms",
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      terms: [
        { term: "Machine Learning", def: "AI subset where systems learn and improve from experience without being explicitly programmed." },
        { term: "LLM (Large Language Model)", def: "AI model trained on vast amounts of text to understand and generate human-like text." },
        { term: "RAG (Retrieval-Augmented Generation)", def: "AI technique that combines retrieval of external knowledge with generative AI responses." },
        { term: "LLM Fine-Tuning", def: "Training a pre-trained LLM on specialized data to improve performance on specific tasks." },
        { term: "Multi-Agent System", def: "Multiple AI agents working together to accomplish complex tasks collaboratively." },
      ]
    },
    {
      title: "Business & ROI Terms",
      icon: <Users className="h-8 w-8 text-primary" />,
      terms: [
        { term: "ROI (Return on Investment)", def: "Measurable benefit from an investment divided by the cost, expressed as a percentage." },
        { term: "SLA (Service Level Agreement)", def: "Commitment between service provider and customer specifying performance standards." },
        { term: "CPA (Cost Per Acquisition)", def: "Marketing cost to acquire one new customer through the AI system." },
        { term: "NPS (Net Promoter Score)", def: "Customer loyalty metric measuring likelihood to recommend your service." },
        { term: "FCR (First Call Resolution)", def: "Percentage of customer issues resolved on the first contact without follow-up." },
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Voice AI Glossary | Complete AI Technology Dictionary</title>
        <meta name="description" content="Complete glossary of Voice AI, NLP, LLM, and AI technology terms. Understand the language of AI with our comprehensive dictionary." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <Badge variant="secondary" className="mb-6">Resource Library</Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              AI Glossary
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Understand AI technology with our comprehensive glossary. From Voice AI basics to advanced NLP concepts, everything explained in plain English.
            </p>
            <Button size="lg" className="text-lg px-8 py-4" asChild>
              <Link to="/resources">Back to Resources</Link>
            </Button>
          </div>
        </section>

        {/* Glossary Sections */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl space-y-16">
            {categories.map((category, ci) => (
              <div key={ci}>
                <div className="flex items-center gap-4 mb-8">
                  {category.icon}
                  <h2 className="text-3xl font-bold">{category.title}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {category.terms.map((t, ti) => (
                    <Card key={ti} className="border-border hover:border-primary/50 transition-colors">
                      <CardHeader>
                        <CardTitle className="text-xl text-primary">{t.term}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base leading-relaxed">{t.def}</CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-card/30">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Still Have Questions?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Our AI experts are ready to help you understand how AI can transform your business.</p>
            <div className="flex flex-col sm:flex gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/demo">Talk to an Expert</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
