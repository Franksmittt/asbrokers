import { Home4Preview } from "@/components/home4/Home4Preview";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata = buildPageMetadata({
  path: "/",
  title: "Independent Financial Advisor Krugersdorp",
  description:
    "25+ years helping South Africans with retirement planning, Everest Wealth, insurance, estate structuring, and business continuity. FSP 17273, Krugersdorp.",
});

export default function HomePage() {
  return (
    <>
      <PageJsonLd
        path="/"
        webPage={{
          name: "AS Brokers CC | Comprehensive Financial Planning & Investment Solutions | FSP 17273",
          description:
            "AS Brokers CC is an Authorised Financial Services Provider (FSP 17273) offering expert financial planning, investment, and insurance solutions in Krugersdorp and the West Rand, Gauteng.",
        }}
        primaryImagePath="/opengraph-image"
      />
      <Home4Preview />
    </>
  );
}
