import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { quote: "We eliminated missed calls entirely. The AI handles triage and books appointments effortlessly — like hiring five receptionists overnight.", name: "Sarah Jenkins", title: "Operations Director, HealthFirst Dental", rating: 5 },
  { quote: "Missing a call means losing a deal. The AI qualifies leads and routes high-value clients to my cell. Nothing short of magic.", name: "Marcus Aurelius", title: "Real Estate Broker, Summit Realty", rating: 5 },
  { quote: "Our patients love the instant booking. No more hold times. Most callers don't even realize they're speaking to AI.", name: "Elena Rodriguez", title: "Clinic Owner, Vida Medical", rating: 5 },
  { quote: "We went from missing 40% of calls to missing zero. Revenue jumped 35% in the first month alone.", name: "David Chen", title: "Owner, AutoPro Services", rating: 5 },
  { quote: "Setup took less than 48 hours. Within a week, the AI was handling 200+ calls daily without a single complaint.", name: "Amanda Foster", title: "Salon Director, Luxe Beauty", rating: 5 },
];

const industries = ["Healthcare", "Real Estate", "Auto Services", "Salons", "Home Services", "Legal"];

export default function DemoSocialProof() {
  return (
    <section className="py-20 sm:py-28 bg-background border-t border-foreground/[0.05] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary/50" />
            <p className="text-[10px] tracking-[0.5em] uppercase text-primary font-semibold">Social Proof</p>
            <div className="h-px w-8 bg-primary/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight font-heading mb-5 leading-[1.1]">
            500+ Businesses Trust <span className="text-primary">The AI Call</span>
          </h2>

          {/* Star rating */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-primary text-primary" />)}</div>
            <span className="text-sm font-semibold text-foreground">4.9/5</span>
            <span className="text-sm text-muted-foreground">from 200+ reviews</span>
          </div>
        </motion.div>

        {/* Industry logos placeholder */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-16 max-w-3xl mx-auto">
          {industries.map((industry) => (
            <div key={industry} className="px-5 py-2.5 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground hover:border-primary/30 hover:text-primary transition-all duration-300">
              {industry}
            </div>
          ))}
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.08 }} className="group bg-card border border-border hover:border-primary/20 rounded-2xl p-8 transition-all duration-500">
              <div className="flex mb-4">{Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-primary text-primary" />)}</div>
              <span className="text-3xl font-serif text-muted-foreground/20 leading-none block mb-4">"</span>
              <p className="text-sm text-foreground/80 font-normal leading-relaxed mb-6">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center">
                  <span className="text-xs font-light text-muted-foreground">{t.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-xs text-foreground font-medium">{t.name}</p>
                  <p className="text-[10px] text-muted-foreground">{t.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
