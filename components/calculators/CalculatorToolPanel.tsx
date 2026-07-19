import { CalculatorEmbedLazy } from "@/components/calculators/CalculatorEmbedLazy";
import { CalculatorLeadDeferred } from "@/components/calculators/CalculatorLeadDeferred";

type Props = {
  calculatorSrc: string;
  calculatorTitle: string;
  calculatorId: string;
  calculatorPath: string;
};

/**
 * Tool panel shell (RSC): progressive client embed + deferred lead form.
 * Embed HTML under public/embed-calculators is untouched. No click-gate.
 */
export function CalculatorToolPanel({
  calculatorSrc,
  calculatorTitle,
  calculatorId,
  calculatorPath,
}: Props) {
  const iframeId = `asset-calc-${calculatorId.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="mt-6 space-y-6">
      <div className="rounded-3xl bg-white p-4 ring-1 ring-stone-200/90 sm:p-6">
        <CalculatorEmbedLazy
          calculatorSrc={calculatorSrc}
          calculatorTitle={calculatorTitle}
          iframeId={iframeId}
        />
      </div>
      <CalculatorLeadDeferred
        calculatorId={calculatorId}
        calculatorPath={calculatorPath}
        calculatorTitle={calculatorTitle}
      />
    </div>
  );
}
