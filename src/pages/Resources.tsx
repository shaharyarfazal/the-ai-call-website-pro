import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Calculator, Users, BookOpen, Video, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import resourcesHero from '@/assets/resources-hero.jpg';

export default function Resources() {
  const canonical = getCanonicalUrl('/resources');
  
  const featuredResources = [
    {
      title: "AI Implementation Guide",
      description: "Complete guide to implementing AI phone systems in your business",
      type: "PDF Guide",
      size: "2.5 MB",
      downloads: "1,200+",
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      title: "ROI Calculator",
      description: "Calculate potential savings and ROI from AI phone automation",
      type: "Interactive Tool",
      size: "Web App",
      downloads: "3,500+",
      icon: <Calculator className="h-6 w-6" />
    },
    {
      title: "Case Studies Collection",
      description: "Real success stories from businesses using AI phone services",
      type: "PDF Collection",
      size: "4.1 MB",
      downloads: "850+",
      icon: <FileText className="h-6 w-6" />
    }
  ];

  const resourceCategories = [
    {
      title: "Implementation Guides",
      description: "Step-by-step guides for setting up AI phone systems",
      resources: [
        "Getting Started with Voice AI",
        "Integration Best Practices",
        "Customization Handbook",
        "Training Your AI Assistant"
      ],
      link: "/resources/integration-guides"
    },
    {
      title: "Case Studies",
      description: "Real-world examples of AI phone automation success",
      resources: [
        "Healthcare Practice Case Study",
        "Real Estate Agency Success Story",
        "E-commerce Support Transformation",
        "Law Firm Efficiency Gains"
      ],
      link: "/resources/case-studies"
    },
    {
      title: "Tools & Calculators",
      description: "Interactive tools to help plan your AI implementation",
      resources: [
        "ROI Calculator",
        "Cost Comparison Tool",
        "Feature Comparison Matrix",
        "Implementation Timeline Planner"
      ],
      link: "/resources/roi-calculator"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>AI Phone Service Resources | Implementation Guides & Case Studies</title>
        <meta name="description" content="Free resources for AI phone service implementation including guides, case studies, ROI calculators, and best practices." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-20 text-center">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Resources & Learning Center</h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            Everything you need to understand, implement, and optimize AI phone automation for your business.
          </p>
        </header>

        <div className="max-w-5xl mx-auto mb-16">
          <img
            src={resourcesHero}
            alt="Library of AI phone automation resources and guides"
            className="rounded-2xl shadow-xl w-full object-cover aspect-video"
            width={1280}
            height={720}
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Featured Resources */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8">Featured Resources</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredResources.map((resource, i) => (
              <Card key={i} className="relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary">Featured</Badge>
                </div>
                <CardHeader>
                  <div className="mb-4">{resource.icon}</div>
                  <CardTitle className="text-xl">{resource.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium">{resource.type}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Size:</span>
                      <span className="font-medium">{resource.size}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Downloads:</span>
                      <span className="font-medium">{resource.downloads}</span>
                    </div>
                    <Button asChild className="w-full mt-4">
                      <Link to={resource.type === "Interactive Tool" ? "/resources/roi-calculator" : "/resources/case-studies"} className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Access Resource
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Resource Categories */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8">Browse by Category</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {resourceCategories.map((category, i) => (
              <Card key={i} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {category.resources.map((resource, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                        {resource}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={category.link} className="flex items-center gap-2">
                      View All
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 p-12 rounded-2xl border border-primary/20">
          <h2 className="text-3xl font-bold mb-4">Need Personalized Guidance?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our experts are ready to help you choose the right AI solution and create a custom implementation plan for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4" asChild>
              <Link to="/contact">
                Speak with an Expert
                <Users className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
              <Link to="/demo">Book Free Demo</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}