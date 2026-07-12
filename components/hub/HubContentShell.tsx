"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { HubReveal } from "@/components/hub/HubReveal";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { getAlt } from "@/lib/image-alt";
import {
  HUB_TEAL as TEAL,
  HUB_CANVAS as CANVAS,
  HUB_INK as INK,
  HUB_BODY as BODY,
} from "@/lib/hub-design-tokens";
import { HUB_SPLIT_HERO_SIZES } from "@/lib/hub-lcp";

const GRID = `${HOME4_WRAP} grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8`;

export function PageWithFooter({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}

/** Text-only utility hero on warm canvas (quiz, chat, legal-style intros). */
export function HubUtilityHero({
  kicker,
  title,
  description,
  children,
  centered,
}: {
  kicker?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  centered?: boolean;
}) {
  return (
    <header
      className="pb-10 pt-28 md:pb-12 md:pt-36"
      style={{ backgroundColor: CANVAS }}
    >
      <div className={`${HOME4_WRAP} max-w-4xl ${centered ? "mx-auto text-center" : ""}`}>
        {kicker ? (
          <p
            className="font-semibold uppercase tracking-[0.12em] sm:tracking-[0.18em]"
            style={{ fontSize: "clamp(0.6875rem, 0.62rem + 0.25vw, 0.75rem)", color: TEAL }}
          >
            {kicker}
          </p>
        ) : null}
        <h1
          className={`${kicker ? "mt-4" : ""} font-bold tracking-tight`}
          style={{
            fontSize: "clamp(1.875rem, 1.35rem + 2vw, 2.75rem)",
            lineHeight: 1.12,
            color: INK,
          }}
        >
          {title}
        </h1>
        {description ? (
          <p
            className={`mt-5 max-w-3xl leading-relaxed ${centered ? "mx-auto" : ""}`}
            style={{ fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem)", color: BODY }}
          >
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </header>
  );
}

/** Split hero, text cols 1–6, image cols 7–12 (no text overlay). */
export function HubSplitHero({
  kicker,
  title,
  description,
  imageSrc,
  imageAlt,
  children,
  priority = true,
}: {
  kicker: string;
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt?: string;
  children?: ReactNode;
  priority?: boolean;
}) {
  return (
    <header
      className="pb-12 pt-28 md:pb-16 md:pt-36"
      style={{ backgroundColor: CANVAS }}
    >
      <div className={`${GRID} items-center gap-y-8`}>
        <HubReveal className="min-w-0 lg:col-span-6">
          <p
            className="font-semibold uppercase tracking-[0.12em] sm:tracking-[0.18em]"
            style={{ fontSize: "clamp(0.6875rem, 0.62rem + 0.25vw, 0.75rem)", color: TEAL }}
          >
            {kicker}
          </p>
          <h1
            className="mt-4 font-bold tracking-tight"
            style={{
              fontSize: "clamp(1.875rem, 1.35rem + 2vw, 2.75rem)",
              lineHeight: 1.12,
              color: INK,
            }}
          >
            {title}
          </h1>
          {description ? (
            <p
              className="mt-5 max-w-xl leading-relaxed"
              style={{ fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem)", color: BODY }}
            >
              {description}
            </p>
          ) : null}
          {children}
        </HubReveal>
        <HubReveal delay={0.06} className="min-w-0 lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(29,29,31,0.1)] ring-1 ring-stone-300/70">
            <Image
              src={imageSrc}
              alt={getAlt(imageSrc, imageAlt ?? title)}
              fill
              priority={priority}
              fetchPriority={priority ? "high" : "auto"}
              className="object-cover object-center"
              sizes={HUB_SPLIT_HERO_SIZES}
            />
          </div>
        </HubReveal>
      </div>
    </header>
  );
}

export function HubContentSection({
  children,
  className = "",
  narrow = false,
  alt = false,
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
  alt?: boolean;
}) {
  return (
    <section
      className={`py-12 md:py-16 ${alt ? "border-y border-stone-200/80 bg-white/60" : ""} ${className}`}
      style={alt ? undefined : { backgroundColor: CANVAS }}
    >
      <div className={`${HOME4_WRAP} ${narrow ? "max-w-4xl" : ""}`}>{children}</div>
    </section>
  );
}
