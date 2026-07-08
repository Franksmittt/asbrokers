import { EverestProductPageView } from "@/components/everest/EverestProductPageView";
import { HubLcpPreload } from "@/components/seo/HubLcpPreload";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { EVEREST_142_PRODUCT } from "@/lib/everest-product-configs";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "14.2% Onyx Income+ | Maximum Day-One Yield";
const PAGE_DESCRIPTION =
  "14.2% p.a. targeted monthly income from day one — no five-year loyalty bonus. R100,000 minimum, 20% DWT, 120-day notice and early exit rules apply.";

export const metadata = buildPageMetadata({
  path: "/immediate-higher-income-calculator",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: ["Everest Onyx", "14.2% income", "immediate income", "20% DWT", "FSP 17273"],
});

export default function ImmediateHigherIncomePage() {
  return (
    <>
      <HubLcpPreload src={EVEREST_142_PRODUCT.heroImage} variant="split" />
      <PageJsonLd
        path="/immediate-higher-income-calculator"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={EVEREST_142_PRODUCT.faqs}
      />
      <EverestProductPageView {...EVEREST_142_PRODUCT} />
    </>
  );
}
