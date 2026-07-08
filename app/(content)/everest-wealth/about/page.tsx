import { EverestWealthAboutPageView } from "@/components/everest/EverestWealthAboutPageView";
import { HubLcpPreload } from "@/components/seo/HubLcpPreload";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { getPrimaryPageImage } from "@/lib/primary-page-images";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Understanding Everest Wealth | How It Works, Structure & Risks";
const PAGE_DESCRIPTION =
  "A clear guide to Everest Wealth Management: regulation, product structure, how returns are generated, tax benefits, risks, and who these investments suit.";

const HERO_IMAGE =
  getPrimaryPageImage("/everest-wealth/about") ?? "/images/home4-import/card1.png";

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
