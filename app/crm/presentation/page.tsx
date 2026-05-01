"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WealthArchitectureTimeline } from "@/components/crm/WealthArchitectureTimeline";
import { X, Maximize2 } from "@/components/icons";

const APPLE_EASE = [0.25, 0.1, 0.25, 1] as const;

export default function CrmPresentationPage() {
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="trust-hallmark text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-1">
              FSP 17273 · Sales Canvas
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Wealth Architecture Timeline
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Use during live consultations or screen-sharing. Click a node for talking points.
            </p>
          </div>
          <motion.button
            type="button"
            onClick={() => setIsPresentationMode(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cinematic-teal/30 text-white text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cinematic-teal/50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25, ease: APPLE_EASE }}
          >
            <Maximize2 className="w-4 h-4" />
            Full screen
          </motion.button>
        </div>

        <WealthArchitectureTimeline />
      </div>

      <AnimatePresence>
        {isPresentationMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: APPLE_EASE }}
            className="fixed inset-0 z-[100] bg-void flex flex-col"
          >
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-void/80 backdrop-blur-sm">
              <span className="text-sm font-medium text-zinc-400">
                Wealth Architecture Timeline · Presentation mode
              </span>
              <button
                type="button"
                onClick={() => setIsPresentationMode(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium"
                aria-label="Exit presentation mode"
              >
                <X className="w-4 h-4" />
                Exit
              </button>
            </div>
            <div className="flex-1 min-h-0 p-4 sm:p-6 overflow-auto">
              <div className="max-w-6xl mx-auto h-full min-h-[600px]">
                <WealthArchitectureTimeline />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
