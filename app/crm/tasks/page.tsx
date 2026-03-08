import Link from "next/link";
import { getMockSession } from "@/lib/mock-auth";
import { getTasksForAdvisor, MOCK_TASKS } from "@/lib/mock-crm";

export const metadata = {
  title: "Tasks",
  description: "AS Brokers CRM – tasks.",
};

export default async function TasksPage() {
  const session = await getMockSession();
  const isOwner = session?.role === "admin";
  const tasks = isOwner ? MOCK_TASKS : getTasksForAdvisor(session?.staffId ?? "s5");
  const open = tasks.filter((t) => !t.completed);
  const done = tasks.filter((t) => t.completed);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Tasks</h1>
        <p className="text-zinc-400 text-sm">
          {isOwner ? "All team tasks." : "Tasks assigned to you."}
        </p>
      </div>

      <div className="rounded-2xl bg-vault-card border border-white/10 overflow-hidden">
        <h2 className="px-4 sm:px-6 py-3 border-b border-white/10 text-sm font-semibold text-white">
          To do ({open.length})
        </h2>
        <ul className="divide-y divide-white/5">
          {open.map((task) => (
            <li key={task.id} className="px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-medium text-white">{task.title}</p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Due {task.dueDate}
                  {task.leadId && (
                    <>
                      {" · "}
                      <Link href={`/crm/leads/${task.leadId}`} className="text-cinematic-teal hover:underline">
                        Lead
                      </Link>
                    </>
                  )}
                  {task.clientId && (
                    <>
                      {" · "}
                      <Link href={`/crm/clients/${task.clientId}`} className="text-cinematic-teal hover:underline">
                        Client
                      </Link>
                    </>
                  )}
                </p>
              </div>
              <span className="text-xs text-zinc-500">{task.assignedToName}</span>
            </li>
          ))}
        </ul>
        {open.length === 0 && (
          <div className="px-4 sm:px-6 py-8 text-center text-zinc-500 text-sm">No open tasks.</div>
        )}
      </div>

      <div className="rounded-2xl bg-vault-card border border-white/10 overflow-hidden">
        <h2 className="px-4 sm:px-6 py-3 border-b border-white/10 text-sm font-semibold text-zinc-400">
          Completed ({done.length})
        </h2>
        <ul className="divide-y divide-white/5">
          {done.map((task) => (
            <li key={task.id} className="px-4 sm:px-6 py-3 flex items-center justify-between opacity-75">
              <p className="text-sm text-zinc-400 line-through">{task.title}</p>
              <span className="text-xs text-zinc-600">{task.assignedToName}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
