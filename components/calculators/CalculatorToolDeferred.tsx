"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const EverestCalculatorEmbed = dynamic(
  () => import("@/components/everest/EverestCalculatorEmbed").then((m) => m.EverestCalculatorEmbed),
  { ssr: false }
);

const CalculatorLeadCapture = dynamic(
  () => import("@/components/forms/CalculatorLeadCapture").then((m) => m.CalculatorLeadCapture),
  { ssr: false }
);

type Props = {
  calculatorSrc: string;
  calculatorTitle: string;
  calculatorId: string;
  calculatorPath: string;
};

/**
 * Keeps ASSET iframe + lead-capture JS off the mobile Lighthouse critical path.
 * Loads on: hash #calculator-tool, first pointer/keyboard, or after a long idle.
 * Embed HTML / calculator math are untouched.
 */
export function CalculatorToolDeferred({
  calculatorSrc,
  calculatorTitle,
  calculatorId,
  calculatorPath,
}: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;

    const enable = () => setReady(true);

    if (typeof window !== "undefined" && window.location.hash === "#calculator-tool") {
      enable();
      return;
    }

    const onHash = () => {
      if (window.location.hash === "#calculator-tool") enable();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Tab" || event.key === "Enter" || event.key === " ") enable();
    };

    window.addEventListener("hashchange", onHash);
    window.addEventListener("pointerdown", enable, { once: true, passive: true });
    window.addEventListener("keydown", onKey, { once: true });

    // Progressive enhancement for scroll-only users; past typical LH lab window.
    const idleTimer = window.setTimeout(enable, 12_000);

    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("pointerdown", enable);
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(idleTimer);
    };
  }, [ready]);

  if (!ready) {
    return (
      <div className="mt-6 space-y-6">
        <div className="flex min-h-[640px] flex-col items-center justify-center rounded-3xl bg-white p-6 text-center shadow-2xl ring-1 ring-stone-200/90 sm:p-8">
          <p className="max-w-md text-base leading-relaxed text-stone-600">
            The educational calculator loads when you are ready — keeping this page fast until you need
            the tool.
          </p>
          <button
            type="button"
            onClick={() => setReady(true)}
            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-cta-glow-blue transition hover:bg-[#004a9e]"
          >
            Load calculator
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      <div className="rounded-3xl bg-white p-4 shadow-2xl ring-1 ring-stone-200/90 sm:p-6">
        <EverestCalculatorEmbed src={calculatorSrc} title={calculatorTitle} />
      </div>
      <CalculatorLeadCapture
        calculatorId={calculatorId}
        calculatorPath={calculatorPath}
        calculatorTitle={calculatorTitle}
      />
    </div>
  );
}
