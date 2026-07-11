import { RetirementPlanningPageView } from "@/components/retirement-planning/RetirementPlanningPageView";
import { HubLcpPreload } from "@/components/seo/HubLcpPreload";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { HUB_LCP_IMAGES } from "@/lib/hub-lcp";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Retirement Planning South Africa | Are You on Track?";
const PAGE_DESCRIPTION =
  "Pre-retirement planning for South Africans still working. Diagnose your Financial Freedom Score™, run gap calculators, and book independent FSP 17273 advice in Krugersdorp.";

const planningFAQs = [
  {
    question: "Who is this retirement planning page for?",
    answer:
      "South Africans still working who want clarity on whether their capital, timeline, and growth rate support a comfortable retirement. It is educational orientation — not personalised advice.",
  },
  {
    question: "What should I do first on this page?",
    answer:
      "Start with the Retirement Survival Blueprint for a guided 5-step diagnostic and Financial Freedom Score™. Prefer DIY numbers first? Use the Reality Check, Growth, and Personal Goal calculators, then book FSP 17273 when you want advice.",
  },
  {
    question: "How do I know if I am saving enough for retirement?",
    answer:
      "Use the Retirement Reality Check calculator to compare desired income against projected capital, then the Retirement Growth Calculator to see what return you need to close any gap. For a plan tailored to your facts, book AS Brokers CC (FSP 17273).",
  },
  {
    question: "What is the Retirement Survival Blueprint?",
    answer:
      "A guided 5-step diagnostic that helps you discover your Financial Freedom Score™ and identify gaps in your retirement trajectory before you stop working. It is a lead diagnostic, not a substitute for regulated advice.",
  },
  {
    question: "Should I use a preservation fund when I change jobs?",
    answer:
      "Preservation can protect retirement capital from early withdrawal, but the right structure depends on tax position, timeline, and goals. Speak with an authorised adviser (FSP 17273) before transferring benefits.",
  },
  {
    question: "Is AS Brokers an independent retirement adviser?",
    answer:
      "Yes. AS Brokers CC is an independent Category 1.8 financial services provider (FSP 17273), established in 1998 and based in Krugersdorp, West Rand. We engineer plans around your goals rather than a single institution’s product list.",
  },
];

export const metadata = buildPageMetadata({
  path: "/retirement-planning",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "retirement planning South Africa",
    "planning for retirement South Africa",
    "pre-retirement planning",
    "retirement savings gap",
    "Financial Freedom Score",
    "Retirement Survival Blueprint",
    "FSP 17273",
    "Krugersdorp financial adviser",
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
        service={{
          name: "Pre-retirement planning",
          description: PAGE_DESCRIPTION,
          serviceType: "Retirement planning",
        }}
      />
      <RetirementPlanningPageView faqs={planningFAQs} />
    </>
  );
}
