"use client";

import Link from "next/link";
import { notFound } from "next/navigation";

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
  if (!details) notFound();

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
