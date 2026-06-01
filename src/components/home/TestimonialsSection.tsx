import React from "react";
import { motion } from "framer-motion";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "We eliminated missed calls entirely. The AI handles triage and books appointments effortlessly — like hiring five receptionists overnight.",
      name: "Sarah Jenkins",
      title: "Operations Director",
    },
    {
      quote: "Missing a call means losing a deal. The AI qualifies leads and routes high-value clients to my cell. Nothing short of magic.",
      name: "Marcus Aurelius",
      title: "Real Estate Broker",
    },
    {
      quote: "Our patients love the instant booking. No more hold times. Most callers don't even realize they're speaking to AI.",
      name: "Elena Rodriguez",
      title: "Clinic Owner",
    },
  ];

  return (
    <section className="py-24 sm:py-40 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-20 sm:mb-28"
        >
          <p className="text-[11px] sm:text-xs tracking-[0.4em] uppercase text-muted-foreground font-medium mb-6">Testimonials</p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-medium text-foreground tracking-tight font-heading">
            What they say.
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-card border border-border hover:border-primary/20 rounded-2xl p-8 sm:p-10 transition-all duration-500"
            >
              {/* Quote mark */}
              <span className="text-4xl font-serif text-muted-foreground/20 leading-none block mb-6">"</span>
              
              <p className="text-sm sm:text-base text-foreground/80 font-normal leading-relaxed mb-8">
                {t.quote}
              </p>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center">
                  <span className="text-xs font-light text-muted-foreground">{t.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-xs text-foreground font-medium">{t.name}</p>
                  <p className="text-[10px] text-muted-foreground font-medium">{t.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
