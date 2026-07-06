import { EstatePlanningPageView } from "@/components/estate-planning/EstatePlanningPageView";
import { HubLcpPreload } from "@/components/seo/HubLcpPreload";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { HUB_LCP_IMAGES } from "@/lib/hub-lcp";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Estate Planning, Wills & Trusts | Protect Your Legacy";
const PAGE_DESCRIPTION =
  "Estate planning for South Africans: wills, trusts, duty awareness, liquidity, and succession. Independent FSP 17273 in Krugersdorp and Gauteng.";

const estateFAQs = [
  {
    question: "Why does liquidity matter as much as having a will?",
    answer:
      "A will states who receives what, but your estate must settle duty, executor fees, and debt before heirs inherit. Without sufficient cash, assets may need to be sold under pressure. Life policy structuring and liquid investments can improve cash availability.",
  },
  {
    question: "What does the Estate Duty Calculator show?",
    answer:
      "The estate duty calculator illustrates the cost of dying: estate duty, executor fees, and liquidity stress based on inputs you provide. It is an awareness aid, not a SARS assessment.",
  },
  {
    question: "Can AS Brokers draft my will or trust deed?",
    answer:
      "We focus on the financial and risk side and coordinate with your attorney who drafts binding legal instruments. We do not provide legal or tax advice on this website.",
  },
];

export const metadata = buildPageMetadata({
  path: "/solutions/estate-planning",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "estate planning South Africa",
    "wills and trusts Gauteng",
    "estate duty planning",
    "financial adviser estate liquidity",
    "FSP 17273",
  ],
});

export default function EstatePlanningPage() {
  return (
    <>
      <HubLcpPreload src={HUB_LCP_IMAGES["/solutions/estate-planning"]} variant="split" />
      <PageJsonLd
        path="/solutions/estate-planning"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={estateFAQs}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: "Estate Planning", path: "/solutions/estate-planning" },
        ]}
        service={{
          name: "Estate Planning by AS Brokers CC",
          description:
            "Financial and risk coordination for wills, trusts, estate duty awareness, liquidity planning, and business succession in Krugersdorp and the West Rand.",
          serviceType: "Estate Planning, Wills Coordination, Estate Duty Awareness, Succession Planning",
        }}
      />
      <EstatePlanningPageView faqs={estateFAQs} />
    </>
  );
}
