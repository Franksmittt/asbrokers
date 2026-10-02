import Link from "next/link";

import type { CampaignProgress } from "@/lib/crm/goals";
import { cn } from "@/lib/utils";

const PACE_CLASS: Record<CampaignProgress["pace"], string> = {
  ahead: "text-[#006B6B] bg-[#E8F3F3] border-[#006B6B]/30",
  on_track: "text-[#006B6B] bg-[#E8F3F3] border-[#006B6B]/30",
  behind: "text-amber-900 bg-amber-50 border-amber-200",
  at_risk: "text-red-800 bg-red-50 border-red-200",
};

export function CrmCampaignBanner({ progress }: { progress: CampaignProgress }) {
  const { campaign, won, remaining, daysRemaining, percentComplete, paceLabel, pace, expectedWonByNow } =
    progress;

  return (
    <Link
      href="/crm/goals"
      className="block rounded-lg border border-[#A7F3D0] bg-gradient-to-br from-white to-[#ECFDF5] p-5 ring-1 ring-[#A7F3D0]/60 transition-colors hover:border-[#006B6B]/35"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#006B6B]">
            Owner goal · {campaign.ownerName}
          </p>
          <h2 className="mt-1 text-sm font-medium text-[#1D1D1F]">{campaign.title}</h2>
          <p className="mt-1 text-xs text-[#52525b]">
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
        <p className="text-3xl font-semibold tabular-nums text-[#1D1D1F]">
          {won}
          <span className="text-lg font-medium text-[#52525b]">/{campaign.targetClients}</span>
        </p>
        <p className="text-xs text-[#52525b]">
          {remaining} to go · expected {expectedWonByNow} by now
        </p>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#1a1a1a]">
        <div
          className="h-full rounded-full bg-[#006B6B] transition-[width] duration-500"
          style={{ width: `${percentComplete}%` }}
        />
      </div>
    </Link>
  );
}
