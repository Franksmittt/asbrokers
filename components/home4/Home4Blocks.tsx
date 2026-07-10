import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  FileText,
  LayoutDashboard,
  LineChart,
  Scroll,
  ShieldCheck,
} from "@/components/icons";
import { HubReveal } from "@/components/hub/HubReveal";
import type {
  CalculatorTile,
  FunnelStage,
  GoalCard,
  Testimonial,
} from "@/lib/home4-journey";
import { getAlt } from "@/lib/image-alt";
import { HUB_TEAL } from "@/lib/hub-design-tokens";

export const HOME4_WRAP = "mx-auto max-w-7xl px-4 sm:px-6 md:px-8";

const GOAL_CARD_IMAGE_SIZES = "(max-width: 640px) 380px, (max-width: 1280px) 50vw, 300px";

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

type JourneyAccent = FunnelStage["accent"];

const JOURNEY_ICONS: Record<JourneyAccent, typeof LineChart> = {
  teal: FileText,
  blue: LineChart,
  gold: LayoutDashboard,
  advice: Calendar,
};

const JOURNEY_STYLES: Record<
  JourneyAccent,
  { card: string; iconWrap: string; icon: string; step: string; cta: string; dot: string }
> = {
  teal: {
    card: "bg-gradient-to-br from-cinematic-teal/[0.08] via-white to-white ring-cinematic-teal/20 hover:ring-cinematic-teal/45",
    iconWrap: "bg-cinematic-teal/12 ring-cinematic-teal/20",
    icon: "text-[#006B6B]",
    step: "text-[#006B6B]",
    cta: "text-[#006B6B]",
    dot: "border-cinematic-teal/45",
  },
  blue: {
    card: "bg-gradient-to-br from-samsung-blue/[0.07] via-white to-white ring-samsung-blue/20 hover:ring-samsung-blue/45",
    iconWrap: "bg-samsung-blue/10 ring-samsung-blue/20",
    icon: "text-samsung-blue",
    step: "text-samsung-blue",
    cta: "text-samsung-blue",
    dot: "border-samsung-blue/45",
  },
  gold: {
    card: "bg-gradient-to-br from-amber-400/[0.08] via-white to-white ring-amber-300/35 hover:ring-amber-400/50",
    iconWrap: "bg-amber-400/12 ring-amber-300/30",
    icon: "text-amber-700",
    step: "text-amber-700",
    cta: "text-amber-700",
    dot: "border-amber-400/50",
  },
  advice: {
    card: "bg-gradient-to-br from-samsung-blue/12 via-white to-cinematic-teal/[0.08] ring-samsung-blue/30 shadow-lg shadow-samsung-blue/10 hover:ring-samsung-blue/50 hover:shadow-xl hover:shadow-samsung-blue/15",
    iconWrap: "bg-samsung-blue/15 ring-samsung-blue/25",
    icon: "text-samsung-blue",
    step: "text-samsung-blue",
    cta: "text-white",
    dot: "border-samsung-blue/55",
  },
};

/** @deprecated Use HubReveal — kept as alias for below-fold imports. */
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

