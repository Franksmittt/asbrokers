import Link from "next/link";
import { getMockSession } from "@/lib/mock-auth";
import { getClientsForAdvisor, MOCK_CLIENTS, SERVICE_LABELS } from "@/lib/mock-crm";

export const metadata = {
  title: "Clients",
  description: "AS Brokers CRM – client list.",
};

export default async function ClientsPage() {
  const session = await getMockSession();
  const isOwner = session?.role === "admin";
  const clients = isOwner ? MOCK_CLIENTS : getClientsForAdvisor(session?.staffId ?? "s5");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Clients</h1>
        <p className="text-zinc-400 text-sm">
          Converted clients with portal access. {isOwner ? "All clients." : "Your clients only."}
        </p>
      </div>

      <div className="rounded-2xl bg-vault-card border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-500 border-b border-white/10">
                <th className="px-4 sm:px-6 py-3 font-medium">Name</th>
                <th className="px-4 sm:px-6 py-3 font-medium hidden sm:table-cell">Contact</th>
                <th className="px-4 sm:px-6 py-3 font-medium">Services</th>
                <th className="px-4 sm:px-6 py-3 font-medium">Advisor</th>
                <th className="px-4 sm:px-6 py-3 font-medium">Converted</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 sm:px-6 py-3">
                    <Link href={`/crm/clients/${client.id}`} className="font-medium text-white hover:text-cinematic-teal">
                      {client.name}
                    </Link>
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-zinc-400 hidden sm:table-cell">
                    <span className="block">{client.email}</span>
                    <span className="text-xs text-zinc-500">{client.phone}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-3">
                    <div className="flex flex-wrap gap-1">
                      {client.services.map((s) => (
                        <span key={s} className="inline-flex px-2 py-0.5 rounded-lg text-xs bg-white/10 text-zinc-400">
                          {SERVICE_LABELS[s]}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-zinc-400">{client.assignedAdvisorName}</td>
                  <td className="px-4 sm:px-6 py-3 text-zinc-500">{client.convertedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {clients.length === 0 && (
          <div className="px-4 sm:px-6 py-12 text-center text-zinc-500 text-sm">
            No clients in your view. Convert leads to clients when they sign.
          </div>
        )}
      </div>
    </div>
  );
}
