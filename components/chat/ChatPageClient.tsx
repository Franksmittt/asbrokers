"use client";

import { useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { asbrokersChatFetch } from "@/lib/asbrokers-chat-fetch";

const formatCurrency = (val: number) =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val);

function ToolResultCard({
  toolName,
  result,
}: {
  toolName: string;
  result: unknown;
}) {
  const r = result as Record<string, unknown>;
  if (toolName === "calculateEstateDuty" && r) {
    return (
      <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-2 text-sm">
        <p className="text-zinc-400 font-medium">Estate duty result</p>
        <p className="text-white">Total estate costs: {formatCurrency((r.totalEstateCosts as number) ?? 0)}</p>
        <p className="text-zinc-400">Estate duty: {formatCurrency((r.estateDutyPayable as number) ?? 0)} · Executor fees: {formatCurrency((r.executorFees as number) ?? 0)}</p>
      </div>
    );
  }
  if (toolName === "calculateStrategicIncome128" && r) {
    return (
      <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-2 text-sm">
        <p className="text-zinc-400 font-medium">12.8% Strategic Income</p>
        <p className="text-white">Net monthly income: {formatCurrency((r.netMonthlyIncome as number) ?? 0)}</p>
        <p className="text-zinc-400">5-year loyalty bonus: {formatCurrency((r.loyaltyBonus as number) ?? 0)}</p>
      </div>
    );
  }
  if (toolName === "calcAmethystAnnuity" && r) {
    return (
      <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-2 text-sm">
        <p className="text-zinc-400 font-medium">Amethyst Living Annuity</p>
        <p className="text-white">Net monthly income: {formatCurrency((r.netMonthlyIncome as number) ?? 0)}</p>
        <p className="text-zinc-400">Gross: {formatCurrency((r.grossMonthlyIncome as number) ?? 0)} · Est. tax: {formatCurrency((r.estimatedMonthlyTax as number) ?? 0)}</p>
      </div>
    );
  }
  return (
    <pre className="text-xs text-zinc-500 overflow-auto p-2 rounded bg-black/20">
      {JSON.stringify(result, null, 2)}
    </pre>
  );
}

/** Client island — chat UI only; hero and links are server-rendered (Phase 2.4). */
export function ChatPageClient() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat", fetch: asbrokersChatFetch }),
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  return (
    <section className="flex-1 flex flex-col min-h-0 px-4 sm:px-6 md:px-8 pb-4">
      <div className="max-w-3xl mx-auto w-full flex flex-col flex-1 min-h-0 min-h-[min(420px,70dvh)]">
        <div
          ref={scrollRef}
          className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain rounded-2xl bg-[#151518] border border-white/10 p-4 space-y-4"
        >
          {messages.length === 0 && (
            <p className="text-zinc-500 text-sm">
              e.g. &quot;What would my estate duty be on R8 million?&quot; or &quot;How much monthly income from R1.5m in the 12.8% Strategic Income?&quot;
            </p>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}
            >
              <div
                className={
                  msg.role === "user"
                    ? "rounded-2xl bg-blue-500/20 border border-blue-500/30 px-4 py-2 max-w-[min(100%,22rem)]"
                    : "rounded-2xl bg-white/5 border border-white/10 px-4 py-2 max-w-[min(100%,22rem)] space-y-2"
                }
              >
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{msg.role}</p>
                {msg.parts?.map((part, i) => {
                  if (part.type === "text") {
                    return (
                      <p key={i} className="text-sm text-white whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
                        {part.text}
                      </p>
                    );
                  }
                  if (
                    typeof part.type === "string" &&
                    part.type.startsWith("tool-") &&
                    "state" in part &&
                    part.state === "output-available" &&
                    "output" in part
                  ) {
                    const toolName = part.type.replace(/^tool-/, "");
                    return (
                      <div key={i} className="mt-2">
                        <ToolResultCard toolName={toolName} result={(part as { output: unknown }).output} />
                      </div>
                    );
                  }
                  if (
                    (part as { type?: string }).type === "dynamic-tool" &&
                    "state" in part &&
                    part.state === "output-available" &&
                    "output" in part
                  ) {
                    const p = part as { toolName: string; output: unknown };
                    return (
                      <div key={i} className="mt-2">
                        <ToolResultCard toolName={p.toolName} result={p.output} />
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          ))}
          {status === "streaming" && <p className="text-zinc-500 text-sm animate-pulse">Thinking…</p>}
        </div>

        {error && (
          <p className="text-amber-400 text-sm mt-2 shrink-0" role="alert">
            {error.message}
          </p>
        )}

        <form
          className="mt-3 shrink-0 flex gap-2 pt-3 border-t border-white/10 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const input = form.querySelector<HTMLInputElement>('input[name="q"]');
            const text = input?.value?.trim();
            if (text) {
              sendMessage({ text });
              if (input) input.value = "";
            }
          }}
        >
          <input
            name="q"
            type="text"
            enterKeyHint="send"
            autoComplete="off"
            placeholder="Ask about estate duty, 12.8% income, or Amethyst annuity…"
            className="flex-1 min-h-[48px] sm:min-h-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 touch-manipulation"
            disabled={status === "streaming"}
          />
          <button
            type="submit"
            disabled={status === "streaming"}
            className="shrink-0 min-w-[48px] sm:min-w-0 bg-white text-black font-bold px-5 sm:px-6 py-3 rounded-xl hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
