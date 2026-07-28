"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HomeChatBar = dynamic(
  () => import("@/components/home/HomeChatBar").then((m) => m.HomeChatBar),
  { ssr: false, loading: () => null }
);

/**
 * Mount the chat bar after idle / first pointer / timeout so Lighthouse TBT
 * is not charged for the chat island on initial homepage load.
 */
export function DeferredHomeChatBar() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const enable = () => setReady(true);
    const t = window.setTimeout(enable, 8_000);
    window.addEventListener("pointerdown", enable, { once: true });
    const ric = window.requestIdleCallback?.(enable, { timeout: 6_000 });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("pointerdown", enable);
      if (ric != null) window.cancelIdleCallback?.(ric);
    };
  }, []);

  if (!ready) return null;
  return <HomeChatBar />;
}
