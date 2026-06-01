
import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Users, Target, Award, Zap } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import aboutTeamImg from '@/assets/about-team.jpg';
import aiVoiceCoreImg from '@/assets/ai-voice-core.jpg';

export default function About() {
  const canonical = getCanonicalUrl('/about');
  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>About The AI Call | Voice AI for Business (USA)</title>
        <meta name="description" content="We build simple voice AI for business. Answer calls, book meetings, and automate support for US companies." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Header />
      <main className="flex-grow">
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About TheAICall.pro</h1>
          <p className="mt-4 text-lg text-primary">The Best Voice Bot Company</p>
          <p className="mt-2 text-muted-foreground max-w-3xl mx-auto">
            We are a custom AI automation agency, not a self-serve SaaS platform. 
            We manually build, deploy, and manage bespoke voice AI systems so you don't have to write a single line of code.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Expert Team</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">AI specialists and voice technology experts dedicated to your success.</p>
            </CardContent>
          </Card>

          <Card className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <Target className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Focused Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Tailored voice AI solutions that address your specific business needs.</p>
            </CardContent>
          </Card>

          <Card className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Proven Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Track record of helping businesses increase efficiency and reduce costs.</p>
            </CardContent>
          </Card>

          <Card className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>24/7 Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Round-the-clock support to ensure your voice AI solutions run smoothly.</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Technology Showcase Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 animate-fade-in" style={{ animationDelay: '0.45s' }}>
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Our Core Engine Technology</h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              We leverage custom-tuned language models paired with high-performance voice pipelines to deliver human-like conversation latency and execution.
            </p>
            <div className="space-y-6">
              {[
                {
                  title: "Sub-Second Latency Pipeline",
                  desc: "Proprietary real-time audio streams enable conversational responses in less than 950ms, mimicking natural human cadence."
                },
                {
                  title: "State-of-the-Art Neural Synthesis",
                  desc: "Hyper-realistic voice output matched with customized emotion cues that build trust, credibility, and brand authority."
                },
                {
                  title: "Enterprise Grade Compliance & Trust",
                  desc: "HIPAA, PCI-DSS ready security layers ensuring maximum protection for client credentials and sensitive lead capture logs."
                }
              ].map((tech, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl border border-foreground/[0.04] bg-card/30 hover:bg-card/50 transition-all duration-300">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{tech.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{tech.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-foreground/[0.08] relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300 z-10" />
            <img 
              src={aiVoiceCoreImg} 
              alt="Advanced AI voice interaction core network showing neural nodes" 
              className="w-full object-cover aspect-square hover:scale-[1.03] transition-transform duration-700" 
              width={800} 
              height={800} 
              loading="lazy"
            />
          </div>
        </div>

        <div className="mb-20 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <header className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Our Collaborative Workspace</h2>
            <p className="text-muted-foreground mt-2">Designing the future of human-agent collaboration.</p>
          </header>
          <img src={aboutTeamImg} alt="The AI Call team collaborating in a modern office" className="rounded-2xl shadow-xl w-full object-cover aspect-video border border-foreground/[0.06]" width={1280} height={720} />
        </div>

        {/* Upwork Certified Partner & Trust Section */}
        <div className="mb-20 p-8 sm:p-10 rounded-2xl border border-[#14a800]/20 bg-[#14a800]/5 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '0.52s' }}>
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 bg-[#14a800]/15 px-3 py-1.5 rounded-full text-[#14a800] text-xs font-semibold mb-4 border border-[#14a800]/25">
                <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                Upwork Top Rated Plus Specialist
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">A Certified Voice AI Partner</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our Lead Architect, Shaharyar Fazal (Sherry), is recognized in the top 3% of global specialists on Upwork. With a <strong>100% Job Success Score</strong> and a stellar track record of voice agent implementations, we guarantee robust enterprise quality.
              </p>
              <a 
                href="https://www.upwork.com/freelancers/sherry" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-sm font-semibold text-[#14a800] hover:text-[#14a800]/80 transition-colors gap-1.5 group/link"
              >
                <span>View Verified Upwork Credentials</span>
                <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
              </a>
            </div>
            
            <div className="grid grid-cols-2 gap-4 lg:border-l lg:border-foreground/[0.08] lg:pl-8">
              {[
                { value: "100%", label: "Job Success" },
                { value: "5.0★", label: "Client Rating" },
                { value: "Top Rated+", label: "Upwork Status" },
                { value: "30+", label: "Voice Deploys" }
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded-xl border border-foreground/[0.03] bg-card/45 text-center">
                  <div className="text-2xl font-bold text-foreground tracking-tight">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center animate-fade-in" style={{ animationDelay: '0.58s' }}>
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses that trust TheAICall.pro for their voice AI needs. 
            Let's discuss how we can help you achieve your goals.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/book-appointment">Book a Demo</Link>
            </Button>
          </div>
        </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
