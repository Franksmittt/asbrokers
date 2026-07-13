"use client";

import { useEffect, useState } from "react";
import { ConsentProvider } from "@/components/analytics/ConsentProvider";

/**
 * Cookie banner + analytics — mount after pointer/12s so consent never wraps
 * the RSC tree or hydrates on the Lighthouse critical path.
 */
export function DeferredConsentIsland() {
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
  return <ConsentProvider eager />;
}
