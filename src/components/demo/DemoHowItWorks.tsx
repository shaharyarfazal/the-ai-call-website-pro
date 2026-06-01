import React from "react";
import { motion } from "framer-motion";

const steps = [
  { number: "01", title: "Call Comes In", desc: "A customer calls your business number — any time, day or night." },
  { number: "02", title: "AI Answers Instantly", desc: "Your AI agent picks up in under 1 second with a natural, human-sounding greeting." },
  { number: "03", title: "Qualifies the Lead", desc: "Asks intelligent questions to understand needs, budget, and urgency." },
  { number: "04", title: "Books Appointment", desc: "Schedules directly into your calendar with real-time availability checks." },
  { number: "05", title: "Sends You Details", desc: "You receive a full transcript, lead score, and appointment confirmation instantly." },
];

export default function DemoHowItWorks() {
  return (
    <section className="py-20 sm:py-28 bg-background border-t border-foreground/[0.05] relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-primary/[0.04] blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary/50" />
            <p className="text-[10px] tracking-[0.5em] uppercase text-primary font-semibold">How It Works</p>
            <div className="h-px w-8 bg-primary/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight font-heading leading-[1.1]">
            From Ring to <span className="text-primary">Revenue</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical connecting line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-8 sm:left-10 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent origin-top hidden sm:block"
          />

          <div className="flex flex-col gap-8 sm:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-6 sm:gap-8 group"
              >
                <div className="relative shrink-0 w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-foreground/10 group-hover:border-primary/40 transition-colors duration-500" />
                  <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
                  <span className="text-2xl sm:text-3xl font-light text-foreground/20 group-hover:text-primary/60 transition-colors duration-500 tabular-nums font-heading">
                    {step.number}
                  </span>
                </div>
                <div className="pt-3 sm:pt-5">
                  <h3 className="text-lg font-semibold text-foreground mb-1 tracking-tight font-heading">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-md">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
