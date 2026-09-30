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
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            {eyebrow}
          </p>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">{description}</p>
          <p className="mt-2 text-sm tabular-nums text-zinc-500">
            {rows.length} record{rows.length === 1 ? "" : "s"}
          </p>
        </div>
        {studioHref ? (
          <Link
            href={studioHref.href}
            className="rounded-md border border-[#2a2a2a] px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white"
          >
            {studioHref.label}
          </Link>
        ) : null}
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#111] text-[11px] uppercase tracking-wide text-zinc-500">
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
                <td colSpan={5} className="px-3 py-10 text-center text-sm text-zinc-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((lead) => (
                <tr key={lead.id} className="border-t border-[#2a2a2a] text-zinc-300">
                  <td className="px-3 py-3">
                    <Link href={`/crm/leads/${lead.id}`} className="font-medium text-white hover:underline">
                      {lead.name}
                    </Link>
                  </td>
                  <td className="px-3 py-3">{lead.email || "—"}</td>
                  <td className="px-3 py-3 text-zinc-400">{lead.intent || "—"}</td>
                  <td className="px-3 py-3 capitalize text-zinc-400">{lead.status}</td>
                  <td className="px-3 py-3 text-zinc-500">
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
