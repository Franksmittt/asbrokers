type Props = {
  weeks: number;
  label?: string;
};

/** Soft progress ring for weekly Momentum — Apple Fitness–inspired, adult tone. */
export function MomentumRing({ weeks, label = "Momentum" }: Props) {
  const size = 72;
  const stroke = 7;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(weeks / 4, 1);
  const offset = circumference * (1 - progress);

  return (
    <div className="flex items-center gap-3">
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-stone-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-[#0B7A78] transition-[stroke-dashoffset] duration-700 motion-reduce:transition-none"
        />
      </svg>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">{label}</p>
        <p className="text-xl font-bold text-shark">
          {weeks} <span className="text-sm font-medium text-stone-500">week{weeks === 1 ? "" : "s"}</span>
        </p>
      </div>
    </div>
  );
}
