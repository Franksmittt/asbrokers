"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { RetirementRealityCalculator } from "@/components/RetirementRealityCalculator";
import { Home4Reveal, HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight, Calendar, LineChart, Scroll, ShieldCheck } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";

/** Consistent vertical rhythm between page sections */
const SECTION_PY = "py-16 md:py-20";

const PATHWAY_PLANNING = {
  title: "I'm planning for retirement",
  description: "I want to know if I'm saving enough and when I can afford to stop working.",
  links: [
    { label: "Retirement Goal Calculator", href: "/retirement-readiness" },
    { label: "Freedom Rate Calculator", href: "/wealth-building-calculator" },
    { label: "Wealth Building", href: "/wealth-building-calculator" },
  ],
};

const PATHWAY_RETIRED = {
  title: "I'm already retired",
  description: "I'm worried my money won't last, and I need a sustainable income strategy.",
  links: [
    { label: "Living Annuities", href: "/everest-amethyst-living-annuity" },
    { label: "Capital Sustainability Review", href: "/retirement-survival-blueprint" },
    { label: "Estate Planning", href: "/solutions/estate-planning" },
  ],
};

const FUNNEL_ASSESS = [
  {
    label: "Retirement Reality Calculator",
    description: "How much capital you may need to fund the income you want.",
    href: "#reality-calculator",
    image: "/images/home-actuarial-engine-16x9.jpg",
  },
  {
    label: "Life of Capital Calculator",
    description: "How long your savings may last with inflation and drawdown.",
    href: "/income-in-retirement",
    image: "/images/calculators-capital-lifespan-4x3.jpg",
  },
];

const FUNNEL_UNDERSTAND = [
  {
    label: "Semigration & retirement planning",
    description: "Planning a move to the coast or a retirement village.",
    href: "/insights/semigration-retirement",
  },
  {
    label: "Healthy Retirement Blueprint",
    description: "A guided assessment of your retirement health gap.",
    href: "/healthy-retirement-blueprint",
  },
  {
    label: "Browse all retirement insights",
    description: "Articles and guides from our independent advisers.",
    href: "/insights",
  },
];

const FUNNEL_STEPS = [
  { step: "1", title: "Assess", subtitle: "Run the numbers with our calculators" },
  { step: "2", title: "Understand", subtitle: "Read guides written for South Africans" },
  { step: "3", title: "Engineer", subtitle: "Speak with an independent adviser" },
];

