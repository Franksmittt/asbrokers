import { redirect } from "next/navigation";

import { StudioShell } from "@/components/client-studio/StudioShell";
import { canAccessStaffStudio } from "@/lib/client-studio/staff-access";

export default async function StudioWorkspaceLayout({ children }: { children: React.ReactNode }) {
  if (!(await canAccessStaffStudio())) {
    redirect("/studio/blog/login?next=/studio/blog/workspace");
  }

  return <StudioShell>{children}</StudioShell>;
}
