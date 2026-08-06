"use client";

import Link from "next/link";

import { ArrowLeft } from "@/components/icons";
import { LeadDetailGate } from "@/components/crm/LeadDetailGate";
import { LeadDetailView } from "@/components/crm/LeadDetailView";
import type { LeadDetails } from "@/lib/crm/types";

export function LeadDetailPageClient({
  details,
  staffName,
}: {
  details: LeadDetails | null;
  staffName: string;
}) {
  if (!details) {
    return (
      <div className="space-y-6">
        <Link
          href="/crm/kanban"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-100 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to Kanban
        </Link>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-10 text-center">
          <h1 className="text-xl font-semibold text-white">Lead not found</h1>
          <p className="mt-2 text-sm text-white/65">
            This lead may have been removed, or you do not have access to it.
          </p>
          <Link
            href="/crm/leads"
            className="mt-6 inline-flex rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-600"
          >
            Browse leads
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/crm/kanban"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-100 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to Kanban
      </Link>
      <LeadDetailGate lead={details.lead}>
        <LeadDetailView
          lead={details.lead}
          correspondence={details.correspondence}
          reminders={details.reminders}
          tasks={details.tasks}
          staffName={staffName}
        />
      </LeadDetailGate>
    </div>
  );
}
