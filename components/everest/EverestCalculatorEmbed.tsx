"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  title: string;
};

/** Floor so the iframe is usable before content height is measured. */
const MIN_HEIGHT = 640;

/**
 * Static ASSET HTML calculator embed.
 * Grows to the full document height (same-origin) so desktop users are not trapped
 * in a nested scroll box inside a fixed aspect-ratio frame.
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
    let pollId = 0;

    const attachObservers = () => {
      resizeToContent();
      try {
        const doc = iframe.contentDocument ?? iframe.contentWindow?.document;
        if (!doc?.body) return;

        resizeObserver?.disconnect();
        mutationObserver?.disconnect();

        resizeObserver = new ResizeObserver(() => resizeToContent());
        resizeObserver.observe(doc.documentElement);
        if (doc.body) resizeObserver.observe(doc.body);

        mutationObserver = new MutationObserver(() => resizeToContent());
        mutationObserver.observe(doc.documentElement, {
          childList: true,
          subtree: true,
          attributes: true,
          characterData: true,
        });
      } catch {
        // Ignore observer attach failures.
      }
    };

    const onLoad = () => {
      attachObservers();
      // Results panels often expand shortly after interaction / first paint.
      window.setTimeout(resizeToContent, 100);
      window.setTimeout(resizeToContent, 400);
      window.setTimeout(resizeToContent, 1000);
    };

    iframe.addEventListener("load", onLoad);
    if (iframe.contentDocument?.readyState === "complete") onLoad();

    // Light fallback only — avoid a permanent 1.5s poll eating main-thread time (TBT).
    pollId = window.setTimeout(resizeToContent, 2000);

    return () => {
      iframe.removeEventListener("load", onLoad);
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
      window.clearTimeout(pollId);
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
