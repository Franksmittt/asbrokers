"use client";

export function EverestLiquidityWarning() {
  return (
    <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
      <p className="text-amber-200/90 text-sm font-medium mb-1">Liquidity notice</p>
      <p className="text-zinc-400 text-xs leading-relaxed">
        Unlisted preference shares are illiquid. Withdrawals typically require a <strong className="text-zinc-300">120-day notice period</strong>. A
        <strong className="text-zinc-300"> 15% early exit penalty</strong> may apply for exceptional early redemption. Please read the product terms and consult a qualified financial adviser.
      </p>
    </div>
  );
}
