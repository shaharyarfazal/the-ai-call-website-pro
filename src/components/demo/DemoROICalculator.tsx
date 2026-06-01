import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign, TrendingUp } from "lucide-react";

export default function DemoROICalculator() {
  const [callVolume, setCallVolume] = useState(100);
  const [dealValue, setDealValue] = useState(500);

  const results = useMemo(() => {
    const missedCalls = Math.round(callVolume * 0.62);
    const recoveredCalls = Math.round(missedCalls * 0.85);
    const conversionRate = 0.15;
    const newDeals = Math.round(recoveredCalls * conversionRate);
    const revenueIncrease = newDeals * dealValue;
    const monthlySavings = Math.round(callVolume * 2.5);
    const totalMonthlyGain = revenueIncrease + monthlySavings;
    return { missedCalls, recoveredCalls, newDeals, revenueIncrease, monthlySavings, totalMonthlyGain };
  }, [callVolume, dealValue]);

  const fmt = (n: number) => n.toLocaleString("en-US");

  return (
    <section className="py-20 sm:py-28 bg-background border-t border-foreground/[0.05] relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] rounded-full bg-primary/[0.04] blur-[120px]" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary/50" />
            <p className="text-[10px] tracking-[0.5em] uppercase text-primary font-semibold">ROI Calculator</p>
            <div className="h-px w-8 bg-primary/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight font-heading mb-5 leading-[1.1]">
            Calculate Your <span className="text-primary">Revenue Increase</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            See exactly how much revenue you're leaving on the table — and what AI can recover.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }} className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Inputs */}
            <div className="bg-card border border-border rounded-2xl p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Calculator className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground font-heading">Your Numbers</h3>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm text-foreground font-medium">Monthly Call Volume</label>
                    <span className="text-sm font-bold text-primary tabular-nums">{fmt(callVolume)} calls</span>
                  </div>
                  <input type="range" min={10} max={2000} step={10} value={callVolume} onChange={(e) => setCallVolume(Number(e.target.value))}
                    className="w-full h-1.5 bg-foreground/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-[0_0_10px_hsl(32_100%_52%_/_0.5)] [&::-webkit-slider-thumb]:cursor-pointer" />
                  <div className="flex justify-between text-[10px] text-muted-foreground/50 mt-1">
                    <span>10</span><span>2,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm text-foreground font-medium">Average Deal Value</label>
                    <span className="text-sm font-bold text-primary tabular-nums">${fmt(dealValue)}</span>
                  </div>
                  <input type="range" min={50} max={10000} step={50} value={dealValue} onChange={(e) => setDealValue(Number(e.target.value))}
                    className="w-full h-1.5 bg-foreground/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-[0_0_10px_hsl(32_100%_52%_/_0.5)] [&::-webkit-slider-thumb]:cursor-pointer" />
                  <div className="flex justify-between text-[10px] text-muted-foreground/50 mt-1">
                    <span>$50</span><span>$10,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-card border border-primary/20 rounded-2xl p-8 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground font-heading">Your Potential ROI</h3>
              </div>

              <div className="space-y-5">
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-sm text-muted-foreground">Calls Currently Missed</span>
                  <span className="text-sm font-bold text-red-400 tabular-nums">{fmt(results.missedCalls)}/mo</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-sm text-muted-foreground">Calls AI Would Recover</span>
                  <span className="text-sm font-bold text-foreground tabular-nums">{fmt(results.recoveredCalls)}/mo</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-sm text-muted-foreground">New Deals Closed</span>
                  <span className="text-sm font-bold text-foreground tabular-nums">{fmt(results.newDeals)}/mo</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-sm text-muted-foreground">Revenue Increase</span>
                  <span className="text-sm font-bold text-primary tabular-nums">${fmt(results.revenueIncrease)}/mo</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-sm text-muted-foreground">Operational Savings</span>
                  <span className="text-sm font-bold text-foreground tabular-nums">${fmt(results.monthlySavings)}/mo</span>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-foreground">Total Monthly Gain</span>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <span className="text-2xl font-bold text-primary tabular-nums font-heading">{fmt(results.totalMonthlyGain)}</span>
                      <span className="text-xs text-muted-foreground">/mo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
