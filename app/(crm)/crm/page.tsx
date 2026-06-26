import { getClients, getRecentCorrespondence, getTasks } from "@/app/actions/crm";
import { CrmDashboardClient } from "@/components/crm/CrmDashboardClient";
import type { CrmTask } from "@/lib/crm/types";

export const metadata = {
  title: "CRM Dashboard",
  description: "AS Brokers staff pipeline dashboard.",
};

function tasksDueToday(tasks: CrmTask[]): CrmTask[] {
  const today = new Date().toISOString().slice(0, 10);
  return tasks.filter((task) => !task.completed && task.dueDate.startsWith(today));
}

export default async function CrmDashboardPage() {
  const [tasks, clients, recentCorrespondence] = await Promise.all([
    getTasks(),
    getClients(),
    getRecentCorrespondence(3),
  ]);

  const openTasks = tasks.filter((task) => !task.completed).length;

  return (
    <CrmDashboardClient
      openTasks={openTasks}
      clientCount={clients.length}
      tasksDueToday={tasksDueToday(tasks)}
      recentCorrespondence={recentCorrespondence}
    />
  );
}
