import React from "react";
import { motion } from "framer-motion";
import { Heart, Home as HomeIcon, Car, Scissors, Wrench, Scale } from "lucide-react";

const industries = [
  { icon: <Heart className="h-5 w-5" />, name: "Healthcare", stat: "40%", result: "fewer no-shows", detail: "AI confirms appointments and reschedules cancellations automatically.", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/15" },
  { icon: <HomeIcon className="h-5 w-5" />, name: "Real Estate", stat: "3x", result: "more qualified leads", detail: "AI screens buyers by budget, timeline, and location before booking showings.", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/15" },
  { icon: <Car className="h-5 w-5" />, name: "Auto Services", stat: "2x", result: "more jobs booked", detail: "AI captures vehicle info, diagnoses urgency, and books service appointments.", color: "text-primary", bg: "bg-primary/10", border: "border-primary/15" },
  { icon: <Scissors className="h-5 w-5" />, name: "Salons & Spas", stat: "90%", result: "reduction in no-shows", detail: "AI handles bookings, sends reminders, and fills cancellation gaps instantly.", color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/15" },
  { icon: <Wrench className="h-5 w-5" />, name: "Home Services", stat: "2x", result: "revenue per call", detail: "AI dispatches techs, upsells maintenance plans, and captures emergency leads.", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/15" },
  { icon: <Scale className="h-5 w-5" />, name: "Legal", stat: "90%", result: "faster response time", detail: "AI qualifies case type, captures urgency, and routes to the right attorney.", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/15" },
];

export default function DemoIndustryResults() {
  return (
    <section className="py-20 sm:py-28 bg-background border-t border-foreground/[0.05] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary/50" />
            <p className="text-[10px] tracking-[0.5em] uppercase text-primary font-semibold">Industry Results</p>
            <div className="h-px w-8 bg-primary/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight font-heading mb-5 leading-[1.1]">
            Proven Results Across <span className="text-primary">Every Industry</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
          {industries.map((ind, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.08 }}
              className={`bg-card border ${ind.border} hover:border-primary/30 rounded-2xl p-7 sm:p-8 transition-all duration-500 group`}
            >
              <div className={`mb-4 w-10 h-10 rounded-xl ${ind.bg} flex items-center justify-center ${ind.color}`}>{ind.icon}</div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-2">{ind.name}</p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-foreground font-heading">{ind.stat}</span>
                <span className="text-sm text-foreground/70">{ind.result}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{ind.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
