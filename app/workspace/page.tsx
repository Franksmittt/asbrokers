import { redirect } from "next/navigation";

/**
 * Legacy Command Workspace launchpad — fold into the CRM home.
 * Keep the URL for old bookmarks / PIN next= redirects.
 */
export default function CommandWorkspacePage() {
  redirect("/crm");
}
