"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

type Stats = {
  new: number;
  contacted: number;
  qualified: number;
  proposal: number;
  closedWon: number;
  closedLost: number;
  total: number;
};

type ByService = { service: string; new: number; contacted: number; qualified: number; proposal: number; won: number; lost: number; total: number }[];

export function ExecutiveCharts({ stats, byService }: { stats: Stats; byService: ByService }) {
  const pipelineData = [
    { stage: "New", count: stats.new, fill: "#3b82f6" },
    { stage: "Contacted", count: stats.contacted, fill: "#f59e0b" },
    { stage: "Qualified", count: stats.qualified, fill: "#14b8a6" },
    { stage: "Proposal", count: stats.proposal, fill: "#8b5cf6" },
    { stage: "Won", count: stats.closedWon, fill: "#22c55e" },
    { stage: "Lost", count: stats.closedLost, fill: "#71717a" },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="rounded-2xl bg-vault-card border border-white/10 p-4 sm:p-6">
        <h3 className="text-sm font-bold text-white mb-4">Pipeline by stage</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pipelineData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="stage" tick={{ fill: "#71717a", fontSize: 11 }} />
              <YAxis tick={{ fill: "#71717a", fontSize: 11 }} width={28} />
              <Tooltip
                contentStyle={{ backgroundColor: "#151518", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1rem" }}
                labelStyle={{ color: "#a1a1aa" }}
              />
              <Bar dataKey="count" fill="#008080" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="rounded-2xl bg-vault-card border border-white/10 p-4 sm:p-6">
        <h3 className="text-sm font-bold text-white mb-4">Leads by service</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={byService}
              layout="vertical"
              margin={{ top: 8, right: 8, left: 80, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis type="number" tick={{ fill: "#71717a", fontSize: 11 }} width={36} />
              <YAxis type="category" dataKey="service" tick={{ fill: "#71717a", fontSize: 10 }} width={78} />
              <Tooltip
                contentStyle={{ backgroundColor: "#151518", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1rem" }}
              />
              <Bar dataKey="total" fill="#0057B8" radius={[0, 4, 4, 0]} name="Leads" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
