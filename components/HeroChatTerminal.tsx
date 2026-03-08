"use client";

import { useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import Link from "next/link";

const PRE_PROMPTS = [
  "How does the 12.8% Strategic Income work?",
  "Estimate my estate duty.",
  "Retiree? Ask about Amethyst Annuity.",
];

/**
 * Embedded AI chat terminal for the hero. useChat + tools (estate duty, strategic income).
 * Frosted rim-light, pulsing blue input glow. Pre-prompts for personalization (2026 engagement trends).
 */
export function HeroChatTerminal() {
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  return (
    <div
      className="mt-6 rim-light p-4 rounded-[2rem] overflow-hidden"
      role="region"
      aria-label="Digital Wealth Assistant"
    >
      <div className="flex items-center gap-2 px-2 py-2 border-b border-white/10 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" aria-hidden />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" aria-hidden />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" aria-hidden />
        <span className="ml-2 text-[10px] font-medium text-gray-500 uppercase tracking-widest">
          Digital Wealth Assistant
        </span>
      </div>

      <div
        ref={scrollRef}
        className="min-h-[120px] max-h-[200px] overflow-y-auto py-3 space-y-2"
      >
        {messages.length === 0 && (
          <p className="text-zinc-500 text-sm px-2">
            Ask about 12.8% Strategic Income, estate duty, or Amethyst Annuity.
          </p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={msg.role === "user" ? "flex justify-end px-2" : "flex justify-start px-2"}
          >
            <div
              className={
                msg.role === "user"
                  ? "rounded-2xl rounded-br-md px-3 py-2 bg-cinematic-teal/20 border border-cinematic-teal/30 max-w-[90%]"
                  : "rounded-2xl rounded-bl-md px-3 py-2 bg-white/5 border border-white/10 max-w-[90%]"
              }
            >
              {msg.parts?.map((part, i) => {
                if (part.type === "text" && "text" in part) {
                  return (
                    <p key={i} className="text-sm text-white whitespace-pre-wrap">
                      {(part as { text: string }).text}
                    </p>
                  );
                }
                return null;
              })}
              {(!msg.parts || msg.parts.length === 0) && typeof (msg as unknown as { content?: string }).content === "string" && (
                <p className="text-sm text-white whitespace-pre-wrap">{(msg as unknown as { content: string }).content}</p>
              )}
            </div>
          </div>
        ))}
        {status === "streaming" && (
          <p className="text-zinc-500 text-sm px-2 animate-pulse">Thinking…</p>
        )}
      </div>

      {error && (
        <p className="text-amber-400 text-xs px-2 py-1" role="alert">
          {error.message}
        </p>
      )}

      <div className="flex flex-wrap gap-2 pt-2 pb-2">
        {PRE_PROMPTS.map((text) => (
          <button
            key={text}
            type="button"
            onClick={() => sendMessage({ text })}
            disabled={status === "streaming"}
            className="text-xs px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-cinematic-teal/20 hover:border-cinematic-teal/30 hover:text-white transition-colors disabled:opacity-50"
          >
            {text}
          </button>
        ))}
      </div>

      <form
        className="relative rounded-2xl overflow-hidden"
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.currentTarget.querySelector<HTMLInputElement>('input[name="hero-chat"]');
          const text = input?.value?.trim();
          if (text) {
            sendMessage({ text });
            if (input) input.value = "";
          }
        }}
      >
        <div
          className="absolute inset-0 opacity-40 pointer-events-none rounded-2xl"
          style={{
            boxShadow: "0 0 24px rgba(0, 87, 184, 0.4)",
            animation: "hero-terminal-glow 2s ease-in-out infinite",
          }}
        />
        <div className="relative flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus-within:border-samsung-blue/50 focus-within:ring-2 focus-within:ring-samsung-blue/30 transition-all">
          <input
            name="hero-chat"
            type="text"
            placeholder="Ask anything…"
            disabled={status === "streaming"}
            className="flex-1 min-w-0 bg-transparent text-white placeholder:text-zinc-500 text-sm focus:outline-none"
            aria-label="Chat message"
          />
          <button
            type="submit"
            disabled={status === "streaming"}
            className="shrink-0 text-cinematic-teal font-semibold text-sm hover:underline disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>

      <Link
        href="/chat"
        className="mt-2 block text-center text-xs text-cinematic-teal hover:underline"
      >
        Open full chat →
      </Link>
    </div>
  );
}
