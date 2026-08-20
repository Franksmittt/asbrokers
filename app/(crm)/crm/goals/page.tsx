import { getAlbertKrugersdorpGoalBoard } from "@/app/actions/crm-goals";
import { CrmGoalsClient } from "@/components/crm/CrmGoalsClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Advisor goals",
  description: "Albert’s Krugersdorp business-insurance campaign scorecard.",
};

export default async function CrmGoalsPage() {
  const board = await getAlbertKrugersdorpGoalBoard();
  return (
    <CrmGoalsClient
      progress={board.progress}
      matchingLeads={board.matchingLeads}
      weeklyLogs={board.weeklyLogs}
    />
  );
}
