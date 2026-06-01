import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ShoppingBag, Phone, Tag, Users, Zap, ArrowRight, TrendingUp, Clock, BarChart3 } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import ecommerceHeroImg from '@/assets/ecommerce-hero.jpg';
import ecommercePhoneImg from '@/assets/hero-ai-phone.jpg';
import ecommerceResultsImg from '@/assets/about-team.jpg';

export default function EcommerceCaseStudy() {
  const canonical = getCanonicalUrl('/industries/ecommerce-case-study');

  const results = [
    {
      stat: "52%",
      label: "Revenue increase from AI leads",
      icon: <TrendingUp className="h-8 w-8 text-primary" />
    },
    {
      stat: "$85K",
      label: "Recovered from abandoned carts",
      icon: <ShoppingBag className="h-8 w-8 text-primary" />
    },
    {
      stat: "3.2s",
      label: "Average response time",
      icon: <Clock className="h-8 w-8 text-primary" />
    },
    {
      stat: "4.8/5",
      label: "Customer satisfaction rating",
      icon: <BarChart3 className="h-8 w-8 text-primary" />
    }
  ];

  const caseStudy1 = {
    title: "LuxeWear Fashion Retailer",
    challenge: "72% cart abandonment rate, 500+ daily support queries overwhelming the team.",
    solution: "Deployed AI shopping assistant with product recommendations and automated cart recovery.",
    outcome: "Cart abandonment dropped to 28%, recovered $85K monthly, and sales team focused on high-value customers.",
    quote: "The AI handles our volume during flash sales without breaking a sweat. Revenue grew 38% in 3 months.",
    quoteAuthor: "Jessica Lee, VP of E-Commerce"
  };

  const caseStudy2 = {
    title: "TechGear Online Store",
    challenge: "Complex tech products requiring detailed explanations; customers bouncing before purchase.",
    solution: "Implemented AI product advisor that answers technical questions and recommends compatible items.",
    outcome: "Conversion rate jumped from 1.2% to 3.8%, average order value increased by $120, support tickets dropped 65%.",
    quote: "Our customers get expert-level guidance 24/7. The AI even suggests accessories they forgot to add.",
    quoteAuthor: "David Park, Founder & CEO"
  };

  const features = [
    {
      icon: <Tag className="h-8 w-8 text-primary" />,
      title: "Personalized Recommendations",
      description: "AI analyzes browsing patterns and purchase history to suggest the perfect products for each visitor."
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-primary" />,
      title: "Smart Cart Recovery",
      description: "Automated personalized follow-ups for abandoned carts with targeted incentives and product reminders."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Upsell & Cross-sell",
      description: "Intelligent product pairing suggestions that increase average order value without feeling pushy."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>E-commerce AI Case Study | Revenue Results from AI Shopping Assistants</title>
        <meta name="description" content="See how online retailers increased revenue by 52% and reduced cart abandonment by 60% with AI shopping assistants. Real ecommerce case studies." />
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
                  E-commerce Case Study
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  E-commerce AI Success Stories
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Real revenue results from real online retailers. See how AI shopping assistants are transforming e-commerce conversion rates and customer experiences.
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
                  src={ecommerceHeroImg}
                  alt="E-commerce platform with AI assistant"
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
                Impact Across E-commerce
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Aggregated results from 100+ online retailers using our AI assistant platform.
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
                src={ecommercePhoneImg}
                alt="E-commerce AI results"
                className="rounded-2xl shadow-xl w-full object-cover aspect-square"
                loading="lazy"
                width={800}
                height={800}
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src={ecommerceResultsImg}
                  alt="E-commerce revenue growth"
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
                src={ecommerceResultsImg}
                alt="E-commerce success story"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
                loading="lazy"
                width={1280}
                height={720}
              />
              <div className="relative bg-gradient-to-r from-background/90 to-background/70 p-12 text-center">
                <Zap className="h-16 w-16 text-primary mx-auto mb-6" />
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Grow Your E-commerce Revenue?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join the online retailers already 52% more revenue with AI shopping assistants.
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
