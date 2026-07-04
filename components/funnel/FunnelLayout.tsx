import type { ReactNode } from "react";

/**
 * AS Brokers funnel layout — warm premium theme aligned with home/contact/retirement.
 */
export const funnel = {
  page: "min-h-screen bg-warm-canvas text-shark",
  glow:
    "pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_90%_55%_at_50%_-8%,rgba(0,87,184,0.12),transparent)]",
  shell: "relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
  stack: "flex flex-col gap-4 pb-20 pt-20 md:gap-5 md:pb-16 md:pt-24",
  card: "rounded-3xl bg-white/95 p-4 shadow-xl ring-1 ring-stone-200/80 backdrop-blur-sm sm:p-5 md:p-6",
  cardAccent:
    "rounded-3xl bg-gradient-to-br from-samsung-blue/10 via-white to-cinematic-teal/10 p-4 shadow-lg ring-1 ring-stone-200/80 sm:p-5 md:p-6",
  cardSticky: "lg:sticky lg:top-24",
  toolShell: "pb-20 pt-24 md:pb-16 md:pt-28",
  toolScrollMargin: "scroll-mt-28 md:scroll-mt-32",
  divider: "border-t border-stone-200/80",
  eyebrow: "text-[11px] font-semibold uppercase tracking-[0.2em] text-samsung-blue",
  h1: "text-[2rem] font-bold tracking-tight text-shark sm:text-4xl lg:text-[2.65rem] lg:leading-[1.1]",
  h2: "text-lg font-bold tracking-tight text-shark sm:text-xl",
  h3: "text-sm font-semibold uppercase tracking-wide text-stone-500",
  lead: "text-base leading-relaxed text-stone-600 sm:text-[1.05rem]",
  body: "text-sm leading-relaxed text-stone-600",
  meta: "text-[11px] font-medium uppercase tracking-wider text-stone-500",
  cta: "inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-samsung-blue/20 transition hover:bg-[#004a9e] sm:w-auto",
  ctaLg:
    "inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-samsung-blue px-8 py-4 text-base font-semibold text-white shadow-md shadow-samsung-blue/20 transition hover:bg-[#004a9e] sm:w-auto",
  grid2: "grid gap-2.5 sm:grid-cols-2 sm:gap-3",
  grid4: "grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4",
  tile: "rounded-2xl bg-white/80 px-3.5 py-2.5 text-sm text-stone-700 ring-1 ring-stone-200/80",
  tileRow:
    "flex items-center gap-2.5 rounded-2xl bg-white/80 px-3.5 py-2.5 text-sm text-stone-700 ring-1 ring-stone-200/80",
  checkRow: "flex items-start gap-2.5 text-sm leading-snug text-stone-600",
  trustStrip:
    "flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-2xl bg-white/80 px-4 py-3 text-xs text-stone-500 ring-1 ring-stone-200/80",
} as const;

export function FunnelSectionHeader({
  title,
  subtitle,
  centered,
  compact,
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
  compact?: boolean;
}) {
  return (
    <header className={centered ? "text-center" : undefined}>
      <h2 className={funnel.h2}>{title}</h2>
      {subtitle && <p className={`${compact ? "mt-2" : "mt-2.5"} ${funnel.body}`}>{subtitle}</p>}
    </header>
  );
}

export function FunnelCheckItem({ children }: { children: ReactNode }) {
  return (
    <li className={funnel.checkRow}>
      <span
        className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-samsung-blue/15 text-[10px] font-bold text-samsung-blue"
        aria-hidden
      >
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}

export function FunnelObjectionStrip() {
  return (
    <ul className={`${funnel.trustStrip} !justify-start text-left`}>
      <li>Free checklist, no payment</li>
      <li className="hidden sm:list-item">Educational only, not legal advice</li>
      <li>FSP 17273 · Independent adviser</li>
      <li className="hidden md:list-item">Instant PDF, no waiting</li>
    </ul>
  );
}

export function FunnelAscensionHint() {
  return (
    <p className={`${funnel.body} border-t border-stone-200/80 pt-4`}>
      <span className="text-stone-500">After your checklist: </span>
      book a structured{" "}
      <a href="/contact" className="font-medium text-samsung-blue hover:text-cinematic-teal">
        Estate Planning Review
      </a>{" "}
      with AS Brokers when you are ready.
    </p>
  );
}
