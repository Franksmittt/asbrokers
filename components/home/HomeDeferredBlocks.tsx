"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { DeferUntilVisible } from "@/components/home/DeferUntilVisible";
import { HomeRunOutCalculator } from "@/components/home/HomeLazyWidgets";

const HomeValueProps = dynamic(
  () => import("@/components/HomeValueProps").then((m) => m.HomeValueProps),
  { loading: () => <div className="min-h-[200px]" /> }
);

const HomeFloatingChat = dynamic(
  () => import("@/components/home/HomeLazyWidgets").then((m) => m.HomeFloatingChat),
  { ssr: false, loading: () => null }
);

const calculatorFallback = (
  <div className="grid min-h-[400px] grid-cols-1 gap-8 rounded-[2rem] border border-white/10 bg-white/[0.03] animate-pulse lg:grid-cols-12" />
);

export function HomeDeferredCalculator() {
  return (
    <DeferUntilVisible fallback={calculatorFallback} minHeightClass="min-h-[400px]">
      <HomeRunOutCalculator />
    </DeferUntilVisible>
  );
}

export function HomeDeferredAnimatedSections({ children }: { children: ReactNode }) {
  return <DeferUntilVisible minHeightClass="min-h-[320px]">{children}</DeferUntilVisible>;
}

export function HomeDeferredValueProps() {
  return (
    <DeferUntilVisible minHeightClass="min-h-[200px]">
      <HomeValueProps />
    </DeferUntilVisible>
  );
}

export function HomeDeferredFloatingChat() {
  return <HomeFloatingChat />;
}
