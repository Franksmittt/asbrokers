import Link from "next/link";

import {
  CRM_LEAD_STALE_DAYS,
  listExpiredLeadContacts,
} from "@/lib/crm/archive-stale-leads";

export const metadata = {
  title: "Expired leads | AS Brokers",
  description: "Contacts retained after pipeline leads expire (newsletter-safe).",
};

export const dynamic = "force-dynamic";

export default async function ExpiredLeadsPage() {
  const contacts = await listExpiredLeadContacts(500);
  const withEmail = contacts.filter((c) => c.email.includes("@")).length;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#1D1D1F]">
          Expired leads
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[#52525b]">
          Pipeline leads older than {CRM_LEAD_STALE_DAYS} days (except won clients) are removed from
          the active list. Names and emails stay here so you can still mail newsletters.
        </p>
        <p className="mt-2 text-sm tabular-nums text-[#71717a]">
          {contacts.length} retained · {withEmail} with email
        </p>
        <p className="mt-3">
          <Link href="/crm/leads" className="text-sm font-medium text-[#0057B8] hover:underline">
            ← Active leads
          </Link>
        </p>
      </header>

      <div className="overflow-x-auto rounded-2xl border border-[#E5E5E5] bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#E5E5E5] text-xs uppercase tracking-wider text-[#71717a]">
              <th className="px-5 py-3.5 font-medium">Name</th>
              <th className="px-5 py-3.5 font-medium">Email</th>
              <th className="px-5 py-3.5 font-medium">Phone</th>
              <th className="px-5 py-3.5 font-medium">Source</th>
              <th className="px-5 py-3.5 font-medium">Expired</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-sm text-[#71717a]">
                  No expired contacts yet.
                </td>
              </tr>
            ) : (
              contacts.map((row) => (
                <tr key={row.id} className="border-b border-[#F0F0EE] last:border-0">
                  <td className="px-5 py-3 font-medium text-[#1D1D1F]">{row.name || "—"}</td>
                  <td className="px-5 py-3 text-[#52525b]">{row.email || "—"}</td>
                  <td className="px-5 py-3 text-[#52525b]">{row.phone || "—"}</td>
                  <td className="px-5 py-3 text-[#52525b]">{row.sourceFunnel || "—"}</td>
                  <td className="px-5 py-3 text-[#71717a] tabular-nums">
                    {row.expiredAt ? new Date(row.expiredAt).toLocaleDateString("en-ZA") : "—"}
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
