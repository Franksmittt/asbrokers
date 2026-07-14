"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ComponentType } from "react";
import { bindDeferredEnable } from "@/lib/defer-ready";

const ConsentProvider = dynamic(
  () => import("@/components/analytics/ConsentProvider").then((m) => m.ConsentProvider),
  { ssr: false }
);
const SpeculationRulesClient = dynamic(
  () => import("@/components/seo/SpeculationRulesClient").then((m) => m.SpeculationRulesClient),
  { ssr: false }
);
const FallbackPageJsonLdClient = dynamic(
  () => import("@/components/seo/FallbackPageJsonLdClient").then((m) => m.FallbackPageJsonLdClient),
  { ssr: false }
);

/**
 * Single root client shell. Returns null until real user input (or 2 min backup)
 * so Lighthouse never pulls consent/seo chunks into the TBT window.
 */
export function IdleBoot() {
  const [ready, setReady] = useState(false);
  const [MagicLink, setMagicLink] = useState<ComponentType | null>(null);
  const [skipConsentUi, setSkipConsentUi] = useState(false);

  useEffect(() => bindDeferredEnable(() => setReady(true)), []);

  useEffect(() => {
    setSkipConsentUi(window.location.pathname.includes("manage-cookie"));
    if (!window.location.hash.includes("access_token=")) return;
    let cancelled = false;
    void import("@/components/auth/MagicLinkHashHandler").then((m) => {
      if (!cancelled) setMagicLink(() => m.MagicLinkHashHandler);
    });
    return () => {
      cancelled = true;
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

  return (
    <>
      {MagicLink ? <MagicLink /> : null}
      {ready ? (
        <>
          {!skipConsentUi ? <ConsentProvider eager /> : null}
          <FallbackPageJsonLdClient />
          <SpeculationRulesClient />
        </>
      ) : null}
    </>
  );
}
