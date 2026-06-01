import React from "react";
import { motion } from "framer-motion";
import { CallbackForm } from "@/components/home/CallbackForm";

/**
 * DemoLeadForm — Now uses the unified 3-field CallbackForm (Name, Email, Phone).
 * Triggers an instant AI demo call via the create-phone-call edge function.
 */
export default function DemoLeadForm() {
  return (
    <section id="demo-lead-form" className="py-24 sm:py-36 bg-background relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[500px] rounded-full bg-primary/[0.06] blur-[130px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 bg-primary/50" />
              <p className="text-[10px] tracking-[0.5em] uppercase text-primary font-semibold">Book Your Demo</p>
              <div className="h-px w-8 bg-primary/50" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight font-heading mb-4 leading-[1.1]">
              Ready to Stop <span className="text-primary">Losing Revenue?</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Enter your details and our AI voice agent will call you within seconds. Experience the demo live — no obligation, no credit card.
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }} className="bg-card border border-border rounded-2xl p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            <CallbackForm embedded idPrefix="lead" agentId="agent_bc07b033648e16db0c6af7c709" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
