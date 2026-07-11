import { EverestProductPageView } from "@/components/everest/EverestProductPageView";
import { HubLcpPreload } from "@/components/seo/HubLcpPreload";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { EVEREST_AMETHYST_PRODUCT } from "@/lib/everest-product-configs";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Amethyst Living Annuity | ~10.2% Net Yield";
const PAGE_DESCRIPTION =
  "Compulsory retirement capital in a regulated living annuity, targeted ~10.2% net yield, Section 14 transfer approved, drawdown 2.5%–17.5%.";

export const metadata = buildPageMetadata({
  path: "/everest-amethyst-living-annuity",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "Amethyst Living Annuity",
    "Section 14 transfer",
    "living annuity",
    "drawdown 2.5%",
    "FSP 17273",
  ],
});

export default function EverestAmethystPage() {
  return (
    <>
      <HubLcpPreload src={EVEREST_AMETHYST_PRODUCT.heroImage} variant="split" />
      <PageJsonLd
        path="/everest-amethyst-living-annuity"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={EVEREST_AMETHYST_PRODUCT.faqs}
      />
      <EverestProductPageView {...EVEREST_AMETHYST_PRODUCT} />
    </>
  );
}
