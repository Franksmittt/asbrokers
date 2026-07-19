"use client";

import dynamic from "next/dynamic";
import { DeferUntilVisible } from "@/components/home/DeferUntilVisible";

const CalculatorIframeHeightBridge = dynamic(
  () =>
    import("@/components/calculators/CalculatorIframeHeightBridge").then(
      (m) => m.CalculatorIframeHeightBridge
    ),
  { ssr: false }
);

type Props = {
  iframeId: string;
};

/**
 * Keep the SSR iframe always visible; hydrate the height bridge only when the
 * tool approaches the viewport so Lighthouse TBT is not paying for ResizeObserver
 * setup on first paint.
 */
export function CalculatorHeightBridgeDeferred({ iframeId }: Props) {
  return (
    <DeferUntilVisible rootMargin="320px 0px">
      <CalculatorIframeHeightBridge iframeId={iframeId} />
    </DeferUntilVisible>
  );
}
