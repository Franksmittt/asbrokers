"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { ArrowUp } from "@/components/icons";

const FloatingChat = dynamic(
  () => import("@/components/FloatingChat").then((m) => m.FloatingChat),
  { ssr: false, loading: () => null }
);

/**
 * Homepage Wealth Assistant bar — visible immediately (SSR shell).
 * Full FloatingChat (framer + AI) loads only when the user focuses/submits the bar,
 * so Lighthouse TBT stays clean until real interaction with chat.
 */
export function HomeChatBar() {
  const [active, setActive] = useState(false);

  if (active) return <FloatingChat autoFocusInput />;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[94] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 md:bottom-5 md:px-0 md:pb-0"
      data-visual-ignore
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setActive(true);
        }}
        onPointerDown={() => setActive(true)}
        className="mx-auto flex w-full max-w-xl items-center gap-2 rounded-full border border-white/12 bg-[#0d0d10] px-3 py-2 shadow-[0_8px_40px_rgba(0,0,0,0.45)] ring-1 ring-white/5 md:mr-24 md:max-w-lg lg:max-w-xl"
      >
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Ask the Wealth Assistant</span>
          <span className="pointer-events-none absolute inset-0 flex items-center px-3 text-sm text-zinc-400">
            Ask about Everest, retirement income, or Discovery…
          </span>
          <input
            type="text"
            readOnly
            enterKeyHint="send"
            autoComplete="off"
            className="chat-dark-input w-full cursor-text rounded-full border-0 bg-transparent px-3 py-2.5 text-sm text-zinc-100 caret-zinc-100 focus:outline-none focus:ring-0"
            aria-label="Ask about Everest Wealth, Discovery Health, or estate duty"
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
    </div>
  );
}
