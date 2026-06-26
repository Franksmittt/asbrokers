import { getTasks } from "@/app/actions/crm";
import { CrmTasksClient } from "@/components/crm/CrmTasksClient";

export const metadata = {
  title: "Tasks",
  description: "AS Brokers CRM advisor tasks.",
};

export default async function CrmTasksPage() {
  const tasks = await getTasks();
  return <CrmTasksClient tasks={tasks} />;
}
