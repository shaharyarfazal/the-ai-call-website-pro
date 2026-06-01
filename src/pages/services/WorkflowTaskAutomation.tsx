import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Workflow, Zap, Users, BarChart3, CheckCircle, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import workflowHeroImg from '@/assets/workflow-automation-hero.jpg';

export default function WorkflowTaskAutomation() {
  const canonical = getCanonicalUrl('/services/workflow-task-automation');

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Workflow & Task Automation | AI-Driven Productivity Solutions</title>
        <meta name="description" content="Boost productivity with AI-driven workflow and voice-powered task management. Process automation, task prioritization, team coordination, and progress tracking." />
        <meta name="keywords" content="workflow automation, task automation, AI productivity, process automation, team coordination" />
        <link rel="canonical" href={canonical} />
        
        <meta property="og:title" content="Workflow & Task Automation | AI-Driven Productivity Solutions" />
        <meta property="og:description" content="Boost productivity with AI-driven workflow and voice-powered task management. Process automation, task prioritization, team coordination, and progress tracking." />
        <meta property="og:type" content="service" />
        <meta property="og:url" content={canonical} />
      </Helmet>
      
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-32 pb-16 sm:pt-40 sm:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Workflow & Task Automation
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Boost productivity with AI-driven workflow automation and voice-powered task management 
                solutions designed specifically for small and medium enterprises.
              </p>
              <div className="flex gap-4">
                <Button asChild size="lg">
                  <Link to="/demo">Learn More</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img src={workflowHeroImg} alt="Workflow automation with interconnected processes" className="w-full object-cover aspect-video" width={1280} height={720} />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <header className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Comprehensive Automation Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Streamline every aspect of your business operations with intelligent automation.
              </p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Process Automation",
                  description: "Automate repetitive tasks and business processes to free up valuable time for strategic work."
                },
                {
                  icon: BarChart3,
                  title: "Task Prioritization",
                  description: "AI-powered priority scoring helps teams focus on the most important tasks first."
                },
                {
                  icon: Users,
                  title: "Team Coordination",
                  description: "Seamless coordination tools that keep everyone aligned and working efficiently together."
                },
                {
                  icon: Workflow,
                  title: "Progress Tracking",
                  description: "Real-time visibility into project status and team performance with detailed analytics."
                }
              ].map((feature, i) => (
                <Card key={i} className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Transform Your Business Operations</h2>
                <div className="space-y-4">
                  {[
                    "Increase team productivity by up to 40%",
                    "Reduce manual task time by 60%",
                    "Improve project completion rates by 35%",
                    "Enhance team collaboration and communication",
                    "Gain real-time insights into business performance",
                    "Scale operations without proportional overhead"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">40%</div>
                  <div className="text-lg font-medium mb-4">Productivity Boost</div>
                  <p className="text-muted-foreground">
                    Average increase in team productivity through intelligent automation and task management.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <header className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Common Use Cases</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                See how businesses are using workflow automation to transform their operations.
              </p>
            </header>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Sales Process Automation",
                  description: "Automate lead follow-ups, proposal generation, and deal progression through your sales pipeline.",
                  examples: ["Lead scoring", "Email sequences", "Deal alerts", "Performance tracking"]
                },
                {
                  title: "Customer Service Workflows",
                  description: "Streamline support ticket routing, response automation, and escalation procedures.",
                  examples: ["Ticket routing", "Auto-responses", "Escalation rules", "Satisfaction surveys"]
                },
                {
                  title: "Project Management",
                  description: "Coordinate team tasks, track progress, and ensure deadlines are met automatically.",
                  examples: ["Task assignment", "Progress updates", "Deadline reminders", "Status reports"]
                }
              ].map((useCase, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-xl">{useCase.title}</CardTitle>
                    <p className="text-muted-foreground">{useCase.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {useCase.examples.map((example, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-card rounded-lg p-8 text-center border">
              <h2 className="text-3xl font-bold mb-4">Ready to Automate Your Workflows?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover how workflow automation can boost your team's productivity and streamline your business operations.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/demo" className="flex items-center gap-2">
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Contact Sales</Link>
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