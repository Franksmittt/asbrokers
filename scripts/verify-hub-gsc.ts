/**
 * GSC readiness gate for primary hub pages — run: npx tsx scripts/verify-hub-gsc.ts
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();

const HUB_PAGES: Array<{
  path: string;
  pageFile: string;
  pageView: string;
  hasFaqs: boolean;
}> = [
  { path: "/", pageFile: "app/(content)/page.tsx", pageView: "components/home4/Home4Preview.tsx", hasFaqs: false },
  { path: "/retirement", pageFile: "app/(content)/retirement/page.tsx", pageView: "components/retirement/RetirementPageView.tsx", hasFaqs: true },
  { path: "/everest-wealth", pageFile: "app/(content)/everest-wealth/page.tsx", pageView: "components/everest-wealth/EverestWealthPageView.tsx", hasFaqs: true },
  { path: "/insurance", pageFile: "app/(content)/insurance/page.tsx", pageView: "components/insurance/InsuranceHubPageView.tsx", hasFaqs: true },
  { path: "/estate-planning", pageFile: "app/(content)/estate-planning/page.tsx", pageView: "components/estate-planning/EstatePlanningPageView.tsx", hasFaqs: true },
  { path: "/insights", pageFile: "app/(content)/insights/page.tsx", pageView: "components/insights/InsightsHubPageView.tsx", hasFaqs: true },
  { path: "/about", pageFile: "app/(content)/about/page.tsx", pageView: "components/about/AboutPageView.tsx", hasFaqs: true },
  { path: "/contact", pageFile: "app/(content)/contact/page.tsx", pageView: "components/contact/ContactPageView.tsx", hasFaqs: true },
];

const SITEMAP = readFileSync(join(ROOT, "app/sitemap.ts"), "utf8");
const SEO_TS = readFileSync(join(ROOT, "lib/seo.ts"), "utf8");

function read(rel: string): string {
  return readFileSync(join(ROOT, rel), "utf8");
}

function main() {
  let failed = false;

  if (!SEO_TS.includes('"/insights"')) {
    console.error("FAIL: /insights missing from SCHEMA_EXPLICIT_PATH_PREFIXES (duplicate JSON-LD risk)");
    failed = true;
  } else {
    console.log("PASS: /insights in explicit schema list");
  }

  for (const hub of HUB_PAGES) {
    const page = read(hub.pageFile);
    const view = read(hub.pageView);

    if (!page.includes("buildPageMetadata")) {
      console.error(`FAIL: ${hub.path} missing buildPageMetadata`);
      failed = true;
    }

    if (!page.includes("PageJsonLd")) {
      console.error(`FAIL: ${hub.path} missing PageJsonLd`);
      failed = true;
    }

    if (!page.includes("buildPageTitle")) {
      console.error(`FAIL: ${hub.path} JSON-LD title should use buildPageTitle for parity with <title>`);
      failed = true;
    }

    if (!SITEMAP.includes(`"${hub.path}"`)) {
      console.error(`FAIL: ${hub.path} not in sitemap STATIC_PATHS`);
      failed = true;
    }

    if (!view.includes("data-chunk-boundary")) {
      console.error(`FAIL: ${hub.path} page view missing data-chunk-boundary`);
      failed = true;
    }

    if (!view.includes("RelatedContent")) {
      console.error(`FAIL: ${hub.path} page view missing RelatedContent`);
      failed = true;
    }

    if (hub.hasFaqs) {
      if (!page.includes("faqs=") || !page.includes("VisibleFaqSection") && !view.includes("VisibleFaqSection")) {
        // faqs passed to view
      }
      if (!page.includes("faqs={") && !page.includes("faqs=")) {
        console.error(`FAIL: ${hub.path} FAQ schema declared but no faqs prop wiring`);
        failed = true;
      }
      if (!view.includes("VisibleFaqSection")) {
        console.error(`FAIL: ${hub.path} has FAQ schema but no VisibleFaqSection (GSC mismatch risk)`);
        failed = true;
      }
    }
  }

  if (!failed) {
    console.log("PASS: all 8 hub pages meet GSC static readiness checks");
  } else {
    process.exit(1);
  }
}

main();
