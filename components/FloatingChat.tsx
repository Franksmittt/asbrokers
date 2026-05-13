"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MessageCircle, X, ChevronDown, ChevronUp } from "./icons";
import { HeroChatTerminal } from "./HeroChatTerminal";
import { clsx } from "clsx";

const APPLE_EASE = [0.25, 0.1, 0.25, 1] as const;

type PanelMode = "idle" | "open" | "minimized";

/**
 * Digital Wealth Assistant: mobile-first bottom sheet, desktop floating card.
 * Minimize keeps the session mounted (panel moves off-screen); Close ends the session.
 */
export function FloatingChat() {
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = useState<PanelMode>("idle");

  useEffect(() => {
    if (mode !== "open") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMode("idle");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode]);

  const close = () => setMode("idle");
  const minimize = () => setMode("minimized");
  const openPanel = () => setMode("open");

  const transition = reduceMotion ? { duration: 0 } : { duration: 0.22, ease: APPLE_EASE };

  const sessionLive = mode === "open" || mode === "minimized";

  return (
    <>
      <AnimatePresence>
        {mode === "open" && (
          <motion.div
            key="chat-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.18, ease: APPLE_EASE }}
            className="fixed inset-0 z-[90] md:pointer-events-none md:bg-transparent"
            aria-hidden
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/60 backdrop-blur-[2px] md:hidden"
              onClick={close}
              aria-label="Close chat"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mode === "minimized" && (
          <motion.div
            key="chat-minimized"
            role="status"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={transition}
            className="fixed left-3 right-3 z-[93] md:left-auto md:right-6 md:w-[min(26rem,calc(100vw-2rem))] bottom-[calc(7rem+env(safe-area-inset-bottom))] md:bottom-[5.75rem]"
          >
            <div className="rim-light border border-white/10 rounded-2xl flex items-stretch gap-1 shadow-2xl bg-[#0d0d10]/95 backdrop-blur-xl overflow-hidden">
              <button
                type="button"
                onClick={openPanel}
                className="flex-1 min-w-0 text-left pl-4 pr-2 py-3 touch-manipulation active:bg-white/5"
              >
                <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 block">
                  AS Brokers
                </span>
                <span className="text-sm font-medium text-white">Wealth Assistant</span>
                <span className="text-xs text-zinc-400 block mt-0.5">Tap to continue</span>
              </button>
              <div className="flex items-center pr-1 border-l border-white/10">
                <button
                  type="button"
                  onClick={openPanel}
                  className="p-3 rounded-xl hover:bg-white/10 text-zinc-200 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Expand chat"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="p-3 rounded-xl hover:bg-white/10 text-zinc-400 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {sessionLive && (
        <motion.div
          role="dialog"
          aria-modal={mode === "open"}
          aria-hidden={mode === "minimized"}
          aria-label="Digital Wealth Assistant"
          initial={false}
          animate={
            reduceMotion
              ? { opacity: mode === "open" ? 1 : 0 }
              : mode === "open"
                ? { opacity: 1, y: 0, x: 0 }
                : { opacity: 0, y: 0, x: 0 }
          }
          transition={transition}
          className={clsx(
            "fixed z-[95] flex flex-col rim-light border border-white/10 bg-[#0d0d10]/95 backdrop-blur-xl shadow-2xl overflow-hidden",
            mode === "open" &&
              "inset-x-0 bottom-0 rounded-t-[1.75rem] max-h-[min(34rem,88dvh)] h-[min(34rem,88dvh)] md:inset-auto md:bottom-24 md:right-6 md:left-auto md:rounded-[1.75rem] md:w-[min(26rem,calc(100vw-2rem))] md:max-h-[min(34rem,calc(100dvh-6.5rem))] md:h-[min(34rem,calc(100dvh-6.5rem))]",
            mode === "minimized" &&
              "left-[-120vw] top-0 h-[min(34rem,88dvh)] w-[min(26rem,calc(100vw-2rem))] max-w-[100vw] pointer-events-none opacity-0 md:h-[min(34rem,calc(100dvh-6.5rem))]"
          )}
        >
          <div className={clsx("md:hidden flex justify-center pt-2.5 pb-1 shrink-0", mode === "minimized" && "hidden")} aria-hidden>
            <div className="h-1 w-11 rounded-full bg-white/25" />
          </div>

          <header
            className={clsx(
              "shrink-0 flex items-center gap-1 px-2 sm:px-3 pt-1 pb-2 border-b border-white/10",
              mode === "minimized" && "hidden"
            )}
          >
            <div className="min-w-0 flex-1 pl-1">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">AS Brokers</p>
              <p className="text-sm font-semibold text-white truncate">Wealth Assistant</p>
            </div>
            <button
              type="button"
              onClick={minimize}
              className="p-2.5 rounded-xl hover:bg-white/10 text-zinc-300 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Minimize chat"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={close}
              className="p-2.5 rounded-xl hover:bg-white/10 text-zinc-300 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </header>

          <div
            className={clsx(
              "flex flex-1 flex-col min-h-0 px-3 sm:px-4 pb-1",
              mode === "minimized" && "invisible"
            )}
          >
            <HeroChatTerminal variant="panel" />
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {mode === "idle" && (
          <motion.button
            key="chat-fab"
            type="button"
            onClick={openPanel}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={transition}
            className="fixed bottom-[calc(7rem+env(safe-area-inset-bottom))] right-4 z-[94] md:bottom-[5.75rem] md:right-6 w-14 h-14 rounded-full rim-light border border-white/10 flex items-center justify-center text-white shadow-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cinematic-teal/50 touch-manipulation"
            aria-label="Open Digital Wealth Assistant"
            whileHover={reduceMotion ? undefined : { scale: 1.05 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
