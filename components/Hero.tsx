"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "./icons";
import { useLeadForm } from "./LeadFormContext";
import { HeroChatTerminal } from "./HeroChatTerminal";

const APPLE_EASE = [0.25, 0.1, 0.25, 1] as const;

export function Hero() {
  const { openLeadForm } = useLeadForm();

  return (
    <section
      id="vault"
      className="absolute inset-0 z-10 flex flex-col px-4 sm:px-6 md:px-8 pt-24 pb-8 overflow-auto"
    >
      <div className="max-w-6xl mx-auto w-full flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 md:items-center">
        <div className="md:col-span-2 flex flex-col text-left">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: APPLE_EASE }}
            className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full rim-light border-0 text-cinematic-teal/90 text-xs font-medium mb-6"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cinematic-teal opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cinematic-teal" />
            </span>
            Alberton, Gauteng · Est. 1998 · FSP 17273
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: APPLE_EASE }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-[-0.03em] text-white leading-[1.1] mb-5"
          >
            Protecting Your Legacy.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cinematic-teal via-teal-300 to-gold-orange">
              Engineering Your Wealth.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: APPLE_EASE }}
            className="text-base sm:text-lg text-gray-400 font-light leading-relaxed mb-8 max-w-lg tracking-[0.01em]"
          >
            Independent financial advice and Code 1.8 alternative investments. Fiduciary architecture, risk management, and wealth structuring from the East Rand to the Western Cape.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: APPLE_EASE }}
            className="flex flex-wrap items-center gap-3"
          >
            <motion.div
              className="relative"
              whileHover="hover"
              initial="rest"
              variants={{ rest: {}, hover: {} }}
            >
              <motion.span
                className="absolute inset-0 rounded-[2rem] pointer-events-none"
                variants={{
                  rest: { opacity: 0, scale: 1 },
                  hover: {
                    opacity: 0.7,
                    scale: 1.04,
                    transition: { duration: 0.3, ease: APPLE_EASE },
                  },
                }}
                style={{
                  background: "radial-gradient(circle at 50% 50%, rgba(0, 87, 184, 0.2) 0%, rgba(232, 185, 35, 0.1) 40%, transparent 70%)",
                  filter: "blur(14px)",
                }}
              />
              <motion.span
                className="absolute -inset-1 rounded-[2rem] pointer-events-none"
                variants={{
                  rest: { opacity: 0 },
                  hover: {
                    opacity: 0.6,
                    transition: { duration: 0.25, ease: APPLE_EASE },
                  },
                }}
                style={{
                  background: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 60%)",
                  filter: "blur(10px)",
                }}
              />
              <button
                type="button"
                onClick={openLeadForm}
                className="relative bg-white text-black px-6 py-3 rounded-[2rem] text-sm font-semibold transition-all duration-500 ease-apple hover:scale-[1.02] hover:shadow-cta-glow-gold flex items-center gap-2"
              >
                Financial Health Check <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
            <Link
              href="#lab"
              className="rim-light hover:bg-white/10 text-white px-6 py-3 rounded-[2rem] text-sm font-medium transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(0,128,128,0.2)] flex items-center backdrop-blur-2xl"
            >
              Run The Numbers
            </Link>
          </motion.div>
        </div>

        <a
          href="#lab"
          className="flex md:hidden flex-col items-center gap-0.5 text-zinc-500 hover:text-zinc-400 transition-colors text-xs py-4"
          aria-label="Scroll to content"
        >
          <span className="uppercase tracking-widest">Scroll for more</span>
          <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: APPLE_EASE }}
          className="md:col-span-1 flex justify-start md:justify-end min-w-0"
        >
          <HeroChatTerminal />
        </motion.div>
      </div>

      <a
        href="#lab"
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-0.5 text-zinc-500 hover:text-zinc-400 transition-colors text-xs"
        aria-label="Scroll to content"
      >
        <span className="uppercase tracking-widest">Scroll</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </section>
  );
}
