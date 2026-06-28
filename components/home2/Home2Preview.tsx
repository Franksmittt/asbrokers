import Image from "next/image";
import Link from "next/link";

import { Footer } from "@/components/Footer";
import { HomeClientReviews } from "@/components/HomeClientReviews";
import { HomeCtaStrip } from "@/components/HomeCtaStrip";
import { HomeInsightsTeaserStatic } from "@/components/HomeInsightsTeaserStatic";
import { HomeStatsSection } from "@/components/HomeStatsSection";
import { PAGE_CONTENT_MAX, PageMediaStrip, PageMediaStripTriple } from "@/components/PageMediaStrip";
import { TrustBar } from "@/components/TrustBar";
import { ArrowRight } from "@/components/icons";
import { HUB_CALCULATORS } from "@/lib/calculators/hub-catalog";
import { CORE_PRODUCT_PARTNERS, PARTNER_GROUPS } from "@/lib/home2-partners";
import { PLANNING_TOOL_OFFERS } from "@/lib/planning-tools-offers";
import { cn } from "@/lib/utils";

const PILLAR_CARDS = [
  {
    pillar: "Health",
    image: "/images/quiz-inset-1x1.jpg",
    offer: PLANNING_TOOL_OFFERS["healthy-retirement"],
    cta: "Free health assessment",
  },
  {
    pillar: "Wealth",
    image: "/images/retirement-inset-1x1.jpg",
    offer: PLANNING_TOOL_OFFERS["retirement-survival"],
    cta: "Free retirement blueprint",
  },
  {
    pillar: "Legacy",
    image: "/images/life-insurance-inset-1x1.jpg",
    offer: PLANNING_TOOL_OFFERS["legacy-checklist"],
    cta: "Free estate checklist",
  },
  {
    pillar: "Business",
    image: "/images/business-insurance-inset-1x1.jpg",
    offer: PLANNING_TOOL_OFFERS["business-risk"],
    cta: "Free business risk review",
    highlight: true,
  },
] as const;

const CPP_COLUMNS = [
  {
    title: "Create",
    summary: "Build retirement income, investments, and a clear path to financial freedom.",
    items: ["Retirement planning", "Everest voluntary products", "Living annuity drawdown"],
    href: "/solutions",
    image: "/images/home-yield-continuity-4x3.jpg",
  },
  {
    title: "Protect",
    summary: "Cover health, personal assets, and business risks before disruption hits.",
    items: ["Life & disability", "Medical aid & gap cover", "Commercial insurance"],
    href: "/solutions/business-insurance",
    image: "/images/solutions-fiduciary-defense-1x1.jpg",
  },
  {
    title: "Preserve",
    summary: "Transfer wealth efficiently with wills, trusts, and estate planning.",
    items: ["Wills & testaments", "Trust structures", "Beneficiary reviews"],
    href: "/legacy-readiness-checklist",
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
    <div className="border-b border-zinc-800 bg-zinc-950 px-4 py-2 text-center text-[11px] text-zinc-500">
      <span className="text-zinc-400">Preview only</span> — this layout lives at{" "}
      <span className="font-mono text-zinc-300">/home2</span>. The public homepage is still{" "}
      <span className="font-mono text-zinc-300">/</span>.
    </div>
  );
}

