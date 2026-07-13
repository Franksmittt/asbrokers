"use client";

import { useEffect, useState, type ComponentType } from "react";
import { ConsentProvider } from "@/components/analytics/ConsentProvider";

/** Only load magic-link handler when the hash actually contains a token. */
function LazyMagicLinkHashHandler() {
  const [Handler, setHandler] = useState<ComponentType | null>(null);

  useEffect(() => {
    if (!window.location.hash.includes("access_token=")) return;
    let cancelled = false;
    void import("@/components/auth/MagicLinkHashHandler").then((m) => {
      if (!cancelled) setHandler(() => m.MagicLinkHashHandler);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return Handler ? <Handler /> : null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConsentProvider>
      <LazyMagicLinkHashHandler />
      {children}
    </ConsentProvider>
  );
}
