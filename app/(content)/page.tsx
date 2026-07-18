import { Home4Hero } from "@/components/home4/Home4Hero";
import { Home4GoalCards } from "@/components/home4/Home4GoalCards";
import { Home4BelowFoldRest } from "@/components/home4/Home4BelowFoldRest";
import { HomeDeferredFloatingChat } from "@/components/home/HomeDeferredFloatingChat";
import { HubLcpPreload } from "@/components/seo/HubLcpPreload";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { HUB_LCP_IMAGES } from "@/lib/hub-lcp";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Everest Wealth Education & Independent Advice | AS Brokers";
const PAGE_DESCRIPTION =
  "Run ASSET calculators, learn Everest Wealth structured-income profiles (Category 1.8), and contact independent FSP 17273, Krugersdorp. Retirement, insurance, and estate when you need them.";

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
      {/* SSR immediately — do not gate on click/idle (same bug as calculators hub). */}
      <Home4BelowFoldRest />
      <HomeDeferredFloatingChat />
    </>
  );
}
