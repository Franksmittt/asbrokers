"use client";

import { clientProfile } from "@/lib/mock-portal";
import { computeRetirementReadinessScore } from "@/lib/portal/retirement-readiness-score";
import { cn } from "@/lib/utils";

const BAND_STYLES = {
  excellent: "from-cinematic-teal/20 to-shark text-cinematic-teal ring-cinematic-teal/30",
  good: "from-samsung-blue/15 to-shark text-samsung-blue ring-samsung-blue/25",
  attention: "from-amber-500/15 to-shark text-amber-300 ring-amber-500/30",
  critical: "from-red-500/15 to-shark text-red-300 ring-red-500/30",
};

export function PortalRetirementReadiness() {
  const result = computeRetirementReadinessScore(clientProfile);

  return (
    <section
      className={cn(
        "rim-light rounded-[2rem] bg-gradient-to-br p-6 ring-1 lg:p-8",
        BAND_STYLES[result.band]
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wider opacity-70">
        Retirement Readiness Score
      </p>
      <div className="mt-3 flex flex-wrap items-end gap-4">
        <p className="text-5xl font-bold tabular-nums tracking-tight">{result.score}</p>
        <div>
          <p className="text-lg font-semibold">{result.headline}</p>
          <p className="mt-1 text-sm opacity-80">{result.detail}</p>
        </div>
      </div>
      <p className="mt-4 text-[11px] opacity-60">
        Illustrative score from your portfolio snapshot · Ask Albert for a full Everest review.
      </p>
    </section>
  );
}
