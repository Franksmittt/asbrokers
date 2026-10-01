import { redirect } from "next/navigation";

import { canAccessStaffStudio } from "@/lib/client-studio/staff-access";

export const dynamic = "force-dynamic";

export default async function StudioBlogRootPage() {
  if (await canAccessStaffStudio()) {
    redirect("/studio/blog/workspace");
  }
  redirect("/studio/blog/login?next=/studio/blog/workspace");
}
