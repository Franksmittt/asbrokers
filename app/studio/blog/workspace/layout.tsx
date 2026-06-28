import { redirect } from "next/navigation";

import { StudioShell } from "@/components/client-studio/StudioShell";
import { getClientStudioSession } from "@/lib/client-studio/session";

export default async function StudioWorkspaceLayout({ children }: { children: React.ReactNode }) {
  if (!(await getClientStudioSession())) {
    redirect("/studio/blog/login?next=/studio/blog/workspace");
  }

  return <StudioShell>{children}</StudioShell>;
}
