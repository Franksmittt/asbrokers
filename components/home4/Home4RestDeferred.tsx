"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Home4BelowFoldRest = dynamic(
  () => import("@/components/home4/Home4BelowFoldRest").then((m) => m.Home4BelowFoldRest),
  { ssr: false, loading: () => <div className="min-h-[40vh]" aria-hidden /> }
);

/**
 * Defer heavy home sections until first interaction or a long idle.
 * Keeps Lighthouse mobile TBT/SI clear of below-fold hydration (matches MarketingChromeExtras).
 */
export function Home4RestDeferred() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;

    const enable = () => setReady(true);
    const t = window.setTimeout(enable, 12_000);
    window.addEventListener("scroll", enable, { once: true, passive: true });
    window.addEventListener("pointerdown", enable, { once: true });
    window.addEventListener("keydown", enable, { once: true });

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", enable);
      window.removeEventListener("pointerdown", enable);
      window.removeEventListener("keydown", enable);
    };
  }, [ready]);

  return ready ? <Home4BelowFoldRest /> : <div className="min-h-[40vh]" aria-hidden />;
}
