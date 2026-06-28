import Image from "next/image";
import Link from "next/link";

import { Footer } from "@/components/Footer";
import {
  HOME2_GRID,
  HOME2_WRAP,
  Home2Button,
  Home2Credentials,
  Home2Cta,
  Home2Figure,
  Home2Heading,
  Home2Insights,
  Home2Kicker,
  Home2MediaBand,
  Home2Partners,
  Home2Reviews,
  Home2Rule,
  Home2Section,
  Home2Stats,
} from "@/components/home2/Home2Blocks";
import { HUB_CALCULATORS } from "@/lib/calculators/hub-catalog";
import { PLANNING_TOOL_OFFERS } from "@/lib/planning-tools-offers";

const PILLARS = [
  { key: "healthy-retirement" as const, num: "01" },
  { key: "retirement-survival" as const, num: "02" },
  { key: "legacy-checklist" as const, num: "03" },
  { key: "business-risk" as const, num: "04" },
] as const;

const CPP = [
  {
    title: "Create",
    lead: "Build retirement income, voluntary investments, and a path to financial freedom.",
    points: ["Retirement planning", "Everest voluntary products", "Living annuity drawdown"],
    href: "/solutions",
    span: "md:col-span-8",
    image: "/images/home-yield-continuity-4x3.jpg",
  },
  {
    title: "Protect",
    lead: "Cover health, personal assets, and business risks before disruption hits.",
    points: ["Life & disability", "Medical aid & gap cover", "Commercial insurance"],
    href: "/solutions/business-insurance",
    span: "md:col-span-4",
    image: "/images/solutions-fiduciary-defense-1x1.jpg",
  },
  {
    title: "Preserve",
    lead: "Transfer wealth with wills, trusts, and estate planning that holds up.",
    points: ["Wills & testaments", "Trust structures", "Beneficiary reviews"],
    href: "/legacy-readiness-checklist",
    span: "md:col-span-6 md:col-start-4",
    image: "/images/estate-duty-calculator-inset-1x1.jpg",
  },
] as const;

const JOURNEY = [
  "Educational article",
  "Calculator or assessment",
  "Blueprint download",
  "Email follow-up",
  "Discovery meeting",
  "Ongoing advice",
] as const;

function PreviewBanner() {
  return (
    <div className="border-b-2 border-black bg-[#1a1a1a] px-4 py-2 text-center text-[12px] text-[#9a9893]">
      Preview at <span className="font-mono text-[#e8e6e1]">/home2</span> — public homepage remains{" "}
      <span className="font-mono text-[#e8e6e1]">/</span>
    </div>
  );
}

