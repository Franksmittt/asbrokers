"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SpeculationRulesClient = dynamic(
  () => import("@/components/seo/SpeculationRulesClient").then((m) => m.SpeculationRulesClient),
  { ssr: false }
);

const FallbackPageJsonLdClient = dynamic(
  () => import("@/components/seo/FallbackPageJsonLdClient").then((m) => m.FallbackPageJsonLdClient),
  { ssr: false }
);

/**
 * Root client extras — mount after interaction or 12s so `lib/seo` / speculation
 * never compete with homepage LCP/TBT (homepage already ships PageJsonLd in RSC).
 */
export function DeferredRootExtras() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const enable = () => setReady(true);
    // No scroll: LH auto-scroll must not pull seo/speculation chunks into TBT.
    const t = window.setTimeout(enable, 12_000);
    window.addEventListener("pointerdown", enable, { once: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("pointerdown", enable);
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      <FallbackPageJsonLdClient />
      <SpeculationRulesClient />
    </>
  );
}
