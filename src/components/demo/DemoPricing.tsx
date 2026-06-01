import React from "react";
import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "$299",
    period: "/month",
    description: "For small businesses getting started with AI voice automation.",
    features: ["Up to 500 calls/month", "1 AI voice agent", "Basic call routing", "Email notifications", "Business hours support", "CRM integration"],
    popular: false,
  },
  {
    name: "Professional",
    price: "$599",
    period: "/month",
    description: "For growing businesses that need advanced AI capabilities.",
    features: ["Up to 2,000 calls/month", "3 AI voice agents", "Advanced lead qualification", "Appointment scheduling", "Priority 24/7 support", "CRM + Calendar integration", "Call analytics dashboard", "Custom voice & scripts"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations that need unlimited scale and custom solutions.",
    features: ["Unlimited calls", "Unlimited agents", "Custom AI training", "Dedicated account manager", "SLA guarantee", "HIPAA compliance", "API access", "White-label options", "Custom integrations"],
    popular: false,
  },
];

export default function DemoPricing() {
  return (
    <section className="py-20 sm:py-28 bg-background border-t border-foreground/[0.05] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary/50" />
            <p className="text-[10px] tracking-[0.5em] uppercase text-primary font-semibold">Pricing</p>
            <div className="h-px w-8 bg-primary/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight font-heading mb-5 leading-[1.1]">
            Simple, <span className="text-primary">Transparent Pricing</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            No hidden fees. No long-term contracts. Start saving on your very first day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`bg-card border rounded-2xl p-8 transition-all duration-500 relative flex flex-col ${plan.popular ? "border-primary/40 shadow-[0_0_40px_hsl(230_100%_62%_/_0.12)]" : "border-border hover:border-primary/20"}`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-4 py-1 rounded-full bg-primary text-white text-xs font-bold">
                    <Zap className="h-3 w-3" /> Most Popular
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground font-heading mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground font-heading">{plan.price}</span>
                  {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
                </div>
              </div>

              <div className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>

              <Link to="/book-appointment"
                className={`flex items-center justify-center w-full py-3.5 text-sm font-bold rounded-xl transition-all duration-300 ${plan.popular
                  ? "text-white bg-primary hover:bg-primary/90 shadow-[0_0_25px_hsl(230_100%_62%_/_0.4)] hover:shadow-[0_0_40px_hsl(230_100%_62%_/_0.6)]"
                  : "text-foreground border border-foreground/20 hover:border-primary/50 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