export function Home2Preview() {
  return (
    <div className="min-h-screen bg-[#0e0e10]">
      <PreviewBanner />

      {/* Hero — asymmetric 12-col, whitespace as structure */}
      <header className="border-b-2 border-black bg-[#0e0e10]">
        <div className={`${HOME2_WRAP} py-14 md:py-24`}>
          <div className={`${HOME2_GRID} items-start gap-y-10`}>
            <div className="hidden md:col-span-1 md:block" aria-hidden />
            <div className="col-span-12 md:col-span-6 lg:col-span-5">
              <Home2Kicker>FSP 17273 · Krugersdorp · Est. 1998</Home2Kicker>
              <Home2Heading as="h1" className="mt-4">
                Create, protect, and preserve what matters most.
              </Home2Heading>
              <p className="mt-6 max-w-prose text-[16px] leading-[1.65] text-[#b8b6b1] md:text-[17px]">
                Independent advice across health, retirement, estate planning, and business insurance — organised around
                the problems you worry about, not a product catalogue.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Home2Button href="#start-here">Choose your starting point</Home2Button>
                <Home2Button href="/contact" variant="outline">
                  Book a consultation
                </Home2Button>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-8 lg:col-span-6 lg:col-start-7">
              <Home2Figure
                src="/images/about-krugersdorp-trust-16x9.jpg"
                alt="AS Brokers independent financial advice, Krugersdorp"
                aspect="4/3"
                priority
                caption="Independent financial advice — West Rand, Gauteng."
              />
            </div>
          </div>
        </div>
      </header>

      <Home2Credentials />

      {/* Four paths — editorial index, not card grid */}
      <Home2Section tone="paper" id="start-here" className="scroll-mt-0">
        <Home2Kicker tone="paper">Health · Wealth · Legacy · Business</Home2Kicker>
        <Home2Heading as="h2" tone="paper" className="mt-2">
          Where should you start?
        </Home2Heading>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#5c5a55]">
          Each free assessment answers one core question. Pick the worry that feels most urgent — health, money, legacy,
          or business risk.
        </p>

        <ol className="mt-10 divide-y-2 divide-black border-2 border-black">
          {PILLARS.map(({ key, num }) => {
            const offer = PLANNING_TOOL_OFFERS[key];
            return (
              <li key={key}>
                <Link
                  href={offer.href}
                  className={`${HOME2_GRID} gap-y-3 py-5 transition-colors hover:bg-[#e8e4dc] md:items-baseline md:py-6`}
                >
                  <span className="col-span-2 font-mono text-lg font-semibold text-[#141414] md:col-span-1">{num}</span>
                  <div className="col-span-10 md:col-span-4">
                    <p className="text-[13px] font-medium text-[#5c5a55]">{offer.pillar}</p>
                    <h3 className="mt-0.5 font-semibold text-[#141414]">{offer.title}</h3>
                  </div>
                  <p className="col-span-12 text-[15px] leading-relaxed text-[#5c5a55] md:col-span-5">
                    {offer.coreQuestion}
                  </p>
                  <span className="col-span-12 text-sm font-semibold text-[#141414] md:col-span-2 md:text-right">
                    {offer.freeLabel} →
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
        <p className="mt-6 text-[14px] text-[#5c5a55]">
          <Link href="/legacy-conversations" className="font-medium text-[#141414] underline underline-offset-2">
            How Health, Wealth, Legacy &amp; Business fit together
          </Link>
        </p>
      </Home2Section>

      <Home2MediaBand src="/images/solutions-hero-16x9.jpg" alt="AS Brokers service areas" />

      {/* Create · Protect · Preserve — broken grid */}
      <Home2Section tone="ink">
        <Home2Kicker>Create · Protect · Preserve</Home2Kicker>
        <Home2Heading as="h2" className="mt-2">
          Three outcomes behind every service
        </Home2Heading>
        <div className={`${HOME2_GRID} mt-10 gap-y-6`}>
          {CPP.map((col) => (
            <article
              key={col.title}
              className={`col-span-12 flex flex-col border-2 border-white ${col.span}`}
            >
              <div className="relative aspect-[2/1] border-b-2 border-white md:aspect-[16/7]">
                <Image src={col.image} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <h3 className="text-xl font-semibold text-white">{col.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#9a9893]">{col.lead}</p>
                <ul className="mt-4 flex-1 space-y-1 text-[14px] text-[#e8e6e1]">
                  {col.points.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link
                  href={col.href}
                  className="mt-5 text-sm font-semibold text-white underline underline-offset-2"
                >
                  Explore {col.title.toLowerCase()}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Home2Section>

      {/* Business owners */}
      <Home2Section tone="paper">
        <div className={`${HOME2_GRID} items-start gap-y-10`}>
          <div className="col-span-12 md:col-span-5 md:col-start-8 lg:col-span-5 lg:col-start-8">
            <Home2Figure
              src="/images/business-life-inset-1x1.jpg"
              alt="Business succession and commercial risk planning"
              aspect="3/2"
              tone="paper"
            />
          </div>
          <div className="col-span-12 md:col-span-6 md:row-start-1 lg:col-span-6">
            <Home2Kicker tone="paper">Business owners</Home2Kicker>
            <Home2Heading as="h2" tone="paper" className="mt-2">
              Could your business survive a major disruption?
            </Home2Heading>
            <p className="mt-4 text-[15px] leading-relaxed text-[#5c5a55]">
              Commercial insurance, key person cover, buy-sell agreements, and liability gaps are central to our
              practice — especially for Gauteng owners who need structured business cover, not a generic quote form.
            </p>
            <ul className="mt-6 space-y-2 border-l-2 border-black pl-4 text-[14px] text-[#141414]">
              {[
                "Commercial & fire cover",
                "Key person assurance",
                "Buy & sell agreements",
                "Business liability",
                "Cyber & crime risks",
                "Succession planning",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Home2Button href="/business-risk-review" tone="paper">
                Business Risk Review™
              </Home2Button>
              <Home2Button href="/contact" variant="outline" tone="paper">
                Request a commercial quote
              </Home2Button>
            </div>
          </div>
        </div>
      </Home2Section>

      <Home2Section tone="paper" className="border-t-0 pt-0">
        <Home2Partners />
      </Home2Section>

      {/* Calculators — linked index */}
      <Home2Section tone="ink">
        <div className={`${HOME2_GRID} items-end gap-y-4`}>
          <div className="col-span-12 md:col-span-8">
            <Home2Kicker>Educational tools</Home2Kicker>
            <Home2Heading as="h2" className="mt-2">
              Calculators
            </Home2Heading>
            <p className="mt-2 text-[14px] text-[#9a9893]">Illustrative numbers — then speak to an adviser for your plan.</p>
          </div>
          <Link href="/calculators" className="col-span-12 text-sm font-medium text-white underline underline-offset-2 md:col-span-4 md:text-right">
            All calculators
          </Link>
        </div>
        <Home2Rule />
        <ul className="divide-y-2 divide-white border-2 border-white">
          {HUB_CALCULATORS.map((calc) => (
            <li key={calc.embedId}>
              <Link href={calc.href} className={`${HOME2_GRID} gap-y-2 py-4 hover:bg-[#1a1a1c] md:items-baseline`}>
                <span className="col-span-12 font-mono text-[12px] text-[#9a9893] md:col-span-2">{calc.tag}</span>
                <h3 className="col-span-12 font-semibold text-white md:col-span-4">{calc.title}</h3>
                <p className="col-span-12 text-[14px] text-[#9a9893] md:col-span-6">{calc.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Home2Section>

      <Home2MediaBand src="/images/calculators-hub-16x9.jpg" />

      {/* Journey */}
      <Home2Section tone="paper">
        <Home2Kicker tone="paper">How we work</Home2Kicker>
        <Home2Heading as="h2" tone="paper" className="mt-2">
          From article to ongoing advice
        </Home2Heading>
        <ol className="mt-8 border-2 border-black">
          {JOURNEY.map((step, i) => (
            <li
              key={step}
              className={`${HOME2_GRID} items-baseline border-b-2 border-black py-3 last:border-b-0 md:py-4`}
            >
              <span className="col-span-2 font-mono text-sm font-semibold text-[#141414] md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="col-span-10 text-[15px] text-[#141414] md:col-span-11">{step}</span>
            </li>
          ))}
        </ol>
        <Link href="/how-we-work" className="mt-5 inline-block text-sm font-medium text-[#141414] underline underline-offset-2">
          Read how we work
        </Link>
      </Home2Section>

      <Home2Section tone="ink">
        <Home2Stats />
      </Home2Section>

      <Home2Section tone="ink" className="border-t-0 pt-0">
        <Home2Reviews />
      </Home2Section>

      <Home2Section tone="paper">
        <Home2Insights />
      </Home2Section>

      <Home2Section tone="ink">
        <Home2Cta />
      </Home2Section>

      <Footer />
    </div>
  );
}
