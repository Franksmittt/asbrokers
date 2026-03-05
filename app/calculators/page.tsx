import Link from "next/link";
import { Footer } from "@/components/Footer";

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
}: {
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  leadsTo: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group block bg-[#151518] rounded-[2rem] p-6 md:p-8 border border-white/5 hover:border-white/20 transition-all"
    >
      <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">{tag}</span>
      <h3 className="text-xl font-bold text-white mt-2 mb-3 group-hover:text-blue-300 transition-colors">{title}</h3>
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
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h2>
      <p className="text-zinc-400">Key question: {question}</p>
    </div>
  );
}

export default function CalculatorsPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      {/* Hero */}
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">
            AS Brokers · Retirement & Financial Freedom
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Calculators. Products. Education.
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Everything you need to understand your retirement, protect your wealth, and take control of your financial
            future, in one place.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {pillarLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use These Tools */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">How to Use These Tools</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Each tool answers a specific question and naturally leads to a practical solution.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            You do not need to complete them in any specific order. Start with the area most relevant to your current
            situation.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-2">
            The calculators are used in client discussions to explain:
          </p>
          <ul className="text-zinc-400 space-y-1 list-disc list-inside">
            <li>What the problem is</li>
            <li>Why it exists</li>
            <li>Which product or structure solves it, and why</li>
          </ul>
        </div>
      </section>

      {/* Retirement Reality & Readiness */}
      <section id="retirement" className="py-16 px-4 sm:px-6 md:px-8">
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

      {/* Life Insurance & Risk Planning */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            title="Life Insurance & Risk Planning"
            question="What happens if something goes wrong?"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lifeInsuranceCalculators.map((calc) => (
              <CalculatorCard key={calc.title} {...calc} />
            ))}
          </div>
        </div>
      </section>

      {/* Product Quotations */}
      <section id="product-quotations" className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            title="Product Quotations"
            question="What does this look like in a real product?"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCalculators.map((calc) => (
              <CalculatorCard key={calc.title} {...calc} />
            ))}
          </div>
        </div>
      </section>

      {/* Financial Education */}
      <section id="financial-education" className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            title="Financial Education"
            question="What is it costing you not to learn how money really works?"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/contact"
              className="group block md:col-span-2 bg-[#151518] rounded-[2rem] p-6 md:p-8 border border-white/5 hover:border-white/20 transition-all"
            >
              <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">Education & Growth</span>
              <h3 className="text-xl font-bold text-white mt-2 mb-3 group-hover:text-blue-300 transition-colors">
                The Cost of Not Learning
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Most people leave their investments in the hands of others and accept whatever return they get. But with
                the right education, you can learn to create and manage your own investments, and earn a significantly
                higher return than the market delivers.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                This calculator shows the real cost of procrastination. Every month you delay learning, the gap between
                where you are and where you could be gets wider. Not because you lost money, but because you missed the
                growth you could have created.
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
                <span className="text-zinc-400">Leads to:</span> Financial education resources, structured learning
                programmes, and the tools to take control of your own investment growth.
              </p>
              <span className="inline-flex items-center gap-1 text-blue-400 text-sm font-medium group-hover:gap-2 transition-all">
                Open calculator
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
            className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors"
          >
            Assess your business risk
          </Link>
        </div>
      </section>

      {/* Using These Tools Together */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Using These Tools Together</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Each calculator highlights a specific problem.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Each problem naturally points toward a solution.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-8">
            The purpose of these tools is not to replace advice, but to ensure that when advice is given, it is
            understood, logical, and supported by numbers.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-8">
            If you would like help interpreting any result or implementing the appropriate solution, you can request a
            review.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors"
          >
            Request a review
          </Link>
        </div>
      </section>

      {/* Quick links strip */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm">
            <a
              href="https://wa.me/27672429946"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              WhatsApp us · 067 242 9946
            </a>
            <Link href="/solutions" className="text-blue-400 hover:underline">
              Income in retirement
            </Link>
            <Link href="/solutions" className="text-blue-400 hover:underline">
              Insurance & risk planning
            </Link>
            <Link href="/solutions" className="text-blue-400 hover:underline">
              Estate planning
            </Link>
            <Link href="/solutions" className="text-blue-400 hover:underline">
              Business insurance
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
