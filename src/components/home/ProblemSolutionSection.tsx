import React from "react";
import { motion } from "framer-motion";
import { PhoneOff, Clock, DollarSign, ArrowRight, Bot, Zap, TrendingUp } from "lucide-react";

const problems = [
  {
    icon: <PhoneOff className="h-5 w-5" />,
    stat: "62%",
    label: "of calls go unanswered",
    detail: "After-hours, weekends, lunch breaks — every missed call is a lost customer.",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    stat: "$75K+",
    label: "wasted on hold times",
    detail: "Callers hang up in 90 seconds. Your team spends hours on repetitive screening calls.",
  },
  {
    icon: <DollarSign className="h-5 w-5" />,
    stat: "5–8x",
    label: "cost of a human rep",
    detail: "Hiring, training, turnover — the traditional call center model doesn't scale.",
  },
];

const solutions = [
  {
    icon: <Bot className="h-5 w-5" />,
    title: "AI Answers Every Call",
    detail: "Zero hold time. Zero missed leads. Your AI agent picks up in under 1 second, 24/7/365.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Qualifies & Books Instantly",
    detail: "Screens callers, captures info, and books meetings directly into your calendar — on autopilot.",
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Scales Without Headcount",
    detail: "Handle 1 call or 1,000 simultaneously. Pay a fraction of what a single hire costs.",
  },
];

export function ProblemSolutionSection() {
  return (
    <section className="py-24 sm:py-36 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 sm:mb-28"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary/50" />
            <p className="text-[10px] tracking-[0.5em] uppercase text-primary font-semibold">The Problem</p>
            <div className="h-px w-8 bg-primary/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight font-heading mb-5 leading-[1.1]">
            Your Phone Is Losing<br />
            <span className="text-primary">You Money Right Now.</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Every unanswered call is a customer choosing your competitor.
          </p>
        </motion.div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-24 sm:mb-32">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="bg-card border border-red-500/10 hover:border-red-500/25 rounded-2xl p-8 sm:p-10 transition-all duration-500 group"
            >
              <div className="mb-5 w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/15 flex items-center justify-center text-red-400/80 group-hover:bg-red-500/15 transition-colors duration-500">
                {p.icon}
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1 font-heading">{p.stat}</div>
              <div className="text-sm font-semibold text-foreground/80 mb-3">{p.label}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Transition arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-24 sm:mb-32"
        >
          <div className="w-14 h-14 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center">
            <ArrowRight className="h-5 w-5 text-primary rotate-90" />
          </div>
        </motion.div>

        {/* Solution header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 sm:mb-28"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary/50" />
            <p className="text-[10px] tracking-[0.5em] uppercase text-primary font-semibold">The Solution</p>
            <div className="h-px w-8 bg-primary/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight font-heading mb-5 leading-[1.1]">
            An AI Employee That<br />
            <span className="text-primary">Never Clocks Out.</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Our voice AI agents replace your front desk, not your people. They handle the repetitive calls so your team can close deals.
          </p>
        </motion.div>

        {/* Solution cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {solutions.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="bg-card border border-primary/10 hover:border-primary/30 rounded-2xl p-8 sm:p-10 transition-all duration-500 group"
            >
              <div className="mb-5 w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors duration-500">
                {s.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3 tracking-tight font-heading">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
