import Link from "next/link";
import { Footer } from "@/components/Footer";
import { PAGE_CONTENT_MAX, PageMediaStrip, PageMediaStripTriple } from "@/components/PageMediaStrip";
import { FAQSchema } from "@/components/FAQSchema";

const calculatorFAQs = [
  {
    question: "What calculators does AS Brokers offer?",
    answer:
      "We offer retirement reality, income in retirement (run-out), inflation impact, income tax, estate duty, annual estate reduction, premium increase comparison, and Everest Wealth product calculators.",
  },
  {
    question: "Are calculator results financial advice?",
    answer:
      "No. Our calculators are educational tools to illustrate concepts and rough estimates. For personalised advice, book a consultation with an AS Brokers adviser.",
  },
];

export const metadata = {
  title: "Financial Calculators for South Africans | AS Brokers CC",
  description:
    "Retirement reality, income tax, estate duty, inflation, premium comparison, and Everest Wealth calculators. Financial planning tools for South Africans. FSP 17273.",
};

const pillarLinks = [
  { label: "Assess Capital Lifespan", href: "#retirement" },
  { label: "Calculate Everest Yields", href: "#product-quotations" },
  { label: "Secondary Risk Tools", href: "#risk-architecture" },
];

const retirementCalculators = [
  {
    tag: "Problem Identifier",
    title: "Retirement Savings Calculator",
    description:
      "This calculator highlights whether your current savings rate, time horizon, and assumptions are sufficient to fund retirement.",
    bullets: [
      "Shortfalls in retirement funding",
      "The limits of late-stage saving",
      "The need for structured retirement vehicles",
    ],
    leadsTo: "Retirement annuities, preservation funds, and structured long-term investment planning.",
    href: "/retirement",
  },
  {
    tag: "Problem Identifier",
    title: "Income in Retirement Calculator",
    description:
      "This calculator models how long your capital can realistically sustain a chosen level of income in retirement.",
    bullets: [
      "Why income sustainability matters more than capital value",
      "The impact of withdrawal rates and inflation",
      "The risks of drawing income without a structured plan",
    ],
    leadsTo: "Living annuities, income-focused investments, and drawdown management strategies.",
    href: "/income-in-retirement",
  },
  {
    tag: "Problem Identifier",
    title: "Inflation Impact Calculator",
    description: "This calculator isolates inflation as a hidden risk to purchasing power.",
    bullets: [
      "Why nominal returns are misleading",
      "How inflation erodes income over time",
      "The need for inflation-beating strategies",
    ],
    leadsTo: "Growth-oriented investments, real-return strategies, and inflation-aware planning.",
    href: "/cost-of-inflation-over-time",
  },
];

const taxEstateCalculators = [
  {
    tag: "Problem Identifier",
    title: "Income Tax Calculator",
    description: "This calculator models how income is taxed across different scenarios.",
    bullets: [
      "The real cost of marginal tax rates",
      "The difference between taxable income and net income",
      "Why tax-efficient structuring matters",
    ],
    leadsTo: "Tax-efficient investments, retirement products, and income structuring strategies.",
    href: "/income-tax-calculator",
  },
  {
    tag: "Problem Identifier",
    title: "Estate Duty & Fees Calculator",
    description: "This calculator estimates how much of an estate may be lost to estate duty and administration fees.",
    bullets: [
      "The impact of estate costs at death",
      "Why liquidity planning matters",
      "The consequences of poor estate structuring",
    ],
    leadsTo: "Estate planning strategies, life insurance for liquidity, and trust-based planning.",
    href: "/estate-duty-calculator",
  },
  {
    tag: "Strategy Modeller",
    title: "Estate Duty Reduction Strategy Calculator",
    description: "This calculator models long-term estate reduction strategies using annual planning techniques.",
    bullets: [
      "How estates can be reduced legally over time",
      "The role of gifting and structuring",
      "Why early planning matters",
    ],
    leadsTo: "Trust structures, estate planning strategies, and long-term intergenerational planning.",
    href: "/annual-estate-reduction-strategy",
  },
];

