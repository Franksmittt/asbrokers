import Link from "next/link";
import { redirect } from "next/navigation";

import { studioLogout } from "@/app/studio/blog/actions";
import {
  getClientStudioSession,
  isClientStudioConfigured,
} from "@/lib/client-studio/session";
import { privateRouteMetadata } from "@/lib/seo-metadata";

export const metadata = privateRouteMetadata(
  "AS Brokers Studio",
  "Choose Insights, Courses, or Newsletter."
);

export const dynamic = "force-dynamic";

const STUDIOS = [
  {
    href: "/studio/blog/workspace",
    label: "Insights / Blog",
    description: "Write and publish articles that appear on the Insights pages.",
    cta: "Open Insights Studio",
  },
  {
    href: "/studio/courses",
    label: "Courses",
    description: "Build courses, lessons, and see who registered as students.",
    cta: "Open Course Studio",
  },
  {
    href: "/studio/newsletter",
    label: "Newsletter",
    description: "Create the weekly newsletter and see who subscribed.",
    cta: "Open Newsletter Studio",
  },
] as const;

export default async function StudioHomePage() {
  const session = await getClientStudioSession();
  if (!session && isClientStudioConfigured()) {
    redirect("/studio/blog/login?next=/studio");
  }

  return (
    <div className="min-h-screen bg-black text-zinc-200">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-4 py-12 sm:px-6">
        <div className="mb-10 text-center">
          <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
            AS Brokers · FSP 17273
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Studio</h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-zinc-400">
            Choose what you want to work on. Three studios — pick one, then build.
          </p>
        </div>

        <ul className="grid gap-4 sm:gap-5">
          {STUDIOS.map((studio) => (
            <li key={studio.href}>
              <Link
                href={studio.href}
                className="block rounded-2xl border border-[#2a2a2a] bg-[#0a0a0a] p-6 transition-colors hover:border-[#3ecf8e]/50 hover:bg-[#0f0f0f] sm:p-8"
              >
                <p className="text-xl font-semibold text-white sm:text-2xl">{studio.label}</p>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                  {studio.description}
                </p>
                <p className="mt-5 text-sm font-medium text-[#3ecf8e]">{studio.cta} →</p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-500">
          <Link href="/crm" className="hover:text-zinc-300">
            Open CRM
          </Link>
          <span aria-hidden>·</span>
          <Link href="/" className="hover:text-zinc-300">
            Back to website
          </Link>
          {session ? (
            <>
              <span aria-hidden>·</span>
              <form action={studioLogout}>
                <button type="submit" className="hover:text-zinc-300">
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
