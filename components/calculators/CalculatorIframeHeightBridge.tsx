"use client";

import { useEffect } from "react";

const MIN_HEIGHT = 640;

type Props = {
  iframeId: string;
};

/**
 * Tiny client island: grows a same-origin iframe to content height.
 *
 * Forced-reflow safe:
 * - READ phase collects scrollHeight only
 * - WRITE phase applies height in a later rAF
 * - Never re-reads clientHeight after DOM mutations (cached lastApplied)
 *
 * Embed HTML untouched.
 */
export function CalculatorIframeHeightBridge({ iframeId }: Props) {
  useEffect(() => {
    const iframe = document.getElementById(iframeId) as HTMLIFrameElement | null;
    if (!iframe) return;

    let resizeObserver: ResizeObserver | null = null;
    let readRaf = 0;
    let writeRaf = 0;
    let pendingHeight: number | null = null;
    let lastApplied = MIN_HEIGHT;
    const timeouts: number[] = [];

    const applyHeight = (next: number) => {
      if (Math.abs(lastApplied - next) <= 2) return;
      lastApplied = next;
      // style only — avoid setAttribute("height") double-write layout
      iframe.style.height = `${next}px`;
    };

    const readHeight = (): number | null => {
      try {
        const doc = iframe.contentDocument ?? iframe.contentWindow?.document;
        if (!doc?.documentElement) return null;
        return Math.ceil(
          Math.max(
            MIN_HEIGHT,
            doc.documentElement.scrollHeight,
            doc.body?.scrollHeight ?? 0
          )
        );
      } catch {
        return null;
      }
    };

    const schedule = () => {
      if (readRaf) cancelAnimationFrame(readRaf);
      readRaf = requestAnimationFrame(() => {
        readRaf = 0;
        const next = readHeight();
        if (next == null) return;
        pendingHeight = next;
        if (writeRaf) cancelAnimationFrame(writeRaf);
        // Separate frame: writes never interleave with geometric reads.
        writeRaf = requestAnimationFrame(() => {
          writeRaf = 0;
          if (pendingHeight == null) return;
          applyHeight(pendingHeight);
          pendingHeight = null;
        });
      });
    };

    const attach = () => {
      schedule();
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

      // Sparse follow-ups only — no tight loops.
      timeouts.push(window.setTimeout(schedule, 200));
      timeouts.push(window.setTimeout(schedule, 800));
    };

    iframe.addEventListener("load", attach);
    // If already loaded (cached), attach on next idle tick to avoid mount-time reflow.
    if (iframe.contentDocument?.readyState === "complete") {
      timeouts.push(window.setTimeout(attach, 0));
    }

    return () => {
      iframe.removeEventListener("load", attach);
      resizeObserver?.disconnect();
      if (readRaf) cancelAnimationFrame(readRaf);
      if (writeRaf) cancelAnimationFrame(writeRaf);
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [iframeId]);

  return null;
}
