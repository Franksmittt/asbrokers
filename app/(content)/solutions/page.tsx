import Link from "next/link";
import { Footer } from "@/components/Footer";
import { SolutionsSectionNav } from "@/components/SolutionsSectionNav";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { LineChart, HeartPulse, Lock, Scroll, ArrowRight } from "@/components/icons";

const trustBadges = [
  "FSP 17273",
  "25+ years experience",
  "Independent advice",
];

const categories = [
  {
    id: "retirement",
    title: "Retirement & Investment Planning",
    tagline: "Engineered for certainty. Portfolios built to outpace inflation and protect your lifestyle.",
    icon: LineChart,
    accent: "blue",
    items: [
      { name: "Retirement Income Planning", desc: "Fixed-income solutions for retirees who want certainty.", href: "/everest-wealth", badge: null },
      { name: "Retirement Reality Calculator", desc: "How much capital you really need for retirement.", href: "/retirement", badge: "Calculator" },
      { name: "Income in Retirement (Life of Capital)", desc: "How long your savings will last with withdrawals and inflation.", href: "/income-in-retirement", badge: "Calculator" },
      { name: "Everest Wealth Products", desc: "Fixed-return investments: 12.8%, 14.2%, 14.5%, Amethyst living annuity.", href: "/everest-wealth", badge: "Popular" },
      { name: "Financial Education & Calculators", desc: "Tools and structure, not just product sales.", href: "/calculators", badge: null },
    ],
  },
  {
    id: "insurance",
    title: "Insurance & Risk Planning",
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
    title: "Medical & Wellness",
    tagline: "Premium medical aid and gap cover. Because true wealth requires the health to enjoy it.",
    icon: HeartPulse,
    accent: "teal",
    items: [
      { name: "Medical Aid & Gap Cover", desc: "Health insurance and gap cover structuring.", href: "/contact", badge: null },
      { name: "Wellness & Integration", desc: "Holistic health and wellness planning for high-income earners.", href: "/contact", badge: null },
    ],
  },
  {
    id: "estate",
    title: "Estate & Business Structuring",
    tagline: "Wills, trusts, and generational wealth transfer. Asset protection that lasts.",
    icon: Scroll,
    accent: "amber",
    items: [
      { name: "Estate Planning & Wills", desc: "Wills, testaments and estate structuring.", href: "/contact", badge: null },
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
}: {
  name: string;
  desc: string;
  href: string;
  badge: string | null;
  accent: string;
}) {
  const style = accentStyles[accent] ?? accentStyles.blue;
  return (
    <Link
      href={href}
      prefetch={false}
      className={`group block rounded-2xl p-6 bg-[#151518] border ${style.border} ${style.hoverBorder} transition-all duration-300 hover:bg-[#1a1a1e] hover:shadow-lg hover:shadow-black/20`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-semibold text-white text-base group-hover:text-white">
          {name}
        </h3>
        {badge && (
          <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/10 text-zinc-400">
            {badge}
          </span>
        )}
      </div>
      <p className="text-zinc-500 text-sm leading-relaxed mb-4">{desc}</p>
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 group-hover:gap-2.5 transition-all">
        Explore
        <ArrowRight className="w-4 h-4" />
      </span>
    </Link>
  );
}

export default function SolutionsPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 md:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/15 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-[0.2em] mb-4">
            For individuals and business owners
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Architectural
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Solutions</span>
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Independent advice built around you. Retirement, insurance, medical, estate and business structuring under one roof.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500">
            {trustBadges.map((badge) => (
              <span key={badge} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                {badge}
              </span>
            ))}
          </div>
          <div className="mt-12 max-w-4xl mx-auto">
            <ImagePlaceholder
              src="/images/solutions-hero.jpg"
              alt="Architectural solutions for retirement, insurance, estate and business"
              aspectRatio="16/9"
              placeholderLabel="solutions-hero.jpg"
            />
          </div>
        </div>
      </section>

      <SolutionsSectionNav />

      {/* Category sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pb-24">
        {categories.map((cat) => {
          const Style = accentStyles[cat.accent] ?? accentStyles.blue;
          const Icon = cat.icon;
          return (
            <section
              key={cat.id}
              id={cat.id}
              className="scroll-mt-32 py-16 md:py-20 border-b border-white/5 last:border-0"
            >
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${Style.iconBg}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {cat.title}
                    </h2>
                    <p className="text-zinc-400 max-w-xl leading-relaxed">
                      {cat.tagline}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((item) => (
                  <ServiceCard
                    key={item.name}
                    name={item.name}
                    desc={item.desc}
                    href={item.href}
                    badge={item.badge}
                    accent={cat.accent}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {/* CTA block */}
        <section className="mt-20 md:mt-28 rounded-[2rem] bg-gradient-to-br from-[#151518] to-[#1a1a24] border border-white/10 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-teal-600/10 pointer-events-none" />
          <div className="relative text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Ready to build your plan?
            </h2>
            <p className="text-zinc-400 mb-8">
              One relationship. Full-service advice. No call centres. We respond personally.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                prefetch={false}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-zinc-200 transition-colors"
              >
                Book a consultation
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