function PathCard({
  pillar,
  image,
  offer,
  cta,
  ...rest
}: (typeof PILLAR_CARDS)[number]) {
  const highlight = "highlight" in rest && rest.highlight;
  return (
    <Link
      href={offer.href}
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg border bg-[#101012] transition-colors sm:flex-row",
        highlight ? "border-zinc-600" : "border-zinc-800 hover:border-zinc-600"
      )}
    >
      <div className="relative aspect-[16/10] w-full shrink-0 sm:aspect-auto sm:h-auto sm:w-40 md:w-44">
        <Image src={image} alt="" fill className="object-cover" sizes="(max-width: 640px) 100vw, 176px" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101012]/80 to-transparent sm:bg-gradient-to-r" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">{pillar}</p>
        <h3 className="mt-1.5 text-base font-semibold leading-snug text-white">{offer.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">&ldquo;{offer.coreQuestion}&rdquo;</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-white">
          {cta}
          <ArrowRight className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function Home2Preview() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-200">
      <PreviewBanner />

      {/* Hero — split editorial layout */}
      <section className="border-b border-zinc-800">
        <div className={`${PAGE_CONTENT_MAX} grid items-center gap-10 py-16 md:grid-cols-2 md:py-20 lg:gap-14`}>
          <div className="max-w-xl">
            <p className="trust-hallmark text-[11px] uppercase tracking-[0.16em] text-zinc-500">
              FSP 17273 · Krugersdorp · Est. 1998
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.12] tracking-[-0.02em] text-white md:text-5xl">
              Create, protect, and preserve what matters most.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-400 md:text-lg">
              Independent advice across health, retirement, estate planning, and business insurance — structured around
              the problems you actually worry about, not product shelves.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#start-here"
                className="inline-flex items-center justify-center bg-white px-6 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
              >
                Choose your starting point
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-zinc-700 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-zinc-500 hover:bg-zinc-900"
              >
                Book a consultation
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-zinc-800">
            <Image
              src="/images/about-krugersdorp-trust-16x9.jpg"
              alt="AS Brokers independent financial advice, Krugersdorp"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Four paths */}
      <section id="start-here" className="scroll-mt-24 border-b border-zinc-800 py-16 md:py-20">
        <div className={PAGE_CONTENT_MAX}>
          <div className="mb-8 max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">Where should you start?</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500 md:text-base">
              Four free assessments — each answers one core question. Pick the worry that feels most urgent today.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {PILLAR_CARDS.map((card) => (
              <PathCard key={card.pillar} {...card} />
            ))}
          </div>
          <p className="mt-6 text-sm text-zinc-600">
            <Link href="/legacy-conversations" className="text-zinc-400 underline-offset-2 hover:text-white hover:underline">
              See how Health, Wealth, Legacy &amp; Business fit together
            </Link>
          </p>
        </div>
      </section>

      <div className={PAGE_CONTENT_MAX}>
        <PageMediaStrip variant="primary" src="/images/solutions-hero-16x9.jpg" className="my-0" />
      </div>

      {/* Create · Protect · Preserve */}
      <section className="border-b border-zinc-800 py-16 md:py-20">
        <div className={PAGE_CONTENT_MAX}>
          <h2 className="text-center text-2xl font-semibold text-white">Create · Protect · Preserve</h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-zinc-500">
            Every service we offer supports one of these three outcomes.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {CPP_COLUMNS.map((col) => (
              <article key={col.title} className="flex flex-col border border-zinc-800 bg-[#101012]">
                <div className="relative h-36 border-b border-zinc-800">
                  <Image src={col.image} alt="" fill className="object-cover" sizes="33vw" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-white">{col.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">{col.summary}</p>
                  <ul className="mt-4 flex-1 space-y-1.5 text-sm text-zinc-400">
                    {col.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link href={col.href} className="mt-5 text-sm font-medium text-white underline-offset-2 hover:underline">
                    Explore {col.title.toLowerCase()} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Business owners */}
      <section className="border-b border-zinc-800 py-16 md:py-20">
        <div className={`${PAGE_CONTENT_MAX} grid gap-10 lg:grid-cols-2 lg:items-center`}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-zinc-800 lg:order-2">
            <Image
              src="/images/business-life-inset-1x1.jpg"
              alt="Business succession and commercial risk planning"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="lg:order-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Business owners</p>
            <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
              Could your business survive a major disruption?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400 md:text-base">
              Commercial insurance, key person cover, buy-sell agreements, and liability gaps are a core part of our
              practice — especially for owners searching for structured business cover in Gauteng.
            </p>
            <ul className="mt-6 grid gap-2 text-sm text-zinc-300 sm:grid-cols-2">
              {[
                "Commercial & fire cover",
                "Key person assurance",
                "Buy & sell agreements",
                "Business liability",
                "Cyber & crime risks",
                "Succession planning",
              ].map((item) => (
                <li key={item} className="border-l border-zinc-700 pl-3">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/business-risk-review"
                className="inline-flex justify-center bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-zinc-200"
              >
                Business Risk Review™
              </Link>
              <Link
                href="/contact"
                className="inline-flex justify-center border border-zinc-700 px-5 py-3 text-sm font-semibold text-white hover:border-zinc-500"
              >
                Request a commercial quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partners & providers */}
      <section className="border-b border-zinc-800 bg-[#0c0c0e] py-16 md:py-20">
        <div className={PAGE_CONTENT_MAX}>
          <div className="mb-10 max-w-2xl">
            <h2 className="text-2xl font-semibold text-white">Who we work with</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              AS Brokers is independent (FSP 17273). We place business with recognised product providers and compare
              medical schemes and gap cover for your situation — membership is always with the scheme or insurer you
              choose.
            </p>
          </div>

          <div className="mb-10 flex flex-wrap items-center gap-x-8 gap-y-4 border border-zinc-800 bg-[#101012] px-6 py-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">Key partners</span>
            {CORE_PRODUCT_PARTNERS.map((p) => (
              <div key={p.name} className="min-w-[7rem]">
                <p className="text-sm font-semibold text-zinc-200">{p.name}</p>
                <p className="text-[11px] text-zinc-600">{p.note}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {PARTNER_GROUPS.map((group) => (
              <div key={group.id} className="border border-zinc-800 p-5">
                <h3 className="text-sm font-semibold text-white">{group.label}</h3>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">{group.description}</p>
                <p className="mt-3 text-sm text-zinc-400">{group.names.join(" · ")}</p>
                {group.href ? (
                  <Link href={group.href} className="mt-3 inline-block text-xs font-medium text-zinc-300 hover:text-white">
                    Learn more →
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculators */}
      <section className="py-16 md:py-20">
        <div className={PAGE_CONTENT_MAX}>
          <PageMediaStrip variant="secondary" src="/images/calculators-hub-16x9.jpg" className="mb-10" />
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Educational calculators</h2>
              <p className="mt-1 text-sm text-zinc-500">Illustrative numbers — then speak to an adviser for your plan.</p>
            </div>
            <Link href="/calculators" className="text-sm text-zinc-400 hover:text-white">
              All calculators →
            </Link>
          </div>
          <div className="grid gap-px border border-zinc-800 bg-zinc-800 sm:grid-cols-2">
            {HUB_CALCULATORS.map((calc) => (
              <Link
                key={calc.embedId}
                href={calc.href}
                className="group bg-[#101012] p-5 transition-colors hover:bg-[#141416]"
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">{calc.tag}</p>
                <h3 className="mt-1 text-base font-semibold text-white">{calc.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-zinc-500">{calc.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="border-t border-zinc-800 py-14">
        <div className={`${PAGE_CONTENT_MAX} max-w-3xl`}>
          <h2 className="text-lg font-semibold text-white">How we work with you</h2>
          <ol className="mt-6 space-y-0 divide-y divide-zinc-800 border border-zinc-800">
            {JOURNEY.map((step, i) => (
              <li key={step} className="flex items-center gap-4 bg-[#101012] px-4 py-3 text-sm">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-zinc-700 text-xs font-semibold text-zinc-400">
                  {i + 1}
                </span>
                <span className="text-zinc-300">{step}</span>
              </li>
            ))}
          </ol>
          <Link href="/how-we-work" className="mt-4 inline-block text-sm text-zinc-400 hover:text-white">
            Read how we work →
          </Link>
        </div>
      </section>

      <div className={PAGE_CONTENT_MAX}>
        <PageMediaStripTriple
          items={[
            { src: "/images/contact-trust.jpg" },
            { src: "/images/calculators-education-16x9.jpg" },
            { src: "/images/everest-suite-hero-16x9.jpg" },
          ]}
        />
      </div>

      <HomeStatsSection />
      <HomeClientReviews />
      <HomeInsightsTeaserStatic />
      <HomeCtaStrip />
      <Footer />
    </div>
  );
}
