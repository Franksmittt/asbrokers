import { getClients, getRecentCorrespondence, getTasks } from "@/app/actions/crm";
import { getAlbertKrugersdorpGoalBoard } from "@/app/actions/crm-goals";
import { CrmCampaignBanner } from "@/components/crm/CrmCampaignBanner";
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
  let tasks: CrmTask[] = [];
  let clients: Awaited<ReturnType<typeof getClients>> = [];
  let recentCorrespondence: Awaited<ReturnType<typeof getRecentCorrespondence>> = [];
  let goalBoard: Awaited<ReturnType<typeof getAlbertKrugersdorpGoalBoard>> | null = null;

  try {
    [tasks, clients, recentCorrespondence, goalBoard] = await Promise.all([
      getTasks(),
      getClients(),
      getRecentCorrespondence(3),
      getAlbertKrugersdorpGoalBoard(),
    ]);
  } catch (error) {
    console.error("[CRM] dashboard load failed:", error);
  }

  const openTasks = tasks.filter((task) => !task.completed).length;

  return (
    <CrmDashboardClient
      openTasks={openTasks}
      clientCount={clients.length}
      tasksDueToday={tasksDueToday(tasks)}
      recentCorrespondence={recentCorrespondence}
      campaignBanner={goalBoard ? <CrmCampaignBanner progress={goalBoard.progress} /> : null}
    />
  );
}
