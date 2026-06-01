import React from "react";
import { motion } from "framer-motion";
import { Mic, ArrowRight } from "lucide-react";

interface Props {
  onScrollToForm: () => void;
  onStartCall: () => void;
  isCallActive: boolean;
}

export default function DemoFinalCTA({ onScrollToForm, onStartCall, isCallActive }: Props) {
  return (
    <section className="py-20 sm:py-32 md:py-48 bg-background border-t border-foreground/[0.05] relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] sm:w-[700px] h-[300px] sm:h-[400px] rounded-full bg-primary/[0.06] blur-[130px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
            <div className="h-px w-8 bg-primary/50" />
            <p className="text-[10px] tracking-[0.5em] uppercase text-primary font-semibold">Get Started Today</p>
            <div className="h-px w-8 bg-primary/50" />
          </div>

          <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto px-2">
            Every minute without AI, your competitors are answering calls you're missing.
          </p>

          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-5 sm:mb-6 leading-[1.1] font-heading">
            Ready to Stop<br />
            <span className="text-primary">Losing Revenue?</span>
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground mb-8 sm:mb-10 max-w-lg mx-auto leading-relaxed px-2">
            Book your free demo today and see exactly how AI can transform your business. 15-minute strategy call, no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-8">
            <button
              onClick={onScrollToForm}
              className="group relative flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 text-sm font-bold rounded-full text-black bg-primary hover:bg-primary/90 transition-all duration-300 shadow-[0_0_35px_hsl(32_100%_52%_/_0.45)] hover:shadow-[0_0_55px_hsl(32_100%_52%_/_0.65)] w-full sm:w-auto justify-center"
            >
              <span>Book Free Demo</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            <button
              onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setTimeout(onStartCall, 600); }}
              disabled={isCallActive}
              className="group flex items-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 text-sm font-medium rounded-full text-foreground/70 border border-foreground/20 hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
            >
              <Mic className="h-4 w-4" />
              <span>Talk With AI Now</span>
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {["No credit card required", "15-minute strategy call", "Cancel anytime"].map((text, i) => (
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
