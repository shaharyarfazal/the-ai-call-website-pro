import React from "react";
import { motion } from "framer-motion";
import { CallbackForm } from "@/components/home/CallbackForm";

export default function DemoCallbackWidget() {
  return (
    <section id="demo-callback-widget" className="py-16 sm:py-24 md:py-36 bg-background relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-primary/[0.05] blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 bg-primary/50" />
              <p className="text-[10px] tracking-[0.5em] uppercase text-primary font-semibold">Instant Callback</p>
              <div className="h-px w-8 bg-primary/50" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight font-heading mb-4 leading-[1.1]">
              Get an instant AI call.<br />
              <span className="text-primary">No waiting. No credit card.</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Enter your details and our AI voice agent will call you within seconds. Experience first-hand how it handles real conversations.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.9, delay: 0.1 }} className="bg-card border border-border rounded-2xl p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            <CallbackForm embedded idPrefix="demo-cb" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
