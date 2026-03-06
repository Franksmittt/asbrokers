"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, Suspense } from "react";
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import "./print.css";

const formatCurrency = (val: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 }).format(val);

function PdfReportContent() {
  const searchParams = useSearchParams();
  const portfolio = Math.min(50_000_000, Math.max(0, Number(searchParams.get("portfolio")) || 15_000_000));
  const drawdown = Math.min(500_000, Math.max(0, Number(searchParams.get("drawdown")) || 120_000));

  const { chartData, lineChartData, hitZeroYear } = useMemo(() => {
    let balance = portfolio;
    const annualDrawdown = drawdown * 12;
    const estimatedGrowthRate = 0.06;
    const data: { year: number; balance: number; isZero: boolean }[] = [];
    for (let year = 1; year <= 25; year++) {
      balance = balance * (1 + estimatedGrowthRate) - annualDrawdown;
      data.push({
        year,
        balance: Math.max(0, balance),
        isZero: balance <= 0,
      });
      if (balance <= 0) break;
    }
    const lineData = [
      { year: 0, balance: portfolio, display: "Start" },
      ...data.map((d) => ({ ...d, display: `Year ${d.year}` })),
    ];
    const zeroYear = data.find((d) => d.isZero)?.year ?? "> 25";
    return { chartData: data, lineChartData: lineData, hitZeroYear: zeroYear };
  }, [portfolio, drawdown]);

  return (
    <div className="pdf-content min-h-screen bg-[#0a0a0c] p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 border-b border-white/10 pb-6">
          <h1 className="text-2xl font-bold">AS Brokers CC · Wealth Projection</h1>
          <p className="text-zinc-400 text-sm mt-1">FSP 17273 · Independent Financial Advisor</p>
        </header>

        <section className="mb-8 grid grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Portfolio value</p>
            <p className="text-xl font-bold text-white">{formatCurrency(portfolio)}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Monthly drawdown</p>
            <p className="text-xl font-bold text-white">{formatCurrency(drawdown)}/mo</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 col-span-2">
            <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Estimated capital lifespan</p>
            <p className="text-3xl font-black text-white">
              {hitZeroYear === "> 25" ? "25+ years" : `${hitZeroYear} years`}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Projection over time</h2>
          <div className="h-64 w-full rounded-xl bg-white/5 border border-white/10 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lineChartData} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
                <defs>
                  <linearGradient id="pdfBalanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" tick={{ fill: "#71717a", fontSize: 10 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} />
                <YAxis tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickFormatter={(v) => `${(v / 1e6).toFixed(0)}M`} width={32} />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth={2}
                  fill="url(#pdfBalanceGradient)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <footer className="text-zinc-500 text-xs border-t border-white/10 pt-6">
          <p>This projection is for illustration only. Assumes 6% growth and does not constitute advice.</p>
          <p className="mt-2">AS Brokers CC · FSP 17273 · Alberton, Gauteng</p>
        </footer>
      </div>
    </div>
  );
}

export default function PdfReportPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0c]" />}>
      <PdfReportContent />
    </Suspense>
  );
}
