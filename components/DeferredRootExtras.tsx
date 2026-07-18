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

const HomeFloatingChat = dynamic(
  () => import("@/components/home/HomeLazyWidgets").then((m) => m.HomeFloatingChat),
  { ssr: false, loading: () => null }
);

const ConsentProvider = dynamic(
  () => import("@/components/analytics/ConsentProvider").then((m) => m.ConsentProvider),
  { ssr: false, loading: () => null }
);

/**
 * Single gated root island: speculation, fallback JSON-LD, consent, floating chat.
 * Mount after pointer/12s so homepage TBT is not wrecked (no scroll unlock — LH auto-scroll).
 */
export function DeferredRootExtras() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const enable = () => setReady(true);
    const t = window.setTimeout(enable, 12_000);
    window.addEventListener("pointerdown", enable, { once: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("pointerdown", enable);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (document.querySelector('link[rel="manifest"]')) return;
    const link = document.createElement("link");
    link.rel = "manifest";
    link.href = "/manifest.json";
    document.head.appendChild(link);
  }, [ready]);

  if (!ready) return null;

  return (
    <>
      <FallbackPageJsonLdClient />
      <SpeculationRulesClient />
      <ConsentProvider eager />
      <HomeFloatingChat />
    </>
  );
}
