import Link from "next/link";

import type { CampaignProgress } from "@/lib/crm/goals";
import { cn } from "@/lib/utils";

const PACE_CLASS: Record<CampaignProgress["pace"], string> = {
  ahead: "text-[#3ecf8e] bg-[#3ecf8e]/10 border-[#3ecf8e]/30",
  on_track: "text-[#3ecf8e] bg-[#3ecf8e]/10 border-[#3ecf8e]/30",
  behind: "text-amber-300 bg-amber-500/10 border-amber-500/30",
  at_risk: "text-red-300 bg-red-500/15 border-red-500/30",
};

export function CrmCampaignBanner({ progress }: { progress: CampaignProgress }) {
  const { campaign, won, remaining, daysRemaining, percentComplete, paceLabel, pace, expectedWonByNow } =
    progress;

  return (
    <Link
      href="/crm/goals"
      className="block rounded-lg border border-[#3ecf8e]/20 bg-gradient-to-br from-[#0a0a0a] to-[#0f1a14] p-5 ring-1 ring-[#3ecf8e]/10 transition-colors hover:border-[#3ecf8e]/40"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#3ecf8e]">
            Owner goal · {campaign.ownerName}
          </p>
          <h2 className="mt-1 text-sm font-medium text-white">{campaign.title}</h2>
          <p className="mt-1 text-xs text-zinc-500">
            {campaign.areaLabel} · week {progress.weekNumber}/{progress.totalWeeks} · {daysRemaining} days left
          </p>
        </div>
        <span
          className={cn(
            "rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider",
            PACE_CLASS[pace]
          )}
        >
          {paceLabel}
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <p className="text-3xl font-semibold tabular-nums text-white">
          {won}
          <span className="text-lg font-medium text-zinc-500">/{campaign.targetClients}</span>
        </p>
        <p className="text-xs text-zinc-500">
          {remaining} to go · expected {expectedWonByNow} by now
        </p>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#1a1a1a]">
        <div
          className="h-full rounded-full bg-[#3ecf8e] transition-[width] duration-500"
          style={{ width: `${percentComplete}%` }}
        />
      </div>
    </Link>
  );
}
