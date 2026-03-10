"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "./icons";

const APPLE_EASE = [0.25, 0.1, 0.25, 1] as const;

const ITEMS = [
  {
    id: "short-term",
    title: "Short-Term Personal",
    subtitle: "Home · Car",
    description: "Comprehensive personal short-term insurance. Protect your assets.",
    href: "/solutions/personal-insurance",
  },
  {
    id: "commercial",
    title: "Commercial Risk",
    subtitle: "Business",
    description: "Commercial property, liability, and business interruption cover.",
    href: "/solutions/business-insurance",
  },
  {
    id: "life",
    title: "Life & Severe Illness",
    subtitle: "Protection",
    description: "Life cover, disability and severe illness benefits for you and your family.",
    href: "/solutions/life-insurance",
  },
  {
    id: "estate",
    title: "Estate Planning & Trusts",
    subtitle: "Legacy",
    description: "Wills, trusts and estate duty reduction. Secure your legacy.",
    href: "/solutions#estate",
  },
];

export function RiskArchitectureCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const step = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  return (
    <section id="risk" className="scroll-mt-24" aria-labelledby="risk-heading">
      <div className="mb-8 md:mb-10">
        <h2 id="risk-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-[-0.03em] text-white mb-2">
          Comprehensive Risk Architecture
        </h2>
        <p className="text-gray-400 text-base max-w-2xl">
          Standard insurance and risk solutions—foundation protection so you can focus on wealth generation.
        </p>
      </div>

      <div className="relative">
        <div className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="p-2 rounded-full rim-light hover:bg-white/10 text-white transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
        <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-2">
          <button
            type="button"
            onClick={() => scroll("right")}
            className="p-2 rounded-full rim-light hover:bg-white/10 text-white transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-2 -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: APPLE_EASE }}
              className="flex-shrink-0 w-[280px] sm:w-[300px] snap-center"
            >
              <Link
                href={item.href}
                className="block h-full squircle rim-light p-6 border-0 hover:bg-white/[0.07] transition-all duration-500 group"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  {item.subtitle}
                </span>
                <h3 className="text-lg font-bold text-white mt-1 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                  {item.description}
                </p>
                <span className="inline-block text-cinematic-teal text-sm font-medium mt-4 group-hover:underline">
                  Learn more →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
