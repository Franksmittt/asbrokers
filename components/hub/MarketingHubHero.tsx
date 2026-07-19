import type { ReactNode } from "react";
import { HOME4_WRAP } from "@/lib/layout-constants";
import {
  HUB_BODY,
  HUB_CANVAS,
  HUB_INK,
  HUB_TEAL,
} from "@/lib/hub-design-tokens";

type Props = {
  kicker: ReactNode;
  title: ReactNode;
  description: ReactNode;
  /** Route-owned photo, diagram, or visual. Keeps LCP delivery route-specific. */
  visual?: ReactNode;
  /** Primary + secondary CTAs. Use the same three visual variants sitewide. */
  actions?: ReactNode;
  /** Route-owned in-page navigation or domain cards, below the consistent split row. */
  after?: ReactNode;
  imageFirstOnMobile?: boolean;
  textSpan?: "lg:col-span-7" | "lg:col-span-6";
  visualSpan?: "lg:col-span-5" | "lg:col-span-6";
  borderBottom?: boolean;
};

/**
 * Server-only public-hub hero shell.
 * It deliberately accepts a visual slot: static images, responsive pictures and
 * educational SVGs have different LCP contracts and must not be forced through
 * one image implementation.
 */
export function MarketingHubHero({
  kicker,
  title,
  description,
  visual,
  actions,
  after,
  imageFirstOnMobile = false,
  textSpan = "lg:col-span-7",
  visualSpan = "lg:col-span-5",
  borderBottom = false,
}: Props) {
  const visualOrder = imageFirstOnMobile ? "order-first lg:order-last" : "";

  return (
    <header
      data-chunk-boundary="true"
      className={`${borderBottom ? "border-b" : ""} pb-12 pt-28 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40`}
      style={{ backgroundColor: HUB_CANVAS, borderColor: borderBottom ? "#E5E5E5" : undefined }}
    >
      <div className={`${HOME4_WRAP} grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12`}>
        <div className={`min-w-0 ${textSpan}`}>
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.18em]"
            style={{ color: HUB_TEAL }}
          >
            {kicker}
          </p>
          <h1
            className="mt-5 max-w-3xl font-serif font-semibold tracking-tight text-balance"
            style={{ fontSize: "clamp(1.875rem, 1.4rem + 2vw, 3rem)", lineHeight: 1.15, color: HUB_INK }}
          >
            {title}
          </h1>
          <p
            className="mt-5 max-w-xl leading-relaxed"
            style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: HUB_BODY }}
          >
            {description}
          </p>
          {actions ? (
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3">
              {actions}
            </div>
          ) : null}
        </div>
        {visual ? (
          <div className={`min-h-0 min-w-0 self-stretch ${visualSpan} ${visualOrder}`}>{visual}</div>
        ) : null}
      </div>
      {after ? <div className={`${HOME4_WRAP} mt-10 border-t pt-6`} style={{ borderColor: "#E5E5E5" }}>{after}</div> : null}
    </header>
  );
}
