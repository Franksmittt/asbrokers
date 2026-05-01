"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

export function RetirementCalculator() {
  const [savings, setSavings] = useState(2000000);
  const [monthlyDraw, setMonthlyDraw] = useState(25000);
  const [growthRate, setGrowthRate] = useState(6);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");

  const monthsToZero = useMemo(() => {
    let balance = savings;
    let month = 0;
    const monthlyGrowth = Math.pow(1 + growthRate / 100, 1 / 12) - 1;
    while (balance > 0 && month < 600) {
      balance = balance * (1 + monthlyGrowth) - monthlyDraw;
      month++;
    }
    return month;
  }, [savings, monthlyDraw, growthRate]);

  const years = Math.floor(monthsToZero / 12);
  const remainderMonths = monthsToZero % 12;
  const displayYears = monthsToZero >= 600 ? "50+" : `${years}y ${remainderMonths}m`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="panel p-8 sm:p-10 max-w-xl mx-auto"
    >
      <p className="font-sans text-vault-muted text-[10px] uppercase tracking-[0.2em] mb-2">
        Tools
      </p>
      <h3 className="font-serif text-2xl font-medium text-vault-cream mb-2">
        When does your money run out?
      </h3>
      <p className="font-sans text-vault-muted text-sm mb-8">
        Adjust the sliders to see how long your retirement savings last.
      </p>

      <div className="space-y-6">
        <div>
          <label className="font-sans block text-xs text-vault-muted uppercase tracking-widest mb-2">
            Current savings (R): {(savings / 1_000_000).toFixed(1)}M
          </label>
          <input
            type="range"
            min={500000}
            max={20000000}
            step={100000}
            value={savings}
            onChange={(e) => setSavings(Number(e.target.value))}
            className="w-full h-1 bg-white/10 accent-vault-brass"
          />
        </div>
        <div>
          <label className="font-sans block text-xs text-vault-muted uppercase tracking-widest mb-2">
            Monthly draw (R): R{monthlyDraw.toLocaleString()}
          </label>
          <input
            type="range"
            min={5000}
            max={100000}
            step={1000}
            value={monthlyDraw}
            onChange={(e) => setMonthlyDraw(Number(e.target.value))}
            className="w-full h-1 bg-white/10 accent-vault-brass"
          />
        </div>
        <div>
          <label className="font-sans block text-xs text-vault-muted uppercase tracking-widest mb-2">
            Growth rate (% p.a.): {growthRate}%
          </label>
          <input
            type="range"
            min={0}
            max={12}
            step={0.5}
            value={growthRate}
            onChange={(e) => setGrowthRate(Number(e.target.value))}
            className="w-full h-1 bg-white/10 accent-vault-brass"
          />
        </div>
      </div>

      <motion.div
        key={displayYears}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-10 py-6 border-t border-white/[0.06] text-center"
      >
        <p className="font-sans text-vault-muted text-xs uppercase tracking-widest mb-1">
          Funds last approximately
        </p>
        <p className="font-serif text-3xl font-medium text-vault-brass-light">{displayYears}</p>
      </motion.div>

      {!showEmailForm ? (
        <button
          type="button"
          onClick={() => setShowEmailForm(true)}
          className="mt-8 w-full py-3 border border-vault-brass text-vault-brass-light font-sans text-xs uppercase tracking-widest hover:bg-vault-brass/10 transition-colors"
        >
          Get full PDF breakdown: enter email
        </button>
      ) : (
        <div className="mt-8 space-y-3">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] text-vault-cream placeholder-vault-muted font-sans text-sm focus:border-vault-brass/50"
          />
          <button
            type="button"
            className="w-full py-3 border border-vault-brass text-vault-brass-light font-sans text-xs uppercase tracking-widest hover:bg-vault-brass/10 transition-colors"
          >
            Send my breakdown
          </button>
        </div>
      )}
    </motion.div>
  );
}
