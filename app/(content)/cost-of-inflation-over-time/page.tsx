import { SoloCalculatorPageView } from "@/components/calculators/SoloCalculatorPageView";
import { HubLcpPreload } from "@/components/seo/HubLcpPreload";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { SOLO_INFLATION } from "@/lib/solo-calculator-configs";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Purchasing Power Illustration | Cost of Inflation";
const PAGE_DESCRIPTION =
  "See how inflation can erode purchasing power over time. Educational illustration only, not personal financial advice.";

export const metadata = buildPageMetadata({
  path: "/cost-of-inflation-over-time",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function CostOfInflationPage() {
  return (
    <>
      <HubLcpPreload src={SOLO_INFLATION.heroImage} variant="split" />
      <PageJsonLd
        path="/cost-of-inflation-over-time"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
      />
      <SoloCalculatorPageView {...SOLO_INFLATION} />
    </>
  );
}
