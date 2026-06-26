"use client";

import Link from "next/link";
import { useCrm } from "@/components/crm/CrmContext";
import { SERVICE_LABELS } from "@/lib/crm/types";
import { formatAdvisorLabel, formatLeadStatus } from "@/lib/crm/utils";

export default function CrmLeadsPage() {
  const { visibleLeads } = useCrm();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-white">Leads</h1>
        <p className="mt-2 text-sm text-gray-100 tabular-nums">
          {visibleLeads.length} records in view
        </p>
      </header>
      <div className="overflow-x-auto rounded-[2rem] rim-light">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
              <th className="px-5 py-4 font-medium">Name</th>
              <th className="px-5 py-4 font-medium">Service</th>
              <th className="px-5 py-4 font-medium">Status</th>
              <th className="px-5 py-4 font-medium">Advisor</th>
              <th className="px-5 py-4 font-medium">Score</th>
            </tr>
          </thead>
          <tbody>
            {visibleLeads.map((lead) => (
              <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-5 py-3">
                  <Link
                    href={`/crm/leads/${lead.id}`}
                    className="font-medium text-white hover:text-cinematic-teal"
                  >
                    {lead.name}
                  </Link>
                </td>
                <td className="px-5 py-3 text-gray-100">{SERVICE_LABELS[lead.service_category]}</td>
                <td className="px-5 py-3 text-gray-100">{formatLeadStatus(lead.status)}</td>
                <td className="px-5 py-3 text-gray-100">
                  {formatAdvisorLabel(lead.assignedAdvisorId)}
                </td>
                <td className="px-5 py-3">
                  <span className="rounded-full bg-supernova-gold/20 px-2 py-0.5 text-xs font-bold tabular-nums text-supernova-gold">
                    {lead.lead_score}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
