"use client";

import { useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import Link from "next/link";

/**
 * Simplified AI prompt teaser for hero. Compact input, minimal response.
 * Light invite for personalization without dominating space (v1.2 simplification).
 */
export function HeroChatTeaser() {
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    sendMessage({ text });
    setInput("");
  };

  const lastAssistant = messages.filter((m) => m.role === "assistant").pop();
  const showResponse = lastAssistant && messages.length > 0;

  return (
    <div
      className="mt-6 rim-light p-4 max-w-xl mx-auto rounded-[2rem] overflow-hidden"
      role="region"
      aria-label="Quick question"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div
          className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: "0 0 20px rgba(0, 87, 184, 0.25)",
          }}
        />
        <div className="relative flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus-within:border-cinematic-teal/40 focus-within:ring-1 focus-within:ring-cinematic-teal/30 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Everest 12.8% or estate duty..."
            disabled={status === "streaming"}
            className="flex-1 min-w-0 bg-transparent text-white placeholder:text-zinc-500 text-sm focus:outline-none"
            aria-label="Quick question"
          />
          <button
            type="submit"
            disabled={status === "streaming" || !input.trim()}
            className="shrink-0 text-cinematic-teal font-semibold text-sm hover:underline disabled:opacity-50"
          >
            {status === "streaming" ? "…" : "Ask"}
          </button>
        </div>
      </form>

      {showResponse && lastAssistant && (
        <div className="mt-3 px-2 py-2 rounded-xl bg-white/5 border border-white/10 text-left">
          {lastAssistant.parts?.map((part, i) => {
            if (part.type === "text" && "text" in part) {
              return (
                <p key={i} className="text-sm text-gray-300 line-clamp-3">
                  {(part as { text: string }).text}
                </p>
              );
            }
            return null;
          })}
          {(!lastAssistant.parts || lastAssistant.parts.length === 0) &&
            typeof (lastAssistant as unknown as { content?: string }).content === "string" && (
              <p className="text-sm text-gray-300 line-clamp-3">
                {(lastAssistant as unknown as { content: string }).content}
              </p>
            )}
          <Link href="/chat" className="text-xs text-cinematic-teal hover:underline mt-1 inline-block">
            Open full chat →
          </Link>
        </div>
      )}

      {error && (
        <p className="text-amber-400 text-xs mt-2 px-2" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}