function PathwayCard({
  title,
  description,
  links,
  accent,
}: {
  title: string;
  description: string;
  links: { label: string; href: string }[];
  accent: "teal" | "blue";
}) {
  const ring =
    accent === "teal"
      ? "ring-cinematic-teal/20 hover:ring-cinematic-teal/40"
      : "ring-samsung-blue/20 hover:ring-samsung-blue/40";
  const dot =
    accent === "teal" ? "bg-cinematic-teal/10 text-cinematic-teal" : "bg-samsung-blue/10 text-samsung-blue";

  return (
    <article
      className={`rounded-3xl bg-white/95 p-6 shadow-xl ring-1 ${ring} transition-all duration-300 ease-in-out hover:shadow-2xl sm:p-8`}
    >
      <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl ${dot}`}>
        {accent === "teal" ? (
          <Calendar className="h-5 w-5" aria-hidden />
        ) : (
          <LineChart className="h-5 w-5" aria-hidden />
        )}
      </div>
      <h2 className="text-xl font-bold tracking-tight text-shark sm:text-2xl">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base">{description}</p>
      <ul className="mt-6 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              prefetch={false}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-samsung-blue transition-colors duration-300 ease-in-out hover:text-cinematic-teal"
            >
              {link.label}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

function CalculatorCard({
  label,
  description,
  href,
  image,
}: {
  label: string;
  description: string;
  href: string;
  image: string;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="group overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-stone-200/80 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-32 overflow-hidden">
        <Image
          src={image}
          alt={getAlt(image, label)}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-shark/50 to-transparent" />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-shark">{label}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{description}</p>
      </div>
    </Link>
  );
}

function UnderstandCard({
  label,
  description,
  href,
}: {
  label: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="group flex h-full flex-col rounded-2xl bg-white/90 p-5 shadow-sm ring-1 ring-stone-200/80 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-md"
    >
      <h4 className="font-semibold leading-snug text-shark">{label}</h4>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-samsung-blue group-hover:text-cinematic-teal">
        Read more
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
          aria-hidden
        />
      </span>
    </Link>
  );
}

export function RetirementPageView() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] pb-24 text-shark md:pb-0">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/home4-goal-retire-16x9.png"
            alt={getAlt("/images/home4-goal-retire-16x9.png", "Relaxed South African couple enjoying retirement")}
            fill
            priority
            unoptimized
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-shark/88 via-shark/55 to-shark/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F7F6F3] via-transparent to-shark/20" />
        </div>

        <div className="relative pt-32 pb-20 sm:pt-36 sm:pb-24 md:pt-40 md:pb-28">
          <div className={`${HOME4_WRAP} max-w-3xl`}>
            <Home4Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-sm">
                Retirement · Authority hub · FSP 17273
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-[3.25rem] leading-[1.08]">
                Retirement planning, engineered for peace of mind.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
                Whether you are years away or already retired, discover exactly where you stand and how
                to make your capital last.
              </p>
            </Home4Reveal>
          </div>
        </div>
      </section>

      {/* Two pathways */}
      <section className={SECTION_PY} aria-labelledby="retirement-pathways">
        <div className={HOME4_WRAP}>
          <Home4Reveal>
            <h2 id="retirement-pathways" className="sr-only">
              Choose your retirement pathway
            </h2>
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              <PathwayCard {...PATHWAY_PLANNING} accent="teal" />
              <PathwayCard {...PATHWAY_RETIRED} accent="blue" />
            </div>
          </Home4Reveal>
        </div>
      </section>

      {/* Education-first funnel */}
      <section
        className={`border-y border-stone-200/80 bg-white/60 ${SECTION_PY}`}
        aria-labelledby="retirement-funnel"
      >
        <div className={HOME4_WRAP}>
          <Home4Reveal>
            <h2
              id="retirement-funnel"
              className="text-2xl font-bold tracking-tight text-shark sm:text-3xl md:text-4xl"
            >
              I&apos;m worried I won&apos;t have enough money.
            </h2>
            <p className="mt-3 max-w-2xl text-stone-600 leading-relaxed">
              You are not alone, and you do not have to guess. Follow a simple path from clarity to
              conversation.
            </p>
          </Home4Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {FUNNEL_STEPS.map((item, index) => (
              <Home4Reveal key={item.step} delay={index * 0.05}>
                <div className="h-full rounded-2xl bg-white/90 p-5 ring-1 ring-stone-200/80 shadow-md">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-cinematic-teal">
                    Step {item.step}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-shark">{item.title}</h3>
                  <p className="mt-1 text-sm text-stone-500">{item.subtitle}</p>
                </div>
              </Home4Reveal>
            ))}
          </div>

          <div className="mt-8 space-y-8">
            <Home4Reveal delay={0.05}>
              <div>
                <h3 className="text-lg font-bold text-shark">Step 1 · Assess</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {FUNNEL_ASSESS.map((calc) => (
                    <CalculatorCard key={calc.href} {...calc} />
                  ))}
                </div>
              </div>
            </Home4Reveal>

            <Home4Reveal delay={0.08}>
              <div>
                <h3 className="text-lg font-bold text-shark">Step 2 · Understand</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {FUNNEL_UNDERSTAND.map((item) => (
                    <UnderstandCard key={item.href} {...item} />
                  ))}
                </div>
              </div>
            </Home4Reveal>

            <Home4Reveal delay={0.1}>
              <div className="rounded-3xl bg-gradient-to-br from-samsung-blue/10 via-white to-cinematic-teal/10 p-8 ring-1 ring-stone-200/80 shadow-lg sm:p-10">
                <h3 className="text-lg font-bold text-shark">Step 3 · Engineer</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-stone-600 sm:text-base">
                  When the numbers raise questions, an independent adviser can help you interpret them
                  and explore suitable next steps, without pressure or jargon.
                </p>
                <Link
                  href="/contact"
                  prefetch={false}
                  className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-samsung-blue/20 transition-all duration-300 ease-in-out hover:bg-[#004a9e] hover:shadow-cta-glow-blue"
                >
                  Speak with an adviser
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </Home4Reveal>
          </div>
        </div>
      </section>

      {/* Retirement Reality calculator */}
      <section id="reality-calculator" className={`scroll-mt-28 ${SECTION_PY}`} data-chunk-boundary>
        <div className={HOME4_WRAP}>
          <Home4Reveal>
            <div className="mx-auto max-w-4xl">
              <h2 className="text-center text-2xl font-bold tracking-tight text-shark sm:text-3xl">
                Retirement Reality Calculator
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-stone-600 sm:text-base">
                Estimate the capital that may be required to fund your target retirement income, based
                on your own assumptions about growth, inflation, and tax.
              </p>
              <div className="mt-8 overflow-hidden rounded-3xl shadow-2xl ring-1 ring-stone-200/80">
                <RetirementRealityCalculator />
              </div>
            </div>
          </Home4Reveal>
        </div>
      </section>

      {/* Amethyst highlight */}
      <section className={SECTION_PY} aria-labelledby="retirement-amethyst">
        <div className={HOME4_WRAP}>
          <Home4Reveal>
            <div className="overflow-hidden rounded-3xl bg-white/80 p-8 shadow-2xl ring-1 ring-stone-200/80 backdrop-blur-sm sm:p-10 md:p-12 lg:flex lg:items-center lg:gap-12">
              <div className="lg:flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cinematic-teal">
                  Structured retirement income
                </p>
                <h2
                  id="retirement-amethyst"
                  className="mt-3 text-2xl font-bold tracking-tight text-shark sm:text-3xl"
                >
                  Insulate your retirement with structured yield.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-600 sm:text-base">
                  For pension, provident, preservation, and RA capital, the Everest Amethyst Living
                  Annuity offers a regulated living-annuity wrapper with flexible drawdown between{" "}
                  <strong className="font-semibold text-shark">2.5% and 17.5%</strong>, designed for
                  retirees who want clarity on income without daily market volatility.
                </p>
                <Link
                  href="/everest-amethyst-living-annuity"
                  prefetch={false}
                  className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-samsung-blue/20 transition-all duration-300 ease-in-out hover:bg-[#004a9e] hover:shadow-cta-glow-blue"
                >
                  Explore the Amethyst Living Annuity
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              <div className="mt-8 flex shrink-0 justify-center lg:mt-0">
                <div className="relative flex h-44 w-44 items-center justify-center rounded-3xl bg-gradient-to-br from-cinematic-teal/15 via-white to-samsung-blue/15 p-6 shadow-xl ring-1 ring-stone-200/80 sm:h-52 sm:w-52">
                  <div className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                      Target net yield
                    </p>
                    <p className="mt-2 text-4xl font-bold tabular-nums text-shark sm:text-5xl">~10.2%</p>
                    <p className="mt-1 text-xs text-stone-500">p.a. structured profile</p>
                  </div>
                  <ShieldCheck className="absolute -right-2 -top-2 h-8 w-8 text-cinematic-teal/40" aria-hidden />
                </div>
              </div>
            </div>
          </Home4Reveal>
        </div>
      </section>

      {/* Conversion footer */}
      <section className={`border-t border-stone-200/80 bg-gradient-to-br from-shark via-[#1a2626] to-[#152020] ${SECTION_PY}`}>
        <div className={`${HOME4_WRAP} text-center`}>
          <Home4Reveal>
            <Scroll className="mx-auto h-8 w-8 text-cinematic-teal/80" aria-hidden />
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
              Stop guessing. Let&apos;s look at the math together.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-stone-400 sm:text-base">
              Book a retirement clarity call with an independent FSP 17273 adviser. Personal, structured,
              and focused on your goals.
            </p>
            <Link
              href="/contact"
              prefetch={false}
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-samsung-blue px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-samsung-blue/30 transition-all duration-300 ease-in-out hover:bg-[#004a9e] hover:shadow-cta-glow-blue"
            >
              Book a Retirement Clarity Call
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Home4Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
