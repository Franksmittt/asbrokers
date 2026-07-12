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
    const onInteract = () => enable();

    // Lighthouse SI/TBT windows often span ~5–8s; keep chrome widgets out of that window.
    const t = window.setTimeout(enable, 12_000);
    window.addEventListener("scroll", onInteract, { once: true, passive: true });
    window.addEventListener("pointerdown", onInteract, { once: true });
    window.addEventListener("keydown", onInteract, { once: true });

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", onInteract);
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
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
