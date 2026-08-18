import { redirect } from "next/navigation";

import { StudioShell } from "@/components/client-studio/StudioShell";
import { canAccessCourseStudio } from "@/lib/courses/studio-access";
import { privateRouteMetadata } from "@/lib/seo-metadata";

export const metadata = privateRouteMetadata(
  "Course Studio | AS Brokers",
  "Create and publish educational courses."
);

export const dynamic = "force-dynamic";

export default async function CourseStudioLayout({ children }: { children: React.ReactNode }) {
  if (!(await canAccessCourseStudio())) {
    redirect("/studio/blog/login?next=/studio/courses");
  }
  return <StudioShell>{children}</StudioShell>;
}
