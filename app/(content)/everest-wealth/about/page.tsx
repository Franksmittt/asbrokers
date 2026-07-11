import { EverestWealthAboutPageView } from "@/components/everest/EverestWealthAboutPageView";
import { HubLcpPreload } from "@/components/seo/HubLcpPreload";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { getPrimaryPageImage } from "@/lib/primary-page-images";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Understanding Everest Wealth, Regulation Before Yield";
const PAGE_DESCRIPTION =
  "Education-first briefing: FSP 795, FSP 17273 Category 1.8, product structure, liquidity, tax, and risks, before any Everest illustration. Not advice.";

const HERO_IMAGE =
  getPrimaryPageImage("/everest-wealth/about") ?? "/images/everest-copper-industrial-4x3.jpg";

export const metadata = buildPageMetadata({
  path: "/everest-wealth/about",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function EverestWealthAboutPage() {
  return (
    <>
      <HubLcpPreload src={HERO_IMAGE} variant="split" />
      <PageJsonLd
        path="/everest-wealth/about"
        webPage={{
          name: buildPageTitle(PAGE_TITLE),
          description: PAGE_DESCRIPTION,
        }}
      />
      <EverestWealthAboutPageView heroImage={HERO_IMAGE} />
    </>
  );
}
