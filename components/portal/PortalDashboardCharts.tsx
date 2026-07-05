"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PortalChartPoint } from "@/lib/mock-portal";
import { formatPortalCurrency } from "@/lib/mock-portal";

type Props = {
  data: PortalChartPoint[];
};

export function PortalDashboardCharts({ data }: Props) {
  return (
    <div className="h-72 w-full sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="portalIncomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#008080" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#008080" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="portalDrawdownGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0057B8" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#0057B8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${Math.round(v / 1000)}k`}
            width={40}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1D1D1F",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "1rem",
            }}
            labelStyle={{ color: "rgba(255,255,255,0.6)" }}
            formatter={(value, name) => [
              typeof value === "number" ? formatPortalCurrency(value) : "N/A",
              name === "income" ? "Income" : "Drawdown",
            ]}
          />
          <Area
            type="monotone"
            dataKey="income"
            name="income"
            stroke="#008080"
            strokeWidth={2}
            fill="url(#portalIncomeGradient)"
            connectNulls
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="drawdown"
            name="drawdown"
            stroke="#0057B8"
            strokeWidth={1.5}
            fill="url(#portalDrawdownGradient)"
            connectNulls
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
