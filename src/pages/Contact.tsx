import { useEffect, useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Linkedin, Facebook, CalendarCheck, MessageSquare } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { getCanonicalUrl } from "@/lib/seo";
import { supabase } from "@/integrations/supabase/client";
import { Turnstile } from "@marsidev/react-turnstile";
import { useTheme } from "@/components/LocalThemeProvider";
import contactHero from "@/assets/contact-team-hero.jpg";

const formSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters.").max(1000),
});

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "0x4AAAAAADTk6WyOFLpVIvlF";

export default function Contact() {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  // [SECURITY] Bot protection
  const [honeypot, setHoneypot] = useState("");
  const mountTime = useRef<number>(Date.now());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", company: "", message: "" },
  });

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "contact-booking" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // [SECURITY] Bot checks
    if (honeypot.length > 0) {
      toast({ title: "Message Sent!", description: "Thank you for contacting us. We'll get back to you shortly." });
      form.reset();
      return;
    }
    if ((Date.now() - mountTime.current) / 1000 < 3) {
      toast({ title: "Message Sent!", description: "Thank you for contacting us. We'll get back to you shortly." });
      form.reset();
      return;
    }
    try {
      setSubmitting(true);
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: values.name,
          email: values.email,
          phone: values.phone || "",
          company: values.company || "",
          message: values.message,
          turnstileToken: turnstileToken,
        },
      });
      if (error) throw error;
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you shortly.",
      });
      form.reset();
    } catch {
      toast({
        title: "Failed to send",
        description: "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  const canonical = getCanonicalUrl("/contact");

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Contact The AI Call Pro | Talk to Our Team</title>
        <meta name="description" content="Get in touch with The AI Call Pro. Ask about voice AI for business, demos, and pricing across the USA." />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Contact The AI Call Pro" />
        <meta property="og:description" content="Talk to our team about voice AI for business, demos, and pricing." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
      </Helmet>
      <Header />
      <main className="flex-grow">
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Contact Us</h1>
              <p className="mt-4 text-lg text-primary">Get in Touch</p>
              <p className="mt-2 text-muted-foreground max-w-3xl mx-auto">
                Ready to see how TheAICall Pro can help your business? Book an appointment or send us a message — we're here for you.
              </p>
            </div>

            <div className="max-w-5xl mx-auto mb-12">
              <img
                src={contactHero}
                alt="Friendly support team ready to help with voice AI"
                className="rounded-2xl shadow-xl w-full object-cover aspect-video"
                width={1280}
                height={720}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main content — tabs */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="book" className="w-full">
                  <TabsList className="w-full grid grid-cols-2 mb-6">
                    <TabsTrigger value="book" className="flex items-center gap-2">
                      <CalendarCheck className="h-4 w-4" />
                      Book Appointment
                    </TabsTrigger>
                    <TabsTrigger value="message" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Send a Message
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="book">
                    <Card>
                      <CardContent className="p-0 overflow-hidden rounded-b-lg">
                        <Cal
                          namespace="contact-booking"
                          calLink="the-ai-call/web-booking-page"
                          style={{ width: "100%", height: "100%", overflow: "scroll", minHeight: "550px" }}
                          config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="message">
                    <Card>
                      <CardHeader>
                        <CardTitle>Send Us a Message</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" aria-label="Contact form">
                            {/* [SECURITY] Honeypot — invisible to humans, auto-filled by bots */}
                            <div style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden="true">
                              <input type="text" name="b_username" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="new-password" />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                              <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
                                  <FormMessage />
                                </FormItem>
                              )} />
                              <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl><Input type="email" placeholder="your.email@example.com" {...field} /></FormControl>
                                  <FormMessage />
                                </FormItem>
                              )} />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                              <FormField control={form.control} name="phone" render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone (Optional)</FormLabel>
                                  <FormControl><Input placeholder="Your Phone Number" {...field} /></FormControl>
                                  <FormMessage />
                                </FormItem>
                              )} />
                              <FormField control={form.control} name="company" render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Company (Optional)</FormLabel>
                                  <FormControl><Input placeholder="Your Company" {...field} /></FormControl>
                                  <FormMessage />
                                </FormItem>
                              )} />
                            </div>
                            <FormField control={form.control} name="message" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Tell us how we can help" className="min-h-[120px]" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <div className="flex justify-center my-2">
                              <Turnstile
                                key={theme}
                                siteKey={TURNSTILE_SITE_KEY}
                                onSuccess={(token) => setTurnstileToken(token)}
                                onExpire={() => setTurnstileToken(null)}
                                onError={() => setTurnstileToken(null)}
                                options={{ theme: theme === "dark" ? "dark" : theme === "light" ? "light" : "auto" }}
                              />
                            </div>
                            <Button type="submit" className="w-full" size="lg" disabled={submitting || !turnstileToken}>
                              {submitting ? "Sending…" : "Send Your Message"}
                            </Button>
                          </form>
                        </Form>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar — contact info */}
              <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-muted-foreground">
                    <a href="mailto:hello@theaicall.pro" className="flex items-center gap-3 hover:text-primary transition-colors">
                      <Mail className="w-5 h-5" />
                      <span>hello@theaicall.pro</span>
                    </a>
                    <a href="tel:+19032092622" className="flex items-center gap-3 hover:text-primary transition-colors">
                      <Phone className="w-5 h-5" />
                      <span>+1 (903) 209-2622</span>
                    </a>
                    <div className="flex items-center gap-4 pt-4 border-t border-border">
                      <a href="https://www.linkedin.com/company/the-ai-call" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="h-6 w-6" />
                      </a>
                      <a href="https://www.facebook.com/profile.php?id=61575554008800" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Facebook className="h-6 w-6" />
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Why The AI Call Pro?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-muted-foreground text-sm">
                    <p>✅ 24/7 AI voice agents that never miss a call</p>
                    <p>✅ Seamless CRM & calendar integration</p>
                    <p>✅ Custom-built for your industry</p>
                    <p>✅ Setup in days, not months</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
