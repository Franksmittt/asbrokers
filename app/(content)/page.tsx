import { Home4Hero } from "@/components/home4/Home4Hero";
import { Home4GoalCards } from "@/components/home4/Home4GoalCards";
import { Home4RestDeferred } from "@/components/home4/Home4RestDeferred";
import { HubLcpPreload } from "@/components/seo/HubLcpPreload";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { HUB_LCP_IMAGES } from "@/lib/hub-lcp";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Independent Financial Advisor Krugersdorp";
const PAGE_DESCRIPTION =
  "25+ years helping South Africans with retirement planning, Everest Wealth, insurance, estate structuring, and business continuity. FSP 17273, Krugersdorp.";

export const metadata = buildPageMetadata({
  path: "/",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function HomePage() {
  return (
    <>
      <HubLcpPreload src={HUB_LCP_IMAGES["/"]} />
      <PageJsonLd
        path="/"
        webPage={{
          name: buildPageTitle(PAGE_TITLE),
          description: PAGE_DESCRIPTION,
        }}
        primaryImagePath="/opengraph-image"
      />
      <Home4Hero />
      <Home4GoalCards />
      <Home4RestDeferred />
    </>
  );
}
