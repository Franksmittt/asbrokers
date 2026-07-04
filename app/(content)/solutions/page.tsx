import Link from "next/link";
import { Home4Reveal } from "@/components/home4/Home4Blocks";
import { PageMediaStrip } from "@/components/PageMediaStrip";
import { SolutionsSectionNav } from "@/components/SolutionsSectionNav";
import { PlanningToolsStrip } from "@/components/PlanningToolsStrip";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import {
  WarmHero,
  WarmPageWithFooter,
  WarmPrimaryLink,
  WarmSecondaryLink,
  WarmSection,
} from "@/components/warm/WarmShell";
import { LineChart, HeartPulse, Lock, Scroll, ArrowRight } from "@/components/icons";
import {
  WARM_BODY,
  WARM_CTA_BAND,
  WARM_H2,
  WARM_H3,
  WARM_LEAD,
  WARM_META,
  WARM_TRUST_BADGE,
  WARM_WRAP,
} from "@/lib/warm-theme";

const trustBadges = ["FSP 17273", "25+ years experience", "Independent advice"];

const categories = [
  {
    id: "retirement",
    title: "Private Wealth & Yield",
    tagline:
      "Explore structured private equity return profiles, living annuities, and capital longevity planning.",
    icon: LineChart,
    accent: "blue",
    items: [
      {
        name: "Retirement Income Planning",
        desc: "Structured income planning for retirees who want clearer cash-flow expectations.",
        href: "/everest-wealth",
        badge: null,
        featured: false,
      },
      {
        name: "Retirement Reality Calculator",
        desc: "How much capital you really need for retirement.",
        href: "/retirement",
        badge: "Calculator",
        featured: true,
      },
      {
        name: "Income in Retirement (Life of Capital)",
        desc: "How long your savings will last with withdrawals and inflation.",
        href: "/calculators",
        badge: "Calculator",
        featured: false,
      },
      {
        name: "Everest Wealth Products",
        desc: "Targeted return profiles: 12.8%, 14.2%, 14.5%, Amethyst living annuity.",
        href: "/everest-wealth",
        badge: "Popular",
        featured: true,
      },
      {
        name: "Financial Education & Calculators",
        desc: "Tools and structure, not just product sales.",
        href: "/calculators",
        badge: null,
        featured: false,
      },
    ],
  },
  {
    id: "insurance",
    title: "Risk Architecture",
    tagline: "Uncompromising personal and commercial cover. Protection for what matters most.",
    icon: Lock,
    accent: "rose",
    items: [
      {
        name: "Short-Term Personal",
        desc: "Home, car, valuables and personal asset protection.",
        href: "/solutions/personal-insurance",
        badge: null,
      },
      {
        name: "Short-Term Business",
        desc: "Commercial property, liability, business interruption and fleet.",
        href: "/solutions/business-insurance",
        badge: null,
      },
      {
        name: "Life Insurance (Personal)",
        desc: "Death cover, disability, income protection and severe illness.",
        href: "/solutions/life-insurance",
        badge: null,
      },
      {
        name: "Life Insurance (Business)",
        desc: "Buy-and-sell, key person, loan account and employee benefits.",
        href: "/solutions/business-life",
        badge: null,
      },
      {
        name: "Premium Increase Calculator",
        desc: "Compare long-term cost of escalating life premiums.",
        href: "/calculators",
        badge: "Calculator",
      },
    ],
  },
  {
    id: "medical",
    title: "Health & Integration",
    tagline: "Premium medical aid and gap cover. Because true wealth requires the health to enjoy it.",
    icon: HeartPulse,
    accent: "teal",
    items: [
      {
        name: "Medical Aid & Gap Cover",
        desc: "Health insurance and gap cover structuring.",
        href: "/solutions/medical-aid",
        badge: null,
      },
      {
        name: "Wellness & Integration",
        desc: "Holistic health and wellness planning for high-income earners.",
        href: "/contact",
        badge: null,
      },
    ],
  },
  {
    id: "estate",
    title: "Legacy Structuring",
    tagline: "Wills, trusts, and generational wealth transfer. Asset protection that lasts.",
    icon: Scroll,
    accent: "amber",
    items: [
      {
        name: "Estate Planning & Wills",
        desc: "Wills, testaments and estate structuring.",
        href: "/solutions/estate-planning",
        badge: null,
      },
      {
        name: "Trust & Business Structure",
        desc: "Asset protection and tax-efficient structuring.",
        href: "/contact",
        badge: null,
      },
      {
        name: "Estate Duty Calculator",
        desc: "Estimate estate duty and executor fees at death.",
        href: "/calculators",
        badge: "Calculator",
      },
      {
        name: "Annual Estate Reduction Strategy",
        desc: "Use annual donations to reduce estate duty over time.",
        href: "/calculators",
        badge: "Calculator",
      },
    ],
  },
];

