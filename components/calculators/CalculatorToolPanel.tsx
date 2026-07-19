import { CalculatorHeightBridgeDeferred } from "@/components/calculators/CalculatorHeightBridgeDeferred";
import { CalculatorLeadDeferred } from "@/components/calculators/CalculatorLeadDeferred";

const MIN_HEIGHT = 640;

type Props = {
  calculatorSrc: string;
  calculatorTitle: string;
  calculatorId: string;
  calculatorPath: string;
};

/**
 * Calculator always visible — SSR iframe (works with JS off).
 * Height bridge + lead form are deferred client islands. Embed HTML untouched.
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
      <div className="rounded-3xl bg-white p-4 shadow-2xl ring-1 ring-stone-200/90 sm:p-6">
        <div className="w-full overflow-visible rounded-2xl bg-white ring-1 ring-stone-200/90">
          <iframe
            id={iframeId}
            src={calculatorSrc}
            title={calculatorTitle}
            width="100%"
            height={MIN_HEIGHT}
            loading="lazy"
            className="block w-full border-0 bg-white"
            style={{ height: MIN_HEIGHT, overflow: "hidden" }}
          />
          <CalculatorHeightBridgeDeferred iframeId={iframeId} />
        </div>
      </div>
      <CalculatorLeadDeferred
        calculatorId={calculatorId}
        calculatorPath={calculatorPath}
        calculatorTitle={calculatorTitle}
      />
    </div>
  );
}