export function Home4GoalCard({ card, priority = false }: { card: GoalCard; priority?: boolean }) {
  const Icon = GOAL_ICONS[card.accent];

  return (
    <article
      className={`group relative overflow-hidden rounded-3xl bg-white/95 shadow-xl ring-1 ring-stone-200/80 backdrop-blur-sm transition-all duration-300 ease-apple hover:-translate-y-2 hover:shadow-2xl ${ACCENT_RING[card.accent]}`}
    >
      <Link
        href={card.href}
        prefetch={false}
        className="absolute inset-0 z-0 rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-samsung-blue focus-visible:ring-offset-2"
        aria-label={`Explore ${card.title}`}
      />
      <div className="relative z-[1] h-36 w-full overflow-hidden sm:h-40 pointer-events-none">
        <Image
          src={card.image}
          alt={getAlt(card.image, card.title)}
          fill
          unoptimized
          priority={priority}
          fetchPriority={priority ? "high" : "auto"}
          className="object-cover transition-transform duration-500 ease-apple group-hover:scale-105"
          sizes={GOAL_CARD_IMAGE_SIZES}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-shark/70 via-shark/20 to-transparent" />
        <div className={`absolute bottom-3 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold shadow-md ${ACCENT_TEXT[card.accent]}`}>
          <Icon className="h-3.5 w-3.5" aria-hidden />
          {card.badge}
        </div>
      </div>
      <div className="relative z-10 p-5 sm:p-6">
        <h2 className="text-lg font-semibold tracking-tight text-shark sm:text-xl">{card.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">{card.description}</p>
        <ul className="mt-4 space-y-1.5 border-t border-stone-100 pt-4">
          {card.links.map((link) => (
            <li key={`${link.label}-${link.href}`}>
              <Link
                href={link.href}
                prefetch={false}
                className="relative z-10 text-sm text-stone-600 transition-colors hover:text-samsung-blue"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <span
          className={`relative z-10 mt-5 inline-flex items-center gap-2 text-sm font-semibold ${ACCENT_TEXT[card.accent]}`}
        >
          Explore
          <ArrowRight className="h-4 w-4" aria-hidden />
        </span>
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
          unoptimized
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

export function Home4JourneyFunnel({ stages }: { stages: FunnelStage[] }) {
  return (
    <div className="relative mt-10">
      <div
        className="pointer-events-none absolute inset-x-[10%] top-7 hidden h-px bg-gradient-to-r from-cinematic-teal/25 via-samsung-blue/20 to-samsung-blue/35 lg:block"
        aria-hidden
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((stage, index) => {
          const styles = JOURNEY_STYLES[stage.accent];
          const Icon = JOURNEY_ICONS[stage.accent];
          const isAdvice = stage.accent === "advice";

          return (
            <Home4Reveal key={stage.step} delay={index * 0.06}>
              <Link
                href={stage.href}
                prefetch={false}
                className={`group relative flex h-full flex-col rounded-3xl p-5 ring-1 backdrop-blur-sm transition-all duration-300 ease-apple hover:-translate-y-1.5 hover:shadow-xl ${styles.card} focus:outline-none focus-visible:ring-2 focus-visible:ring-samsung-blue focus-visible:ring-offset-2`}
              >
                <div className="relative z-10 flex items-start justify-between gap-3">
                  <div
                    className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ring-1 ${styles.iconWrap}`}
                  >
                    <Icon className={`h-5 w-5 ${styles.icon}`} aria-hidden />
                  </div>
                  <span
                    className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-white text-[10px] font-bold shadow-sm ${styles.dot}`}
                  >
                    <span className={styles.step}>{stage.step}</span>
                  </span>
                </div>
                <h3 className="relative z-10 mt-4 text-lg font-semibold text-shark">{stage.title}</h3>
                <p className="relative z-10 mt-2 flex-1 text-sm leading-relaxed text-stone-600">
                  {stage.description}
                </p>
                <span
                  className={`relative z-10 mt-5 inline-flex w-fit items-center gap-1.5 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all ${
                    isAdvice
                      ? "bg-samsung-blue shadow-md shadow-samsung-blue/20 group-hover:bg-[#004a9e]"
                      : `bg-stone-100/90 group-hover:bg-stone-200/90 ${styles.cta}`
                  }`}
                >
                  {stage.cta}
                  <ArrowRight
                    className={`h-4 w-4 transition-transform group-hover:translate-x-0.5 ${isAdvice ? "text-white" : ""}`}
                    aria-hidden
                  />
                </span>
              </Link>
            </Home4Reveal>
          );
        })}
      </div>
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
          unoptimized
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
        <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: HUB_TEAL }}>{kicker}</p>
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
