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

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground">
      <Helmet>
        <title>Book a Demo | The AI Call</title>
        <meta name="description" content="Schedule a personalized demo to see how TheAICall.pro can transform your business communications with voice AI." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-32 pb-20">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Book Your Demo</h1>
          <p className="mt-4 text-lg text-primary">See Voice AI in Action</p>
          <p className="mt-2 text-muted-foreground max-w-3xl mx-auto">
            Schedule a personalized demo to see how TheAICall.pro can transform your business communications.
            Our experts will show you exactly how voice AI can work for your specific industry.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-10">
          <img
            src={bookHero}
            alt="Calendar with clock illustrating fast appointment booking"
            className="rounded-2xl shadow-xl w-full object-cover aspect-video"
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
