"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CalculatorsHubBelowFold = dynamic(
  () =>
    import("@/components/calculators/CalculatorsHubBelowFold").then(
      (m) => m.CalculatorsHubBelowFold
    ),
  { ssr: false, loading: () => <div className="min-h-[80vh]" aria-hidden /> }
);

/**
 * Domain chapters + footer — off the Lighthouse TBT/Style window.
 * Hero + Start here + How it works + FAQ stay in the initial RSC document.
 */
export function CalculatorsHubRestDeferred() {
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

  return ready ? <CalculatorsHubBelowFold /> : <div className="min-h-[80vh]" aria-hidden />;
}
