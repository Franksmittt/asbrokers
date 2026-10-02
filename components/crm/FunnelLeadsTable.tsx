import Link from "next/link";

import type { CrmLead } from "@/lib/crm/types";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  emptyMessage: string;
  rows: CrmLead[];
  studioHref?: { href: string; label: string };
};

/** Simple read-only funnel lead table for CRM admin pages. */
export function FunnelLeadsTable({
  eyebrow,
  title,
  description,
  emptyMessage,
  rows,
  studioHref,
}: Props) {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#52525b]">
            {eyebrow}
          </p>
          <h1 className="text-2xl font-bold text-[#1D1D1F] sm:text-3xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#52525b]">{description}</p>
          <p className="mt-2 text-sm tabular-nums text-[#52525b]">
            {rows.length} record{rows.length === 1 ? "" : "s"}
          </p>
        </div>
        {studioHref ? (
          <Link
            href={studioHref.href}
            className="rounded-md border border-[#E5E5E5] px-3 py-2 text-xs font-medium text-[#3F3F46] hover:text-[#1D1D1F]"
          >
            {studioHref.label}
          </Link>
        ) : null}
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#E5E5E5]">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#FAFAF8] text-[11px] uppercase tracking-wide text-[#52525b]">
            <tr>
              <th className="px-3 py-3">Name</th>
              <th className="px-3 py-3">Email</th>
              <th className="px-3 py-3">Intent</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Signed up</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-10 text-center text-sm text-[#52525b]">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((lead) => (
                <tr key={lead.id} className="border-t border-[#E5E5E5] text-[#3F3F46]">
                  <td className="px-3 py-3">
                    <Link href={`/crm/leads/${lead.id}`} className="font-medium text-[#1D1D1F] hover:underline">
                      {lead.name}
                    </Link>
                  </td>
                  <td className="px-3 py-3">{lead.email || "—"}</td>
                  <td className="px-3 py-3 text-[#52525b]">{lead.intent || "—"}</td>
                  <td className="px-3 py-3 capitalize text-[#52525b]">{lead.status}</td>
                  <td className="px-3 py-3 text-[#52525b]">
                    {lead.createdAt ? lead.createdAt.slice(0, 16).replace("T", " ") : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
