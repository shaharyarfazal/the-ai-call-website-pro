import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, FileText, Brain, TrendingUp, Zap, Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import blogTemplateImg from '@/assets/blog-voice-ai.jpg';

export default function BlogPostTemplate() {
  const canonical = getCanonicalUrl('/resources/blog-post-template');

  const template = [
    {
      title: "Headline: Capture the essence in 60 characters",
      type: "h1",
      desc: "Include your primary keyword naturally. Make it compelling with numbers or power words."
    },
    {
      title: "Introduction: Hook + Promise (150-200 words)",
      type: "p",
      desc: "Start with a relatable problem, state what the reader will learn, and include the primary keyword in the first 100 words."
    },
    {
      title: "Main Body: 3-5 Subsections (400-600 words)",
      type: "h2",
      desc: "Each subsection should have a clear heading, explanation, examples, and actionable takeaways. Include secondary keywords."
    },
    {
      title: "Case Study / Example: Real Results (100-150 words)",
      type: "div",
      desc: "Include a specific example with measurable results to build credibility and trust."
    },
    {
      title: "Conclusion + CTA (100-150 words)",
      type: "p",
      desc: "Summarize key takeaways and include a clear call-to-action: book a demo, download a guide, or contact sales."
    }
  ];

  const seoTips = [
    "Include primary keyword in title, first paragraph, and URL slug",
    "Write meta description under 155 characters with a CTA",
    "Use H2/H3 headers with secondary keywords",
    "Include 2-3 internal links to related pages",
    "Add alt text to all images with descriptive keywords",
    "Target 1500+ words for comprehensive coverage",
    "Include a FAQ section for featured snippet opportunity"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Blog Post Template | SEO-Optimized Voice AI Content Guide</title>
        <meta name="description" content="SEO-optimized blog post template for Voice AI content. Learn the exact structure, SEO tips, and best practices for ranking blog posts." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Header />
      <main className="flex-grow">
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <Badge variant="secondary" className="mb-6">Resource</Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Blog Post Template
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Our proven blog post template structure that ranks on Google and converts readers into customers.
            </p>
          </div>
        </section>
        <section className="py-20 px-4 bg-card/30">
          <div className="container mx-auto max-w-4xl space-y-8">
            {template.map((t, i) => (
              <div key={i} className="flex gap-4 items-start">
                <Badge variant="secondary" className="flex-shrink-0">{t.type.toUpperCase()}</Badge>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t.title}</h3>
                  <p className="text-muted-foreground">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">SEO Best Practices</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {seoTips.map((tip, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 px-4 bg-card/30">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-6">Want Us to Write Your Blog?</h2>
            <p className="text-xl text-muted-foreground mb-8">Get SEO-optimized content that ranks and converts.</p>
            <Button size="lg" asChild><Link to="/contact">Contact Sales</Link></Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
