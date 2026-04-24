"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "./icons";

const APPLE_EASE = [0.25, 0.1, 0.25, 1] as const;
const INTERVAL_MS = 4000;

const SLIDES = [
  {
    id: "protect",
    title: "Safeguard Your Assets with Expert Insurance & Estate Planning.",
    tease: "R100k Annual Donations for Duty Reduction.",
    gradient: "from-emerald-900/40 via-void to-void",
    accent: "bg-cinematic-teal/20",
  },
  {
    id: "wealth",
    title: "Build Lasting Wealth with Fixed-Return Investments.",
    tease: "12.8–14.5% Returns via Everest Wealth.",
    gradient: "from-cinematic-teal/30 via-void to-void",
    accent: "bg-gold-orange/10",
  },
  {
    id: "service",
    title: "Personalized Guidance – No Call Centers, Zero Advice Fees.",
    tease: "WhatsApp: 067 242 9946.",
    gradient: "from-supernova-gold/10 via-void to-void",
    accent: "bg-white/5",
  },
];

function HighlightCard({
  title,
  tease,
  gradient,
  accent,
}: {
  title: string;
  tease: string;
  gradient: string;
  accent: string;
}) {
  return (
    <div
      className={`relative rounded-[2rem] overflow-hidden rim-light border-0 min-h-[200px] flex flex-col justify-end p-6 text-left bg-gradient-to-br ${gradient} ${accent}`}
    >
      <p className="text-base sm:text-lg font-bold text-white tracking-tight mb-1">
        {title}
      </p>
      <p className="text-sm text-gray-400">{tease}</p>
    </div>
  );
}

/**
 * Mix of option 1 (full-width) and option 2 (cards + carousel).
 * Mobile: carousel (full width). md: 2 cards per row. lg: 3 cards in a row.
 */
export function ExpertiseHighlights() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
  }, []);

  useEffect(() => {
    if (reduceMotion || paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL_MS);
    return () => clearInterval(t);
  }, [paused, reduceMotion]);

  return (
    <section
      className="relative z-10 py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-void"
      aria-labelledby="expertise-heading"
    >
      <h2 id="expertise-heading" className="text-2xl md:text-4xl font-bold tracking-tight text-white text-center mb-10">
        Expertise highlights
      </h2>

      {/* md and up: card grid (2 cols at md, 3 at lg)  -  option 1 width + option 2 cards */}
      <div
        className="max-w-7xl mx-auto hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
      >
        {SLIDES.map((slide) => (
          <HighlightCard
            key={slide.id}
            title={slide.title}
            tease={slide.tease}
            gradient={slide.gradient}
            accent={slide.accent}
          />
        ))}
      </div>

      {/* Mobile only: full-width carousel (option 1 width + option 2 carousel) */}
      <div
        className="max-w-7xl mx-auto md:hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        role="region"
        aria-roledescription="carousel"
        aria-label="Service narrative"
      >
        <div className="relative rounded-[2rem] overflow-hidden rim-light border-0 aspect-[5/4]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={SLIDES[index].id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: APPLE_EASE }}
              className={`absolute inset-0 bg-gradient-to-br ${SLIDES[index].gradient} ${SLIDES[index].accent}`}
            >
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-left">
                <p className="text-lg sm:text-xl font-bold text-white tracking-tight mb-1">
                  {SLIDES[index].title}
                </p>
                <p className="text-sm text-gray-400">{SLIDES[index].tease}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length)}
            className="w-10 h-10 rounded-2xl rim-light border-0 flex items-center justify-center text-cinematic-teal hover:bg-cinematic-teal/20 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2" role="tablist" aria-label="Slide navigation">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === index ? "bg-cinematic-teal scale-110" : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % SLIDES.length)}
            className="w-10 h-10 rounded-2xl rim-light border-0 flex items-center justify-center text-cinematic-teal hover:bg-cinematic-teal/20 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
