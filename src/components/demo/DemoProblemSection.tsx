import React from "react";
import { motion } from "framer-motion";
import { PhoneOff, DollarSign, TrendingDown } from "lucide-react";

const problems = [
  {
    icon: <PhoneOff className="h-5 w-5" />,
    stat: "62%",
    headline: "of calls go unanswered",
    detail: "After-hours, weekends, lunch breaks — every ring that goes to voicemail is a customer choosing your competitor.",
  },
  {
    icon: <DollarSign className="h-5 w-5" />,
    stat: "$1,200",
    headline: "lost per missed call",
    detail: "The average business loses $1,200 in lifetime value for every call that goes unanswered.",
  },
  {
    icon: <TrendingDown className="h-5 w-5" />,
    stat: "78%",
    headline: "buy from whoever answers first",
    detail: "Your competitors are answering calls you're missing. Speed-to-answer wins the deal.",
  },
];

export default function DemoProblemSection() {
  return (
    <section className="py-20 sm:py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-red-500/50" />
            <p className="text-[10px] tracking-[0.5em] uppercase text-red-400 font-semibold">The Problem</p>
            <div className="h-px w-8 bg-red-500/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight font-heading mb-5 leading-[1.1]">
            Every Missed Call ={' '}
            <span className="text-red-400">Lost Revenue</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Right now, your phone is ringing and nobody's picking up. Here's what that costs you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
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
              <div className="text-sm font-semibold text-foreground/80 mb-3">{p.headline}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
