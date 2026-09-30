import Link from "next/link";

import { listLeadsBySourceFunnel } from "@/lib/crm/list-leads-by-funnel";

export const dynamic = "force-dynamic";

export default async function NewsletterSubscribersStudioPage() {
  const rows = await listLeadsBySourceFunnel("newsletter");

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <div>
        <Link href="/studio/newsletter" className="text-xs text-zinc-500 hover:text-white">
          ← Newsletter editions
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-white">Newsletter subscribers</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          People who subscribed via the website newsletter form. Editions are built on the Newsletter
          page; this list is the signup database.
        </p>
        <p className="mt-2 text-sm tabular-nums text-zinc-500">
          {rows.length} subscriber{rows.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#111] text-[11px] uppercase tracking-wide text-zinc-500">
            <tr>
              <th className="px-3 py-3">Email</th>
              <th className="px-3 py-3">Signed up</th>
              <th className="px-3 py-3">CRM lead</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-3 py-10 text-center text-sm text-zinc-500">
                  No subscribers yet. Footer newsletter signups appear here automatically.
                </td>
              </tr>
            ) : (
              rows.map((lead) => (
                <tr key={lead.id} className="border-t border-[#2a2a2a] text-zinc-300">
                  <td className="px-3 py-3 font-medium text-white">{lead.email || "—"}</td>
                  <td className="px-3 py-3 text-zinc-500">
                    {lead.createdAt ? lead.createdAt.slice(0, 16).replace("T", " ") : "—"}
                  </td>
                  <td className="px-3 py-3">
                    <Link
                      href={`/crm/leads/${lead.id}`}
                      className="text-[#3ecf8e] hover:underline"
                    >
                      Open in CRM
                    </Link>
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
