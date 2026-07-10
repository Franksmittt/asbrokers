import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
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

const GOAL_CARD_IMAGE_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px";

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

/** Photo-led pathway — image first, no icon badges or heavy overlays. */
export function Home4GoalCard({ card, priority = false }: { card: GoalCard; priority?: boolean }) {
  return (
    <article className="group relative">
      <Link
        href={card.href}
        prefetch={false}
        className="absolute inset-0 z-0 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-samsung-blue focus-visible:ring-offset-2"
        aria-label={`Explore ${card.title}`}
      />
      <div className="relative z-[1] aspect-[16/10] w-full overflow-hidden pointer-events-none">
        <Image
          src={card.image}
          alt={getAlt(card.image, card.title)}
          fill
          unoptimized
          priority={priority}
          fetchPriority={priority ? "high" : "auto"}
          className="object-cover transition-transform duration-700 ease-apple group-hover:scale-[1.03]"
          sizes={GOAL_CARD_IMAGE_SIZES}
        />
      </div>
      <div className="relative z-10 pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
          {card.badge}
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-shark sm:text-2xl">
          {card.title}
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-stone-600 sm:text-base">
          {card.description}
        </p>
        <ul className="mt-4 space-y-1.5">
          {card.links.slice(0, 3).map((link) => (
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
        <span className="relative z-10 mt-5 inline-flex items-center gap-2 text-sm font-semibold text-samsung-blue">
          Explore
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
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
      className="group flex flex-col overflow-hidden"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={tile.image}
          alt={getAlt(tile.image, tile.label)}
          fill
          unoptimized
          className="object-cover transition-transform duration-700 ease-apple group-hover:scale-[1.03]"
          sizes={GOAL_CARD_IMAGE_SIZES}
        />
      </div>
      <div className="flex flex-1 flex-col pt-4">
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

/** Quiet numbered steps — no connector arrows, no glass dashboard panel. */
export function Home4JourneyFunnel({ stages }: { stages: FunnelStage[] }) {
  return (
    <ol className="mt-10 grid list-none gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      {stages.map((stage, index) => (
        <li key={stage.step}>
          <Home4Reveal delay={index * 0.06}>
            <div className="relative h-full">
              <Link
                href={stage.href}
                prefetch={false}
                className="absolute inset-0 z-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-samsung-blue focus-visible:ring-offset-2"
                aria-label={`${stage.cta}: ${stage.title}`}
              />
              <span className="relative z-10 font-serif text-4xl text-stone-300" aria-hidden>
                {stage.step}
              </span>
              <h3 className="relative z-10 mt-3 text-lg font-semibold text-shark">{stage.title}</h3>
              <p className="relative z-10 mt-2 text-sm leading-relaxed text-stone-600">{stage.description}</p>
              <span className="relative z-10 mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-samsung-blue">
                {stage.cta}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </div>
          </Home4Reveal>
        </li>
      ))}
    </ol>
  );
}

export function Home4TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="flex h-full flex-col">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={item.photo}
          alt={getAlt(item.photo, `${item.who}, client story`)}
          fill
          unoptimized
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <blockquote className="flex flex-1 flex-col pt-5">
        <p className="text-sm leading-relaxed text-stone-700 sm:text-[15px]">&ldquo;{item.quote}&rdquo;</p>
        <figcaption className="mt-4 text-sm">
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
