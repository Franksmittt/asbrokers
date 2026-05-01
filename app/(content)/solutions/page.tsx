import Link from "next/link";
import { Footer } from "@/components/Footer";
import { PAGE_CONTENT_MAX, PageMediaStrip } from "@/components/PageMediaStrip";
import { SolutionsSectionNav } from "@/components/SolutionsSectionNav";
import { LineChart, HeartPulse, Lock, Scroll, ArrowRight } from "@/components/icons";
const trustBadges = [
  "FSP 17273",
  "25+ years experience",
  "Independent advice",
];
const categories = [
  {
    id: "retirement",
    title: "Private Wealth & Yield",
    tagline: "Bypass traditional markets. Secure fixed-return private equity, living annuities, and capital longevity planning.",
    icon: LineChart,
    accent: "blue",
    items: [
      { name: "Retirement Income Planning", desc: "Fixed-income solutions for retirees who want certainty.", href: "/everest-wealth", badge: null, featured: false },
      { name: "Retirement Reality Calculator", desc: "How much capital you really need for retirement.", href: "/retirement", badge: "Calculator", featured: true },
      { name: "Income in Retirement (Life of Capital)", desc: "How long your savings will last with withdrawals and inflation.", href: "/income-in-retirement", badge: "Calculator", featured: false },
      { name: "Everest Wealth Products", desc: "Fixed-return investments: 12.8%, 14.2%, 14.5%, Amethyst living annuity.", href: "/everest-wealth", badge: "Popular", featured: true },
      { name: "Financial Education & Calculators", desc: "Tools and structure, not just product sales.", href: "/calculators", badge: null, featured: false },
    ],
  },
  {
    id: "insurance",
    title: "Risk Architecture",
    tagline: "Uncompromising personal and commercial cover. Protection for what matters most.",
    icon: Lock,
    accent: "rose",
    items: [
      { name: "Short-Term Personal", desc: "Home, car, valuables and personal asset protection.", href: "/solutions/personal-insurance", badge: null },
      { name: "Short-Term Business", desc: "Commercial property, liability, business interruption and fleet.", href: "/solutions/business-insurance", badge: null },
      { name: "Life Insurance (Personal)", desc: "Death cover, disability, income protection and severe illness.", href: "/solutions/life-insurance", badge: null },
      { name: "Life Insurance (Business)", desc: "Buy-and-sell, key person, loan account and employee benefits.", href: "/solutions/business-life", badge: null },
      { name: "Premium Increase Calculator", desc: "Compare long-term cost of escalating life premiums.", href: "/premium-increase-calculator", badge: "Calculator" },
    ],
  },
  {
    id: "medical",
    title: "Health & Integration",
    tagline: "Premium medical aid and gap cover. Because true wealth requires the health to enjoy it.",
    icon: HeartPulse,
    accent: "teal",
    items: [
      { name: "Medical Aid & Gap Cover", desc: "Health insurance and gap cover structuring.", href: "/solutions/medical-aid", badge: null },
      { name: "Wellness & Integration", desc: "Holistic health and wellness planning for high-income earners.", href: "/contact", badge: null },
    ],
  },
  {
    id: "estate",
    title: "Legacy Structuring",
    tagline: "Wills, trusts, and generational wealth transfer. Asset protection that lasts.",
    icon: Scroll,
    accent: "amber",
    items: [
      { name: "Estate Planning & Wills", desc: "Wills, testaments and estate structuring.", href: "/solutions/estate-planning", badge: null },
      { name: "Trust & Business Structure", desc: "Asset protection and tax-efficient structuring.", href: "/contact", badge: null },
      { name: "Estate Duty Calculator", desc: "Estimate estate duty and executor fees at death.", href: "/estate-duty-calculator", badge: "Calculator" },
      { name: "Annual Estate Reduction Strategy", desc: "Use annual donations to reduce estate duty over time.", href: "/annual-estate-reduction-strategy", badge: "Calculator" },
    ],
  },
];
const accentStyles: Record<string, { iconBg: string; border: string; hoverBorder: string }> = {
  blue: { iconBg: "bg-blue-500/20 text-blue-400", border: "border-blue-500/20", hoverBorder: "group-hover:border-blue-500/40" },
  rose: { iconBg: "bg-rose-500/20 text-rose-400", border: "border-rose-500/20", hoverBorder: "group-hover:border-rose-500/40" },
  teal: { iconBg: "bg-teal-500/20 text-teal-400", border: "border-teal-500/20", hoverBorder: "group-hover:border-teal-500/40" },
  amber: { iconBg: "bg-amber-500/20 text-amber-400", border: "border-amber-500/20", hoverBorder: "group-hover:border-amber-500/40" },
};
function ServiceCard({
  name,
  desc,
  href,
  badge,
  accent,
  wide = false,
  muted = false,
}: {
  name: string;
  desc: string;
  href: string;
  badge: string | null;
  accent: string;
  wide?: boolean;
  muted?: boolean;
}) {
  const style = accentStyles[accent] ?? accentStyles.blue;
  return (
    <Link
      href={href}
      prefetch={false}
      className={`group block rounded-2xl p-6 border transition-all duration-300 ${
        muted ? "bg-[#101014] hover:bg-[#121218]" : "bg-[#151518] hover:bg-[#1a1a1e]"
      } ${style.border} ${style.hoverBorder} hover:shadow-lg hover:shadow-black/20 ${wide ? "sm:col-span-2 lg:col-span-2" : ""}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-base font-semibold text-white group-hover:text-white">
          {name}
        </h3>
        {badge && (
          <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/10 text-zinc-400">
            {badge}
          </span>
        )}
      </div>
      <p className="mb-4 text-sm leading-relaxed text-zinc-500">{desc}</p>
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 group-hover:gap-2.5 transition-all">
        Explore
        <ArrowRight className="w-4 h-4" />
      </span>
    </Link>
  );
}
export default function SolutionsPage() {
  const [focusCategory, ...defenseCategories] = categories;
  const FocusIcon = focusCategory.icon;
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"description\": \"Explore comprehensive financial solutions from AS Brokers CC, including investment planning, life insurance, business solutions, and retirement strategies for clients in Krugersdorp and the West Rand. FSP 17273.\", \"serviceType\": \"Financial Planning, Investment Advisory, Insurance Broking, Retirement Planning\", \"@context\": \"https://schema.org\", \"name\": \"Financial Solutions by AS Brokers CC\", \"provider\": {\"@context\": \"https://schema.org\", \"description\": \"AS Brokers CC is an Authorised Financial Services Provider (FSP 17273, Category 1.8) offering comprehensive financial planning, investment, and insurance solutions. Serving Krugersdorp and the West Rand, Gauteng.\", \"url\": \"https://www.asbrokers.co.za\", \"logo\": \"https://www.asbrokers.co.za/images/as-brokers-logo.png\", \"@type\": \"Organization\", \"address\": {\"addressCountry\": \"ZA\", \"@type\": \"PostalAddress\", \"addressLocality\": \"Krugersdorp\", \"@context\": \"https://schema.org\", \"postalCode\": \"1739\", \"streetAddress\": \"Unit 2, The Bridge, 47 Commissioner Street\", \"addressRegion\": \"Gauteng\"}, \"sameAs\": \"https://www.linkedin.com/company/as-brokers-cc\", \"name\": \"AS Brokers CC\", \"contactPoint\": {\"@context\": \"https://schema.org\", \"availableLanguage\": \"en\", \"telephone\": \"+27116601445\", \"areaServed\": \"ZA\", \"@type\": \"ContactPoint\", \"contactType\": \"customer service\"}}, \"areaServed\": \"Krugersdorp, West Rand, Gauteng, South Africa\", \"@type\": \"FinancialService\"}" }} />
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/15 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none" />
        <div className={`relative ${PAGE_CONTENT_MAX}`}>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-zinc-500 text-xs font-medium uppercase tracking-[0.2em] mb-4">
              For individuals and business owners
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Engineered Wealth
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">& Risk Architecture.</span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Bypass traditional markets and secure your capital with fixed-return private equity and structured retirement solutions. Full-service insurance and risk management when you need it.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500">
              {trustBadges.map((badge) => (
                <span key={badge} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-10 md:mt-12">
            <PageMediaStrip
              variant="primary"
              src="/images/solutions-hero-16x9.jpg"
              alt="Full-service IFA desk: insurance, estate, retirement and structured yield folders, no people"
              priority
              rounded="3xl"
            />
          </div>
        </div>
      </section>
      <SolutionsSectionNav />
      <div className={`${PAGE_CONTENT_MAX} pb-24`}>
        {/* Section 1: Private Wealth & Yield (focus) */}
        <section
          id={focusCategory.id}
          className="scroll-mt-32 py-16 md:py-20 border-b border-white/5"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${accentStyles[focusCategory.accent].iconBg}`}>
                <FocusIcon className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
                  {focusCategory.title}
                </h2>
                <p className="text-zinc-400 max-w-xl leading-relaxed text-base md:text-lg">
                  {focusCategory.tagline}
                </p>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {focusCategory.items.map((item) => (
              <ServiceCard
                key={item.name}
                name={item.name}
                desc={item.desc}
                href={item.href}
                badge={item.badge}
                accent={focusCategory.accent}
                wide={item.name === "Financial Education & Calculators"}
                muted={false}
              />
            ))}
          </div>
        </section>
        <div className="pb-10">
          <PageMediaStrip
            variant="secondary"
            src={`/images/${encodeURIComponent("solutions-fiduciary-defense-1x1 (2).jpg")}`}
            alt="Short-term motor policy folder, keys, and medical-aid leaflet on adviser desk"
            rounded="3xl"
          />
        </div>
        {/* Phase 2: Wealth Protection & Fiduciary Defense */}
        <div className="pt-8">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-500 uppercase tracking-wider mb-10 md:mb-12">
            Phase 2: Wealth Protection & Fiduciary Defense
          </h2>
          {defenseCategories.map((cat) => {
            const Style = accentStyles[cat.accent] ?? accentStyles.blue;
            const Icon = cat.icon;
            return (
              <section
                key={cat.id}
                id={cat.id}
                className="scroll-mt-32 py-12 md:py-16 border-b border-white/5 last:border-0"
              >
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${Style.iconBg}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                        {cat.title}
                      </h3>
                      <p className="text-zinc-500 max-w-xl leading-relaxed text-sm">
                        {cat.tagline}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`grid gap-4 sm:grid-cols-2 ${
                    cat.id === "estate" || cat.id === "medical" ? "lg:grid-cols-2" : "lg:grid-cols-3"
                  }`}
                >
                  {cat.items.map((item) => (
                    <ServiceCard
                      key={item.name}
                      name={item.name}
                      desc={item.desc}
                      href={item.href}
                      badge={item.badge ?? null}
                      accent={cat.accent}
                      wide={cat.id === "insurance" && item.badge === "Calculator"}
                      muted
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
        {/* CTA block */}
        <section className="mt-20 md:mt-28 rounded-[2rem] bg-gradient-to-br from-[#151518] to-[#1a1a24] border border-white/10 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-teal-600/10 pointer-events-none" />
          <div className="relative text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Stop Guessing. Start Engineering.
            </h2>
            <p className="text-zinc-400 mb-8">
              Book a private actuarial review of your capital lifespan, or run the numbers yourself.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                prefetch={false}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-zinc-200 transition-colors"
              >
                Book Private Consultation
              </Link>
              <Link
                href="/calculators"
                prefetch={false}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-8 py-4 rounded-full transition-colors"
              >
                All calculators
              </Link>
            </div>
            <p className="text-zinc-500 text-sm mt-6">
              WhatsApp 067 242 9946 for a quick response
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
