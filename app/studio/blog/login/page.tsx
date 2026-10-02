import Link from "next/link";
import { redirect } from "next/navigation";

import { isClientStudioConfigured } from "@/lib/client-studio/session";
import { canAccessStaffStudio } from "@/lib/client-studio/staff-access";

import { StudioLoginForm } from "./StudioLoginForm";

export const metadata = {
  title: "Studio login | AS Brokers",
  robots: "noindex, nofollow",
};

export const dynamic = "force-dynamic";

function safeStudioNext(next: string | undefined): string {
  if (next && next.startsWith("/studio") && !next.includes("://") && !next.startsWith("//")) {
    return next;
  }
  return "/studio";
}

export default async function StudioBlogLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const nextPath = safeStudioNext(next);

  if (await canAccessStaffStudio()) {
    redirect(nextPath);
  }

  const configured = isClientStudioConfigured();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7F6F3] px-4 py-12 sm:py-16">
      <div className="w-full max-w-md rounded-lg border border-[#E5E5E5] bg-white p-6 shadow-2xl sm:p-8">
        <div className="mb-8 text-center">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-[#71717a]">FSP 17273</p>
          <h1 className="mb-1 text-2xl font-semibold text-[#1D1D1F]">AS Brokers Studio</h1>
          <p className="text-sm text-[#52525b]">
            One login for Insights, Courses, and Newsletter.
          </p>
        </div>

        {!configured ? (
          <p className="text-sm text-amber-900/90 leading-relaxed">
            This login is not active until <code className="text-amber-900">CLIENT_STUDIO_PASSWORD</code> is set on
            the server. Ask your developer to enable the studio — or sign in to the{" "}
            <Link href="/crm" className="text-[#006B6B] hover:underline">
              CRM
            </Link>{" "}
            (your CRM session also unlocks Studio).
          </p>
        ) : (
          <StudioLoginForm nextPath={nextPath} />
        )}

        <ul className="mt-6 space-y-2 text-left text-[11px] leading-relaxed text-[#52525b]">
          <li className="flex gap-2">
            <span className="shrink-0 text-[#006B6B]/70">•</span>
            <span>
              Prefer one login? Open the{" "}
              <Link href="/crm" className="text-[#006B6B] hover:underline">
                CRM with your PIN
              </Link>{" "}
              — that session unlocks Studio and the{" "}
              <Link href="/workspace" className="text-[#006B6B] hover:underline">
                Command Workspace
              </Link>
              .
            </span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-[#006B6B]/70">•</span>
            <span>
              After login you choose Insights / Blog, Courses, or Newsletter — three clear studios.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
