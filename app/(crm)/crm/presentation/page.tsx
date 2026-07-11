"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { WealthArchitectureTimeline } from "@/components/crm/WealthArchitectureTimeline";
import { PHASES } from "@/lib/presentation-data";
import { X, Maximize2, LineChart } from "@/components/icons";

const APPLE_EASE = [0.25, 0.1, 0.25, 1] as const;

const PHASE_ACCENT: Record<string, string> = {
  create: "from-teal-500/20 to-transparent border-teal-500/30 text-teal-200",
  protect: "from-amber-500/15 to-transparent border-amber-500/25 text-amber-200",
  "pass-on": "from-violet-500/15 to-transparent border-violet-500/25 text-violet-200",
};

export default function CrmPresentationPage() {
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <>
      <div className="mx-auto max-w-[1400px] space-y-8">
        <motion.div
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] via-transparent to-teal-950/20 p-6 sm:p-8"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: APPLE_EASE }}
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cinematic-teal/20 blur-[100px]" aria-hidden />
          <div className="pointer-events-none absolute -bottom-16 left-10 h-40 w-40 rounded-full bg-amber-500/10 blur-[80px]" aria-hidden />
          <div className="relative flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-2xl">
              <p className="trust-hallmark mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                FSP 17273 · Client consultation
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Wealth Architecture
              </h1>
              <p className="mt-2 text-lg font-medium text-cinematic-teal/90">Sales canvas & talking points</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Walk clients through Create → Protect → Pass On. Tap any node on the timeline for advisor scripts,
                bullets, and highlights, ideal for screen-share or in-room meetings.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:items-end">
              <motion.button
                type="button"
                onClick={() => setIsPresentationMode(true)}
                className="inline-flex items-center justify-center gap-2 rounded-[2rem] border border-cinematic-teal/40 bg-cinematic-teal/15 px-5 py-3 text-sm font-semibold text-white shadow-cta-glow-blue transition-all hover:bg-cinematic-teal/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-cinematic-teal/50"
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.25, ease: APPLE_EASE }}
              >
                <Maximize2 className="h-4 w-4" />
                Present full screen
              </motion.button>
              <Link
                href="/crm/calculators"
                className="inline-flex items-center justify-center gap-2 rounded-[2rem] border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
              >
                <LineChart className="h-4 w-4 text-cinematic-teal" />
                Open calculators
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-3">
          {PHASES.map((phase, index) => (
            <motion.div
              key={phase.id}
              className={`rounded-2xl border bg-gradient-to-br p-4 ${PHASE_ACCENT[phase.id] ?? ""}`}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06, ease: APPLE_EASE }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] opacity-80">Phase {index + 1}</p>
              <p className="mt-1 text-sm font-semibold text-white">{phase.title.replace(/^Phase \d+: /, "")}</p>
              <p className="mt-0.5 text-xs opacity-70">{phase.subtitle}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-xs text-zinc-500"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Scroll horizontally on smaller screens · Click a pill to open talking points
        </motion.p>

        <WealthArchitectureTimeline />
      </div>

      <AnimatePresence>
        {isPresentationMode && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.35, ease: APPLE_EASE }}
            className="fixed inset-0 z-[100] flex flex-col bg-void"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-void/90 px-4 py-3 backdrop-blur-md sm:px-6">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cinematic-teal">Presentation</p>
                <p className="truncate text-sm font-medium text-white">Wealth Architecture Timeline</p>
              </div>
              <button
                type="button"
                onClick={() => setIsPresentationMode(false)}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
                aria-label="Exit presentation mode"
              >
                <X className="h-4 w-4" />
                Exit
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-auto p-3 sm:p-5">
              <WealthArchitectureTimeline presentation />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
