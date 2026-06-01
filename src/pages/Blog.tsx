import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Share2, Facebook, Twitter, Linkedin, Copy, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Helmet } from 'react-helmet-async';
import blogHeaderImg from '@/assets/blog-voice-ai.jpg';
import { supabase } from '@/integrations/supabase/client';

const shareIcons = [
  { icon: Twitter, label: "Twitter" },
  { icon: Facebook, label: "Facebook" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Copy, label: "Copy Link" },
];

export default function Blog() {
  const canonical = typeof window !== 'undefined' ? window.location.href : 'https://example.com/blog';
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [supabaseBlogs, setSupabaseBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setSupabaseBlogs(data);
      }
    };
    fetchBlogs();
  }, []);

  const handleCopy = (index: number) => {
    const url = window.location.href;
    navigator.clipboard?.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const displayBlogs = supabaseBlogs.map(blog => {
    // Generate clean excerpt if not present
    const cleanExcerpt = blog.excerpt || (blog.content ? blog.content.replace(/<[^>]+>/g, '').substring(0, 150) + '...' : '');
    
    // Set customized default categories based on slug/title for dynamic aesthetics
    let category = "Voice AI";
    const slug = blog.slug || "";
    if (slug.includes("agency")) category = "Voice AI Agency";
    else if (slug.includes("outbound") || slug.includes("calling")) category = "AI Phone Automation";
    else if (slug.includes("medical") || slug.includes("clinic") || slug.includes("healthcare")) category = "Healthcare";
    else if (slug.includes("real-estate") || slug.includes("property")) category = "Real Estate";
    else if (slug.includes("gohighlevel") || slug.includes("ghl")) category = "CRM Integration";

    // Dynamic but consistent likes count
    let likes = 128;
    if (slug.includes("agency")) likes = 245;
    else if (slug.includes("outbound")) likes = 189;
    else if (slug.includes("medical")) likes = 312;
    else if (slug.includes("real-estate")) likes = 412;
    else if (slug.includes("gohighlevel")) likes = 378;

    return {
      id: blog.slug || blog.id,
      title: blog.title,
      excerpt: cleanExcerpt,
      date: blog.published_at ? new Date(blog.published_at).toISOString().split('T')[0] : new Date(blog.created_at).toISOString().split('T')[0],
      author: "AI Call Team",
      readTime: "6 min read",
      category,
      likes
    };
  });

  const relatedPosts = displayBlogs.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Voice AI Blog | News, Tips, and Case Studies (USA)</title>
        <meta name="description" content="Simple articles on voice AI for business, automated phone systems, and customer service across the USA." />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Voice AI Blog | The AI Call" />
        <meta property="og:description" content="Articles on voice AI for business, automated phone systems, and customer service." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
      </Helmet>
      <Header />
      <main className="flex-grow">
        <section className="pt-32 pb-10 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Voice AI Blog</h1>
              <p className="mt-4 text-lg text-primary">Insights, Tips, and Industry News</p>
              <p className="mt-2 text-muted-foreground max-w-3xl mx-auto">
                Stay updated with the latest trends in voice AI technology, business automation, 
                and success stories from our clients across the USA.
              </p>
            </div>

            <div className="mb-12 animate-fade-in">
              <img src={blogHeaderImg} alt="Voice AI technology concept" className="rounded-2xl shadow-xl w-full object-cover aspect-video" width={1280} height={720} />
            </div>
          </div>
        </section>

        {/* Blog Posts - Card Layout */}
        <section className="py-10 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayBlogs.map((post, index) => (
                <Card key={index} className="animate-fade-in flex flex-col hover:border-primary/50 transition-colors" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <Badge className="w-fit mb-2" variant="secondary">{post.category}</Badge>
                    <CardTitle className="line-clamp-2 text-xl hover:text-primary transition-colors">
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm text-muted-foreground">{post.readTime}</span>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Heart className="h-4 w-4" />
                          {post.likes}
                        </span>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/blog/${post.id}`}>
                            Read More <ArrowRight className="h-4 w-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Related Posts Section */}
        <section className="py-20 px-4 bg-card/30">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">More to Explore</h2>
              <p className="text-muted-foreground">Check out these related resources</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((post, index) => (
                <Card key={index} className="border-border">
                  <CardHeader><CardTitle className="text-lg">{post.title}</CardTitle></CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                      <span>{post.readTime}</span>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="/resources">Read More <ArrowRight className="h-4 w-4 ml-1" /></Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Share & CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Want to Share Your Story?</h2>
                <p className="text-muted-foreground mb-8 text-lg">Have you implemented voice AI in your business? We'd love to feature your success story on our blog.</p>
                <Button size="lg" asChild><Link to="/contact">Contact Us</Link></Button>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Share this page:</h3>
                <div className="flex gap-3">
                  {shareIcons.map((s, i) => (
                    <Button key={i} variant="outline" size="icon" onClick={() => i === 3 && handleCopy(i)} title={s.label}>
                      <s.icon className="h-5 w-5" />
                    </Button>
                  ))}
                  {copiedIndex === 3 && <span className="text-sm text-primary ml-2">Copied!</span>}
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
