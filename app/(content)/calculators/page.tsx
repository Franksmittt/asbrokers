import { CalculatorsHubPageView } from "@/components/calculators/CalculatorsHubPageView";
import { HubLcpPreload } from "@/components/seo/HubLcpPreload";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { HUB_LCP_IMAGES } from "@/lib/hub-lcp";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Fiduciary Tools & Financial Calculators";
const PAGE_DESCRIPTION =
  "Interactive retirement, Everest Wealth, and estate calculators for South Africans. Run the numbers before your consultation. Educational only. FSP 17273.";

export const metadata = buildPageMetadata({
  path: "/calculators",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "financial calculators South Africa",
    "retirement calculator",
    "estate duty calculator",
    "Everest Wealth calculator",
    "FSP 17273",
  ],
});

export default function CalculatorsPage() {
  return (
    <>
      <HubLcpPreload src={HUB_LCP_IMAGES["/calculators"]} variant="split" />
      <PageJsonLd
        path="/calculators"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
      />
      <CalculatorsHubPageView />
    </>
  );
}
