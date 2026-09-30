import { redirect } from "next/navigation";

import { studentAccountPath } from "@/lib/courses/paths";

export const dynamic = "force-dynamic";

/** Legacy `/learn/login` → unified Learn account page. */
export default async function LegacyStudentLoginRedirect({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  redirect(studentAccountPath({ mode: "signin", next }));
}
