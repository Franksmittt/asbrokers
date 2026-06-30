import Link from "next/link";
import { Footer } from "@/components/Footer";
import { PAGE_CONTENT_MAX, PageMediaStrip } from "@/components/PageMediaStrip";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { PlanningToolsStrip } from "@/components/PlanningToolsStrip";
import { HUB_CALCULATORS, HUB_SECTIONS } from "@/lib/calculators/hub-catalog";
import { buildPageMetadata } from "@/lib/seo-metadata";

const calculatorFAQs = [
  {
    question: "What calculators does AS Brokers offer?",
    answer:
      "Our curated public library features the Retirement Reality Calculator, Retirement Readiness Calculator, Inflation Impact Calculator, and AS Brokers Wealth Building Calculator, focused retirement and wealth education tools.",
  },
  {
    question: "Are calculator results financial advice?",
    answer:
      "No. Our calculators are educational tools to illustrate concepts and rough estimates. For personalised advice, book a consultation with an AS Brokers adviser.",
  },
];

const SECONDARY_RISK_TOOLS = [
  {
    href: "/income-tax-calculator",
    title: "Income Tax Calculator",
    description: "SARS 2026/27 PAYE and marginal tax exposure.",
  },
  {
    href: "/estate-duty-calculator",
    title: "Estate Duty Calculator",
    description: "Illustrative duty, abatement, and executor costs.",
  },
  {
    href: "/annual-estate-reduction-strategy",
    title: "Annual Estate Reduction",
    description: "Donation and reduction planning over time.",
  },
  {
    href: "/premium-increase-calculator",
    title: "Premium Sustainability",
    description: "Escalating vs level life cover cost paths.",
  },
  {
    href: "/income-in-retirement",
    title: "Income in Retirement",
    description: "Capital depletion and drawdown stress test.",
  },
  {
    href: "/immediate-higher-income-calculator",
    title: "Immediate Higher Income",
    description: "Compare living annuity drawdown scenarios.",
  },
] as const;

export const metadata = buildPageMetadata({
  path: "/calculators",
  title: "Financial Calculators for South Africans",
  description:
    "Retirement Reality, Retirement Readiness, Inflation Impact, and Wealth Building calculators for South Africans. Educational planning tools. FSP 17273.",
});

function CalculatorCard({
  tag,
  title,
  description,
  bullets,
  leadsTo,
  href,
  featured,
  leadsToAccent,
}: {
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  leadsTo: string;
  href: string;
  featured?: boolean;
  leadsToAccent?: boolean;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className={`group block h-full rounded-[2rem] border border-0 rim-light transition-all duration-500 hover:bg-white/[0.07] ${
        featured ? "p-6 md:p-8 lg:p-10" : "p-6 md:p-8"
      }`}
    >
      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cinematic-teal">{tag}</span>
      <h3 className="mt-2 mb-3 text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-cinematic-teal/90">
        {title}
      </h3>
      <p className="mb-4 text-sm leading-relaxed tracking-[0.01em] text-gray-400">{description}</p>
      <ul className="mb-4 space-y-1.5">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-gray-500">
            <span className="mt-0.5 text-cinematic-teal">→</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <p className="mb-4 text-xs">
        <span className="text-gray-400">Leads to:</span>{" "}
        <span className={leadsToAccent ? "font-medium text-cinematic-teal" : "text-gray-500"}>{leadsTo}</span>
      </p>
      <span className="inline-flex items-center gap-1 text-sm font-medium text-cinematic-teal transition-all duration-300 group-hover:gap-2">
        Open calculator
      </span>
    </Link>
  );
}

function SectionHeading({ title, question }: { title: string; question: string }) {
  return (
    <div className="mb-6 md:mb-8">
      <h2 className="mb-1 text-xl font-bold text-white md:text-2xl">{title}</h2>
      <p className="text-sm text-zinc-500">Key question: {question}</p>
    </div>
  );
}

