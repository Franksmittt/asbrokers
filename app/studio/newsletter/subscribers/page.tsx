import Link from "next/link";

import { listLeadsBySourceFunnel } from "@/lib/crm/list-leads-by-funnel";

export const dynamic = "force-dynamic";

export default async function NewsletterSubscribersStudioPage() {
  const rows = await listLeadsBySourceFunnel("newsletter");

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <div>
        <Link href="/studio/newsletter" className="text-xs text-[#52525b] hover:text-[#1D1D1F]">
          ← Newsletter editions
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-[#1D1D1F]">Newsletter subscribers</h1>
        <p className="mt-2 max-w-2xl text-sm text-[#52525b]">
          People who subscribed via the website newsletter form. Editions are built on the Newsletter
          page; this list is the signup database.
        </p>
        <p className="mt-2 text-sm tabular-nums text-[#52525b]">
          {rows.length} subscriber{rows.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#E5E5E5]">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#FAFAF8] text-[11px] uppercase tracking-wide text-[#52525b]">
            <tr>
              <th className="px-3 py-3">Email</th>
              <th className="px-3 py-3">Signed up</th>
              <th className="px-3 py-3">CRM lead</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-3 py-10 text-center text-sm text-[#52525b]">
                  No subscribers yet. Footer newsletter signups appear here automatically.
                </td>
              </tr>
            ) : (
              rows.map((lead) => (
                <tr key={lead.id} className="border-t border-[#E5E5E5] text-[#3F3F46]">
                  <td className="px-3 py-3 font-medium text-[#1D1D1F]">{lead.email || "—"}</td>
                  <td className="px-3 py-3 text-[#52525b]">
                    {lead.createdAt ? lead.createdAt.slice(0, 16).replace("T", " ") : "—"}
                  </td>
                  <td className="px-3 py-3">
                    <Link
                      href={`/crm/leads/${lead.id}`}
                      className="text-[#006B6B] hover:underline"
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
