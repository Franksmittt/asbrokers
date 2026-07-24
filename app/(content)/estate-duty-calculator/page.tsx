import { SoloCalculatorPageView } from "@/components/calculators/SoloCalculatorPageView";
import { HubLcpPreload } from "@/components/seo/HubLcpPreload";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { SOLO_ESTATE_DUTY } from "@/lib/solo-calculator-configs";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Estate Duty Illustrator | AS Brokers";
const PAGE_DESCRIPTION =
  "Estimate estate duty and executor fees using illustrative abatement structures. Educational only — not legal or financial advice.";

export const metadata = buildPageMetadata({
  path: "/estate-duty-calculator",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function EstateDutyCalculatorPage() {
  return (
    <>
      <HubLcpPreload src={SOLO_ESTATE_DUTY.heroImage} variant="split" />
      <PageJsonLd
        path="/estate-duty-calculator"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
      />
      <SoloCalculatorPageView {...SOLO_ESTATE_DUTY} />
    </>
  );
}
