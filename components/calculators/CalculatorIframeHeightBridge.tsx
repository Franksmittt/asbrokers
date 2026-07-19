"use client";

import { useEffect } from "react";

const MIN_HEIGHT = 640;

type Props = {
  iframeId: string;
};

/**
 * Tiny client island: grows a same-origin SSR iframe to content height.
 * ResizeObserver only — MutationObserver subtree walks caused Style/Layout TBT.
 * Embed HTML untouched.
 */
export function CalculatorIframeHeightBridge({ iframeId }: Props) {
  useEffect(() => {
    const iframe = document.getElementById(iframeId) as HTMLIFrameElement | null;
    if (!iframe) return;

    let resizeObserver: ResizeObserver | null = null;
    let raf = 0;
    const timeouts: number[] = [];

    const measure = () => {
      try {
        const doc = iframe.contentDocument ?? iframe.contentWindow?.document;
        if (!doc?.documentElement) return;
        const next = Math.ceil(
          Math.max(
            MIN_HEIGHT,
            doc.documentElement.scrollHeight,
            doc.body?.scrollHeight ?? 0
          )
        );
        if (Math.abs((iframe.clientHeight || 0) - next) > 2) {
          iframe.style.height = `${next}px`;
          iframe.setAttribute("height", String(next));
        }
      } catch {
        // Cross-origin: keep floor height.
      }
    };

    const schedule = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    const attach = () => {
      measure();
      try {
        const doc = iframe.contentDocument ?? iframe.contentWindow?.document;
        if (!doc?.body) return;

        resizeObserver?.disconnect();
        resizeObserver = new ResizeObserver(schedule);
        resizeObserver.observe(doc.documentElement);
        resizeObserver.observe(doc.body);
      } catch {
        // Ignore observer attach failures.
      }

      timeouts.push(window.setTimeout(measure, 120));
      timeouts.push(window.setTimeout(measure, 500));
    };

    iframe.addEventListener("load", attach);
    if (iframe.contentDocument?.readyState === "complete") attach();

    return () => {
      iframe.removeEventListener("load", attach);
      resizeObserver?.disconnect();
      if (raf) cancelAnimationFrame(raf);
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [iframeId]);

  return null;
}
