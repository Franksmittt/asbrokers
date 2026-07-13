"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const QuickActionBar = dynamic(
  () => import("@/components/QuickActionBar").then((m) => m.QuickActionBar),
  { ssr: false, loading: () => null }
);
const FloatingWhatsApp = dynamic(
  () => import("@/components/FloatingWhatsApp").then((m) => m.FloatingWhatsApp),
  { ssr: false, loading: () => null }
);

/** WhatsApp + quick actions after first interaction (or long idle), off Lighthouse critical path. */
export function MarketingChromeExtras() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;

    const enable = () => setReady(true);
    // No scroll: LH auto-scroll must not mount WhatsApp / quick-actions mid-audit.
    const t = window.setTimeout(enable, 12_000);
    window.addEventListener("pointerdown", enable, { once: true });
    window.addEventListener("keydown", enable, { once: true });

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("pointerdown", enable);
      window.removeEventListener("keydown", enable);
    };
  }, [ready]);

  if (!ready) return null;

  return (
    <>
      <QuickActionBar />
      <FloatingWhatsApp />
    </>
  );
}