const accentStyles: Record<string, { iconBg: string; ring: string; hoverRing: string }> = {
  blue: {
    iconBg: "bg-samsung-blue/10 text-samsung-blue",
    ring: "ring-samsung-blue/20",
    hoverRing: "hover:ring-samsung-blue/40",
  },
  rose: {
    iconBg: "bg-rose-500/10 text-rose-600",
    ring: "ring-rose-500/20",
    hoverRing: "hover:ring-rose-500/40",
  },
  teal: {
    iconBg: "bg-cinematic-teal/10 text-cinematic-teal",
    ring: "ring-cinematic-teal/20",
    hoverRing: "hover:ring-cinematic-teal/40",
  },
  amber: {
    iconBg: "bg-amber-500/10 text-amber-700",
    ring: "ring-amber-500/20",
    hoverRing: "hover:ring-amber-500/40",
  },
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
      className={`group block rounded-2xl p-6 shadow-lg ring-1 transition-all duration-300 hover:shadow-xl ${style.ring} ${style.hoverRing} ${
        muted ? "bg-white/70" : "bg-white/95"
      } ring-stone-200/80 ${wide ? "sm:col-span-2 lg:col-span-2" : ""}`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-shark">{name}</h3>
        {badge && (
          <span className="shrink-0 rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-stone-600">
            {badge}
          </span>
        )}
      </div>
      <p className={`mb-4 text-sm leading-relaxed ${WARM_BODY}`}>{desc}</p>
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-samsung-blue transition-all group-hover:gap-2.5 group-hover:text-cinematic-teal">
        Explore
        <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

export default function SolutionsPage() {
  const [focusCategory, ...defenseCategories] = categories;
  const FocusIcon = focusCategory.icon;

  return (
    <WarmPageWithFooter>
      <PageJsonLd
        path="/solutions"
        webPage={{
          name: "Financial Solutions by AS Brokers CC",
          description:
            "Explore comprehensive financial solutions including investment planning, life insurance, business solutions, and retirement strategies. FSP 17273.",
        }}
        service={{
          name: "Financial Solutions by AS Brokers CC",
          description:
            "Financial planning, investment advisory, insurance broking, and retirement planning for Krugersdorp and the West Rand.",
          serviceType: "Financial Planning, Investment Advisory, Insurance Broking, Retirement Planning",
        }}
      />

      <WarmHero
        kicker="For individuals and business owners"
        title="Engineered Wealth & Risk Architecture."
        description="Explore alternatives to traditional markets with structured private equity return profiles and retirement solutions. Full-service insurance and risk management when you need it."
        imageSrc="/images/solutions-hero-16x9.jpg"
        priority
        maxWidth="4xl"
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {trustBadges.map((badge) => (
            <span key={badge} className={WARM_TRUST_BADGE}>
              {badge}
            </span>
          ))}
        </div>
      </WarmHero>

      <SolutionsSectionNav />

      <WarmSection className="pt-8 pb-0">
        <PlanningToolsStrip className="mb-8" />
      </WarmSection>

      <WarmSection className="pt-4">
        <section
          data-chunk-boundary
          id={focusCategory.id}
          className="scroll-mt-32 border-b border-stone-200/80 pb-16 md:pb-20"
        >
          <Home4Reveal>
            <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${accentStyles[focusCategory.accent].iconBg}`}
                >
                  <FocusIcon className="h-7 w-7" />
                </div>
                <div>
                  <h2 className={`mb-2 ${WARM_H2}`}>{focusCategory.title}</h2>
                  <p className={`max-w-xl ${WARM_LEAD}`}>{focusCategory.tagline}</p>
                </div>
              </div>
            </div>
          </Home4Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

        <div className="pb-10 pt-8">
          <PageMediaStrip
            variant="secondary"
            src={`/images/${encodeURIComponent("solutions-fiduciary-defense-1x1 (2).jpg")}`}
            rounded="3xl"
          />
        </div>

        <div className="pt-4">
          <h2 className={`mb-10 text-xl font-bold uppercase tracking-wider text-stone-500 md:mb-12 md:text-2xl`}>
            Phase 2: Wealth Protection & Fiduciary Defense
          </h2>
          {defenseCategories.map((cat) => {
            const Style = accentStyles[cat.accent] ?? accentStyles.blue;
            const Icon = cat.icon;
            return (
              <section
                data-chunk-boundary
                key={cat.id}
                id={cat.id}
                className="scroll-mt-32 border-b border-stone-200/80 py-12 last:border-0 md:py-16"
              >
                <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${Style.iconBg}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className={`mb-1 ${WARM_H3}`}>{cat.title}</h3>
                      <p className={`max-w-xl text-sm ${WARM_BODY}`}>{cat.tagline}</p>
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
      </WarmSection>

      <section data-chunk-boundary className={WARM_CTA_BAND}>
        <div className={`${WARM_WRAP} relative text-center`}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-teal-600/10 pointer-events-none" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">Stop Guessing. Start Engineering.</h2>
            <p className="mb-8 text-white/80">
              Book a private actuarial review of your capital lifespan, or run the numbers yourself.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <WarmPrimaryLink href="/contact" className="w-full sm:w-auto">
                Book Private Consultation
              </WarmPrimaryLink>
              <WarmSecondaryLink href="/calculators" className="w-full sm:w-auto">
                All calculators
              </WarmSecondaryLink>
            </div>
            <p className={`mt-6 ${WARM_META} text-white/60`}>WhatsApp +27 66 227 6044 for a quick response</p>
          </div>
        </div>
      </section>
    </WarmPageWithFooter>
  );
}
