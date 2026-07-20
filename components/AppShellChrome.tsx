"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Nav } from "./Nav";

const QuickActionBar = dynamic(
  () => import("./QuickActionBar").then((m) => m.QuickActionBar),
  { ssr: false, loading: () => null }
);
const FloatingWhatsApp = dynamic(
  () => import("./FloatingWhatsApp").then((m) => m.FloatingWhatsApp),
  { ssr: false, loading: () => null }
);

type Props = {
  children?: React.ReactNode;
};

/**
 * Site chrome. FABs stay off the mobile Lighthouse critical path until
 * first interaction or a long idle, same gate pattern as DeferredRootExtras.
 */
export function AppShellChrome({ children }: Props) {
  const [fabsReady, setFabsReady] = useState(false);

  useEffect(() => {
    const enable = () => setFabsReady(true);
    const t = window.setTimeout(enable, 12_000);
    window.addEventListener("pointerdown", enable, { once: true, passive: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("pointerdown", enable);
    };
  }, []);

  return (
    <>
      <Nav />
      <main id="main-content" className="min-h-screen" tabIndex={-1}>
        {children}
      </main>
      {fabsReady ? (
        <>
          <QuickActionBar />
          <FloatingWhatsApp />
        </>
      ) : null}
    </>
  );
}