const lifeInsuranceCalculators = [
  {
    tag: "Problem Identifier",
    title: "Premium Increase Problem Calculator (Life Assurance)",
    description: "This calculator exposes the long-term risk of escalating life insurance premiums.",
    bullets: [
      "Why some policies become unaffordable over time",
      "How premium structures impact long-term sustainability",
      "The difference between short-term affordability and long-term certainty",
    ],
    leadsTo:
      "Structured life insurance solutions designed for certainty and sustainability, including properly structured business and personal life cover.",
    href: "/premium-increase-calculator",
  },
];

const productCalculators = [
  {
    tag: "Product Quotation",
    title: "Everest Wealth Product Quote Calculators",
    description: "These calculators generate indicative product-based projections using real assumptions.",
    bullets: [
      "Translate strategy into product outcomes",
      "Compare scenarios using actual investment structures",
      "Support informed product selection",
    ],
    leadsTo: "Everest Wealth investment products and implementation discussions.",
    href: "/everest-wealth",
  },
];

function CalculatorCard({
  tag,
  title,
  description,
  bullets,
  leadsTo,
  href,
  featured,
  glow,
  muted,
  leadsToAccent,
}: {
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  leadsTo: string;
  href: string;
  featured?: boolean;
  glow?: boolean;
  muted?: boolean;
  leadsToAccent?: boolean;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className={`group block rounded-[2rem] border transition-all duration-500 ${
        muted
          ? "bg-[#101014] border-white/5 hover:bg-[#121218]"
          : "rim-light border-0 hover:bg-white/[0.07]"
      } ${glow ? "border-blue-500/40 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 hover:border-blue-500/60" : ""} h-full ${featured ? "p-6 md:p-8 lg:p-10" : "p-6 md:p-8"}`}
    >
      <span className="text-xs font-semibold text-cinematic-teal uppercase tracking-[0.15em]">{tag}</span>
      <h3 className="mt-2 mb-3 text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-cinematic-teal/90">
        {title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4 tracking-[0.01em]">{description}</p>
      <ul className="space-y-1.5 mb-4">
        {bullets.map((b) => (
          <li key={b} className="text-gray-500 text-sm flex items-start gap-2">
            <span className="text-cinematic-teal mt-0.5">→</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <p className="text-xs mb-4">
        <span className="text-gray-400">Leads to:</span>{" "}
        <span className={leadsToAccent ? "text-cinematic-teal font-medium" : "text-gray-500"}>{leadsTo}</span>
      </p>
      <span className="inline-flex items-center gap-1 text-cinematic-teal text-sm font-medium group-hover:gap-2 transition-all duration-300">
        Open calculator
      </span>
    </Link>
  );
}

function SectionHeading({ title, question }: { title: string; question: string }) {
  return (
    <div className="mb-6 md:mb-8">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-1">{title}</h2>
      <p className="text-zinc-500 text-sm">Key question: {question}</p>
    </div>
  );
}

export default function CalculatorsPage() {
  const incomeInRetirement = retirementCalculators.find((c) => c.href === "/income-in-retirement");
  const everestProduct = productCalculators[0];
  const retirementOthers = retirementCalculators.filter((c) => c.href !== "/income-in-retirement");
  const secondaryRiskItems = [...taxEstateCalculators, ...lifeInsuranceCalculators];

  return (
    <div className="bg-void min-h-screen">
      <FAQSchema faqs={calculatorFAQs} />
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cinematic-teal/20 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gold-orange/10 blur-[120px] rounded-full pointer-events-none" />
        <div className={`relative ${PAGE_CONTENT_MAX}`}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <p className="text-zinc-500 text-xs font-medium uppercase tracking-[0.2em] mb-3">
                AS Brokers
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-white mb-4 leading-[1.15]">
                The Actuarial Reality Check.
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed max-w-xl tracking-[0.01em]">
                Run the numbers. Expose your capital lifespan. Engineer a high-yield solution.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-[2rem] rim-light p-5 md:p-6">
                <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-4">Jump to section</p>
                <nav className="flex flex-col gap-2">
                  {pillarLinks.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block py-3 px-4 rounded-2xl text-white font-medium text-sm hover:bg-white/10 transition-colors duration-300"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 border-t border-white/5" aria-hidden>
        <div className={PAGE_CONTENT_MAX}>
          <PageMediaStrip
            variant="primary"
            src="/images/calculators-hub-16x9.jpg"
            alt="Calculator planning sheets for retirement, tax, estate and premiums on a desk, no people"
            rounded="3xl"
          />
        </div>
      </section>

      {/* How to Use These Tools */}
      <section className="py-8 md:py-10 border-t border-white/5 bg-black/20">
        <div className={PAGE_CONTENT_MAX}>
          <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
            <div className="md:max-w-xs shrink-0">
              <h2 className="text-lg font-bold text-white">How to use these tools</h2>
            </div>
            <div className="text-zinc-400 text-sm leading-relaxed space-y-2">
              <p>Each tool answers a specific question and leads to a practical solution. Use any order; start with what matters most to you.</p>
              <p className="text-zinc-500">In client discussions we use them to explain: what the problem is, why it exists, and which product or structure solves it.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 border-t border-white/5 bg-black/10" aria-hidden>
        <div className={PAGE_CONTENT_MAX}>
          <PageMediaStripTriple
            items={[
              {
                src: "/images/calculators-capital-lifespan-4x3.jpg",
                alt: "Retirement capital, timeline planner and calculator  -  capital lifespan theme, no people",
              },
              {
                src: "/images/calculators-education-16x9.jpg",
                alt: "Finance books and notebook for learning before an adviser meeting, no people",
              },
              {
                src: "/images/home-actuarial-engine-16x9.jpg",
                alt: "Actuarial desk with retirement planning worksheet and calculator, no people",
              },
            ]}
          />
        </div>
      </section>

      {/* Phase 1: The Agitator & The Fix  -  Retirement + Everest */}
      <section id="retirement" className="py-16 scroll-mt-24 border-t border-white/5">
        <div className={PAGE_CONTENT_MAX}>
          <SectionHeading
            title="Capital Lifespan & High-Yield Solutions"
            question="Am I on track for retirement? What does a real product solution look like?"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {retirementOthers[0] && (
              <div className="md:col-span-1">
                <CalculatorCard {...retirementOthers[0]} leadsToAccent />
              </div>
            )}
            {incomeInRetirement && (
              <div className="md:col-span-2">
                <CalculatorCard {...incomeInRetirement} featured leadsToAccent />
              </div>
            )}
            {retirementOthers[1] && (
              <div className="md:col-span-1">
                <CalculatorCard {...retirementOthers[1]} leadsToAccent />
              </div>
            )}
            <div id="product-quotations" className="md:col-span-2 scroll-mt-24">
              <CalculatorCard {...everestProduct} featured glow leadsToAccent />
            </div>
          </div>
        </div>
      </section>

      {/* Phase 2: Secondary Risk Architecture */}
      <section id="risk-architecture" className="py-16 border-t border-white/5 scroll-mt-24">
        <div className={PAGE_CONTENT_MAX}>
          <SectionHeading
            title="Secondary Risk Architecture"
            question="Tax, estate, and life insurance exposure."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
            {secondaryRiskItems.map((calc) => (
              <CalculatorCard key={calc.title} {...calc} muted />
            ))}
          </div>
        </div>
      </section>

      {/* Financial Education */}
      <section id="financial-education" className="py-16 border-t border-white/5 scroll-mt-24">
        <div className={PAGE_CONTENT_MAX}>
          <SectionHeading
            title="Financial Education"
            question="What is it costing you not to learn how money really works?"
          />
          <div className="w-full max-w-3xl mx-auto">
            <Link
              href="/contact"
              prefetch={false}
              className="group block rim-light rounded-[2rem] p-6 md:p-8 lg:p-10 border-0 hover:bg-white/[0.07] transition-all duration-500"
            >
              <span className="text-xs font-semibold text-cinematic-teal uppercase tracking-[0.15em]">Education & Growth</span>
              <h3 className="text-xl md:text-2xl font-bold text-white mt-2 mb-3 tracking-tight group-hover:text-cinematic-teal/90 transition-colors">
                The Cost of Not Learning
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Most people leave their investments in the hands of others and accept whatever return they get. With the right education, you can learn to create and manage your own investments and earn a significantly higher return than the market delivers.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Every month you delay learning, the gap between where you are and where you could be gets wider. Not because you lost money, but because you missed the growth you could have created.
              </p>
              <ul className="space-y-1.5 mb-4">
                {[
                  "The compounding cost of delayed financial education",
                  "How self-directed returns outperform passive strategies",
                  "Why the best time to start learning was yesterday, and the second best is today",
                  "The difference between hoping for growth and building it yourself",
                ].map((b) => (
                  <li key={b} className="text-gray-500 text-sm flex items-start gap-2">
                    <span className="text-cinematic-teal mt-0.5">→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-500 text-xs mb-4">
                <span className="text-gray-400">Leads to:</span> Financial education resources, structured learning programmes, and the tools to take control of your own investment growth.
              </p>
              <span className="inline-flex items-center gap-1 text-cinematic-teal text-sm font-medium group-hover:gap-2 transition-all duration-300">
                Get in touch
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Business Risk Management */}
      <section className="py-16 border-t border-white/5 bg-black/20">
        <div className={PAGE_CONTENT_MAX}>
          <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Business Risk Management</p>
              <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                Your Business Stops the Moment You Do.
                <br />
                That&apos;s Not a Business. That&apos;s a Risk.
              </h2>
              <p className="text-sm leading-relaxed text-zinc-400 md:text-base">
                If your income depends entirely on you being present, available, and doing everything yourself, you
                don&apos;t own a business. You own a job with overhead. There&apos;s a better way to structure this.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-[2rem] border border-white/10 bg-[#101014] p-6 md:p-8">
                <ul className="mb-6 space-y-2.5 text-left text-sm text-zinc-300 md:text-base">
                  {[
                    "If you took three months off, would your business still generate income?",
                    "If your best employee left tomorrow, would your client data go with them?",
                    "If someone Googled your business right now, does your website work for you, or just exist?",
                    "When a lead calls and nobody answers, what happens to that opportunity?",
                  ].map((q) => (
                    <li key={q} className="flex items-start gap-2">
                      <span className="mt-0.5 text-cinematic-teal">→</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
                <p className="mb-6 text-sm text-zinc-500">
                  Every missed call is lost income. Every forgotten follow-up is a competitor&apos;s gain. Every manual
                  process is a point of failure.
                </p>
                <Link
                  href="/contact"
                  prefetch={false}
                  className="inline-flex items-center gap-2 rounded-[2rem] bg-white px-6 py-3 font-bold text-black transition-all duration-500 hover:scale-[1.03] hover:bg-zinc-200 hover:shadow-cta-glow-gold"
                >
                  Assess your business risk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA: Stop Guessing */}
      <section className="py-16 md:py-20 border-t border-white/5">
        <div className={PAGE_CONTENT_MAX}>
          <div className="max-w-4xl mx-auto">
          <div className="rounded-[2rem] rim-light p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cinematic-teal/10 to-gold-orange/5 pointer-events-none" />
            <div className="relative text-center">
              <p className="text-cinematic-teal text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                From numbers to a plan
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Stop Guessing Your Capital Lifespan.
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed tracking-[0.01em]">
                The math doesn&apos;t lie. If your trajectory shows depletion, we need to restructure your capital into high-yield, private equity solutions. Let&apos;s engineer your wealth.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  prefetch={false}
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-black font-bold px-8 py-4 rounded-[2rem] hover:bg-zinc-200 hover:scale-[1.03] hover:shadow-cta-glow-gold transition-all duration-500"
                >
                  Request a review
                </Link>
                <a
                  href="https://wa.me/27672429946"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center rim-light hover:bg-white/15 text-white font-semibold px-8 py-4 rounded-[2rem] transition-all duration-500"
                >
                  WhatsApp 067 242 9946
                </a>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Quick links strip */}
      <section className="py-10 border-t border-white/5">
        <div className={PAGE_CONTENT_MAX}>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <a
              href="https://wa.me/27672429946"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              WhatsApp 067 242 9946
            </a>
            <Link href="/solutions" prefetch={false} className="text-cinematic-teal hover:underline">
              Income in retirement
            </Link>
            <Link href="/solutions" prefetch={false} className="text-cinematic-teal hover:underline">
              Insurance & risk planning
            </Link>
            <Link href="/solutions" prefetch={false} className="text-cinematic-teal hover:underline">
              Estate planning
            </Link>
            <Link href="/solutions" prefetch={false} className="text-cinematic-teal hover:underline">
              Business insurance
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
