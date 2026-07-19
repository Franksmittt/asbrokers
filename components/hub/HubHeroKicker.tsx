type Props = {
  /** Short page name for mobile, e.g. "Everest" (~8–14 chars). */
  shortLabel: string;
  /** Longer page name for desktop, e.g. "Everest Wealth". */
  longLabel: string;
};

/**
 * Everest-matched hub eyebrow: AS Brokers · {page} · FSP 17273,
 * with Category 1.8 on desktop.
 */
export function HubHeroKicker({ shortLabel, longLabel }: Props) {
  return (
    <>
      <span className="sm:hidden">AS Brokers · {shortLabel} · FSP 17273</span>
      <span className="hidden sm:inline">
        AS Brokers · {longLabel} · Category 1.8 · FSP 17273
      </span>
    </>
  );
}
