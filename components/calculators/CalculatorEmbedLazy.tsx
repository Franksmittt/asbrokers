"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MIN_HEIGHT = 640;

const CalculatorIframeHeightBridge = dynamic(
  () =>
    import("@/components/calculators/CalculatorIframeHeightBridge").then(
      (m) => m.CalculatorIframeHeightBridge
    ),
  { ssr: false }
);

type Props = {
  calculatorSrc: string;
  calculatorTitle: string;
  iframeId: string;
};

type IdleDeadlineLike = { didTimeout: boolean; timeRemaining: () => number };

function scheduleAfterHydration(activate: () => void): () => void {
  let cancelled = false;
  let raf1 = 0;
  let raf2 = 0;
  let timeoutId = 0;
  let idleId: number | undefined;

  const run = () => {
    if (cancelled) return;
    activate();
  };

  // Yield past hydration + shared-chunk eval before the embed document competes for CPU.
  raf1 = window.requestAnimationFrame(() => {
    raf2 = window.requestAnimationFrame(() => {
      timeoutId = window.setTimeout(() => {
        const ric = (
          window as Window & {
            requestIdleCallback?: (
              cb: (deadline: IdleDeadlineLike) => void,
              opts?: { timeout: number }
            ) => number;
          }
        ).requestIdleCallback;

        if (typeof ric === "function") {
          idleId = ric(() => run(), { timeout: 1800 });
        } else {
          run();
        }
      }, 0);
    });
  });

  return () => {
    cancelled = true;
    if (raf1) window.cancelAnimationFrame(raf1);
    if (raf2) window.cancelAnimationFrame(raf2);
    if (timeoutId) window.clearTimeout(timeoutId);
    if (idleId !== undefined) {
      (
        window as Window & { cancelIdleCallback?: (id: number) => void }
      ).cancelIdleCallback?.(idleId);
    }
  };
}

/**
 * Progressive embed mount for mobile TBT:
 * 1) Paint a reserved shell (no second document)
 * 2) After hydration + idle, assign iframe src (no click-gate)
 * 3) Height bridge loads only after the iframe exists
 *
 * Embed HTML under public/embed-calculators is untouched.
 */
export function CalculatorEmbedLazy({
  calculatorSrc,
  calculatorTitle,
  iframeId,
}: Props) {
  const [embedSrc, setEmbedSrc] = useState<string | undefined>(undefined);

  useEffect(() => scheduleAfterHydration(() => setEmbedSrc(calculatorSrc)), [calculatorSrc]);

  return (
    <div
      className="relative w-full overflow-visible rounded-2xl bg-white ring-1 ring-stone-200/90"
      style={{ minHeight: MIN_HEIGHT }}
    >
      {!embedSrc ? (
        <div
          className="flex items-center justify-center px-6 text-sm text-stone-500"
          style={{ minHeight: MIN_HEIGHT }}
          aria-live="polite"
        >
          Preparing calculator…
        </div>
      ) : (
        <>
          <iframe
            id={iframeId}
            src={embedSrc}
            title={calculatorTitle}
            width="100%"
            height={MIN_HEIGHT}
            className="block w-full border-0 bg-white"
            style={{ height: MIN_HEIGHT, overflow: "hidden" }}
          />
          <CalculatorIframeHeightBridge iframeId={iframeId} />
        </>
      )}
      <noscript>
        <p className="p-6 text-sm text-stone-600">
          <a href={calculatorSrc} className="font-semibold text-samsung-blue underline">
            Open the calculator
          </a>
        </p>
      </noscript>
    </div>
  );
}
