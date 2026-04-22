import Image from "next/image";

/** Matches home / marketing content column width. */
export const PAGE_CONTENT_MAX = "max-w-7xl mx-auto px-4 sm:px-6 md:px-8";

const heights = {
  /** Primary band — same as home “Actuarial Engine” strip. */
  primary: "h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px]",
  /** Secondary band — same as home yield strip under Everest. */
  secondary: "h-[140px] sm:h-[160px] md:h-[180px]",
  /** Three-up row: shorter so the row stays editorial, not billboard. */
  tile: "h-[92px] sm:h-[104px] md:h-[116px] lg:h-[124px]",
} as const;

export type PageMediaVariant = keyof typeof heights;

type StripProps = {
  src: string;
  alt: string;
  variant?: PageMediaVariant;
  priority?: boolean;
  className?: string;
  rounded?: "2xl" | "3xl";
};

/**
 * Fixed-height panoramic media band. Use inside {@link PAGE_CONTENT_MAX} so width
 * aligns with grids and calculators below.
 */
export function PageMediaStrip({ src, alt, variant = "primary", priority, className, rounded = "2xl" }: StripProps) {
  const h = heights[variant];
  const round = rounded === "3xl" ? "rounded-[2rem]" : "rounded-2xl";
  return (
    <div
      className={`relative w-full overflow-hidden border border-white/10 rim-light ${round} ${h} ${className ?? ""}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center"
        sizes="(max-width: 1280px) 100vw, 1280px"
        priority={priority}
      />
    </div>
  );
}

type TripleItem = { src: string; alt: string };

type TripleProps = {
  items: readonly [TripleItem, TripleItem, TripleItem];
  className?: string;
};

/** Three equal tiles — same total width as {@link PageMediaStrip}. */
export function PageMediaStripTriple({ items, className }: TripleProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 ${className ?? ""}`}>
      {items.map((item) => (
        <div
          key={item.src}
          className={`relative w-full overflow-hidden rounded-2xl border border-white/10 rim-light ${heights.tile}`}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
}
