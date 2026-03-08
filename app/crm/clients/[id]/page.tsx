import Link from "next/link";
import { notFound } from "next/navigation";
import { getMockSession } from "@/lib/mock-auth";
import {
  getClientById,
  getCorrespondenceForClient,
  getNotesForLead,
  getTasksForClient,
  SERVICE_LABELS,
} from "@/lib/mock-crm";
import { ArrowLeft } from "@/components/icons";

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getMockSession();
  const client = getClientById(id);
  if (!client) notFound();

  const isOwner = session?.role === "admin";
  const canView = isOwner || client.assignedAdvisorId === session?.staffId;
  if (!canView) notFound();

  const correspondence = getCorrespondenceForClient(id);
  const notes = getNotesForLead(client.leadId);
  const tasks = getTasksForClient(id);
  const whatsAppUrl = client.advisorWhatsApp
    ? `https://wa.me/27${client.advisorWhatsApp.replace(/\D/g, "").slice(-9)}`
    : null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href="/crm/clients" className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" /> Back to clients
      </Link>

      <div className="rounded-2xl bg-vault-card border border-white/10 overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-white/10 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">{client.name}</h1>
            <p className="text-zinc-400 text-sm mt-1">Client · converted {client.convertedAt}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {client.services.map((s) => (
                <span key={s} className="inline-flex px-2 py-0.5 rounded-lg text-xs bg-white/10 text-zinc-400">
                  {SERVICE_LABELS[s]}
                </span>
              ))}
            </div>
          </div>
          <div className="text-sm">
            <p className="text-zinc-500">Advisor</p>
            <p className="text-white">{client.assignedAdvisorName}</p>
            {whatsAppUrl && (
              <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="text-cinematic-teal hover:underline text-xs mt-1 inline-block">
                WhatsApp advisor
              </a>
            )}
          </div>
        </div>
        <div className="px-4 sm:px-6 py-4 grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-zinc-500">Email</p>
            <a href={`mailto:${client.email}`} className="text-cinematic-teal hover:underline">{client.email}</a>
          </div>
          <div>
            <p className="text-zinc-500">Phone</p>
            <a href={`tel:${client.phone}`} className="text-white">{client.phone}</a>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-vault-card border border-white/10 overflow-hidden">
          <h2 className="px-4 sm:px-6 py-3 border-b border-white/10 text-sm font-semibold text-white">
            Correspondence ({correspondence.length})
          </h2>
          <ul className="divide-y divide-white/5 max-h-80 overflow-y-auto">
            {correspondence.map((c) => (
              <li key={c.id} className="px-4 sm:px-6 py-3">
                <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
                  <span>{c.fromName}</span>
                  <span>{new Date(c.at).toLocaleString("en-ZA")}</span>
                  <span className="capitalize">{c.channel}</span>
                </div>
                <p className="text-sm text-zinc-300">{c.body}</p>
              </li>
            ))}
            {correspondence.length === 0 && (
              <li className="px-4 sm:px-6 py-6 text-zinc-500 text-sm">No messages yet.</li>
            )}
          </ul>
        </div>

        <div className="rounded-2xl bg-vault-card border border-white/10 overflow-hidden">
          <h2 className="px-4 sm:px-6 py-3 border-b border-white/10 text-sm font-semibold text-white">
            Notes ({notes.length})
          </h2>
          <ul className="divide-y divide-white/5 max-h-80 overflow-y-auto">
            {notes.map((n) => (
              <li key={n.id} className="px-4 sm:px-6 py-3">
                <p className="text-sm text-zinc-300">{n.body}</p>
                <p className="text-xs text-zinc-500 mt-1">{n.authorName} · {new Date(n.at).toLocaleString("en-ZA")}</p>
              </li>
            ))}
            {notes.length === 0 && (
              <li className="px-4 sm:px-6 py-6 text-zinc-500 text-sm">No notes yet.</li>
            )}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl bg-vault-card border border-white/10 overflow-hidden">
        <h2 className="px-4 sm:px-6 py-3 border-b border-white/10 text-sm font-semibold text-white">
          Tasks ({tasks.length})
        </h2>
        <ul className="divide-y divide-white/5">
          {tasks.map((t) => (
            <li key={t.id} className="px-4 sm:px-6 py-3 flex items-center justify-between">
              <span className={t.completed ? "text-zinc-500 line-through" : "text-white"}>{t.title}</span>
              <span className="text-xs text-zinc-500">Due {t.dueDate} · {t.assignedToName}</span>
            </li>
          ))}
          {tasks.length === 0 && (
            <li className="px-4 sm:px-6 py-6 text-zinc-500 text-sm">No tasks linked.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
