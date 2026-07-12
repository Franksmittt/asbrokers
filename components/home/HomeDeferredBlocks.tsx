"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import type { ReactNode } from "react";
import { DeferUntilVisible } from "@/components/home/DeferUntilVisible";

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
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center ring-1 ring-white/10">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] sm:tracking-[0.18em] text-white/50">Planning tool</p>
        <h2 className="mt-3 text-2xl font-bold text-white">Life of Capital Calculator</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/70">
          Model how long your retirement capital may last. One of seventeen AS Brokers planning tools.
        </p>
        <Link
          href="/embed-calculators/asset-004-life-of-capital.html"
          prefetch={false}
          className="mt-6 inline-flex items-center justify-center rounded-2xl bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#004a9e]"
        >
          Open calculator
        </Link>
      </div>
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
