import { redirect } from "next/navigation";

import { StudioShell } from "@/components/client-studio/StudioShell";
import { canAccessCourseStudio } from "@/lib/courses/studio-access";
import { privateRouteMetadata } from "@/lib/seo-metadata";

export const metadata = privateRouteMetadata(
  "Newsletter Studio | AS Brokers",
  "Build weekly newsletters and review subscribers."
);

export const dynamic = "force-dynamic";

export default async function NewsletterStudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await canAccessCourseStudio())) {
    redirect("/studio/blog/login?next=/studio/newsletter");
  }
  return <StudioShell>{children}</StudioShell>;
}
