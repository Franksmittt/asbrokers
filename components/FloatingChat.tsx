"use client";

import { useState, useEffect, useCallback, type FormEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ChevronDown, ChevronUp, ArrowUp } from "./icons";
import { HeroChatTerminal } from "./HeroChatTerminal";
import { TypewriterPrompt } from "@/components/chat/TypewriterPrompt";
import { useHideOverFooter } from "@/lib/use-hide-over-footer";
import { clsx } from "clsx";

const APPLE_EASE = [0.25, 0.1, 0.25, 1] as const;

type PanelMode = "idle" | "open" | "minimized";

type FloatingChatProps = {
  /** Focus the slim-bar input on mount (used when swapping in from HomeChatBar shell). */
  autoFocusInput?: boolean;
};

/**
 * Homepage Digital Wealth Assistant: slim dark sticky bar with typewriter prompts.
 * Enter / Send opens the full chat panel (session stays mounted while minimized).
 */
export function FloatingChat({ autoFocusInput = false }: FloatingChatProps = {}) {
  const reduceMotion = useReducedMotion();
  const hideOverFooter = useHideOverFooter();
  const [mode, setMode] = useState<PanelMode>("idle");
  const [draft, setDraft] = useState("");
  const [seedMessage, setSeedMessage] = useState<string | null>(null);
  const [focused, setFocused] = useState(autoFocusInput);

  useEffect(() => {
    if (mode !== "open") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMode("idle");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode]);

  const close = () => {
    setMode("idle");
    setSeedMessage(null);
  };
  const minimize = () => setMode("minimized");
  const openPanel = () => setMode("open");

  const openWithMessage = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) {
      setMode("open");
      return;
    }
    setSeedMessage(trimmed);
    setDraft("");
    setMode("open");
  }, []);

  const onSlimSubmit = (e: FormEvent) => {
    e.preventDefault();
    openWithMessage(draft);
  };

  const transition = reduceMotion ? { duration: 0 } : { duration: 0.22, ease: APPLE_EASE };
  const sessionLive = mode === "open" || mode === "minimized";
  const showTypewriter = !focused && draft.length === 0;

  return (
    <>
      <AnimatePresence>
        {mode === "open" && !hideOverFooter && (
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
        {mode === "minimized" && !hideOverFooter && (
          <motion.div
            key="chat-minimized"
            role="status"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={transition}
            className="fixed left-3 right-3 z-[93] md:left-auto md:right-24 md:w-[min(26rem,calc(100vw-7rem))] bottom-[calc(5.5rem+env(safe-area-inset-bottom))] md:bottom-[5.5rem]"
          >
            <div className="flex items-stretch gap-1 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c] shadow-2xl">
              <button
                type="button"
                onClick={openPanel}
                className="min-w-0 flex-1 py-3 pl-4 pr-2 text-left touch-manipulation active:bg-white/5"
              >
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                  AS Brokers
                </span>
                <span className="text-sm font-medium text-white">Wealth Assistant</span>
                <span className="mt-0.5 block text-xs text-zinc-400">Tap to continue</span>
              </button>
              <div className="flex items-center border-l border-white/10 pr-1">
                <button
                  type="button"
                  onClick={openPanel}
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl p-3 text-zinc-200 touch-manipulation hover:bg-white/10"
                  aria-label="Expand chat"
                >
                  <ChevronUp className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl p-3 text-zinc-400 touch-manipulation hover:bg-white/10"
                  aria-label="Close chat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {sessionLive && (
        <motion.div
          role="dialog"
          aria-modal={mode === "open" && !hideOverFooter}
          aria-hidden={mode === "minimized" || hideOverFooter}
          aria-label="Digital Wealth Assistant"
          initial={false}
          animate={
            reduceMotion
              ? { opacity: mode === "open" && !hideOverFooter ? 1 : 0 }
              : mode === "open" && !hideOverFooter
                ? { opacity: 1, y: 0, x: 0 }
                : { opacity: 0, y: 0, x: 0 }
          }
          transition={transition}
          className={clsx(
            /* Solid dark panel, translucent glass over warm canvas made chat text unreadable. */
            "fixed z-[95] flex flex-col overflow-hidden border border-white/12 bg-[#0a0a0c] shadow-2xl",
            hideOverFooter && "pointer-events-none",
            mode === "open" &&
              "inset-x-0 bottom-0 h-[min(36rem,88dvh)] max-h-[min(36rem,88dvh)] rounded-t-[1.75rem] md:inset-auto md:bottom-24 md:right-24 md:left-auto md:h-[min(36rem,calc(100dvh-7rem))] md:max-h-[min(36rem,calc(100dvh-7rem))] md:w-[min(26rem,calc(100vw-7rem))] md:rounded-[1.75rem]",
            mode === "minimized" &&
              "pointer-events-none left-[-120vw] top-0 h-[min(36rem,88dvh)] w-[min(26rem,calc(100vw-2rem))] max-w-[100vw] opacity-0 md:h-[min(36rem,calc(100dvh-7rem))]"
          )}
        >
          <div
            className={clsx("flex shrink-0 justify-center pb-1 pt-2.5 md:hidden", mode === "minimized" && "hidden")}
            aria-hidden
          >
            <div className="h-1 w-11 rounded-full bg-white/25" />
          </div>

          <header
            className={clsx(
              "flex shrink-0 items-center gap-1 border-b border-white/10 px-2 pb-2 pt-1 sm:px-3",
              mode === "minimized" && "hidden"
            )}
          >
            <div className="min-w-0 flex-1 pl-1">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">AS Brokers</p>
              <p className="truncate text-sm font-semibold text-white">Wealth Assistant</p>
            </div>
            <button
              type="button"
              onClick={minimize}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl p-2.5 text-zinc-300 touch-manipulation hover:bg-white/10"
              aria-label="Minimize chat"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={close}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl p-2.5 text-zinc-300 touch-manipulation hover:bg-white/10"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div
            className={clsx(
              "flex min-h-0 flex-1 flex-col px-3 pb-1 sm:px-4",
              mode === "minimized" && "invisible"
            )}
          >
            <HeroChatTerminal
              variant="panel"
              seedMessage={seedMessage}
              onSeedConsumed={() => setSeedMessage(null)}
            />
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {mode === "idle" && !hideOverFooter && (
          <motion.div
            key="chat-slim-bar"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={transition}
            className="fixed inset-x-0 bottom-0 z-[94] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 md:bottom-5 md:px-0 md:pb-0"
          >
            <form
              onSubmit={onSlimSubmit}
              className="mx-auto flex w-full max-w-xl items-center gap-2 rounded-full border border-white/12 bg-[#0d0d10] px-3 py-2 shadow-[0_8px_40px_rgba(0,0,0,0.45)] ring-1 ring-white/5 md:mr-24 md:max-w-lg lg:max-w-xl"
            >
              <label className="relative min-w-0 flex-1">
                <span className="sr-only">Ask the Wealth Assistant</span>
                {showTypewriter ? (
                  <span className="pointer-events-none absolute inset-0 flex items-center px-3 text-sm text-zinc-500">
                    <TypewriterPrompt className="truncate" />
                  </span>
                ) : null}
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  autoFocus={autoFocusInput}
                  enterKeyHint="send"
                  autoComplete="off"
                  className="chat-dark-input w-full rounded-full border-0 bg-transparent px-3 py-2.5 text-sm text-zinc-100 caret-zinc-100 focus:outline-none focus:ring-0"
                  aria-label="Ask about retirement education, insurance, or how advice works"
                />
              </label>
              <button
                type="submit"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-zinc-100 transition-colors hover:bg-cinematic-teal/30 hover:text-white touch-manipulation"
                aria-label="Open chat"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
