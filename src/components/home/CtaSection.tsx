import React from "react";
import { Mic, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function CtaSection() {
  return (
    <section className="py-32 sm:py-48 bg-background border-t border-foreground/[0.05] relative overflow-hidden">
      {/* Centered brand orange glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[400px] rounded-full bg-primary/[0.06] blur-[130px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-8 bg-primary/50" />
            <p className="text-[10px] tracking-[0.5em] uppercase text-primary font-semibold">Get Started</p>
            <div className="h-px w-8 bg-primary/50" />
          </div>

          {/* Problem reminder */}
          <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
            Every minute without AI, your competitors are answering calls you're missing.
          </p>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-6 leading-[1.1] font-heading">
            Stop losing leads.<br />
            <span className="text-primary">Start closing 24/7.</span>
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground mb-14 max-w-md mx-auto leading-relaxed">
            Talk to our AI right now — or book a free strategy session with our team to see how we'd build your custom agent.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* Primary CTA — brand orange glow */}
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group relative flex items-center gap-3 px-10 py-4 text-sm font-bold rounded-full text-black bg-primary hover:bg-primary/90 transition-all duration-300 shadow-[0_0_35px_hsl(32_100%_52%_/_0.45)] hover:shadow-[0_0_55px_hsl(32_100%_52%_/_0.65)]"
            >
              <Mic className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              <span>Talk With AI Now</span>
            </Link>

            <Link
              to="/book-appointment"
              className="group flex items-center gap-2 px-10 py-4 text-sm font-medium rounded-full text-foreground/70 border border-foreground/20 hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-400"
            >
              <span>Book Free Strategy Call</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {["No credit card required", "Setup in 48 hours", "Cancel anytime"].map((text, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary/50" />
                <span className="text-[11px] text-muted-foreground/50">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
