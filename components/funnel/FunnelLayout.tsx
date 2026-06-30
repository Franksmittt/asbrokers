import type { ReactNode } from "react";

/**
 * AS Brokers funnel layout, wide, tight rhythm, conversion-focused.
 * Aligned with value-ladder lead magnets: one primary action, pre-handled objections, minimal friction.
 */
export const funnel = {
  page: "min-h-screen bg-void",
  glow:
    "pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_90%_55%_at_50%_-8%,rgba(0,84,159,0.22),transparent)]",
  /** Wide marketing column, aligned with site nav/footer (max-w-7xl) */
  shell: "relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
  stack: "flex flex-col gap-4 pb-20 pt-20 md:gap-5 md:pb-16 md:pt-24",
  card: "rounded-2xl rim-light border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 sm:p-5 md:p-6",
  cardAccent:
    "rounded-2xl border border-[#00549F]/30 bg-[#00549F]/[0.07] p-4 sm:p-5 md:p-6",
  cardSticky: "lg:sticky lg:top-24",
  /** Clears fixed site nav when wizard replaces landing */
  toolShell: "pb-20 pt-24 md:pb-16 md:pt-28",
  toolScrollMargin: "scroll-mt-28 md:scroll-mt-32",
  divider: "border-t border-white/10",
  eyebrow: "text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00549F]",
  h1: "text-[2rem] font-bold tracking-tight text-white sm:text-4xl lg:text-[2.65rem] lg:leading-[1.1]",
  h2: "text-lg font-bold tracking-tight text-white sm:text-xl",
  h3: "text-sm font-semibold uppercase tracking-wide text-zinc-400",
  lead: "text-base leading-relaxed text-zinc-200 sm:text-[1.05rem]",
  body: "text-sm leading-relaxed text-zinc-400",
  meta: "text-[11px] font-medium uppercase tracking-wider text-zinc-500",
  cta: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00549F] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0066b8] sm:w-auto",
  ctaLg: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00549F] px-8 py-4 text-base font-semibold text-white transition hover:bg-[#0066b8] sm:w-auto",
  grid2: "grid gap-2.5 sm:grid-cols-2 sm:gap-3",
  grid4: "grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4",
  tile: "rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-zinc-200",
  tileRow:
    "flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-zinc-200",
  checkRow: "flex items-start gap-2.5 text-sm leading-snug text-zinc-300",
  trustStrip:
    "flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-zinc-500",
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
        className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#00549F]/25 text-[10px] font-bold text-[#8ec4f0]"
        aria-hidden
      >
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}

/** Pre-handle objections inline (research: neutralize friction in narrative, not buried FAQ). */
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

/** Value ladder hint, lead magnet → next step */
export function FunnelAscensionHint() {
  return (
    <p className={`${funnel.body} border-t border-white/10 pt-4`}>
      <span className="text-zinc-500">After your checklist: </span>
      book a structured{" "}
      <a href="/contact" className="font-medium text-[#00549F] hover:underline">
        Estate Planning Review
      </a>{" "}
      with AS Brokers when you are ready.
    </p>
  );
}
