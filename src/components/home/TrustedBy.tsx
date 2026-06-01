import React from "react";
import { motion } from "framer-motion";

const partners = ["HealthPlus", "Rome Estates", "Apex Digital", "Nexus Auto", "Bella Spas"];

export function TrustedBy() {
  return (
    <section className="py-16 sm:py-20 relative overflow-hidden border-t border-foreground/[0.06]">
      <div className="container mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-[10px] tracking-[0.5em] uppercase text-muted-foreground font-medium mb-12"
        >
          Trusted by 500+ forward-thinking businesses
        </motion.p>
        <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-24">
          {partners.map((name, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.18 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ opacity: 0.6 }}
              className="text-xl sm:text-2xl font-bold tracking-widest text-foreground cursor-default transition-all duration-500 hover:scale-105 font-heading uppercase"
            >
              {name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
