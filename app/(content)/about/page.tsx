import { AboutPageView } from "@/components/about/AboutPageView";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "About AS Brokers CC | Independent FSP 17273";
const PAGE_DESCRIPTION =
  "AS Brokers CC is an Authorised Financial Services Provider (FSP 17273) in Krugersdorp since 1998. Category 1.8 advice services with education before personal recommendations.";

const aboutFAQs = [
  {
    question: "Is AS Brokers an independent financial advisor in Krugersdorp?",
    answer:
      "Yes. AS Brokers CC is an Authorised Financial Services Provider (FSP 17273) based in Krugersdorp, West Rand, Gauteng. We are not tied to a single product house and provide advice across retirement, insurance, estate planning, and investment services within our licensed categories after a needs analysis.",
  },
  {
    question: "What does Category 1.8 mean for clients?",
    answer:
      "FSCA Category 1.8 (Securities and Instruments: Shares) authorisation includes advice on certain securities and instruments, which may include unlisted instruments outside a standard retail unit-trust shelf. Licence category does not mean every product is appropriate for every client. Personal recommendations follow a Financial Needs Analysis.",
  },
  {
    question: "Is AS Brokers tied to one investment product provider?",
    answer:
      "No. We are an independent intermediary. Any product discussion happens only after assessing a client’s circumstances and reviewing current provider documentation.",
  },
  {
    question: "Who leads advice at AS Brokers?",
    answer:
      "Co-founders Albert Schuurman (Key Individual; retirement and investment advice services) and Johnny Farinha (estate structuring and business continuity) lead the practice, supported by specialists in commercial underwriting, medical aid, and claims.",
  },
  {
    question: "Where does education fit before advice?",
    answer:
      "Our calculators, hubs, and insights library are educational only and constitute factual information under the FAIS Act. Personalised advice requires a needs analysis with an authorised representative of FSP 17273.",
  },
  {
    question: "How do I take the next step?",
    answer:
      "Review educational calculators on /calculators, explore the service hubs, or request a needs analysis on /contact. An authorised representative responds personally.",
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
      <link rel="preload" as="image" href="/images/about-hero-480.webp" media="(max-width: 768px)" fetchPriority="high" />
      <link rel="preload" as="image" href="/images/about-hero-960.webp" media="(min-width: 769px)" fetchPriority="high" />
      <PageJsonLd
        path="/about"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={aboutFAQs}
      />
      <AboutPageView faqs={aboutFAQs} />
    </>
  );
}
