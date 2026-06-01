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
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, hsl(230 100% 62% / 0.07) 0%, transparent 70%)", filter: "blur(100px)" }} />

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
            className="hidden lg:block absolute top-8 left-[18%] right-[18%] h-px origin-left"
            style={{ background: "linear-gradient(90deg, hsl(230 100% 62% / 0.15), hsl(230 100% 62% / 0.5), hsl(250 80% 65% / 0.5), hsl(230 100% 62% / 0.15))" }}
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
              {/* Step number with indigo ring on hover */}
              <div className="relative mb-10 w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-foreground/10 group-hover:border-primary/50 transition-colors duration-700" />
                <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/8 group-hover:shadow-[0_0_24px_hsl(230_100%_62%_/_0.25)] transition-all duration-700" />
                <span
                  className="relative text-3xl font-light tabular-nums transition-all duration-700"
                  style={{
                    color: "hsl(var(--foreground) / 0.2)",
                  }}
                >
                  <span className="group-hover:opacity-0 transition-opacity duration-300 absolute inset-0 flex items-center justify-center">{step.number}</span>
                  <span
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(135deg, hsl(230 100% 72%), hsl(199 100% 65%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  >{step.number}</span>
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
