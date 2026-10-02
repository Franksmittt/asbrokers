import Link from "next/link";
import { redirect } from "next/navigation";

import { studioLogout } from "@/app/studio/blog/actions";
import {
  getClientStudioSession,
  isClientStudioConfigured,
} from "@/lib/client-studio/session";
import { canAccessStaffStudio, hasCrmStudioBridge } from "@/lib/client-studio/staff-access";
import { privateRouteMetadata } from "@/lib/seo-metadata";

export const metadata = privateRouteMetadata(
  "AS Brokers Studio",
  "Choose Insights, Courses, or Newsletter."
);

export const dynamic = "force-dynamic";

const STUDIOS = [
  {
    href: "/studio/blog/workspace",
    label: "Insights",
    description: "Write and publish articles that appear on the Insights pages.",
    cta: "Open Insights",
  },
  {
    href: "/studio/courses",
    label: "Courses",
    description: "Build courses, lessons, and see who registered as students.",
    cta: "Open Courses",
  },
  {
    href: "/studio/newsletter",
    label: "Newsletter",
    description: "Create the weekly newsletter and see who subscribed.",
    cta: "Open Newsletter",
  },
] as const;

export default async function StudioHomePage() {
  const session = await getClientStudioSession();
  const crmBridge = await hasCrmStudioBridge();
  if (!(await canAccessStaffStudio()) && isClientStudioConfigured()) {
    redirect("/studio/blog/login?next=/studio");
  }

  return (
    <div className="min-h-screen bg-[#F7F6F3] text-[#1D1D1F]">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-4 py-12 sm:px-6">
        <div className="mb-10 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#006B6B]">
            AS Brokers · FSP 17273
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Studio
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-[#52525b]">
            Choose what you want to work on — Insights, Courses, or Newsletter.
          </p>
          {crmBridge ? (
            <p className="mx-auto mt-3 max-w-xl text-xs text-[#006B6B]">
              Opened via your staff session — no separate Studio password needed.
            </p>
          ) : null}
        </div>

        <ul className="grid gap-4 sm:gap-5">
          {STUDIOS.map((studio) => (
            <li key={studio.href}>
              <Link
                href={studio.href}
                className="block rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-sm transition-colors hover:border-[#006B6B]/40 sm:p-8"
              >
                <p className="text-xl font-semibold tracking-tight sm:text-2xl">{studio.label}</p>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#52525b] sm:text-base">
                  {studio.description}
                </p>
                <p className="mt-5 text-sm font-medium text-[#0057B8]">{studio.cta} →</p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-[#71717a]">
          <Link href="/crm" className="hover:text-[#1D1D1F]">
            Home
          </Link>
          <span aria-hidden>·</span>
          <Link href="/" className="hover:text-[#1D1D1F]">
            Back to website
          </Link>
          {session ? (
            <>
              <span aria-hidden>·</span>
              <form action={studioLogout}>
                <button type="submit" className="hover:text-[#1D1D1F]">
                  Sign out
                </button>
              </form>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
