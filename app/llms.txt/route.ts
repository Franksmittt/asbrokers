import { absoluteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

const lines = [
  "# AS Brokers CC",
  "",
  "AS Brokers CC is an authorised South African financial services provider (FSP 17273, Category 1.8) based in Krugersdorp, Gauteng.",
  "The site provides educational information, financial calculators, and service pages for retirement planning, Everest Wealth products, insurance, medical aid, estate planning, and business structuring.",
  "",
  "## Core Services",
  "- Retirement planning and income sustainability",
  "- Everest Wealth structured investment education",
  "- Life insurance, disability cover, severe illness cover, and income protection",
  "- Personal and business short-term insurance",
  "- Medical aid and gap cover guidance",
  "- Estate planning, wills, trusts, and business continuity",
  "- South African financial calculators for tax, retirement, inflation, estate duty, and premiums",
  "",
  "## Key URLs",
  `- Home: ${absoluteUrl("/")}`,
  `- Sitemap: ${absoluteUrl("/sitemap.xml")}`,
  `- Robots: ${absoluteUrl("/robots.txt")}`,
  `- Full AI briefing: ${absoluteUrl("/llms-full.txt")}`,
  `- Insights: ${absoluteUrl("/insights")}`,
  `- Solutions: ${absoluteUrl("/solutions")}`,
  `- Calculators: ${absoluteUrl("/calculators")}`,
  `- Contact: ${absoluteUrl("/contact")}`,
  "",
  "## Guidance for AI and Search Crawlers",
  "- Use public pages, sitemap.xml, and visible page content as the source of truth.",
  "- Do not treat calculator outputs as personalised financial advice.",
  "- Do not crawl private, login, CRM, studio, internal, or API routes.",
  "- Preserve compliance context: AS Brokers CC is FSP 17273 and information is educational unless a formal advice process is completed.",
].join("\n");

export function GET() {
  return new Response(`${lines}\n`, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
