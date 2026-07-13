"use client";

import { useEffect, useState, type ComponentType } from "react";

/** Load magic-link handler only when the URL hash contains an access token. */
export function MagicLinkBootstrap() {
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
