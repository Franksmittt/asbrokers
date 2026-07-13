"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ConsentProvider } from "@/components/analytics/ConsentProvider";

const MagicLinkHashHandler = dynamic(
  () =>
    import("@/components/auth/MagicLinkHashHandler").then((m) => m.MagicLinkHashHandler),
  { ssr: false }
);

function LazyMagicLinkHashHandler() {
  const [need, setNeed] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash.includes("access_token=")) {
      setNeed(true);
    }
  }, []);
  return need ? <MagicLinkHashHandler /> : null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConsentProvider>
      <LazyMagicLinkHashHandler />
      {children}
    </ConsentProvider>
  );
}
