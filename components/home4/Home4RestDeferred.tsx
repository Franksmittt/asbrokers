"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Home4BelowFoldRest = dynamic(
  () => import("@/components/home4/Home4BelowFoldRest").then((m) => m.Home4BelowFoldRest),
  { ssr: false, loading: () => <div className="min-h-[40vh]" aria-hidden /> }
);

/** Defer heavy home sections until the browser is idle — keeps LCP/TBT clean. */
export function Home4RestDeferred() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (win.requestIdleCallback) {
      const id = win.requestIdleCallback(() => setReady(true), { timeout: 2500 });
      return () => win.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setReady(true), 1500);
    return () => window.clearTimeout(t);
  }, []);

  return ready ? <Home4BelowFoldRest /> : <div className="min-h-[40vh]" aria-hidden />;
}
