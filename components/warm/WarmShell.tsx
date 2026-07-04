import Image from "next/image";
import Link from "next/link";
import { Home4Reveal, HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { Footer } from "@/components/Footer";
import { getAlt } from "@/lib/image-alt";
import {
  WARM_BODY,
  WARM_BTN_PRIMARY,
  WARM_BTN_SECONDARY,
  WARM_EYEBROW,
  WARM_EYEBROW_HERO,
  WARM_H1,
  WARM_H1_HERO,
  WARM_LEAD,
  WARM_SECTION,
  WARM_WRAP,
} from "@/lib/warm-theme";

type WarmHeroProps = {
  kicker: string;
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt?: string;
  priority?: boolean;
  children?: React.ReactNode;
  maxWidth?: "3xl" | "4xl" | "5xl";
};

export function WarmPage({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function WarmPageWithFooter({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}

export function WarmHero({
  kicker,
  title,
  description,
  imageSrc,
  imageAlt,
  priority,
  children,
  maxWidth = "3xl",
}: WarmHeroProps) {
  const maxClass =
    maxWidth === "5xl" ? "max-w-5xl" : maxWidth === "4xl" ? "max-w-4xl" : "max-w-3xl";

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt ?? getAlt(imageSrc, title)}
          fill
          priority={priority}
          unoptimized
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-shark/88 via-shark/60 to-shark/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-canvas via-shark/10 to-shark/25" />
      </div>

      <div className="relative pt-32 pb-20 sm:pt-36 sm:pb-24 md:pt-40 md:pb-28">
        <div className={`${HOME4_WRAP} ${maxClass}`}>
          <Home4Reveal>
            <p className={WARM_EYEBROW_HERO}>{kicker}</p>
            <h1 className={`mt-4 ${WARM_H1_HERO}`}>{title}</h1>
            {description && (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
                {description}
              </p>
            )}
            {children}
          </Home4Reveal>
        </div>
      </div>
    </section>
  );
}

/** Text hero on warm canvas — legal and utility pages without a photo band. */
export function WarmSimpleHero({
  kicker,
  title,
  description,
  children,
  centered,
}: {
  kicker?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  centered?: boolean;
}) {
  return (
    <section className={`${WARM_SECTION} pt-32 md:pt-40`}>
      <div className={`${WARM_WRAP} max-w-4xl ${centered ? "text-center mx-auto" : ""}`}>
        {kicker && <p className={WARM_EYEBROW}>{kicker}</p>}
        <h1 className={`mt-3 ${WARM_H1}`}>{title}</h1>
        {description && <p className={`mt-5 max-w-3xl ${WARM_LEAD} ${centered ? "mx-auto" : ""}`}>{description}</p>}
        {children}
      </div>
    </section>
  );
}

export function WarmSection({
  children,
  className = "",
  alt = false,
  narrow = false,
}: {
  children: React.ReactNode;
  className?: string;
  alt?: boolean;
  narrow?: boolean;
}) {
  return (
    <section className={`${alt ? "border-y border-stone-200/80 bg-white/60" : ""} ${WARM_SECTION} ${className}`}>
      <div className={`${WARM_WRAP} ${narrow ? "max-w-4xl" : ""}`}>{children}</div>
    </section>
  );
}

export function WarmPrimaryLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} prefetch={false} className={`${WARM_BTN_PRIMARY} ${className}`}>
      {children}
    </Link>
  );
}

export function WarmSecondaryLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} prefetch={false} className={`${WARM_BTN_SECONDARY} ${className}`}>
      {children}
    </Link>
  );
}

export function WarmProse({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`space-y-6 ${WARM_BODY} ${className}`}>{children}</div>;
}
