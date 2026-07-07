import { RetirementPlanningPageView } from "@/components/retirement-planning/RetirementPlanningPageView";
import { HubLcpPreload } from "@/components/seo/HubLcpPreload";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { HUB_LCP_IMAGES } from "@/lib/hub-lcp";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Planning for Retirement | Are You on Track?";
const PAGE_DESCRIPTION =
  "Pre-retirement planning for South Africans still working: clarity on capital, timeline, and growth needed for financial independence. FSP 17273.";

const planningFAQs = [
  {
    question: "How do I know if I am saving enough for retirement?",
    answer:
      "Start with the Retirement Reality Check calculator to compare your desired income against projected capital. Then use the Retirement Growth Calculator to see what return you need to close any gap.",
  },
  {
    question: "What is the Retirement Survival Blueprint?",
    answer:
      "It is a guided 5-step diagnostic that helps you discover your Financial Freedom Score™ and identify gaps in your retirement trajectory before you stop working.",
  },
  {
    question: "Should I use a preservation fund when I change jobs?",
    answer:
      "Preservation can protect your retirement capital from early withdrawal, but the right structure depends on your tax position, timeline, and goals. Speak with an authorised adviser (FSP 17273) before transferring benefits.",
  },
];

export const metadata = buildPageMetadata({
  path: "/retirement-planning",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "planning for retirement South Africa",
    "pre-retirement planning",
    "retirement savings gap",
    "financial freedom score",
    "FSP 17273",
  ],
});

export default function RetirementPlanningPage() {
  return (
    <>
      <HubLcpPreload src={HUB_LCP_IMAGES["/retirement-planning"]} variant="split" />
      <PageJsonLd
        path="/retirement-planning"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={planningFAQs}
      />
      <RetirementPlanningPageView faqs={planningFAQs} />
    </>
  );
}
