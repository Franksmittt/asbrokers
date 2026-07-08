import { EverestProductPageView } from "@/components/everest/EverestProductPageView";
import { HubLcpPreload } from "@/components/seo/HubLcpPreload";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { EVEREST_145_PRODUCT } from "@/lib/everest-product-configs";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "14.5% Strategic Growth | Pure Compounding";
const PAGE_DESCRIPTION =
  "14.5% p.a. targeted compound return profile over five years — no monthly withdrawals. R100,000 minimum, 20% DWT at maturity, liquidity constraints apply.";

export const metadata = buildPageMetadata({
  path: "/everest-strategic-growth-145",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: ["Everest Strategic Growth", "14.5% compound", "voluntary capital", "FSP 17273"],
});

export default function EverestStrategicGrowthPage() {
  return (
    <>
      <HubLcpPreload src={EVEREST_145_PRODUCT.heroImage} variant="split" />
      <PageJsonLd
        path="/everest-strategic-growth-145"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={EVEREST_145_PRODUCT.faqs}
      />
      <EverestProductPageView {...EVEREST_145_PRODUCT} />
    </>
  );
}
