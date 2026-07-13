import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  LineChart,
  Scroll,
  ShieldCheck,
} from "@/components/icons";
import { HubReveal } from "@/components/hub/HubReveal";
import { Home4DeferredCardImage } from "@/components/home4/Home4DeferredCardImage";
import type {
  CalculatorTile,
  FunnelStage,
  GoalCard,
  Testimonial,
} from "@/lib/home4-journey";
import { getAlt } from "@/lib/image-alt";
import { HUB_TEAL } from "@/lib/hub-design-tokens";

export const HOME4_WRAP = "mx-auto max-w-7xl px-4 sm:px-6 md:px-8";

const GOAL_CARD_IMAGE_SIZES = "(max-width: 640px) 92vw, (max-width: 1280px) 45vw, 300px";

const ACCENT_RING: Record<GoalCard["accent"], string> = {
  teal: "ring-cinematic-teal/25 hover:ring-cinematic-teal/45",
  blue: "ring-samsung-blue/25 hover:ring-samsung-blue/45",
  orange: "ring-orange-300/40 hover:ring-orange-400/55",
  gold: "ring-amber-300/40 hover:ring-amber-400/55",
};

const ACCENT_TEXT: Record<GoalCard["accent"], string> = {
  teal: "text-[#006B6B]",
  blue: "text-samsung-blue",
  orange: "text-orange-700",
  gold: "text-amber-700",
};

const GOAL_ICONS: Record<GoalCard["accent"], typeof LineChart> = {
  teal: Calendar,
  blue: LineChart,
  orange: ShieldCheck,
  gold: Scroll,
};

const JOURNEY_IMAGES: Record<string, string> = {
  "01": "/images/insights-inset-1x1.jpg",
  "02": "/images/calculators-hub-16x9.jpg",
  "03": "/images/about-krugersdorp-trust-16x9.jpg",
  "04": "/images/contact-trust.jpg",
};

const JOURNEY_IMAGE_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw";

/** @deprecated Use HubReveal, kept as alias for below-fold imports. */
export function Home4Reveal({
  children,
  className = "",
  delay = 0,
  instant = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  instant?: boolean;
}) {
  return (
    <HubReveal className={className} delay={delay} instant={instant}>
      {children}
    </HubReveal>
  );
}

export function Home4GoalCard({ card }: { card: GoalCard; priority?: boolean }) {
  const Icon = GOAL_ICONS[card.accent];

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-3xl bg-white/95 shadow-xl ring-1 ring-stone-200/80 backdrop-blur-sm transition-all duration-300 ease-apple hover:-translate-y-2 hover:shadow-2xl ${ACCENT_RING[card.accent]}`}
    >
      <Link
        href={card.href}
        prefetch={false}
        className="relative block h-36 w-full shrink-0 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-samsung-blue focus-visible:ring-offset-2 sm:h-40"
        aria-label={`Explore ${card.title}`}
      >
        <Home4DeferredCardImage src={card.image} title={card.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-shark/70 via-shark/20 to-transparent" />
        <div
          className={`absolute bottom-3 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold shadow-md ${ACCENT_TEXT[card.accent]}`}
        >
          <Icon className="h-3.5 w-3.5" aria-hidden />
          {card.badge}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h2 className="text-lg font-semibold tracking-tight text-shark sm:text-xl">{card.title}</h2>
        <p className="mt-2 min-h-[2.75rem] text-sm leading-relaxed text-stone-600">{card.description}</p>
        <ul className="mt-4 flex-1 space-y-1.5 border-t border-stone-100 pt-4">
          {card.links.map((link) => (
            <li key={`${link.label}-${link.href}`}>
              <Link
                href={link.href}
                prefetch={false}
                className="text-sm text-stone-600 transition-colors hover:text-samsung-blue"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={card.href}
          prefetch={false}
          className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${ACCENT_TEXT[card.accent]} hover:opacity-80`}
        >
          Explore
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

export function Home4CalculatorTile({ tile }: { tile: CalculatorTile }) {
  return (
    <Link
      href={tile.href}
      prefetch={false}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-stone-200/70 transition-all duration-300 ease-apple hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={tile.image}
          alt={getAlt(tile.image, tile.label)}
          fill
          quality={70}
          className="object-cover transition-transform duration-500 ease-apple group-hover:scale-105"
          sizes={GOAL_CARD_IMAGE_SIZES}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-shark/55 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold text-shark">{tile.label}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-stone-600">{tile.description}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: HUB_TEAL }}>
          Open calculator
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

/** Photo-led journey steps, one image per stage, text below. */
export function Home4JourneyFunnel({ stages }: { stages: FunnelStage[] }) {
  return (
    <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {stages.map((stage, index) => (
        <Home4Reveal key={stage.step} delay={index * 0.05}>
          <Link
            href={stage.href}
            prefetch={false}
            className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-samsung-blue focus-visible:ring-offset-2"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={JOURNEY_IMAGES[stage.step] ?? "/images/insights-inset-1x1.jpg"}
                alt={getAlt(JOURNEY_IMAGES[stage.step] ?? "", stage.title)}
                fill
                quality={70}
                className="object-cover transition-transform duration-700 ease-apple group-hover:scale-[1.03]"
                sizes={JOURNEY_IMAGE_SIZES}
              />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
              Step {stage.step}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-shark">{stage.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">{stage.description}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-samsung-blue">
              {stage.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          </Link>
        </Home4Reveal>
      ))}
    </div>
  );
}

export function Home4TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-stone-200/70">
      <div className="relative h-44 w-full">
        <Image
          src={item.photo}
          alt={getAlt(item.photo, `${item.who}, client story`)}
          fill
          quality={70}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-shark/75 via-shark/15 to-transparent" />
      </div>
      <blockquote className="flex flex-1 flex-col p-6">
        <p className="text-sm leading-relaxed text-stone-700 sm:text-[15px]">&ldquo;{item.quote}&rdquo;</p>
        <figcaption className="mt-4 border-t border-stone-100 pt-4 text-sm">
          <span className="font-semibold text-shark">{item.who}</span>
          <span className="text-stone-400"> · </span>
          <span className="text-stone-500">{item.where}</span>
        </figcaption>
      </blockquote>
    </figure>
  );
}

export function Home4SectionHeader({
  kicker,
  title,
  description,
  headingId,
}: {
  kicker?: string;
  title: string;
  description?: string;
  headingId?: string;
}) {
  return (
    <div className="max-w-2xl">
      {kicker ? (
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.18em]" style={{ color: HUB_TEAL }}>{kicker}</p>
      ) : null}
      <h2
        id={headingId}
        className="mt-2 text-2xl font-bold tracking-tight text-shark sm:text-3xl md:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base leading-relaxed text-stone-600 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
