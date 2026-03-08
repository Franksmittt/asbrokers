"use client";

import { motion } from "framer-motion";
import { useLeadForm } from "./LeadFormContext";
import { HeroChatTeaser } from "./HeroChatTeaser";

const APPLE_EASE = [0.25, 0.1, 0.25, 1] as const;

const PARTNERS = [
  { name: "Santam", abbr: "Santam" },
  { name: "Old Mutual", abbr: "Old Mutual" },
  { name: "Bryte", abbr: "Bryte" },
  { name: "Everest Wealth", abbr: "Everest" },
];

/**
 * Simplified hero v1.2: Hook (headline/sub) → Engage (AI teaser/CTA) → Reassure (badges).
 * No carousel (ExpertiseHighlights), no DualPathway (ChooseYourPath). Generous negative space.
 */
export function HeroSection() {
  const { openLeadForm } = useLeadForm();

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center bg-void overflow-hidden pt-28 md:pt-36 pb-20"
      aria-label="Hero"
    >
      <div className="container mx-auto px-4 max-w-4xl text-center space-y-8">
        {/* Headline & subtext – centered top */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: APPLE_EASE }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] text-white leading-tight"
          >
            Protecting Your Legacy. Engineering Your Wealth.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: APPLE_EASE }}
            className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto tracking-[0.01em]"
          >
            Independent Financial Advisors in Krugersdorp, Gauteng – 25+ Years of Certainty in Retirement Planning, Risk Protection, Estate Mastery, and More. No Advice Fees.
          </motion.p>
        </div>

        {/* Compact AI teaser – light invite, minimal footprint */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: APPLE_EASE }}
        >
          <HeroChatTeaser />
        </motion.div>

        {/* Single prominent CTA – quiz (HubSpot +20 HNW) */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16, ease: APPLE_EASE }}
        >
          <motion.button
            type="button"
            onClick={openLeadForm}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white text-black text-lg px-8 py-4 rounded-[2rem] font-semibold hover:shadow-cta-glow-gold transition-shadow duration-300 mx-auto block"
          >
            Start Your Free Financial Health Check
          </motion.button>
        </motion.div>

        {/* Trust badges – minimal, compact row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.22, ease: APPLE_EASE }}
          className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mt-8"
        >
          <p className="trust-hallmark text-sm text-gray-500">
            FSP 17273 | Category 1.8 | 25+ Years
          </p>
          <div className="flex flex-wrap justify-center gap-x-4">
            {PARTNERS.map((p) => (
              <span
                key={p.name}
                className="text-xs text-gray-600 hover:text-gray-400 transition-colors grayscale hover:grayscale-0"
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
