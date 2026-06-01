import React from "react";
import { motion } from "framer-motion";
import { Building2, Stethoscope, Home, Car, Briefcase, Scissors } from "lucide-react";

const useCases = [
  {
    icon: <Stethoscope className="h-5 w-5" />,
    industry: "Healthcare & Dental",
    headline: "Zero no-shows. Zero hold times.",
    bullets: [
      "Instant appointment booking & rescheduling",
      "Insurance verification before the call ends",
      "After-hours triage that routes emergencies",
    ],
    metric: "40% fewer no-shows",
  },
  {
    icon: <Home className="h-5 w-5" />,
    industry: "Real Estate",
    headline: "Never lose a hot lead to voicemail.",
    bullets: [
      "Qualify buyers by budget, timeline & location",
      "Schedule showings directly into your calendar",
      "Instant follow-up on every listing inquiry",
    ],
    metric: "3x more showings booked",
  },
  {
    icon: <Car className="h-5 w-5" />,
    industry: "Auto Dealerships",
    headline: "Fill your service bays on autopilot.",
    bullets: [
      "Service appointment scheduling 24/7",
      "Test drive booking & lead capture",
      "Automated recall & maintenance reminders",
    ],
    metric: "28% revenue increase",
  },
  {
    icon: <Briefcase className="h-5 w-5" />,
    industry: "Legal & Professional Services",
    headline: "Screen leads. Book consults. No admin.",
    bullets: [
      "Intake screening with qualification questions",
      "Consultation scheduling with conflict checks",
      "After-hours emergency routing",
    ],
    metric: "60% admin time saved",
  },
  {
    icon: <Scissors className="h-5 w-5" />,
    industry: "Salons & Med Spas",
    headline: "Book while you're with a client.",
    bullets: [
      "Walk-in & appointment booking 24/7",
      "Automated confirmations & reminders",
      "Upsell add-on services during the call",
    ],
    metric: "2x booking rate",
  },
  {
    icon: <Building2 className="h-5 w-5" />,
    industry: "Home Services",
    headline: "Capture every job lead. Day or night.",
    bullets: [
      "Emergency dispatch & priority routing",
      "Quote request capture & scheduling",
      "Follow-up on every missed estimate",
    ],
    metric: "45% more jobs booked",
  },
];

export function UseCasesSection() {
  return (
    <section className="py-24 sm:py-36 bg-background border-y border-foreground/[0.05] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center mb-20 sm:mb-28"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary/50" />
            <p className="text-[10px] tracking-[0.5em] uppercase text-primary font-semibold">Use Cases</p>
            <div className="h-px w-8 bg-primary/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight font-heading mb-5 leading-[1.1]">
            Built For Your<br />
            <span className="text-primary">Industry.</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            From healthcare to home services — our AI agents are trained on industry-specific workflows to deliver real ROI from day one.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {useCases.map((uc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group bg-card border border-border hover:border-primary/30 rounded-2xl p-7 sm:p-8 transition-all duration-500"
            >
              {/* Icon + Industry */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors duration-500">
                  {uc.icon}
                </div>
                <span className="text-xs tracking-[0.2em] uppercase text-primary font-semibold">{uc.industry}</span>
              </div>

              {/* Headline */}
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4 tracking-tight font-heading leading-snug">
                {uc.headline}
              </h3>

              {/* Bullets */}
              <ul className="space-y-2 mb-6">
                {uc.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                    <span className="w-1 h-1 rounded-full bg-primary/60 mt-2 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>

              {/* Metric badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/15">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-xs font-semibold text-primary">{uc.metric}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
