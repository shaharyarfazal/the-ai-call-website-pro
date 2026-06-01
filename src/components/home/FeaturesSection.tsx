import React from "react";
import { PhoneIncoming, Megaphone, Plug } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

function FeatureCard({ feature, index }: { feature: any; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      className="group relative bg-card border border-border rounded-2xl p-8 sm:p-10 transition-all duration-500 hover:border-primary/40 overflow-hidden"
    >
      {/* Brand orange spotlight on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(400px circle at ${mouseX}px ${mouseY}px, hsl(32 100% 52% / 0.08), transparent 80%)
          `,
        }}
      />

      <div className="relative z-10">
        {/* Brand orange icon container */}
        <div className="mb-6 w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors duration-500">
          {feature.icon}
        </div>
        <div className="w-8 h-px bg-primary/30 mb-5 group-hover:w-16 group-hover:bg-primary/60 transition-all duration-500" />
        <h3 className="text-lg font-semibold text-foreground mb-3 tracking-tight font-heading">{feature.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export function FeaturesSection() {
  const features = [
    {
      title: "Inbound Lead Qualification",
      description: "Never miss a high-value prospect. Your custom AI answers instantly, screens the caller, and routes qualified leads directly to your team — 24 hours a day.",
      icon: <PhoneIncoming className="h-5 w-5" />,
    },
    {
      title: "Outbound Scale & Outreach",
      description: "Multiply your cold calling efforts without scaling your headcount. Deploy expressive, latency-free voice AI to handle initial touchpoints at unlimited scale.",
      icon: <Megaphone className="h-5 w-5" />,
    },
    {
      title: "Custom Tool Integration",
      description: "We connect your AI agent directly to your CRM, calendars, and databases. Every call is transcribed, summarized, and logged automatically.",
      icon: <Plug className="h-5 w-5" />,
    },
  ];

  return (
    <section className="py-24 sm:py-40 bg-background relative overflow-hidden">
      {/* Subtle orange ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-primary/[0.03] blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center mb-20 sm:mb-28"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary/50" />
            <p className="text-[10px] tracking-[0.5em] uppercase text-primary font-semibold">Capabilities</p>
            <div className="h-px w-8 bg-primary/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight font-heading mb-6 leading-[1.1]">
            Engineered for Growth.<br />
            <span className="text-primary">Built to Convert.</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            We don't just hand you software. We build the entire infrastructure to automate your phones — from strategy to deployment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
