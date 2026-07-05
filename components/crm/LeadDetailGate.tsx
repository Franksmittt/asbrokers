"use client";

import type { ReactNode } from "react";
import type { CrmLead } from "@/lib/crm/types";
import { useCrm } from "@/components/crm/CrmContext";

export function LeadDetailGate({
  lead,
  children,
}: {
  lead: CrmLead;
  children: ReactNode;
}) {
  const { role, staffId } = useCrm();

  if (role === "staff" && lead.assignedAdvisorId !== staffId && lead.delegatedAdvisorId !== staffId) {
    return (
      <div className="rounded-[2rem] rim-light p-8 text-center">
        <p className="text-lg font-semibold text-white">Lead not in your view</p>
        <p className="mt-2 text-sm text-gray-100">
          This lead is assigned to another advisor. Contact your principal if you need access.
        </p>
      </div>
    );
  }

  return children;
}
