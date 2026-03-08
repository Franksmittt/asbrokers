"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const formatZar = (n: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0, notation: "compact" }).format(n);

type IncomePoint = { month: number; label: string; cumulative: number };
type DrawdownPoint = { year: number; capital: number; drawn: number };

export function PortalDashboardCharts({
  incomeData,
  drawdownData,
}: {
  incomeData: IncomePoint[];
  drawdownData: DrawdownPoint[];
}) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="rounded-2xl bg-vault-card border border-white/10 p-4 sm:p-6">
        <h3 className="text-sm font-bold text-white mb-4">Cumulative income (60 months, mock)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={incomeData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(0, 128, 128)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="rgb(0, 128, 128)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="label" tick={{ fill: "#71717a", fontSize: 11 }} />
              <YAxis tickFormatter={(v) => formatZar(v)} tick={{ fill: "#71717a", fontSize: 11 }} width={56} />
              <Tooltip
                contentStyle={{ backgroundColor: "#151518", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1rem" }}
                labelStyle={{ color: "#a1a1aa" }}
                formatter={(value: number | undefined) => [value != null ? formatZar(value) : "", "Cumulative"]}
                labelFormatter={(label) => `Month ${label}`}
              />
              <Area type="monotone" dataKey="cumulative" stroke="#008080" strokeWidth={2} fill="url(#incomeGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="rounded-2xl bg-vault-card border border-white/10 p-4 sm:p-6">
        <h3 className="text-sm font-bold text-white mb-4">Annuity capital (drawdown scenario, mock)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={drawdownData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="capitalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(0, 87, 184)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="rgb(0, 87, 184)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="year" tick={{ fill: "#71717a", fontSize: 11 }} />
              <YAxis tickFormatter={(v) => formatZar(v)} tick={{ fill: "#71717a", fontSize: 11 }} width={56} />
              <Tooltip
                contentStyle={{ backgroundColor: "#151518", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1rem" }}
                formatter={(value: number | undefined) => [value != null ? formatZar(value) : "", "Capital"]}
                labelFormatter={(y) => `Year ${y}`}
              />
              <Area type="monotone" dataKey="capital" stroke="#0057B8" strokeWidth={2} fill="url(#capitalGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
