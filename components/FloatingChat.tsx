"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "./icons";
import { HeroChatTerminal } from "./HeroChatTerminal";

const APPLE_EASE = [0.25, 0.1, 0.25, 1] as const;

/**
 * Digital Wealth Assistant floating in bottom-right. FAB opens panel with HeroChatTerminal.
 * AI system prompt is bound by Everest rules (R100k min, 5-year terms, 20% DWT) in /api/chat.
 */
export function FloatingChat() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: APPLE_EASE }}
            className="fixed inset-0 z-[90] md:pointer-events-none md:bg-transparent"
            aria-hidden
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: APPLE_EASE }}
            className="fixed bottom-20 right-4 md:bottom-6 md:right-6 w-[calc(100vw-2rem)] max-w-md max-h-[70vh] z-[95] flex flex-col rounded-[2rem] overflow-hidden rim-light border border-white/10 shadow-2xl"
          >
            <div className="relative overflow-y-auto flex-1 min-h-0 p-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-2 right-2 z-10 p-2 rounded-full bg-black/40 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <HeroChatTerminal />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[85] w-14 h-14 rounded-full rim-light border border-white/10 flex items-center justify-center text-white shadow-lg hover:bg-white/10 hover:scale-105 active:scale-95 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-cinematic-teal/50"
        aria-label={open ? "Close Digital Wealth Assistant" : "Open Digital Wealth Assistant"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </>
  );
}
