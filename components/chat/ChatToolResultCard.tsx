"use client";

const formatCurrency = (val: number) =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val);

export function ChatToolResultCard({
  toolName,
  result,
}: {
  toolName: string;
  result: unknown;
}) {
  const r = result as Record<string, unknown>;

  if (toolName === "captureCallbackLead" && r) {
    const ok = r.ok === true;
    return (
      <div
        className={
          ok
            ? "rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 space-y-1 text-sm"
            : "rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 space-y-1 text-sm"
        }
      >
        <p className={ok ? "font-medium text-emerald-300" : "font-medium text-amber-300"}>
          {ok ? "Callback request logged" : "Could not log callback"}
        </p>
        <p className="text-zinc-200">{String(r.message ?? "")}</p>
        {ok && typeof r.name === "string" ? (
          <p className="text-xs text-zinc-400">
            {r.name}
            {typeof r.interestLabel === "string" ? ` · ${r.interestLabel}` : ""}
          </p>
        ) : null}
      </div>
    );
  }

  if (toolName === "calculateEstateDuty" && r) {
    return (
      <div className="rounded-xl border border-white/10 bg-[#1c1c22] p-3 space-y-1 text-sm">
        <p className="font-medium text-zinc-400">Estate duty result</p>
        <p className="text-zinc-100">
          Total estate costs: {formatCurrency((r.totalEstateCosts as number) ?? 0)}
        </p>
        <p className="text-xs text-zinc-400">
          Estate duty: {formatCurrency((r.estateDutyPayable as number) ?? 0)} · Executor fees:{" "}
          {formatCurrency((r.executorFees as number) ?? 0)}
        </p>
      </div>
    );
  }

  if (toolName === "calculateStrategicIncome128" && r) {
    return (
      <div className="rounded-xl border border-white/10 bg-[#1c1c22] p-3 space-y-1 text-sm">
        <p className="font-medium text-zinc-400">12.8% Strategic Income</p>
        <p className="text-zinc-100">
          Net monthly income: {formatCurrency((r.netMonthlyIncome as number) ?? 0)}
        </p>
        <p className="text-xs text-zinc-400">
          5-year loyalty bonus: {formatCurrency((r.loyaltyBonus as number) ?? 0)}
        </p>
      </div>
    );
  }

  if (toolName === "calcAmethystAnnuity" && r) {
    return (
      <div className="rounded-xl border border-white/10 bg-[#1c1c22] p-3 space-y-1 text-sm">
        <p className="font-medium text-zinc-400">Amethyst Living Annuity</p>
        <p className="text-zinc-100">
          Net monthly income: {formatCurrency((r.netMonthlyIncome as number) ?? 0)}
        </p>
        <p className="text-xs text-zinc-400">
          Gross: {formatCurrency((r.grossMonthlyIncome as number) ?? 0)} · Est. tax:{" "}
          {formatCurrency((r.estimatedMonthlyTax as number) ?? 0)}
        </p>
      </div>
    );
  }

  return (
    <pre className="overflow-auto rounded bg-black/20 p-2 text-xs text-zinc-500">
      {JSON.stringify(result, null, 2)}
    </pre>
  );
}
