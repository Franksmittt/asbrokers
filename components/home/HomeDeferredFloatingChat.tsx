"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HomeFloatingChat = dynamic(
  () => import("@/components/home/HomeLazyWidgets").then((m) => m.HomeFloatingChat),
  { ssr: false, loading: () => null }
);

/**
 * Floating chat pulls framer-motion + AI/zod (~300KB). Gate behind pointer/12s
 * so Lighthouse mobile TBT is not wrecked. WhatsApp + Consult stay SSR.
 */
export function HomeDeferredFloatingChat() {
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

  if (!ready) return null;
  return <HomeFloatingChat />;
}
