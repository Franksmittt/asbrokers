"use client";

import dynamic from "next/dynamic";
import { DeferUntilVisible } from "@/components/home/DeferUntilVisible";

const CalculatorLeadCapture = dynamic(
  () => import("@/components/forms/CalculatorLeadCapture").then((m) => m.CalculatorLeadCapture),
  {
    ssr: false,
    loading: () => (
      <div className="mt-8 min-h-[12rem] rounded-3xl bg-stone-50 ring-1 ring-stone-200/90" aria-hidden />
    ),
  }
);

type Props = {
  calculatorId: string;
  calculatorPath: string;
  calculatorTitle: string;
};

/** Lead form stays below the tool; hydrate only when near viewport (never click-gated). */
export function CalculatorLeadDeferred(props: Props) {
  return (
    <DeferUntilVisible
      rootMargin="240px 0px"
      minHeightClass="mt-8 min-h-[12rem]"
      fallback={
        <div className="mt-8 min-h-[12rem] rounded-3xl bg-stone-50 ring-1 ring-stone-200/90" aria-hidden />
      }
    >
      <CalculatorLeadCapture {...props} />
    </DeferUntilVisible>
  );
}
