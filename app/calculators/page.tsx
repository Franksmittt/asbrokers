import Link from "next/link";
import { Footer } from "@/components/Footer";
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
  title: "Financial Calculators for South Africans | AS Brokers",
  description:
    "Calculators, products, and education. Retirement reality, tax and estate, life insurance, and financial planning tools for South Africans.",
};

const pillarLinks = [
  { label: "Financial Calculators", href: "#retirement" },
  { label: "Everest Wealth Products", href: "#product-quotations" },
  { label: "Financial Education", href: "#financial-education" },
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
}: {
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  leadsTo: string;
  href: string;
  featured?: boolean;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className={`group block bg-[#151518] rounded-[2rem] border border-white/5 hover:border-white/20 transition-all ${
        featured ? "p-6 md:p-8 lg:p-10 max-w-3xl mx-auto" : "p-6 md:p-8"
      }`}
    >
      <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">{tag}</span>
      <h3 className={`font-bold text-white mt-2 mb-3 group-hover:text-blue-300 transition-colors ${featured ? "text-xl md:text-2xl" : "text-xl"}`}>
        {title}
      </h3>
      <p className="text-zinc-400 text-sm leading-relaxed mb-4">{description}</p>
      <ul className="space-y-1.5 mb-4">
        {bullets.map((b) => (
          <li key={b} className="text-zinc-500 text-sm flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">→</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <p className="text-zinc-500 text-xs mb-4">
        <span className="text-zinc-400">Leads to:</span> {leadsTo}
      </p>
      <span className="inline-flex items-center gap-1 text-blue-400 text-sm font-medium group-hover:gap-2 transition-all">
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
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <FAQSchema faqs={calculatorFAQs} />
      {/* Hero */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 md:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-[320px] h-[320px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <p className="text-zinc-500 text-xs font-medium uppercase tracking-[0.2em] mb-3">
                AS Brokers
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-[1.15]">
                Calculators. Products. Education.
              </h1>
              <p className="text-lg text-zinc-400 leading-relaxed max-w-xl">
                Everything you need to understand your retirement, protect your wealth, and take control of your financial future.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#151518] border border-white/10 p-5 md:p-6">
                <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-4">Jump to section</p>
                <nav className="flex flex-col gap-2">
                  {pillarLinks.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block py-3 px-4 rounded-xl text-white font-medium text-sm hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
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

      {/* How to Use These Tools */}
      <section className="py-8 md:py-10 px-4 sm:px-6 md:px-8 border-t border-white/5 bg-black/20">
        <div className="max-w-5xl mx-auto">
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

      {/* Retirement Reality & Readiness */}
      <section id="retirement" className="py-16 px-4 sm:px-6 md:px-8 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            title="Retirement Reality & Readiness"
            question="Am I actually on track for retirement?"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {retirementCalculators.map((calc) => (
              <CalculatorCard key={calc.title} {...calc} />
            ))}
          </div>
        </div>
      </section>

      {/* Tax & Estate Exposure */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            title="Tax & Estate Exposure"
            question="How much of my wealth will be lost to tax and estate costs?"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {taxEstateCalculators.map((calc) => (
              <CalculatorCard key={calc.title} {...calc} />
            ))}
          </div>
        </div>
      </section>

      {/* Life Insurance & Risk Planning — single card, full-width layout */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            title="Life Insurance & Risk Planning"
            question="What happens if something goes wrong?"
          />
          <div className="w-full">
            {lifeInsuranceCalculators.map((calc) => (
              <CalculatorCard key={calc.title} {...calc} featured />
            ))}
          </div>
        </div>
      </section>

      {/* Product Quotations — single card, full-width layout */}
      <section id="product-quotations" className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            title="Product Quotations"
            question="What does this look like in a real product?"
          />
          <div className="w-full">
            {productCalculators.map((calc) => (
              <CalculatorCard key={calc.title} {...calc} featured />
            ))}
          </div>
        </div>
      </section>

      {/* Financial Education — single full-width card */}
      <section id="financial-education" className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            title="Financial Education"
            question="What is it costing you not to learn how money really works?"
          />
          <div className="w-full max-w-3xl mx-auto">
            <Link
              href="/contact"
              prefetch={false}
              className="group block bg-[#151518] rounded-[2rem] p-6 md:p-8 lg:p-10 border border-white/5 hover:border-white/20 transition-all"
            >
              <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">Education & Growth</span>
              <h3 className="text-xl md:text-2xl font-bold text-white mt-2 mb-3 group-hover:text-blue-300 transition-colors">
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
                  <li key={b} className="text-zinc-500 text-sm flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="text-zinc-500 text-xs mb-4">
                <span className="text-zinc-400">Leads to:</span> Financial education resources, structured learning programmes, and the tools to take control of your own investment growth.
              </p>
              <span className="inline-flex items-center gap-1 text-blue-400 text-sm font-medium group-hover:gap-2 transition-all">
                Get in touch
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Business Risk Management */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Business Risk Management</h2>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
            Your Business Stops the Moment You Do.
            <br />
            That&apos;s Not a Business. That&apos;s a Risk.
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-6">
            If your income depends entirely on you being present, available, and doing everything yourself, you
            don&apos;t own a business. You own a job with overhead. There&apos;s a better way to structure this.
          </p>
          <ul className="text-zinc-400 text-left space-y-2 mb-6 max-w-xl mx-auto">
            {[
              "If you took three months off, would your business still generate income?",
              "If your best employee left tomorrow, would your client data go with them?",
              "If someone Googled your business right now, does your website work for you, or just exist?",
              "When a lead calls and nobody answers, what happens to that opportunity?",
            ].map((q) => (
              <li key={q} className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">→</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
          <p className="text-zinc-500 text-sm mb-8">
            Every missed call is lost income. Every forgotten follow-up is a competitor&apos;s gain. Every manual
            process is a point of failure.
          </p>
          <Link
            href="/contact"
            prefetch={false}
            className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors"
          >
            Assess your business risk
          </Link>
        </div>
      </section>

      {/* Next step: from numbers to a plan */}
      <section className="py-16 md:py-20 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#151518] to-[#1a1a24] border border-white/10 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-teal-600/5 pointer-events-none" />
            <div className="relative text-center">
              <p className="text-blue-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                From numbers to a plan
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Clarity from the calculators. Confidence from a conversation.
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed">
                These tools surface the gaps. We help you close them with advice that&apos;s logical, structured, and backed by the same numbers you just ran.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  prefetch={false}
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-zinc-200 transition-colors"
                >
                  Request a review
                </Link>
                <a
                  href="https://wa.me/27672429946"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-8 py-4 rounded-full transition-colors"
                >
                  WhatsApp 067 242 9946
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick links strip */}
      <section className="py-10 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <a
              href="https://wa.me/27672429946"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              WhatsApp 067 242 9946
            </a>
            <Link href="/solutions" prefetch={false} className="text-blue-400 hover:underline">
              Income in retirement
            </Link>
            <Link href="/solutions" prefetch={false} className="text-blue-400 hover:underline">
              Insurance & risk planning
            </Link>
            <Link href="/solutions" prefetch={false} className="text-blue-400 hover:underline">
              Estate planning
            </Link>
            <Link href="/solutions" prefetch={false} className="text-blue-400 hover:underline">
              Business insurance
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
