import { MedicalAidPageView } from "@/components/solutions/MedicalAidPageView";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Medical Aid & Gap Cover Structuring";
const PAGE_DESCRIPTION =
  "Specialist shortfalls can bankrupt a household. We structure medical aid with demarcation-compliant gap cover and human claims advocacy, not the cheapest hospital plan. FSP 17273.";

const faqs = [
  {
    question: "Can I buy gap cover instead of medical aid?",
    answer:
      "No. Under Demarcation Regulations, gap cover is short-term insurance that typically requires an underlying medical scheme. It is not a legal substitute for medical aid.",
  },
  {
    question: "Does gap cover pay for day-to-day GP visits?",
    answer:
      "Generally no. Gap products focus on in-hospital specialist shortfalls (and related defined events). Day-to-day benefits sit with your medical scheme options.",
  },
  {
    question: "Why not just pick the cheapest hospital plan online?",
    answer:
      "Cheapest often fails at claim time, tariff shortfalls, PMB navigation, and authorisations. We optimise for household insulation and advocacy, not quote theatre.",
  },
  {
    question: "Who helps when a claim or authorisation stalls?",
    answer:
      "AS Brokers provides specialist operational support for medical onboarding and claims pathways, a human team, not a rotating call centre.",
  },
  {
    question: "Is this personalised medical advice on the website?",
    answer:
      "No. This page is educational. Structuring advice follows a consultation with a licensed representative of FSP 17273.",
  },
  {
    question: "How do annual gap caps work?",
    answer:
      "Gap benefits are subject to regulatory annual limits that adjust over time. Verify the current figure for your policy year with a licensed adviser.",
  },
];

export const metadata = buildPageMetadata({
  path: "/solutions/medical-aid",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "medical aid gap cover South Africa",
    "demarcation regulations gap cover",
    "medical shortfall protection",
    "independent medical aid broker",
    "FSP 17273",
  ],
});

export default function MedicalAidPage() {
  return (
    <>
      <PageJsonLd
        path="/solutions/medical-aid"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={faqs}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Insurance", path: "/insurance" },
          { name: "Medical aid & gap", path: "/solutions/medical-aid" },
        ]}
        service={{
          name: "Medical aid and gap cover structuring",
          description: PAGE_DESCRIPTION,
          serviceType: "Medical Aid Advice, Gap Cover",
        }}
      />
      <MedicalAidPageView faqs={faqs} />
    </>
  );
}
