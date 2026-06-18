import type { ReactNode } from "react";

/** Shared layout tokens for AS Brokers lead-magnet / assessment funnels. */
export const funnel = {
  page: "min-h-screen bg-void",
  glow:
    "pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,84,159,0.28),transparent)]",
  inner: "relative mx-auto w-full max-w-3xl px-4 sm:px-6 md:px-8",
  stack: "flex flex-col gap-10 md:gap-12 pb-28 pt-28 md:pb-24",
  card: "rounded-[2rem] rim-light border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 md:p-10",
  cardAccent: "rounded-[2rem] border border-[#00549F]/25 bg-[#00549F]/[0.06] p-8 md:p-10",
  eyebrow: "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#00549F]",
  h1: "text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.12]",
  h2: "text-xl font-bold tracking-tight text-white sm:text-2xl",
  lead: "text-base leading-relaxed text-zinc-300 sm:text-lg",
  body: "text-sm leading-relaxed text-zinc-400",
  meta: "text-[11px] uppercase tracking-wider text-zinc-500",
  cta: "inline-flex items-center justify-center gap-2 rounded-[2rem] bg-[#00549F] px-8 py-3.5 text-sm font-semibold text-white transition duration-300 hover:bg-[#0066b8] hover:shadow-[0_0_28px_rgba(0,84,159,0.35)]",
  grid2: "grid gap-3 sm:grid-cols-2",
  tile: "flex min-h-[3.25rem] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-zinc-200",
  checkRow: "flex items-start gap-3 text-sm leading-relaxed text-zinc-300 sm:text-[0.95rem]",
} as const;

export function FunnelSectionHeader({
  title,
  subtitle,
  centered,
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
}) {
  return (
    <header className={centered ? "text-center" : "max-w-2xl"}>
      <h2 className={funnel.h2}>{title}</h2>
      {subtitle && <p className={`mt-3 ${funnel.body}`}>{subtitle}</p>}
    </header>
  );
}

export function FunnelCheckItem({ children }: { children: ReactNode }) {
  return (
    <li className={funnel.checkRow}>
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00549F]/20 text-xs font-bold text-[#7eb8e8]">
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}
