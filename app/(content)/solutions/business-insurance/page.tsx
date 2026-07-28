import { BusinessInsurancePageView } from "@/components/solutions/BusinessInsurancePageView";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Business Insurance for South African Business Owners";
const PAGE_DESCRIPTION =
  "AS Brokers CC (FSP 17273) helps South African business owners identify cover gaps (underinsurance, business interruption, liability, key person risk) and places commercial insurance across a contracted panel including Santam, Bryte, King Price, and specialist underwriters. Educational content; personal advice follows a FAIS needs analysis.";

const faqs = [
  {
    question: "What does an independent broker actually do for a business?",
    answer:
      "An independent broker surveys the market on your behalf, not a single insurer's shelf. We review your existing cover, identify gaps (underinsurance, BI shortfalls, excluded perils), prepare a needs analysis, place cover with an appropriate insurer, and then advocate for you when a claim arises. We also conduct annual renewal reviews so cover keeps pace with asset values and turnover.",
  },
  {
    question: "Can you review the cover we already have?",
    answer:
      "Yes. Bring your current policy schedule and sum-insured figures. We review for underinsurance, Business Interruption indemnity period alignment, liability limits, and perils that may be excluded or under-defined. The review is free; personal recommendations follow a needs analysis with an authorised representative.",
  },
  {
    question: "What is Business Interruption cover and why does it matter?",
    answer:
      "Business Interruption (BI) cover pays the income your business loses while premises are being repaired after an insured event: fire, flood, and similar. The critical variables are the indemnity period (how many months of income are covered) and whether turnover or gross profit is the basis. Many BI policies are underinsured or carry too short an indemnity period, which means costs keep running but the claim stops paying long before the business is restored.",
  },
  {
    question: "What is buy-and-sell cover, and what is key person insurance?",
    answer:
      "Buy-and-sell cover funds a shareholders' agreement so that surviving partners can purchase a deceased partner's share at an agreed value, preventing an unwanted heir from entering the business. Key person insurance covers the business against the financial impact of losing a director or specialist whose skills or relationships drive revenue. Both structures require alignment with legal agreements and should be reviewed by an authorised representative.",
  },
  {
    question: "Do you help when a claim arises?",
    answer:
      "Yes. Claims advocacy is a core part of the broker role. We help you document the loss correctly, submit within policy requirements, and engage the insurer or loss assessor on your behalf. As an independent broker, we represent your interests, not the insurer's.",
  },
  {
    question: "What does the Business Risk Review cost?",
    answer:
      "The Business Risk Review workbook is free. It helps you capture assets, turnover, key people, and existing cover before we meet. A needs analysis meeting and market survey follow at no charge. Our remuneration is commission from the insurer if a product is placed, disclosed in writing at advice stage, as required by FAIS.",
  },
];

export const metadata = buildPageMetadata({
  path: "/solutions/business-insurance",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  languages: {
    en: "/solutions/business-insurance",
    af: "/besigheidsversekering-krugersdorp",
    "x-default": "/solutions/business-insurance",
  },
  keywords: [
    "business insurance South Africa",
    "commercial insurance broker",
    "business interruption cover",
    "key person insurance",
    "buy-and-sell cover",
    "underinsurance average clause",
    "independent broker FSP 17273",
  ],
});

export default function BusinessInsurancePage() {
  return (
    <>
      <PageJsonLd
        path="/solutions/business-insurance"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={faqs}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Insurance", path: "/insurance" },
          { name: "Business insurance", path: "/solutions/business-insurance" },
        ]}
        service={{
          name: "Business insurance and commercial risk placement",
          description: PAGE_DESCRIPTION,
          serviceType: "Business Insurance, Commercial Risk, Key Person, Buy-and-Sell",
        }}
      />
      <BusinessInsurancePageView faqs={faqs} />
    </>
  );
}
