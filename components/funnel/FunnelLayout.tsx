import type { ReactNode } from "react";

/**
 * AS Brokers funnel layout, warm premium theme aligned with hub pages.
 */
export const funnel = {
  page: "min-h-screen bg-[#F7F6F3] text-[#1D1D1F]",
  glow:
    "pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_90%_55%_at_50%_-8%,rgba(0,107,107,0.08),transparent)]",
  shell: "relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
  stack: "flex flex-col gap-6 pb-20 pt-28 md:gap-8 md:pb-16 md:pt-32",
  card: "rounded-3xl bg-white p-6 shadow-xl ring-1 ring-stone-200/90 sm:p-8",
  cardAccent:
    "rounded-3xl bg-gradient-to-br from-samsung-blue/[0.06] via-white to-cinematic-teal/[0.08] p-6 shadow-xl ring-1 ring-stone-200/90 sm:p-8",
  cardSticky: "lg:sticky lg:top-28",
  toolShell: "pb-20 pt-28 md:pb-16 md:pt-32",
  toolScrollMargin: "scroll-mt-28 md:scroll-mt-32",
  divider: "border-t border-stone-200/80",
  eyebrow:
    "font-semibold uppercase tracking-[0.2em] text-cinematic-teal [font-size:clamp(0.6875rem,0.62rem+0.25vw,0.75rem)]",
  h1: "font-bold tracking-tight text-[#1D1D1F] [font-size:clamp(1.875rem,1.35rem+2vw,2.75rem)] [line-height:1.12]",
  h2: "font-bold tracking-tight text-[#1D1D1F] [font-size:clamp(1.125rem,1.05rem+0.4vw,1.375rem)]",
  h3: "text-sm font-semibold uppercase tracking-wide text-stone-500",
  lead: "leading-relaxed text-[#2B2B2E] [font-size:clamp(1.0625rem,1rem+0.2vw,1.1875rem)]",
  body: "leading-relaxed text-[#2B2B2E] [font-size:clamp(0.9375rem,0.9rem+0.12vw,1.0625rem)]",
  meta: "text-[11px] font-medium uppercase tracking-wider text-stone-500",
  cta: "inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-cta-glow-blue transition hover:bg-[#004a9e] sm:w-auto",
  ctaLg:
    "inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-samsung-blue px-8 py-4 text-base font-semibold text-white shadow-md shadow-cta-glow-blue transition hover:bg-[#004a9e] sm:w-auto",
  grid2: "grid gap-3 sm:grid-cols-2 sm:gap-4",
  grid4: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
  tile: "rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-700 ring-1 ring-stone-200/90",
  tileRow:
    "flex items-center gap-2.5 rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-700 ring-1 ring-stone-200/90",
  checkRow: "flex items-start gap-2.5 text-sm leading-snug text-stone-600",
  trustStrip:
    "flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-2xl bg-stone-50 px-4 py-3 text-xs text-stone-600 ring-1 ring-stone-200/90",
} as const;

/** Warm form controls for funnel wizards, high APCA contrast on white cards. */
export const funnelForm = {
  input:
    "w-full rounded-2xl border border-stone-200 bg-white px-4 py-3.5 text-[#1D1D1F] placeholder:text-stone-400 focus:border-samsung-blue/50 focus:outline-none focus:ring-2 focus:ring-samsung-blue/20 disabled:opacity-60",
  label: "mb-2 block text-sm font-medium text-stone-700",
  option:
    "rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-left text-sm font-medium text-stone-800 transition hover:border-stone-300 sm:text-base",
  optionSelected: "border-samsung-blue bg-samsung-blue/[0.06] text-[#1D1D1F] ring-1 ring-samsung-blue/30",
  progressTrack: "mt-2 h-1.5 overflow-hidden rounded-full bg-stone-200",
  progressFill: "h-full rounded-full bg-samsung-blue transition-all duration-500",
  questionMeta: "text-xs font-semibold uppercase tracking-wider text-stone-500",
  questionTitle:
    "mt-3 font-bold text-[#1D1D1F] [font-size:clamp(1.125rem,1.05rem+0.4vw,1.375rem)]",
  error: "text-sm text-amber-800",
  successBox: "rounded-2xl border border-cinematic-teal/30 bg-cinematic-teal/[0.06] px-6 py-8 text-center",
  successText: "text-sm text-stone-700",
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
        className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-cinematic-teal/15 text-[10px] font-bold text-cinematic-teal"
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
