import { AboutPageView } from "@/components/about/AboutPageView";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Protecting Your Legacy. Engineering Your Wealth. | AS Brokers";
const PAGE_DESCRIPTION =
  "Independent FSP 17273 (Category 1.8) in Krugersdorp since 1998. Education before advice, human specialists for underwriting, medical aid, and claims, not a call centre.";

const aboutFAQs = [
  {
    question: "Is AS Brokers an independent financial advisor in Krugersdorp?",
    answer:
      "Yes. AS Brokers CC is an authorised Financial Services Provider (FSP 17273) based in Krugersdorp, West Rand, Gauteng. We are not tied to a single product house and advise across retirement, insurance, estate planning, and Everest Wealth solutions where appropriate.",
  },
  {
    question: "What does Category 1.8 mean for clients?",
    answer:
      "FSCA Category 1.8 (Securities and Instruments: Shares) authorisation allows us to advise on certain unlisted instruments and structured return profiles, including Everest Wealth products where suitable, that many tied advisers restricted to standard insurance categories cannot distribute.",
  },
  {
    question: "Is AS Brokers a tied agent of Everest Wealth?",
    answer:
      "No. We are a fully independent intermediary. Everest is one solution we can access where appropriate, not a default for every client, and we are not a subsidiary of Everest Wealth.",
  },
  {
    question: "Who leads advice at AS Brokers?",
    answer:
      "Co-founders Albert Schuurman (Key Individual; retirement and Everest Wealth) and Johnny Farinha (estate structuring and business continuity) lead fiduciary advice, supported by specialists in commercial underwriting, medical aid, and claims.",
  },
  {
    question: "Where does education fit before advice?",
    answer:
      "Our calculators, hubs, and insights library are educational only. Personalised advice requires a needs analysis with a licensed representative of FSP 17273.",
  },
  {
    question: "How do I take the next step?",
    answer:
      "Run numbers on /calculators, explore the service hubs, or request a Wealth Engineering Call on /contact. An authorised adviser responds personally, not via a call centre.",
  },
];

export const metadata = buildPageMetadata({
  path: "/about",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "independent financial advisor Krugersdorp",
    "financial adviser West Rand",
    "FSP 17273",
    "Category 1.8 financial advisor",
    "AS Brokers about",
  ],
});

export default function AboutPage() {
  return (
    <>
      <PageJsonLd
        path="/about"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={aboutFAQs}
      />
      <AboutPageView faqs={aboutFAQs} />
    </>
  );
}
