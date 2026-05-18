"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Maximize2, X } from "@/components/icons";
import {
  DEFAULT_OFFICE_CALCULATOR_ID,
  OFFICE_CALCULATORS,
  type OfficeCalculator,
} from "@/lib/crm/office-calculators";

const APPLE_EASE = [0.25, 0.1, 0.25, 1] as const;
const STORAGE_KEY = "asbrokers-office-calculator-id";

const SELECT_CLASS =
  "w-full max-w-xl rounded-2xl border border-white/15 bg-zinc-950/90 px-4 py-3 text-sm text-zinc-50 shadow-inner outline-none focus:border-cinematic-teal/40 focus:ring-2 focus:ring-cinematic-teal/25 [&>option]:bg-zinc-950 [&>option]:text-zinc-50";

function findCalculator(id: string): OfficeCalculator | undefined {
  return OFFICE_CALCULATORS.find((c) => c.id === id);
}

export function OfficeCalculatorCanvas() {
  const reduceMotion = useReducedMotion();
  const [calculatorId, setCalculatorId] = useState(DEFAULT_OFFICE_CALCULATOR_ID);
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && findCalculator(stored)) setCalculatorId(stored);
    } catch {
      /* private mode */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, calculatorId);
    } catch {
      /* ignore */
    }
  }, [calculatorId]);

  const active = useMemo(() => findCalculator(calculatorId) ?? OFFICE_CALCULATORS[0], [calculatorId]);

  if (!active) {
    return (
      <p className="text-sm text-zinc-400">No calculators are configured. Contact your developer.</p>
    );
  }

  const iframe = (
    <iframe
      key={active.id}
      title={active.title}
      src={active.embedPath}
      className="h-full min-h-[min(72vh,720px)] w-full rounded-2xl border border-white/10 bg-[#0a0a0c]"
      loading="eager"
      allow="clipboard-write"
    />
  );

  return (
    <>
      <motion.div
        className="mx-auto max-w-6xl space-y-6"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: APPLE_EASE }}
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="trust-hallmark mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              FSP 17273 · Client session
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Calculators</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Choose a tool below and walk your client through the numbers — no need to open a blog article.
            </p>
          </div>
          <motion.button
            type="button"
            onClick={() => setIsPresentationMode(true)}
            className="flex items-center gap-2 rounded-[2rem] border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-all hover:border-cinematic-teal/30 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cinematic-teal/50"
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.25, ease: APPLE_EASE }}
          >
            <Maximize2 className="h-4 w-4" />
            Full screen
          </motion.button>
        </div>

        <div className="rim-light rounded-3xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
          <label htmlFor="office-calculator-select" className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-zinc-400">
            Select calculator
          </label>
          <select
            id="office-calculator-select"
            value={active.id}
            onChange={(e) => setCalculatorId(e.target.value)}
            className={SELECT_CLASS}
          >
            {OFFICE_CALCULATORS.map((calc) => (
              <option key={calc.id} value={calc.id}>
                {calc.title}
              </option>
            ))}
          </select>
          <p className="mt-2 text-[11px] text-zinc-500">
            Your last choice is remembered on this device.
          </p>
        </div>

        <div className="rim-light overflow-hidden rounded-3xl border border-white/10 bg-[#050506] p-2 sm:p-3">
          <div className="border-b border-white/10 px-3 py-2 sm:px-4">
            <p className="text-sm font-semibold text-white">{active.title}</p>
          </div>
          <div className="p-1 sm:p-2">{iframe}</div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isPresentationMode && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.35, ease: APPLE_EASE }}
            className="fixed inset-0 z-[100] flex flex-col bg-void"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-void/80 px-4 py-3 backdrop-blur-sm sm:px-6">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Presentation mode</p>
                <select
                  aria-label="Select calculator"
                  value={active.id}
                  onChange={(e) => setCalculatorId(e.target.value)}
                  className={`${SELECT_CLASS} mt-1 max-w-md py-2 text-xs`}
                >
                  {OFFICE_CALCULATORS.map((calc) => (
                    <option key={calc.id} value={calc.id}>
                      {calc.title}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => setIsPresentationMode(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Exit presentation mode"
              >
                <X className="h-4 w-4" />
                Exit
              </button>
            </div>
            <div className="min-h-0 flex-1 p-3 sm:p-5">{iframe}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
