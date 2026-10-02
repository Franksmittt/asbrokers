"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Maximize2, X } from "@/components/icons";
import { recordCalculatorSessionForLead } from "@/app/actions/crm-calculator-session";
import {
  DEFAULT_OFFICE_CALCULATOR_ID,
  OFFICE_CALCULATORS,
  type OfficeCalculator,
} from "@/lib/crm/office-calculators";

const APPLE_EASE = [0.25, 0.1, 0.25, 1] as const;
const STORAGE_KEY = "asbrokers-office-calculator-id";

const SELECT_CLASS =
  "w-full max-w-xl rounded-2xl border border-[#E5E5E5] bg-zinc-950/90 px-4 py-3 text-sm text-[#1D1D1F] shadow-inner outline-none focus:border-cinematic-teal/40 focus:ring-2 focus:ring-cinematic-teal/25 [&>option]:bg-zinc-950 [&>option]:text-[#1D1D1F]";

function findCalculator(id: string): OfficeCalculator | undefined {
  return OFFICE_CALCULATORS.find((c) => c.id === id);
}

export function OfficeCalculatorCanvas({ leadId }: { leadId?: string }) {
  const reduceMotion = useReducedMotion();
  const [calculatorId, setCalculatorId] = useState(DEFAULT_OFFICE_CALCULATOR_ID);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [drawdownPct, setDrawdownPct] = useState("");
  const [sessionNotes, setSessionNotes] = useState("");
  const [sessionMessage, setSessionMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

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
      <p className="text-sm text-[#52525b]">No calculators are configured. Contact your developer.</p>
    );
  }

  const iframe = (
    <iframe
      key={active.id}
      title={active.title}
      src={active.embedPath}
      className="h-full min-h-[min(72vh,720px)] w-full rounded-2xl border border-[#E5E5E5] bg-[#0a0a0c]"
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
            <p className="trust-hallmark mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#52525b]">
              FSP 17273 · Client session
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-[#1D1D1F] sm:text-3xl">Calculators</h1>
            <p className="mt-1 text-sm text-[#52525b]">
              Choose a tool below and walk your client through the numbers, no need to open a blog article.
            </p>
          </div>
          <motion.button
            type="button"
            onClick={() => setIsPresentationMode(true)}
            className="flex items-center gap-2 rounded-[2rem] border border-[#E5E5E5] bg-[#F7F6F3] px-4 py-2.5 text-sm font-medium text-[#1D1D1F] transition-all hover:border-[#A7F3D0] hover:bg-[#F0F0EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-cinematic-teal/50"
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.25, ease: APPLE_EASE }}
          >
            <Maximize2 className="h-4 w-4" />
            Full screen
          </motion.button>
        </div>

        <div className="rim-light rounded-3xl border border-[#E5E5E5] bg-white/[0.04] p-4 sm:p-5">
          <label htmlFor="office-calculator-select" className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-[#52525b]">
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
          <p className="mt-2 text-[11px] text-[#52525b]">
            Your last choice is remembered on this device.
          </p>
        </div>

        {leadId ? (
          <div className="rim-light rounded-3xl border border-cinematic-teal/20 bg-cinematic-teal/5 p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#006B6B]">
              Link session to lead
            </p>
            <p className="mt-1 text-[11px] text-[#52525b]">
              After your Amethyst walkthrough, log the drawdown %, compliance flags appear on the Kanban automatically.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <input
                type="number"
                min={0}
                max={100}
                step={0.1}
                placeholder="Drawdown %"
                value={drawdownPct}
                onChange={(e) => setDrawdownPct(e.target.value)}
                className="w-32 rounded-xl border border-[#E5E5E5] bg-zinc-950/90 px-3 py-2 text-sm text-[#1D1D1F]"
              />
              <input
                type="text"
                placeholder="Session notes (optional)"
                value={sessionNotes}
                onChange={(e) => setSessionNotes(e.target.value)}
                className="min-w-[200px] flex-1 rounded-xl border border-[#E5E5E5] bg-zinc-950/90 px-3 py-2 text-sm text-[#1D1D1F]"
              />
              <button
                type="button"
                disabled={isPending}
                onClick={() => {
                  startTransition(async () => {
                    const pct = drawdownPct.trim() ? parseFloat(drawdownPct) : undefined;
                    const result = await recordCalculatorSessionForLead({
                      leadId,
                      calculatorId: active.id,
                      drawdownPercentage: pct,
                      notes: sessionNotes,
                    });
                    setSessionMessage(result.ok ? "Session saved to lead." : result.error);
                  });
                }}
                className="rounded-xl bg-cinematic-teal/20 px-4 py-2 text-sm font-semibold text-[#006B6B] hover:bg-cinematic-teal/30 disabled:opacity-50"
              >
                {isPending ? "Saving…" : "Save to lead"}
              </button>
              <Link
                href={`/crm/leads/${leadId}`}
                className="rounded-xl border border-[#E5E5E5] px-4 py-2 text-sm text-[#3F3F46] hover:text-[#1D1D1F]"
              >
                View lead
              </Link>
            </div>
            {sessionMessage ? (
              <p className="mt-2 text-xs text-[#52525b]">{sessionMessage}</p>
            ) : null}
          </div>
        ) : null}

        <div className="rim-light overflow-hidden rounded-3xl border border-[#E5E5E5] bg-[#050506] p-2 sm:p-3">
          <div className="border-b border-[#E5E5E5] px-3 py-2 sm:px-4">
            <p className="text-sm font-semibold text-[#1D1D1F]">{active.title}</p>
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
            className="fixed inset-0 z-[100] flex flex-col bg-[#F7F6F3]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E5E5] bg-[#F7F6F3]/80 px-4 py-3 backdrop-blur-sm sm:px-6">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-wider text-[#52525b]">Presentation mode</p>
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
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-[#52525b] transition-colors hover:bg-[#F0F0EE] hover:text-[#1D1D1F]"
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
