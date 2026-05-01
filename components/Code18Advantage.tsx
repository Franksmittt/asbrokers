"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ImagePlaceholder } from "./ImagePlaceholder";

const APPLE_EASE = [0.25, 0.1, 0.25, 1] as const;

const FOUNDERS = [
  {
    name: "Albert Schuurman",
    slug: "team-albert",
    role: "Co-founder",
    bio: "Short Term Business and Investment Specialist.",
  },
  {
    name: "Johnny Farinha",
    slug: "team-johnny",
    role: "Co-founder",
    bio: "Short term business Insurance Specialist.",
  },
];

export function Code18Advantage() {
  return (
    <section id="code18" className="scroll-mt-24">
      <div className="mb-10 md:mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: APPLE_EASE }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-white mb-2"
        >
          The Code 1.8 Advantage
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.06, ease: APPLE_EASE }}
          className="text-gray-400 text-base md:text-lg max-w-3xl leading-relaxed"
        >
          Most brokers can only advise on unit trusts linked to the volatile JSE. AS Brokers holds an FSCA Category 1.8 license (Securities and Instruments: Shares), so we are authorised to advise on unlisted, high-yield private market capital, including Everest Wealth structured products and the Amethyst Living Annuity.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {FOUNDERS.map((person, i) => (
          <motion.div
            key={person.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: APPLE_EASE }}
            className="squircle rim-light p-6 md:p-8 border-0 overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                <ImagePlaceholder
                  src={`/images/${person.slug}.jpg`}
                  alt={person.name}
                  aspectRatio="1/1"
                  placeholderLabel={person.slug}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{person.name}</h3>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mt-1">
                  {person.role}
                </p>
                <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                  {person.bio}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-8 text-center">
        <Link
          href="/how-we-work"
          className="inline-flex items-center gap-2 text-cinematic-teal font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-cinematic-teal/50 rounded-lg px-3 py-1"
        >
          See our advice process →
        </Link>
      </p>
    </section>
  );
}
