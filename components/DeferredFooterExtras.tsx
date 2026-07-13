"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const FooterNewsletter = dynamic(
  () => import("@/components/FooterClientIslands").then((m) => m.FooterNewsletter),
  { ssr: false, loading: () => <div className="h-10 w-full max-w-sm lg:max-w-[17.5rem]" aria-hidden /> }
);

const FooterScrollTop = dynamic(
  () => import("@/components/FooterClientIslands").then((m) => m.FooterScrollTop),
  { ssr: false, loading: () => null }
);

function useDeferredReady() {
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
  return ready;
}

/** Newsletter form — deferred so useActionState stays off the LH TBT window. */
export function DeferredFooterNewsletter() {
  const ready = useDeferredReady();
  if (!ready) return <div className="h-10 w-full max-w-sm lg:max-w-[17.5rem]" aria-hidden />;
  return <FooterNewsletter />;
}

/** Scroll-top control — deferred (was forcing reflow via scroll listener on hydrate). */
export function DeferredFooterScrollTop() {
  const ready = useDeferredReady();
  if (!ready) return null;
  return <FooterScrollTop />;
}
