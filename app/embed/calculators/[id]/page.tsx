import { notFound } from "next/navigation";

import { AmethystAnnuityCalculator } from "@/components/AmethystAnnuityCalculator";
import { EstateDutyCalculator } from "@/components/EstateDutyCalculator";
import { EstateReductionCalculator } from "@/components/EstateReductionCalculator";
import { Everest128Calculator } from "@/components/Everest128Calculator";
import { Everest142Calculator } from "@/components/Everest142Calculator";
import { Everest145GrowthCalculator } from "@/components/Everest145GrowthCalculator";
import { FutureValueCalculator } from "@/components/FutureValueCalculator";
import { IncomeTaxCalculator } from "@/components/IncomeTaxCalculator";
import { LifeOfCapitalCalculator } from "@/components/LifeOfCapitalCalculator";
import { PremiumComparisonCalculator } from "@/components/PremiumComparisonCalculator";
import { RetirementRealityCalculator } from "@/components/RetirementRealityCalculator";
import { RunOutCalculator } from "@/components/RunOutCalculator";

type Props = {
  params: Promise<{ id: string }>;
};

const EMBED_MAP = {
  "retirement-reality": {
    title: "Retirement Reality Calculator",
    node: <RetirementRealityCalculator />,
  },
  "life-of-capital": {
    title: "Life of Capital Calculator",
    node: <LifeOfCapitalCalculator />,
  },
  "future-value": {
    title: "Cost of Inflation Over Time Calculator",
    node: <FutureValueCalculator />,
  },
  "income-tax": {
    title: "Income Tax Calculator",
    node: <IncomeTaxCalculator />,
  },
  "estate-duty": {
    title: "Estate Duty Calculator",
    node: <EstateDutyCalculator />,
  },
  "estate-reduction": {
    title: "Estate Reduction Strategy Calculator",
    node: <EstateReductionCalculator />,
  },
  "premium-comparison": {
    title: "Premium Increase Problem Calculator",
    node: <PremiumComparisonCalculator />,
  },
  "everest-128": {
    title: "Everest 12.8 Product Calculator",
    node: <Everest128Calculator />,
  },
  "everest-142": {
    title: "Everest 12.8 Income Calculator",
    node: <Everest142Calculator />,
  },
  "everest-145-growth": {
    title: "Everest Strategic Growth 14.5 Calculator",
    node: <Everest145GrowthCalculator />,
  },
  "amethyst-annuity": {
    title: "Everest Amethyst Living Annuity Calculator",
    node: <AmethystAnnuityCalculator />,
  },
  "run-out-capital": {
    title: "Run Out of Capital Calculator",
    node: <RunOutCalculator />,
  },
} as const;

export default async function CalculatorEmbedPage({ params }: Props) {
  const { id } = await params;
  const item = EMBED_MAP[id as keyof typeof EMBED_MAP];
  if (!item) notFound();

  return (
    <main className="min-h-screen bg-[#0a0a0c] p-4">
      <section className="mx-auto max-w-5xl">
        <div className="mb-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300">
          {item.title}
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-[#111115] p-3 md:p-4">{item.node}</div>
      </section>
    </main>
  );
}

