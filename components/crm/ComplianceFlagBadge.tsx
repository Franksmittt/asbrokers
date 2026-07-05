"use client";

import { getLeadComplianceFlags } from "@/lib/crm/compliance-flags";
import type { CrmLead } from "@/lib/crm/types";
import { cn } from "@/lib/utils";

export function ComplianceFlagBadge({
  lead,
  compact = false,
}: {
  lead: CrmLead;
  compact?: boolean;
}) {
  const flags = getLeadComplianceFlags(lead);
  if (flags.length === 0) return null;

  const high = flags.filter((f) => f.severity === "high");

  if (compact) {
    return (
      <span
        className={cn(
          "rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide",
          high.length > 0
            ? "bg-red-500/15 text-red-300 ring-1 ring-red-500/30"
            : "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30"
        )}
        title={flags.map((f) => f.message).join(" · ")}
      >
        {high.length > 0 ? "Compliance" : "Review"}
      </span>
    );
  }

  return (
    <div className="space-y-2">
      {flags.map((flag) => (
        <div
          key={flag.code}
          className={cn(
            "rounded-xl px-3 py-2 text-xs ring-1",
            flag.severity === "high"
              ? "bg-red-500/10 text-red-200 ring-red-500/25"
              : "bg-amber-500/10 text-amber-200 ring-amber-500/25"
          )}
        >
          <p className="font-semibold uppercase tracking-wide text-[9px] opacity-80">
            {flag.severity === "high" ? "Compliance flag" : "Advisory note"}
          </p>
          <p className="mt-1 leading-relaxed">{flag.message}</p>
        </div>
      ))}
    </div>
  );
}
