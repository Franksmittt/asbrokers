import { AboutPageView } from "@/components/about/AboutPageView";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata } from "@/lib/seo-metadata";

const PAGE_TITLE = "About AS Brokers CC | Independent Financial Advisor Krugersdorp";
const PAGE_DESCRIPTION =
  "AS Brokers CC is an independent financial advisor in Krugersdorp (FSP 17273, Category 1.8). Over 25 years helping South Africans with retirement, Everest Wealth, insurance, and estate planning.";

const aboutFAQs = [
  {
    question: "Is AS Brokers an independent financial advisor in Krugersdorp?",
    answer:
      "Yes. AS Brokers CC is an authorised Financial Services Provider (FSP 17273) based in Krugersdorp, West Rand, Gauteng. We are not tied to a single product house and advise across retirement, insurance, estate planning, and Everest Wealth solutions.",
  },
  {
    question: "What does Category 1.8 mean for clients?",
    answer:
      "Our FSCA Category 1.8 (Securities and Instruments: Shares) license allows us to advise on and distribute selected alternative investments, including Everest Wealth structured return products, that many tied advisers cannot offer.",
  },
  {
    question: "Who leads advice at AS Brokers?",
    answer:
      "Co-founders Albert Schuurman (Key Individual, retirement and Everest Wealth) and Johnny Farinha (estate structuring and business continuity) lead fiduciary advice, supported by specialists in commercial underwriting, medical aid, and claims.",
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
        webPage={{ name: PAGE_TITLE, description: PAGE_DESCRIPTION }}
        faqs={aboutFAQs}
      />
      <AboutPageView />
    </>
  );
}
