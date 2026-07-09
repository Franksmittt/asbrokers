"use client";

import dynamic from "next/dynamic";

const SpeculationRulesClient = dynamic(
  () => import("@/components/seo/SpeculationRulesClient").then((m) => m.SpeculationRulesClient),
  { ssr: false }
);

const FallbackPageJsonLdClient = dynamic(
  () => import("@/components/seo/FallbackPageJsonLdClient").then((m) => m.FallbackPageJsonLdClient),
  { ssr: false }
);

/** Root-level client extras deferred off the static shell critical path. */
export function DeferredRootExtras() {
  return (
    <>
      <FallbackPageJsonLdClient />
      <SpeculationRulesClient />
    </>
  );
}
