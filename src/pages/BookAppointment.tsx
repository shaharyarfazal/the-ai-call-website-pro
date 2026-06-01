import { useEffect } from 'react';
import Cal, { getCalApi } from "@calcom/embed-react";
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import bookHero from '@/assets/book-appointment-hero.jpg';

export default function BookAppointment() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "web-booking-page" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  const canonical = getCanonicalUrl('/book-appointment');

  const bookingSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Book a Voice AI Strategy Call & Demo",
    "description": "Schedule a personalized live demo to see how custom voice AI agents and clinical receptionists can optimize your business communication operations.",
    "url": canonical,
    "publisher": {
      "@type": "Organization",
      "name": "The AI Call Pro",
      "url": "https://theaicall.pro"
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Book a Custom Voice AI Strategy Demo | The AI Call Pro</title>
        <meta name="description" content="Schedule a live demo to see how The AI Call Pro can transform your business communications with ultra-low latency, custom-tuned voice AI receptionists." />
        <meta name="keywords" content="book voice AI demo, voice agent consultation, schedule clinical bot demo, custom voice bot setup, AI call center strategy session" />
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:title" content="Book a Custom Voice AI Strategy Demo | The AI Call Pro" />
        <meta property="og:description" content="Schedule a live demo to see how The AI Call Pro can transform your business communications with ultra-low latency, custom-tuned voice AI receptionists." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://theaicall.pro/uploads/logo-96.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Book a Custom Voice AI Strategy Demo" />
        <meta name="twitter:description" content="Schedule a live session to experience human-like conversation latency and bespoke call flows tailored to your business." />

        <script type="application/ld+json">
          {JSON.stringify(bookingSchema)}
        </script>
      </Helmet>
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-32 pb-20">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Book Your Strategy Demo</h1>
          <p className="mt-4 text-lg text-primary font-semibold">See Custom Voice AI in Action</p>
          <p className="mt-2 text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Schedule a personalized demo to see how The AI Call Pro can automate your inbound and outbound calls.
            Our engineers will outline a bespoke implementation path tailored exactly to your CRM, calendar, and business goals.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-10 rounded-2xl overflow-hidden shadow-2xl border border-foreground/[0.06] relative group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 opacity-60" />
          <img
            src={bookHero}
            alt="An organized calendar layout showing synchronized time slots illustrating quick, automated voice AI booking capabilities"
            className="w-full object-cover aspect-video hover:scale-[1.01] transition-transform duration-700"
            width={1280}
            height={720}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="max-w-4xl mx-auto rounded-xl border border-border bg-card shadow-sm overflow-hidden animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Cal
            namespace="web-booking-page"
            calLink="the-ai-call/web-booking-page"
            style={{ width: "100%", height: "100%", overflow: "scroll", minHeight: "600px" }}
            config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
