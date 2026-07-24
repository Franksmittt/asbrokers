import { SoloCalculatorPageView } from "@/components/calculators/SoloCalculatorPageView";
import { HubLcpPreload } from "@/components/seo/HubLcpPreload";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { SOLO_ESTATE_REDUCTION } from "@/lib/solo-calculator-configs";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Annual Estate Reduction Illustrator | AS Brokers";
const PAGE_DESCRIPTION =
  "Model how annual donations may affect dutiable estate over time under SARS R100k/R200k limits. Educational only.";

export const metadata = buildPageMetadata({
  path: "/annual-estate-reduction-strategy",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function AnnualEstateReductionPage() {
  return (
    <>
      <HubLcpPreload src={SOLO_ESTATE_REDUCTION.heroImage} variant="split" />
      <PageJsonLd
        path="/annual-estate-reduction-strategy"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
      />
      <SoloCalculatorPageView {...SOLO_ESTATE_REDUCTION} />
    </>
  );
}
