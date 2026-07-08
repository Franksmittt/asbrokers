import { SoloCalculatorPageView } from "@/components/calculators/SoloCalculatorPageView";
import { HubLcpPreload } from "@/components/seo/HubLcpPreload";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { SOLO_INCOME_IN_RETIREMENT } from "@/lib/solo-calculator-configs";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Capital Sustainability Test | Income in Retirement";
const PAGE_DESCRIPTION =
  "Model how long retirement capital may last at your chosen drawdown — a fiduciary diagnostic for sustainable retirement income.";

export const metadata = buildPageMetadata({
  path: "/income-in-retirement",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function IncomeInRetirementPage() {
  return (
    <>
      <HubLcpPreload src={SOLO_INCOME_IN_RETIREMENT.heroImage} variant="split" />
      <PageJsonLd
        path="/income-in-retirement"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
      />
      <SoloCalculatorPageView {...SOLO_INCOME_IN_RETIREMENT} />
    </>
  );
}
