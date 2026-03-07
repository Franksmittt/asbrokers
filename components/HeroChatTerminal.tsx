"use client";

import Link from "next/link";

const WELCOME_MESSAGE =
  "Welcome to AS Brokers. I am your Digital Wealth Assistant. How can I protect your legacy today?";

export function HeroChatTerminal() {
  return (
    <div className="flex flex-col w-full min-w-0 h-[320px] sm:h-[360px] md:h-[380px] bg-white/5 backdrop-blur-2xl ring-1 ring-white/10 rounded-[2rem] overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        <span className="ml-2 text-[10px] font-medium text-gray-500 uppercase tracking-widest">
          Digital Wealth Assistant
        </span>
      </div>

      {/* Fake chat history */}
      <div className="flex-1 overflow-hidden flex flex-col justify-end p-4 space-y-3">
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-2xl rounded-bl-md px-4 py-2.5 bg-samsung-blue/20 border border-samsung-blue/30">
            <p className="text-sm text-gray-200 leading-relaxed">{WELCOME_MESSAGE}</p>
            <p className="text-[10px] text-gray-500 mt-1.5">AS Brokers · FSP 17273</p>
          </div>
        </div>
      </div>

      {/* Input bar with pulsing glow */}
      <div className="shrink-0 p-3 pt-0">
        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            boxShadow: "0 0 24px rgba(0, 87, 184, 0.4), 0 0 48px rgba(0, 87, 184, 0.2)",
            animation: "hero-terminal-glow 2s ease-in-out infinite",
          }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(0, 87, 184, 0.3), transparent)",
              animation: "hero-terminal-shine 2.5s ease-in-out infinite",
            }}
          />
          <div className="relative flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl">
            <span className="text-gray-500 text-sm">Ask anything...</span>
            <span className="ml-auto w-2 h-2 rounded-full bg-samsung-blue animate-pulse" />
          </div>
        </div>
        <Link
          href="/chat"
          className="mt-2 block text-center text-xs text-cinematic-teal hover:text-teal-300 transition-colors"
        >
          Open full chat →
        </Link>
      </div>
    </div>
  );
}
