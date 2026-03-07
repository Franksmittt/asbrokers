"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import Link from "next/link";
import { Footer } from "@/components/Footer";

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

export default function ChatPage() {
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  return (
    <div className="bg-[#0a0a0c] min-h-screen flex flex-col">
      <section className="pt-28 pb-8 px-4 sm:px-6 md:px-8 flex-shrink-0">
        <div className="max-w-3xl mx-auto">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-[0.2em] mb-2">AS Brokers</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
            Digital Wealth Assistant
          </h1>
          <p className="text-zinc-400 text-sm">
            Ask about estate duty, Everest 12.8% Strategic Income, or Amethyst Living Annuity. Calculations use deterministic SA tax and product rules. Not financial advice.
          </p>
          <p className="text-zinc-500 text-xs mt-2">
            FSP 17273 · Minimum investment R100,000 · 120-day notice &amp; 15% early exit may apply on voluntary products.
          </p>
        </div>
      </section>

      <section className="flex-1 px-4 sm:px-6 md:px-8 pb-8">
        <div className="max-w-3xl mx-auto flex flex-col h-[50vh] min-h-[320px]">
          <div className="flex-1 overflow-y-auto rounded-2xl bg-[#151518] border border-white/10 p-4 space-y-4">
            {messages.length === 0 && (
              <p className="text-zinc-500 text-sm">
                e.g. &quot;What would my estate duty be on R8 million?&quot; or &quot;How much monthly income from R1.5m in the 12.8% Strategic Income?&quot;
              </p>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={
                  msg.role === "user"
                    ? "flex justify-end"
                    : "flex justify-start"
                }
              >
                <div
                  className={
                    msg.role === "user"
                      ? "rounded-2xl bg-blue-500/20 border border-blue-500/30 px-4 py-2 max-w-[85%]"
                      : "rounded-2xl bg-white/5 border border-white/10 px-4 py-2 max-w-[85%] space-y-2"
                  }
                >
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    {msg.role}
                  </p>
                  {msg.parts?.map((part, i) => {
                    if (part.type === "text") {
                      return (
                        <p key={i} className="text-sm text-white whitespace-pre-wrap">
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
                          <ToolResultCard
                            toolName={toolName}
                            result={(part as { output: unknown }).output}
                          />
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
            {status === "streaming" && (
              <p className="text-zinc-500 text-sm animate-pulse">Thinking…</p>
            )}
          </div>

          {error && (
            <p className="text-amber-400 text-sm mt-2">Error: {error.message}</p>
          )}

          <form
            className="mt-4 flex gap-2"
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
              placeholder="Ask about estate duty, 12.8% income, or Amethyst annuity…"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
              disabled={status === "streaming"}
            />
            <button
              type="submit"
              disabled={status === "streaming"}
              className="bg-white text-black font-bold px-6 py-3 rounded-xl hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>
        </div>
      </section>

      <section className="border-t border-white/10 py-6 px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl mx-auto flex flex-wrap gap-4 text-sm">
          <Link href="/calculators" prefetch={false} className="text-blue-400 hover:underline">
            All calculators
          </Link>
          <Link href="/everest-wealth" prefetch={false} className="text-blue-400 hover:underline">
            Everest Wealth
          </Link>
          <Link href="/contact" prefetch={false} className="text-blue-400 hover:underline">
            Contact AS Brokers
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
