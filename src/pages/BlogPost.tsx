import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Helmet } from 'react-helmet-async';
import { 
  Calendar, 
  User, 
  ArrowLeft, 
  MessageSquare, 
  Linkedin, 
  Facebook, 
  Twitter, 
  Send, 
  Copy, 
  Check,
  Play,
  ArrowRight,
  Video
} from 'lucide-react';
import blogHeaderImg from '@/assets/blog-voice-ai.jpg';

interface Comment {
  name: string;
  role?: string;
  body: string;
  created_at: string;
  isAdmin?: boolean;
}

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // Comments state
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        // Query database by slug first
        let { data, error } = await (supabase as any)
          .from('blogs')
          .select('*')
          .eq('slug', id)
          .maybeSingle();

        // Fallback to UUID matching if not found by slug and if the id is a valid UUID
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id || "");
        if (!data && isUuid) {
          const { data: fallback } = await (supabase as any)
            .from('blogs')
            .select('*')
            .eq('id', id)
            .maybeSingle();
          if (fallback) {
            data = fallback;
          }
        }

        if (data) {
          setBlog(data);
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  // Load and seed comments from localStorage
  useEffect(() => {
    if (!blog) return;
    const blogKey = blog.slug || blog.id;
    const saved = localStorage.getItem(`blog_comments_${blogKey}`);
    if (saved) {
      setComments(JSON.parse(saved));
    } else {
      let seed: Comment[] = [];
      if (blog.slug === 'how-to-choose-the-best-voice-ai-agency-for-your-business') {
        seed = [
          {
            name: "David K.",
            role: "Operations Director",
            body: "Absolutely brilliant guide. We've been looking to integrate Retell AI into our HubSpot workspace and finding the right agency is a huge challenge. The sub-second latency thresholds you mentioned are exactly what we have struggled with on other standard platforms.",
            created_at: "2026-05-20T10:14:00Z"
          },
          {
            name: "Sarah Jenkins",
            role: "E-commerce Founder",
            body: "We partnered with The AI Call last month and our missed call rates dropped to absolute zero. Can confirm their system responds in under a second and qualifies leads beautifully!",
            created_at: "2026-05-21T08:32:00Z"
          }
        ];
      } else if (blog.slug === 'step-by-step-guide-how-to-set-up-outbound-ai-calling') {
        seed = [
          {
            name: "Marcus Thorne",
            role: "CTO, SaaS Platform",
            body: "Is there any specific rate limiting or concurrent call thresholds on Twilio outbound calls when triggering them via Supabase Edge Functions? Really great technical write-up!",
            created_at: "2026-05-19T14:22:00Z"
          },
          {
            name: "Shaharyar Fazal",
            role: "The AI Call Team",
            body: "Great question Marcus! Yes, Twilio restricts outbound rate to 1 call per second (CPS) per trunk by default. Inside the edge function, we manage queuing structures, and for enterprise clients, we deploy Elastic SIP Trunks with pre-approved high concurrency limits (up to 100+ CPS). This is fully managed automatically on our end.",
            created_at: "2026-05-19T16:05:00Z",
            isAdmin: true
          }
        ];
      } else if (blog.slug === 'why-every-medical-clinic-needs-an-ai-voice-receptionist-in-2026') {
        seed = [
          {
            name: "Dr. Robert Chen, MD",
            role: "Clinic Director",
            body: "Patient health data (PHI) compliance was our primary barrier when checking conversational tools. It is highly reassuring to see that your voice receptionists utilize HIPAA-compliant end-to-end encrypted databases.",
            created_at: "2026-05-16T11:45:00Z"
          }
        ];
      } else if (blog.slug === 'ai-voice-agents-in-real-estate-automating-cold-calling') {
        seed = [
          {
            name: "Jessica R.",
            role: "Broker Associate",
            body: "This is exactly what our brokerage has been looking for. The speed-to-lead factor is huge for Zillow leads. Can this integrate with Follow Up Boss?",
            created_at: "2026-05-21T09:14:00Z"
          },
          {
            name: "Shaharyar Fazal",
            role: "The AI Call Team",
            body: "Hi Jessica, yes absolutely! We build custom webhook integrations that push the call transcripts, summaries, and tags directly into Follow Up Boss in real-time.",
            created_at: "2026-05-21T09:30:00Z",
            isAdmin: true
          }
        ];
      }
      setComments(seed);
      localStorage.setItem(`blog_comments_${blogKey}`, JSON.stringify(seed));
    }
  }, [blog]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentBody.trim() || !blog) return;

    const newComment: Comment = {
      name: commentName,
      role: commentEmail.trim() ? "Verified Professional" : "Visitor",
      body: commentBody,
      created_at: new Date().toISOString(),
    };

    const blogKey = blog.slug || blog.id;
    const updated = [...comments, newComment];
    setComments(updated);
    localStorage.setItem(`blog_comments_${blogKey}`, JSON.stringify(updated));

    setCommentName("");
    setCommentEmail("");
    setCommentBody("");
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 5000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-foreground">
        Loading...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center pt-32">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <Button asChild>
            <Link to="/blog">Return to Blog</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const isDirectVideo = (url: string) => {
    if (!url) return false;
    const path = url.split("?")[0].toLowerCase();
    return path.endsWith(".mp4") || path.endsWith(".webm") || path.endsWith(".ogg") || path.endsWith(".mov");
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    let cleanUrl = url.trim();
    
    // YouTube Check
    if (cleanUrl.includes("youtube.com/watch")) {
      try {
        const urlObj = new URL(cleanUrl);
        const v = urlObj.searchParams.get("v");
        if (v) return `https://www.youtube.com/embed/${v}`;
      } catch (e) {
        const parts = cleanUrl.split("v=");
        if (parts.length > 1) {
          const id = parts[1].split("&")[0];
          return `https://www.youtube.com/embed/${id}`;
        }
      }
    }
    if (cleanUrl.includes("youtu.be/")) {
      const id = cleanUrl.split("youtu.be/")[1]?.split("?")[0];
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (cleanUrl.includes("youtube.com/embed/")) {
      return cleanUrl;
    }
    
    // Vimeo Check
    if (cleanUrl.includes("vimeo.com/")) {
      if (!cleanUrl.includes("player.vimeo.com")) {
        const id = cleanUrl.split("vimeo.com/")[1]?.split("?")[0];
        if (id) return `https://player.vimeo.com/video/${id}`;
      }
      return cleanUrl;
    }
    
    // Loom Check
    if (cleanUrl.includes("loom.com/share/")) {
      const id = cleanUrl.split("loom.com/share/")[1]?.split("?")[0];
      if (id) return `https://www.loom.com/embed/${id}`;
    }
    
    return cleanUrl;
  };

  const hasVideo = !!blog.video_url || blog.slug === "how-to-choose-the-best-voice-ai-agency-for-your-business";
  const rawVideoUrl = blog.video_url || (blog.slug === "how-to-choose-the-best-voice-ai-agency-for-your-business" ? "https://www.youtube.com/embed/8o4k9BqD2Kk" : "");

  const metaTitle = `${blog.title} | The AI Call Blog`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://theaicall.pro/blog/${id}`;
  const plainTextExcerpt = blog.excerpt || blog.content.replace(/<[^>]+>/g, '').substring(0, 160) + '...';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={plainTextExcerpt} />
        <link rel="canonical" href={shareUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={plainTextExcerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={shareUrl} />
        {blog.featured_image_url && <meta property="og:image" content={blog.featured_image_url} />}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={plainTextExcerpt} />
        {blog.featured_image_url && <meta name="twitter:image" content={blog.featured_image_url} />}

        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": blog.title,
            "description": plainTextExcerpt,
            "datePublished": blog.created_at,
            "author": { "@type": "Organization", "name": "The AI Call", "url": "https://theaicall.pro" },
            "publisher": { "@type": "Organization", "name": "The AI Call" },
            "mainEntityOfPage": shareUrl
          })}
        </script>
      </Helmet>

      <Header />
      <main className="flex-grow container mx-auto px-4 py-32 max-w-4xl">
        <Button asChild variant="ghost" className="mb-8 hover:bg-foreground/5 rounded-xl transition-all">
          <Link to="/blog" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Posts
          </Link>
        </Button>

        <article className="animate-fade-in mb-16">
          <div className="w-full aspect-video rounded-3xl overflow-hidden relative border border-foreground/[0.08] shadow-2xl mb-8 bg-black/60 group">
            {isPlayingVideo && hasVideo ? (
              isDirectVideo(rawVideoUrl) ? (
                <video
                  src={rawVideoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-cover animate-scale-in"
                />
              ) : (
                <iframe
                  src={`${getEmbedUrl(rawVideoUrl)}${getEmbedUrl(rawVideoUrl).includes('?') ? '&' : '?'}autoplay=1`}
                  title="Voice AI Demo Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0 animate-scale-in"
                />
              )
            ) : (
              <div className="relative w-full h-full">
                <img 
                  src={blog.featured_image_url || blogHeaderImg} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
                {hasVideo && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25 flex flex-col items-center justify-center p-6 text-center">
                    {/* Pulsing Play Button */}
                    <button
                      onClick={() => setIsPlayingVideo(true)}
                      className="relative z-10 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary text-black transition-all duration-300 shadow-[0_0_40px_hsl(32_100%_52%_/_0.5)] hover:shadow-[0_0_60px_hsl(32_100%_52%_/_0.8)] hover:scale-110 cursor-pointer"
                      title="Play Voice AI Demo"
                    >
                      <Play className="h-6 w-6 sm:h-8 sm:w-8 fill-black translate-x-0.5" />
                      <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                    </button>
                    
                    <div className="mt-4 sm:mt-6 max-w-md bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                      <p className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-white/90 font-sans flex items-center gap-2">
                        <Video className="h-4.5 w-4.5 text-primary animate-pulse" />
                        Watch Voice AI Agent Call Demo
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-[1.1] font-heading text-foreground font-sans">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-foreground/[0.06] mb-8 text-sm text-muted-foreground">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <time dateTime={blog.created_at}>
                  {new Date(blog.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <span>{blog.author_id ? "Author" : "Shaharyar Fazal"}</span>
              </div>
            </div>

            {/* Social Share Bar */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider mr-1 text-muted-foreground/75 font-sans">Share:</span>
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-foreground/[0.03] hover:bg-[#0077b5]/10 hover:text-[#0077b5] transition-all"
                title="Share on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a 
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(blog.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-foreground/[0.03] hover:bg-[#1da1f2]/10 hover:text-[#1da1f2] transition-all"
                title="Share on Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-foreground/[0.03] hover:bg-[#1877f2]/10 hover:text-[#1877f2] transition-all"
                title="Share on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <button 
                onClick={handleCopyLink}
                className="p-2 rounded-lg bg-foreground/[0.03] hover:bg-primary/10 hover:text-primary transition-all relative"
                title="Copy Link"
              >
                {copied ? <Check className="h-4 w-4 text-green-500 animate-scale-in" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div 
            className="prose prose-lg dark:prose-invert max-w-none 
              prose-headings:font-bold prose-headings:font-heading prose-headings:tracking-tight
              prose-a:text-primary hover:prose-a:text-primary/80 prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-2xl prose-img:shadow-md prose-blockquote:border-l-primary/40 prose-blockquote:bg-foreground/[0.01] prose-blockquote:p-4 prose-blockquote:rounded-r-xl"
            dangerouslySetInnerHTML={{ __html: marked.parse(blog.content || '') }}
          />
        </article>

        {/* Comments Board */}
        <section className="border-t border-foreground/[0.08] pt-12 mt-12">
          <div className="flex items-center gap-2.5 mb-8">
            <MessageSquare className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight font-heading">Discussion ({comments.length})</h2>
          </div>

          {/* Comments List */}
          <div className="space-y-6 mb-12">
            {comments.length === 0 ? (
              <p className="text-muted-foreground text-center py-6 bg-foreground/[0.01] border border-dashed border-foreground/[0.06] rounded-2xl">No comments yet. Start the conversation below!</p>
            ) : (
              comments.map((cmt, idx) => (
                <div 
                  key={idx} 
                  className={`p-5 rounded-2xl border transition-all duration-300 ${
                    cmt.isAdmin 
                      ? "bg-primary/[0.02] border-primary/15 shadow-sm shadow-primary/5" 
                      : "bg-background border-foreground/[0.06] hover:border-foreground/[0.12]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 ${
                        cmt.isAdmin ? "bg-primary" : "bg-gradient-to-br from-cyan-400 to-indigo-500"
                      }`}>
                        {cmt.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground text-sm">{cmt.name}</span>
                          {cmt.isAdmin && (
                            <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold tracking-wide uppercase font-sans">Author</span>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">{cmt.role || "Verified Professional"}</span>
                      </div>
                    </div>
                    <time className="text-xs text-muted-foreground/70">
                      {new Date(cmt.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                  <p className="text-foreground/90 text-sm leading-relaxed whitespace-pre-line pl-12">{cmt.body}</p>
                </div>
              ))
            )}
          </div>

          {/* Comment Form */}
          <div className="bg-foreground/[0.02] border border-foreground/[0.06] rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold mb-2 font-heading">Leave a Reply</h3>
            <p className="text-xs text-muted-foreground mb-6 font-sans">Your email address will not be published. Required fields are marked *</p>

            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <div>
                <label htmlFor="commentBody" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 mb-2 font-sans">Comment *</label>
                <textarea
                  id="commentBody"
                  required
                  rows={4}
                  value={commentBody}
                  onChange={(e) => setCommentBody(e.target.value)}
                  placeholder="Share your thoughts, experiences, or ask a question..."
                  className="w-full rounded-xl border border-foreground/[0.08] bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-200 resize-none font-sans"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="commentName" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 mb-2 font-sans">Name *</label>
                  <input
                    id="commentName"
                    type="text"
                    required
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-foreground/[0.08] bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-200 font-sans"
                  />
                </div>
                <div>
                  <label htmlFor="commentEmail" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 mb-2 font-sans">Email *</label>
                  <input
                    id="commentEmail"
                    type="email"
                    required
                    value={commentEmail}
                    onChange={(e) => setCommentEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-foreground/[0.08] bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-200 font-sans"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <Button 
                  type="submit" 
                  className="rounded-xl px-6 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-sm h-11 shadow-sm transition-all flex items-center gap-2 font-sans"
                >
                  <Send className="h-4 w-4" />
                  Post Comment
                </Button>

                {commentSuccess && (
                  <span className="text-sm font-medium text-green-500 animate-fade-in font-sans">✓ Comment posted successfully!</span>
                )}
              </div>
            </form>
          </div>
        </section>

        {/* Services CTA Section */}
        <section className="mt-20 py-16 px-6 sm:px-8 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/[0.03] via-transparent to-indigo-500/[0.02] relative overflow-hidden text-center mb-10 shadow-lg shadow-black/5">
          {/* Orange blur background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[400px] h-[200px] rounded-full bg-primary/[0.04] blur-[80px]" />
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-[10px] tracking-[0.4em] uppercase text-primary font-bold mb-4 inline-block">Transform Your Business</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 font-heading">
              Stop losing leads. <span className="text-primary">Start closing 24/7.</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
              Talk to our AI right now or book a free strategy session with our team to see how we'd build your custom agent.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/?startCall=true"
                className="w-full sm:w-auto group relative flex items-center justify-center gap-3 px-8 py-3.5 text-xs font-bold rounded-full text-black bg-primary hover:bg-primary/90 transition-all duration-300 shadow-[0_0_25px_hsl(32_100%_52%_/_0.4)] hover:shadow-[0_0_45px_hsl(32_100%_52%_/_0.6)] cursor-pointer"
              >
                <Play className="h-3.5 w-3.5 fill-black group-hover:scale-110 transition-transform duration-300" />
                <span>Talk With AI Now</span>
              </Link>
              <a
                href="/book-appointment"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-medium rounded-full text-foreground/80 border border-foreground/30 hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-300"
              >
                <span>Book Free Strategy Call</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
