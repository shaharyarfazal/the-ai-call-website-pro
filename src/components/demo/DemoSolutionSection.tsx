import React from "react";
import { motion } from "framer-motion";
import { Bot, Zap, Calendar, TrendingUp } from "lucide-react";

const solutions = [
  { icon: <Bot className="h-5 w-5" />, title: "AI Answers Every Call", detail: "Zero hold time. Your AI agent picks up in under 1 second, day or night, 365 days a year." },
  { icon: <Zap className="h-5 w-5" />, title: "Qualify Leads Automatically", detail: "Screens callers, asks qualifying questions, and captures contact info — all hands-free." },
  { icon: <Calendar className="h-5 w-5" />, title: "Book Appointments 24/7", detail: "Books meetings directly into your calendar, resolves conflicts, and sends confirmations." },
  { icon: <TrendingUp className="h-5 w-5" />, title: "Save 90% on Receptionist Costs", detail: "Handle unlimited concurrent calls at a fraction of the cost of a single hire." },
];

export default function DemoSolutionSection() {
  return (
    <section className="py-20 sm:py-28 bg-background border-t border-foreground/[0.05] relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] rounded-full bg-primary/[0.04] blur-[120px]" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary/50" />
            <p className="text-[10px] tracking-[0.5em] uppercase text-primary font-semibold">The Solution</p>
            <div className="h-px w-8 bg-primary/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight font-heading mb-5 leading-[1.1]">
            The AI Call <span className="text-primary">Solution</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Never miss another call. Never lose another lead. Your AI receptionist works around the clock.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {solutions.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="bg-card border border-primary/10 hover:border-primary/30 rounded-2xl p-8 transition-all duration-500 group"
            >
              <div className="mb-5 w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors duration-500">
                {s.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 tracking-tight font-heading">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
