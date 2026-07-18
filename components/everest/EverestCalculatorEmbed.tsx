"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  title: string;
};

/** Floor so the iframe is usable before content height is measured. */
const MIN_HEIGHT = 640;

/**
 * Static ASSET HTML calculator embed (solo / product pages).
 * ASSET marketing landings use SSR CalculatorToolPanel instead.
 * Embed HTML / calculator math are untouched.
 */
export function EverestCalculatorEmbed({ src, title }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(MIN_HEIGHT);

  const resizeToContent = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
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
      setHeight((prev) => (Math.abs(prev - next) > 2 ? next : prev));
    } catch {
      // Cross-origin: keep the last known height.
    }
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let resizeObserver: ResizeObserver | null = null;
    let mutationObserver: MutationObserver | null = null;
    let raf = 0;
    const timeouts: number[] = [];

    const schedule = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(resizeToContent);
    };

    const attachObservers = () => {
      resizeToContent();
      try {
        const doc = iframe.contentDocument ?? iframe.contentWindow?.document;
        if (!doc?.body) return;

        resizeObserver?.disconnect();
        mutationObserver?.disconnect();

        resizeObserver = new ResizeObserver(schedule);
        resizeObserver.observe(doc.documentElement);
        resizeObserver.observe(doc.body);

        mutationObserver = new MutationObserver(schedule);
        mutationObserver.observe(doc.documentElement, {
          childList: true,
          subtree: true,
        });
      } catch {
        // Ignore observer attach failures.
      }

      timeouts.push(window.setTimeout(resizeToContent, 120));
      timeouts.push(window.setTimeout(resizeToContent, 500));
    };

    iframe.addEventListener("load", attachObservers);
    if (iframe.contentDocument?.readyState === "complete") attachObservers();

    return () => {
      iframe.removeEventListener("load", attachObservers);
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
      if (raf) cancelAnimationFrame(raf);
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [src, resizeToContent]);

  return (
    <div className="w-full overflow-visible rounded-2xl bg-white ring-1 ring-stone-200/90">
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        width="100%"
        height={height}
        className="block w-full border-0 bg-white"
        style={{ height, overflow: "hidden" }}
        loading="lazy"
      />
    </div>
  );
}
