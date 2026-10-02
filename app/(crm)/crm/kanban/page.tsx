import { LeadsKanban } from "@/components/crm/LeadsKanban";

export const metadata = {
  title: "Pipeline Kanban",
  description: "Drag-and-drop lead pipeline for AS Brokers staff.",
};

export default function CrmKanbanPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-[-0.03em] text-[#1D1D1F]">Wealth Pipeline</h1>
        <p className="mt-2 text-sm text-[#52525b]">
          Elite financial dossiers, drag between stages or tap to open.
        </p>
      </header>
      <LeadsKanban />
    </div>
  );
}
