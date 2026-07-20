import { RetirementGapMethodPageView } from "@/components/retirement-gap-method/RetirementGapMethodPageView";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { METHOD_FAQS, METHOD_PATH } from "@/lib/retirement-gap-method/content";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "What Is the Retirement Gap Method™? | Measure and Close Your Retirement Gap";
const PAGE_DESCRIPTION =
  "Discover the Retirement Gap Method™, a practical educational framework that helps South Africans understand, measure and close their Retirement Gap through calculators, workshops, education and personalised financial advice.";

export const metadata = buildPageMetadata({
  path: METHOD_PATH,
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "Retirement Gap Method",
    "Retirement Gap Toolkit",
    "close retirement gap South Africa",
    "retirement education workshop",
    "Financial Freedom Community",
    "AS Brokers FSP 17273",
  ],
});

/**
 * Asset 018: Retirement Gap Method™ cornerstone landing page.
 * Not a calculator. Central authority page for Toolkit, Workshop, Community and Reviews.
 */
export default function RetirementGapMethodPage() {
  return (
    <>
      <PageJsonLd
        path={METHOD_PATH}
        webPage={{
          name: buildPageTitle(PAGE_TITLE),
          description: PAGE_DESCRIPTION,
        }}
        faqs={[...METHOD_FAQS]}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "The Retirement Gap Toolkit™", path: "/calculators" },
          { name: "The Retirement Gap Method™", path: METHOD_PATH },
        ]}
      />
      <RetirementGapMethodPageView />
    </>
  );
}
