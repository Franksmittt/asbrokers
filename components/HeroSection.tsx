"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const APPLE_EASE = [0.25, 0.1, 0.25, 1] as const;

const TRUST_PARTNERS = [
  { name: "Everest Wealth", abbr: "Everest Wealth" },
  { name: "Santam", abbr: "Santam" },
  { name: "Old Mutual", abbr: "Old Mutual" },
  { name: "Bryte", abbr: "Bryte" },
];

const HERO_SLIDES = [
  {
    label: "Wealth",
    title: "Retirement Survival Blueprint",
    body: "Pressure-test income, inflation, drawdown, and capital longevity before retirement becomes a cash-flow problem.",
    href: "/retirement-survival-blueprint",
    cta: "Get retirement blueprint",
    accent: "from-blue-400/25 to-cinematic-teal/15",
  },
  {
    label: "Legacy",
    title: "Legacy Conversations Guide",
    body: "Prepare the family questions around wills, trusts, beneficiaries, estate duty, executors, and liquidity.",
    href: "/legacy-blueprint",
    cta: "Get legacy guide",
    accent: "from-amber-300/25 to-orange-500/10",
  },
  {
    label: "Business",
    title: "Business Survival Blueprint",
    body: "Identify the commercial, key person, liability, cyber, succession, and continuity risks that can stop a business.",
    href: "/business-survival-blueprint",
    cta: "Get business workbook",
    accent: "from-rose-300/25 to-red-500/10",
  },
];

/**
 * Problem-led hero for the AS Brokers master plan.
 * Primary CTA introduces the four assets; secondary keeps the retirement calculator prominent.
 */
export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[activeSlide];

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center bg-void overflow-hidden pt-28 md:pt-36 pb-20"
      aria-label="Hero"
    >
      <div className="container mx-auto px-4 max-w-4xl text-center space-y-10">
        {/* Trust bar  -  above fold: FSP 17273, Category 1.8, 25+ Years */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: APPLE_EASE }}
          className="trust-hallmark text-xs sm:text-sm text-zinc-400 uppercase tracking-[0.12em]"
        >
          FSP 17273 · Category 1.8 · 25+ Years Experience
        </motion.div>

        {/* Headline  -  the problem-led positioning */}
        <div className="space-y-5">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: APPLE_EASE }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] text-white leading-[1.1]"
          >
            Create what matters. Protect what you built.{" "}
            <span className="bg-gradient-to-br from-[#00C6FF] to-[#0072FF] bg-clip-text text-transparent">
              Preserve it for the people you love.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: APPLE_EASE }}
            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed tracking-[0.01em]"
          >
            AS Brokers helps people solve the problems behind health, wealth, legacy, and business survival through
            education, planning, protection, and long-term thinking.
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
            href="#blueprints"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white text-black text-lg px-8 py-4 rounded-[2rem] font-semibold hover:shadow-cta-glow-gold transition-shadow duration-300 w-full sm:w-auto text-center"
          >
            Find Your Blueprint
          </motion.a>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="#lab"
              className="inline-block rim-light hover:bg-white/10 text-white text-lg px-8 py-4 rounded-[2rem] font-semibold border border-white/10 transition-all duration-300 w-full sm:w-auto text-center"
            >
              Run Retirement Numbers
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: APPLE_EASE }}
          className="mx-auto w-full max-w-3xl"
          aria-label="Featured blueprint selector"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-3 text-left shadow-rim-glow backdrop-blur-xl">
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.accent} opacity-80`} aria-hidden />
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.title}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35, ease: APPLE_EASE }}
                className="relative grid gap-4 rounded-[1.5rem] border border-white/10 bg-black/35 p-5 sm:grid-cols-[1fr_auto] sm:items-center"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cinematic-teal">
                    {slide.label}
                  </p>
                  <h2 className="mt-2 text-xl font-bold tracking-[-0.03em] text-white sm:text-2xl">
                    {slide.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">{slide.body}</p>
                </div>
                <Link
                  href={slide.href}
                  prefetch={false}
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:scale-[1.02] hover:bg-zinc-200"
                >
                  {slide.cta}
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-3 flex justify-center gap-2">
            {HERO_SLIDES.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`h-2.5 rounded-full transition-all ${
                  activeSlide === index ? "w-8 bg-white" : "w-2.5 bg-white/35 hover:bg-white/60"
                }`}
                aria-label={`Show ${item.title}`}
                aria-pressed={activeSlide === index}
              />
            ))}
          </div>
        </motion.div>

        {/* Trust bar  -  partner logos (text placeholders; add images in public if needed) */}
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
