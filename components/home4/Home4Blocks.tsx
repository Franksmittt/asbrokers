"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar, LineChart, Scroll, ShieldCheck } from "@/components/icons";
import type {
  CalculatorTile,
  FunnelStage,
  GoalCard,
  Testimonial,
} from "@/lib/home4-journey";
import { getAlt } from "@/lib/image-alt";

export const HOME4_WRAP = "mx-auto max-w-7xl px-4 sm:px-6 md:px-8";

const APPLE_EASE = [0.25, 0.1, 0.25, 1] as const;

const ACCENT_RING: Record<GoalCard["accent"], string> = {
  teal: "ring-cinematic-teal/25 hover:ring-cinematic-teal/45",
  blue: "ring-samsung-blue/25 hover:ring-samsung-blue/45",
  orange: "ring-orange-300/40 hover:ring-orange-400/55",
  gold: "ring-amber-300/40 hover:ring-amber-400/55",
};

const ACCENT_TEXT: Record<GoalCard["accent"], string> = {
  teal: "text-cinematic-teal",
  blue: "text-samsung-blue",
  orange: "text-orange-600",
  gold: "text-amber-700",
};

const GOAL_ICONS: Record<GoalCard["accent"], typeof LineChart> = {
  teal: Calendar,
  blue: LineChart,
  orange: ShieldCheck,
  gold: Scroll,
};

export function Home4Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: APPLE_EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Home4PreviewBanner() {
  return (
    <div className="border-b border-violet-200/80 bg-violet-50/90 px-4 py-2 text-center text-xs text-violet-900 sm:text-sm">
      Preview at <span className="font-mono font-semibold">/home4</span> — warm, public-facing homepage
      (not indexed)
    </div>
  );
}

export function Home4GoalCard({ card }: { card: GoalCard }) {
  const Icon = GOAL_ICONS[card.accent];
  const reduce = useReducedMotion();

  const motionProps = reduce
    ? {}
    : {
        whileHover: { y: -8, transition: { duration: 0.35, ease: APPLE_EASE } },
      };

  return (
    <motion.article
      {...motionProps}
      className={`group relative overflow-hidden rounded-3xl bg-white/95 shadow-xl ring-1 ring-stone-200/80 backdrop-blur-sm transition-shadow duration-300 ease-apple hover:shadow-2xl ${ACCENT_RING[card.accent]}`}
    >
      <div className="relative h-36 w-full overflow-hidden sm:h-40">
        <Image
          src={card.image}
          alt={getAlt(card.image, card.title)}
          fill
          className="object-cover transition-transform duration-500 ease-apple group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-shark/70 via-shark/20 to-transparent" />
        <div className={`absolute bottom-3 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold shadow-md ${ACCENT_TEXT[card.accent]}`}>
          <Icon className="h-3.5 w-3.5" aria-hidden />
          {card.badge}
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-semibold tracking-tight text-shark sm:text-xl">{card.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">{card.description}</p>
        <ul className="mt-4 space-y-1.5 border-t border-stone-100 pt-4">
          {card.links.map((link) => (
            <li key={link.href}>
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
          className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${ACCENT_TEXT[card.accent]} transition-opacity hover:opacity-80`}
        >
          Explore
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </motion.article>
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
          className="object-cover transition-transform duration-500 ease-apple group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-shark/55 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold text-shark">{tile.label}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-stone-600">{tile.description}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cinematic-teal">
          Open calculator
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

export function Home4JourneyFunnel({ stages }: { stages: FunnelStage[] }) {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stages.map((stage, index) => (
        <Home4Reveal key={stage.step} delay={index * 0.06}>
          <div className="relative h-full rounded-3xl bg-white/80 p-5 shadow-md ring-1 ring-stone-200/70 backdrop-blur-sm">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-cinematic-teal">
              {stage.step}
            </span>
            <h3 className="mt-2 text-lg font-semibold text-shark">{stage.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">{stage.description}</p>
            <Link
              href={stage.href}
              prefetch={false}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-samsung-blue hover:text-cinematic-teal"
            >
              {stage.cta}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            {index < stages.length - 1 ? (
              <span
                className="pointer-events-none absolute -right-2 top-1/2 hidden -translate-y-1/2 text-stone-300 lg:inline"
                aria-hidden
              >
                →
              </span>
            ) : null}
          </div>
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
          alt={getAlt(item.photo, `${item.who} — client story`)}
          fill
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
}: {
  kicker?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      {kicker ? (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cinematic-teal">{kicker}</p>
      ) : null}
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-shark sm:text-3xl md:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-3 text-base leading-relaxed text-stone-600 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