export default function CalculatorsPage() {
  const retirementCalcs = HUB_CALCULATORS.filter((c) => c.sectionId === HUB_SECTIONS.retirement.id);
  const inflationCalcs = HUB_CALCULATORS.filter((c) => c.sectionId === HUB_SECTIONS.inflation.id);

  return (
    <div className="min-h-screen bg-void">
      <PageJsonLd
        path="/calculators"
        webPage={{
          name: "Financial Calculators for South Africans | AS Brokers CC",
          description:
            "Retirement Reality, Retirement Readiness, Inflation Impact, and Wealth Building calculators for South Africans. Educational planning tools. FSP 17273.",
        }}
        faqs={calculatorFAQs}
      />

      <section data-chunk-boundary className="relative overflow-hidden pb-16 pt-28">
        <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(20,184,166,0.18)_0%,transparent_70%)]" />
        <div className={`relative ${PAGE_CONTENT_MAX}`}>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">AS Brokers</p>
          <h1 className="mb-4 text-3xl font-bold leading-[1.15] tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
            The Actuarial Reality Check.
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed tracking-[0.01em] text-gray-400">
            Curated planning calculators, each answers a specific retirement or wealth question. Educational only.
          </p>
        </div>
      </section>

      <section className="pb-8">
        <div className={PAGE_CONTENT_MAX}>
          <PlanningToolsStrip />
        </div>
      </section>

      <section className="border-t border-white/5 py-8" aria-hidden>
        <div className={PAGE_CONTENT_MAX}>
          <PageMediaStrip
            variant="primary"
            src="/images/calculators-hub-16x9.jpg"
            rounded="3xl"
          />
        </div>
      </section>

      <section data-chunk-boundary id="retirement-planning" className="scroll-mt-24 border-t border-white/5 py-16">
        <div className={PAGE_CONTENT_MAX}>
          <SectionHeading
            title={HUB_SECTIONS.retirement.title}
            question={HUB_SECTIONS.retirement.question}
          />
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            {retirementCalcs.map((calc) => (
              <CalculatorCard key={calc.embedId} {...calc} featured={calc.featured} />
            ))}
          </div>
        </div>
      </section>

      <section data-chunk-boundary id="purchasing-power" className="scroll-mt-24 border-t border-white/5 py-16">
        <div className={PAGE_CONTENT_MAX}>
          <SectionHeading
            title={HUB_SECTIONS.inflation.title}
            question={HUB_SECTIONS.inflation.question}
          />
          <div className="grid gap-4 md:max-w-2xl md:gap-6">
            {inflationCalcs.map((calc) => (
              <CalculatorCard key={calc.embedId} {...calc} featured={calc.featured} />
            ))}
          </div>
        </div>
      </section>

      <section data-chunk-boundary id="risk-tax-tools" className="scroll-mt-24 border-t border-white/5 py-16">
        <div className={PAGE_CONTENT_MAX}>
          <SectionHeading
            title="Risk, tax & estate tools"
            question="What secondary liabilities could erode my plan?"
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {SECONDARY_RISK_TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                prefetch={false}
                className="group block h-full rounded-[2rem] border border-0 rim-light p-6 transition-all duration-500 hover:bg-white/[0.07]"
              >
                <h3 className="text-lg font-bold text-white transition-colors group-hover:text-cinematic-teal/90">
                  {tool.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{tool.description}</p>
                <span className="mt-4 inline-flex text-sm font-medium text-cinematic-teal">Open calculator →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section data-chunk-boundary className="border-t border-white/5 py-16 md:py-20">
        <div className={PAGE_CONTENT_MAX}>
          <div className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-[2rem] rim-light p-8 md:p-12">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cinematic-teal/10 to-gold-orange/5" />
              <div className="relative text-center">
                <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">Need help interpreting the numbers?</h2>
                <p className="mb-8 text-sm text-zinc-400">
                  Book a clarity conversation with AS Brokers, we will walk through your results in context.
                </p>
                <Link
                  href="/contact"
                  prefetch={false}
                  className="inline-flex items-center justify-center rounded-[2rem] bg-white px-8 py-4 font-bold text-black hover:bg-zinc-200"
                >
                  Request a review
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
