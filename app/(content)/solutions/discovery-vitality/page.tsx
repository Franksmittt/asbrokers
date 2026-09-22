import { DiscoveryVitalityPageView } from "@/components/solutions/DiscoveryVitalityPageView";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Discovery Vitality Broker South Africa | AS Brokers";
const PAGE_DESCRIPTION =
  "Learn how Discovery Vitality works (status, points, rewards, device benefits) and request a short signup conversation with AS Brokers CC (FSP 17273) in Krugersdorp. Educational — not advice.";

const CONTENT_REVISED = "2026-09-22";

const faqs = [
  {
    question: "Is Discovery Vitality the same as Discovery Health medical aid?",
    answer:
      "No. Discovery Health Medical Scheme is a medical scheme under the Medical Schemes Act. Discovery Vitality is a separate lifestyle / wellness programme with its own membership fee and reward rules. Vitality does not replace medical aid or Prescribed Minimum Benefits.",
  },
  {
    question: "Can AS Brokers help me join Discovery Vitality?",
    answer:
      "Yes. AS Brokers CC (FSP 17273) can take your interest, explain how Vitality typically works beside medical aid or life cover, and support onboarding where appropriate. Personal recommendations only follow a FAIS needs analysis — not this webpage alone.",
  },
  {
    question: "Are the 2026 fees and point thresholds on this page guaranteed?",
    answer:
      "No. Figures such as illustrative Vitality Premium fees and status point thresholds are drawn from publicly discussed 2026 materials and can change. Confirm live rules, partner discounts, and device benefit guides with Discovery and your adviser.",
  },
  {
    question: "Is the Apple Watch or Oura benefit free?",
    answer:
      "Not automatically. Device pathways usually involve an activation fee and activity- or sleep-linked monthly funding. If weekly goals are missed, the member repayment can increase. Read the current Discovery benefit guide before activating a device.",
  },
  {
    question: "Does using a broker make Vitality more expensive?",
    answer:
      "Vitality membership fees are set by Discovery’s programme rules, separate from medical scheme broker remuneration. Speak to AS Brokers about how joining through our office works for your household. We will not invent fee structures that Discovery does not publish.",
  },
  {
    question: "Is this page affiliated with Discovery Limited?",
    answer:
      "No. This is an independent educational page from AS Brokers CC (FSP 17273). Discovery Vitality and related Discovery products are third-party offerings. AS Brokers is not Discovery and does not guarantee Discovery outcomes.",
  },
];

export const metadata = buildPageMetadata({
  path: "/solutions/discovery-vitality",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "Discovery Vitality",
    "Discovery Vitality broker",
    "Vitality South Africa",
    "Discovery Vitality signup",
    "Vitality rewards",
    "FSP 17273",
    "medical wellness broker Krugersdorp",
  ],
});

export default function DiscoveryVitalityPage() {
  return (
    <>
      <PageJsonLd
        path="/solutions/discovery-vitality"
        webPage={{
          name: buildPageTitle(PAGE_TITLE),
          description: PAGE_DESCRIPTION,
          datePublished: "2026-09-22",
          dateModified: CONTENT_REVISED,
        }}
        faqs={faqs}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Insurance", path: "/insurance" },
          { name: "Medical aid & gap", path: "/solutions/medical-aid" },
          { name: "Discovery Vitality", path: "/solutions/discovery-vitality" },
        ]}
        primaryImagePath="/images/risk-arch-medical.webp"
        service={{
          name: "Discovery Vitality brokerage and education",
          description: PAGE_DESCRIPTION,
          serviceType: "Wellness Programme Education, Discovery Vitality Onboarding Support",
        }}
      />
      <DiscoveryVitalityPageView faqs={faqs} contentRevised={CONTENT_REVISED} />
    </>
  );
}
