import { SoloCalculatorPageView } from "@/components/calculators/SoloCalculatorPageView";
import { HubLcpPreload } from "@/components/seo/HubLcpPreload";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { SOLO_INCOME_TAX } from "@/lib/solo-calculator-configs";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Income Tax Fiduciary Diagnostic | AS Brokers";
const PAGE_DESCRIPTION =
  "Estimate marginal income tax using SARS 2026/27 illustrative brackets, educational, not a substitute for a full assessment.";

export const metadata = buildPageMetadata({
  path: "/income-tax-calculator",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function IncomeTaxCalculatorPage() {
  return (
    <>
      <HubLcpPreload src={SOLO_INCOME_TAX.heroImage} variant="split" />
      <PageJsonLd
        path="/income-tax-calculator"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
      />
      <SoloCalculatorPageView {...SOLO_INCOME_TAX} />
    </>
  );
}
