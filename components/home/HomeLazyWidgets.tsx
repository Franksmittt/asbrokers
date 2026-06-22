"use client";

import dynamic from "next/dynamic";

export const HomeRunOutCalculator = dynamic(
  () => import("@/components/RunOutCalculator").then((m) => m.RunOutCalculator),
  {
    loading: () => (
      <div className="grid min-h-[400px] grid-cols-1 gap-8 rounded-[2rem] border border-white/10 bg-white/[0.03] animate-pulse lg:grid-cols-12" />
    ),
  }
);

export const HomeFloatingChat = dynamic(
  () => import("@/components/FloatingChat").then((m) => m.FloatingChat),
  { ssr: false, loading: () => null }
);
