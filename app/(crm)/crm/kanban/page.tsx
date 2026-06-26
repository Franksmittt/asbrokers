import { LeadsKanban } from "@/components/crm/LeadsKanban";

export const metadata = {
  title: "Pipeline Kanban",
  description: "Drag-and-drop lead pipeline for AS Brokers staff.",
};

export default function CrmKanbanPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-[-0.03em] text-white">Wealth Pipeline</h1>
        <p className="mt-2 text-sm text-gray-100">
          Elite financial dossiers — drag between stages or tap to open.
        </p>
      </header>
      <LeadsKanban />
    </div>
  );
}
