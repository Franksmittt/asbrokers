"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "./icons";

const APPLE_EASE = [0.25, 0.1, 0.25, 1] as const;
const stagger = 0.06;

const cardMotion = (i: number) => ({
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, delay: i * stagger, ease: APPLE_EASE },
});

const CARDS = [
  {
    id: "cash-flow",
    title: "12.8% Strategic Income",
    subtitle: "Cash flow",
    yieldLabel: "Targeted yield 12.8%",
    description:
      "Predictable monthly cash flow with a 5-year maturation bonus. Unlisted preference shares insulated from daily market volatility. Structured alternative investment (not a guarantee of returns).",
    href: "/everest-wealth",
    accent: "cinematic-teal",
  },
  {
    id: "growth",
    title: "14.5% Strategic Growth",
    subtitle: "Growth",
    yieldLabel: "Targeted yield 14.5%",
    description:
      "Pure capital compounding over 5 years. Unlisted preference shares insulated from JSE volatility. Structured alternative investment, suitable for investors seeking fixed-return private equity exposure.",
    href: "/everest-wealth",
    accent: "gold-orange",
  },
  {
    id: "amethyst",
    title: "Amethyst Living Annuity",
    subtitle: "Retirement",
    yieldLabel: "Regulation 28 compliant",
    description:
      "Tax-free internal growth. Isolates retirees from JSE crashes while staying within regulatory limits. Living annuity with access to unlisted, high-yield private market capital, engineered for capital longevity.",
    href: "/everest-wealth",
    accent: "teal-400",
  },
];

export function EverestWealthBento() {
  return (
    <section id="everest" className="scroll-mt-24">
      <div className="mb-10 md:mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: APPLE_EASE }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-white mb-2"
        >
          Bypass the Public Markets. Secure Fixed-Return Private Equity.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.06, ease: APPLE_EASE }}
          className="text-gray-400 text-base md:text-lg max-w-2xl"
        >
          Everest Wealth structured products. Targeted yields (not guarantees). Available through AS Brokers (FSP 17273), Category 1.8.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {CARDS.map((card, i) => (
          <motion.div
            key={card.id}
            {...cardMotion(i)}
            className="squircle overflow-hidden"
          >
            <Link
              href={card.href}
              className="block h-full rim-light squircle p-6 md:p-8 border-0 hover:bg-white/[0.07] transition-all duration-500 group"
            >
              <div className="flex flex-col h-full gap-2">
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    card.accent === "cinematic-teal"
                      ? "text-cinematic-teal"
                      : card.accent === "gold-orange"
                        ? "text-gold-orange"
                        : "text-teal-400"
                  }`}
                >
                  {card.subtitle}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  {card.title}
                </h3>
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mt-1">
                  {card.yieldLabel}
                </p>
                <p className="text-sm text-gray-400 leading-relaxed mt-2 flex-1">
                  {card.description}
                </p>
                <span className="inline-flex items-center gap-2 text-cinematic-teal text-sm font-semibold mt-4 group-hover:gap-3 transition-all duration-300">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
