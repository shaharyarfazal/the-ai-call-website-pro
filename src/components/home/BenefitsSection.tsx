import React from "react";
import { motion } from "framer-motion";
import { Clock, Users, TrendingUp, Shield, Globe, BarChart3 } from "lucide-react";

const benefits = [
  {
    icon: <Clock className="h-5 w-5" />,
    title: "24/7 Availability",
    stat: "Always on",
    detail: "Never miss a call again. Your AI agent handles nights, weekends, and holidays — so you don't have to.",
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "3x More Conversions",
    stat: "+200%",
    detail: "Respond to every lead in under 1 second. Speed-to-lead is the #1 factor in conversion rates.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Unlimited Concurrent Calls",
    stat: "∞ capacity",
    detail: "Handle 1 call or 1,000 at once. No busy signals, no hold queues, no dropped leads.",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "90% Cost Reduction",
    stat: "-90%",
    detail: "Replace the cost of a full-time receptionist with an AI that works harder and never calls in sick.",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "100% Call Logging",
    stat: "Total recall",
    detail: "Every call transcribed, summarized, and logged to your CRM. No data ever falls through the cracks.",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Multilingual Support",
    stat: "30+ languages",
    detail: "Serve diverse markets without hiring multilingual staff. Your AI speaks their language — fluently.",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-24 sm:py-36 bg-background relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] rounded-full bg-primary/[0.03] blur-[120px] pointer-events-none" />

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
            <p className="text-[10px] tracking-[0.5em] uppercase text-primary font-semibold">Why Us</p>
            <div className="h-px w-8 bg-primary/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight font-heading mb-5 leading-[1.1]">
            The ROI Speaks<br />
            <span className="text-primary">For Itself.</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            We don't sell software. We deliver results. Here's what changes when you deploy voice AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group bg-card border border-border hover:border-primary/30 rounded-2xl p-7 sm:p-8 transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors duration-500">
                  {b.icon}
                </div>
                <span className="text-xs font-bold text-primary tracking-tight">{b.stat}</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 tracking-tight font-heading">
                {b.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
