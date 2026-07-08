import { EverestProductPageView } from "@/components/everest/EverestProductPageView";
import { HubLcpPreload } from "@/components/seo/HubLcpPreload";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { EVEREST_128_PRODUCT } from "@/lib/everest-product-configs";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "12.8% Strategic Income | Everest Wealth";
const PAGE_DESCRIPTION =
  "Targeted 12.8% p.a. monthly dividend income with a 10% loyalty bonus at month 60. R100,000 minimum, 20% DWT, 120-day notice and liquidity rules apply.";

export const metadata = buildPageMetadata({
  path: "/everest-128-product",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: ["Everest 12.8", "Strategic Income", "monthly dividends", "20% DWT", "FSP 17273"],
});

export default function Everest128ProductPage() {
  return (
    <>
      <HubLcpPreload src={EVEREST_128_PRODUCT.heroImage} variant="split" />
      <PageJsonLd
        path="/everest-128-product"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={EVEREST_128_PRODUCT.faqs}
      />
      <EverestProductPageView {...EVEREST_128_PRODUCT} />
    </>
  );
}
