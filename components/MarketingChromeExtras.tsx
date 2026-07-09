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

/** WhatsApp + quick actions after idle — off Lighthouse critical path. */
export function MarketingChromeExtras() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (win.requestIdleCallback) {
      const id = win.requestIdleCallback(() => setReady(true), { timeout: 5000 });
      return () => win.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setReady(true), 3500);
    return () => window.clearTimeout(t);
  }, []);

  if (!ready) return null;

  return (
    <>
      <QuickActionBar />
      <FloatingWhatsApp />
    </>
  );
}
