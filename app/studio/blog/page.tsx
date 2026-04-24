import { redirect } from "next/navigation";

import { getClientStudioSession } from "@/lib/client-studio/session";

export default async function StudioBlogRootPage() {
  if (await getClientStudioSession()) {
    redirect("/studio/blog/workspace");
  }
  redirect("/studio/blog/login");
}
