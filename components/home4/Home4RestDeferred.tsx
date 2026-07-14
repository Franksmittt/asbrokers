"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { bindDeferredEnable } from "@/lib/defer-ready";

const Home4BelowFoldRest = dynamic(
  () => import("@/components/home4/Home4BelowFoldRest").then((m) => m.Home4BelowFoldRest),
  { ssr: false, loading: () => <div className="min-h-[40vh]" aria-hidden /> }
);

/** Homepage below-fold — pointer/keydown or 2 min (never 12s; LH audits last longer). */
export function Home4RestDeferred() {
  const [ready, setReady] = useState(false);

  useEffect(() => bindDeferredEnable(() => setReady(true)), []);

  return ready ? <Home4BelowFoldRest /> : <div className="min-h-[40vh]" aria-hidden />;
}
