"use client";

import dynamic from "next/dynamic";
import { PageMediaStrip } from "@/components/PageMediaStrip";

const EverestWealthBento = dynamic(
  () => import("@/components/EverestWealthBento").then((m) => m.EverestWealthBento),
  { loading: () => <div className="min-h-[320px] animate-pulse rounded-[2rem] bg-white/[0.03]" /> }
);
const Code18Advantage = dynamic(
  () => import("@/components/Code18Advantage").then((m) => m.Code18Advantage),
  { loading: () => <div className="min-h-[280px] animate-pulse rounded-[2rem] bg-white/[0.03]" /> }
);
const RiskArchitectureCarousel = dynamic(
  () => import("@/components/RiskArchitectureCarousel").then((m) => m.RiskArchitectureCarousel),
  { loading: () => <div className="min-h-[320px] animate-pulse rounded-[2rem] bg-white/[0.03]" /> }
);

/** Framer-heavy home sections — code-split for mobile Lighthouse (Phase 9). */
export function HomeAnimatedSections() {
  return (
    <>
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto relative z-10">
        <EverestWealthBento />
      </section>

      <section className="py-6 md:py-8 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto relative z-10">
        <PageMediaStrip variant="secondary" src="/images/home-yield-continuity-4x3.jpg" />
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto relative z-10">
        <Code18Advantage />
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto relative z-10">
        <RiskArchitectureCarousel />
      </section>
    </>
  );
}
