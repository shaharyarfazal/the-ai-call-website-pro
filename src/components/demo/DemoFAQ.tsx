import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "How does it work?", a: "Our AI voice agents connect to your business phone number and answer every call in under 1 second. They use natural language processing to have human-like conversations, qualify leads, schedule appointments, and send you detailed call summaries — all automatically." },
  { q: "Is it HIPAA compliant?", a: "Yes. Our Enterprise plan includes full HIPAA compliance with BAA agreements, encrypted data storage, and audit logging. Perfect for healthcare providers, dental offices, and medical practices." },
  { q: "Can I customize the AI voice?", a: "Absolutely. You can choose from multiple voice profiles, customize the greeting, script, and conversation flow. The AI learns your business terminology and handles industry-specific scenarios." },
  { q: "How long is setup?", a: "Most businesses are live within 48 hours. Our team handles the entire setup — call flow design, CRM integration, voice customization, and testing. You don't need any technical expertise." },
  { q: "What if I don't like it?", a: "We offer a risk-free trial period. If you're not satisfied with the results, you can cancel anytime with no long-term contracts or cancellation fees." },
  { q: "Do you offer support?", a: "All plans include support. Starter plans get business hours email support. Professional plans get priority 24/7 support. Enterprise clients get a dedicated account manager and direct Slack channel." },
  { q: "What integrations do you support?", a: "We integrate with all major CRMs (Salesforce, HubSpot, Zoho), calendars (Google Calendar, Outlook, Calendly), and communication tools. Custom API integrations are available on Enterprise plans." },
  { q: "How many calls can the AI handle?", a: "Our AI handles unlimited concurrent calls — there's no queue or hold time. Whether you get 10 calls or 10,000 calls at the same time, every caller gets an instant response." },
];

function FAQItem({ item, isOpen, toggle }: { item: typeof faqs[0]; isOpen: boolean; toggle: () => void }) {
  return (
    <div className="border-b border-border last:border-0">
      <button onClick={toggle} className="flex items-center justify-between w-full py-5 text-left group">
        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors pr-4">{item.q}</span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-muted-foreground leading-relaxed pb-5 pr-8">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DemoFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 sm:py-28 bg-background border-t border-foreground/[0.05] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary/50" />
            <p className="text-[10px] tracking-[0.5em] uppercase text-primary font-semibold">FAQ</p>
            <div className="h-px w-8 bg-primary/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight font-heading mb-5 leading-[1.1]">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }} className="max-w-2xl mx-auto bg-card border border-border rounded-2xl p-6 sm:p-8">
          {faqs.map((faq, i) => (
            <FAQItem key={i} item={faq} isOpen={openIndex === i} toggle={() => setOpenIndex(openIndex === i ? null : i)} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
