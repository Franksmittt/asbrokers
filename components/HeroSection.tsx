"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const APPLE_EASE = [0.25, 0.1, 0.25, 1] as const;

const TRUST_PARTNERS = [
  { name: "Everest Wealth", abbr: "Everest Wealth" },
  { name: "Santam", abbr: "Santam" },
  { name: "Old Mutual", abbr: "Old Mutual" },
  { name: "Bryte", abbr: "Bryte" },
];

/**
 * "Reality Check" hero: HNWI/retiree funnel for Everest Wealth.
 * Primary CTA scrolls to Run-Out Calculator; secondary to Code 1.8 section.
 */
export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center bg-void overflow-hidden pt-28 md:pt-36 pb-20"
      aria-label="Hero"
    >
      <div className="container mx-auto px-4 max-w-4xl text-center space-y-10">
        {/* Trust bar — above fold: FSP 17273, Category 1.8, 25+ Years */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: APPLE_EASE }}
          className="trust-hallmark text-xs sm:text-sm text-zinc-400 uppercase tracking-[0.12em]"
        >
          FSP 17273 · Category 1.8 · 25+ Years Experience
        </motion.div>

        {/* Headline — the agitator */}
        <div className="space-y-5">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: APPLE_EASE }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] text-white leading-[1.1]"
          >
            You think your retirement is safe. The math might disagree.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: APPLE_EASE }}
            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed tracking-[0.01em]"
          >
            Protecting Your Legacy. Engineering Your Wealth. Discover if your capital will outlive you, and how to fix it if it won&apos;t.
          </motion.p>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14, ease: APPLE_EASE }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <motion.a
            href="#lab"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white text-black text-lg px-8 py-4 rounded-[2rem] font-semibold hover:shadow-cta-glow-gold transition-shadow duration-300 w-full sm:w-auto text-center"
          >
            Run the Numbers
          </motion.a>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="#code18"
              className="inline-block rim-light hover:bg-white/10 text-white text-lg px-8 py-4 rounded-[2rem] font-semibold border border-white/10 transition-all duration-300 w-full sm:w-auto text-center"
            >
              Explore Code 1.8 Wealth Engineering
            </Link>
          </motion.div>
        </motion.div>

        {/* Trust bar — partner logos (text placeholders; add images in public if needed) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.22, ease: APPLE_EASE }}
          className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 mt-12 pt-8 border-t border-white/10"
        >
          <p className="trust-hallmark text-xs text-zinc-500 uppercase tracking-wider w-full sm:w-auto mb-0">
            Trusted partners & product providers
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {TRUST_PARTNERS.map((p) => (
              <span
                key={p.name}
                className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors font-medium"
                title={p.name}
              >
                {p.abbr}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
