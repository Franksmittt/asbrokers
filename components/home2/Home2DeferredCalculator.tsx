"use client";

import { DeferUntilVisible } from "@/components/home/DeferUntilVisible";
import { HomeRunOutCalculator } from "@/components/home/HomeLazyWidgets";

const calculatorFallback = (
  <div className="grid min-h-[400px] grid-cols-1 gap-8 rounded-3xl border border-white/10 bg-white/[0.03] animate-pulse lg:grid-cols-12" />
);

export function Home2DeferredCalculator() {
  return (
    <DeferUntilVisible fallback={calculatorFallback} minHeightClass="min-h-[400px]">
      <HomeRunOutCalculator />
    </DeferUntilVisible>
  );
}
