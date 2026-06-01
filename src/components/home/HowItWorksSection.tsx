import React from "react";
import { motion } from "framer-motion";

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Strategy & Design",
      description: "We map your ideal call flows, write the scripts, and configure the perfect voice and personality for your brand.",
    },
    {
      number: "02",
      title: "Build & Connect",
      description: "We engineer the agent and integrate it with your existing tech stack — CRM, calendar, databases — so it can book meetings and log data seamlessly.",
    },
    {
      number: "03",
      title: "Launch & Scale",
      description: "Go live. Your new AI team member handles unlimited concurrent calls while we monitor and continuously optimize performance.",
    },
  ];

  return (
    <section className="py-24 sm:py-40 bg-background border-y border-foreground/[0.05] relative overflow-hidden">
      {/* Subtle brand glow behind section */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-primary/[0.04] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center mb-24 sm:mb-32"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary/50" />
            <p className="text-[10px] tracking-[0.5em] uppercase text-primary font-semibold">Agency Process</p>
            <div className="h-px w-8 bg-primary/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight font-heading leading-[1.1]">
            From Audit to<br />
            <span className="text-primary">Autopilot in Days.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-6 relative">
          {/* Connecting line (desktop only) */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block absolute top-8 left-[18%] right-[18%] h-px bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10 origin-left"
          />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center group"
            >
              {/* Step number with orange ring on hover */}
              <div className="relative mb-10 w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-foreground/10 group-hover:border-primary/40 transition-colors duration-700" />
                <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/5 transition-colors duration-700" />
                <span className="text-3xl font-light text-foreground/20 group-hover:text-primary/60 transition-colors duration-700 tabular-nums">
                  {step.number}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 tracking-tight font-heading">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
