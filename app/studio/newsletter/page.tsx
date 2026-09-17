import Link from "next/link";

import { listEditions, seedSampleEdition } from "@/lib/newsletter/store";
import { createEditionAction, seedEditionAction } from "./actions";

export const dynamic = "force-dynamic";

export default function NewsletterStudioPage() {
  const editions = listEditions();

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
            Newsletter Studio
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-white">Weekly Newsletter Builder</h1>
          <p className="mt-2 max-w-xl text-sm text-zinc-400">
            Create and manage your weekly Financial Freedom newsletter. Published editions appear at{" "}
            <Link href="/newsletter" className="text-[#3ecf8e] hover:underline">
              /newsletter
            </Link>
            . Each edition uses the same evergreen structure — you only need to update the weekly
            content.
          </p>
        </div>
        <Link
          href="/newsletter"
          target="_blank"
          className="rounded-md border border-[#2a2a2a] px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white"
        >
          View live newsletter →
        </Link>
      </div>

      {/* Create new edition */}
      <form
        action={createEditionAction}
        className="rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-5"
      >
        <p className="text-sm font-medium text-white">Create a new newsletter edition</p>
        <p className="mt-1 text-xs text-zinc-500">
          Select a date for the newsletter (typically a Monday).
        </p>
        <div className="mt-4 flex gap-3">
          <input
            name="date"
            type="date"
            required
            className="rounded-md border border-[#2a2a2a] bg-black px-3 py-2 text-sm text-white"
          />
          <button
            type="submit"
            className="rounded-md bg-[#3ecf8e] px-4 py-2 text-sm font-medium text-black"
          >
            Create Edition
          </button>
        </div>
      </form>

      {/* Seed sample data (dev only) */}
      {editions.length === 0 && (
        <form action={seedEditionAction}>
          <button
            type="submit"
            className="rounded-md border border-amber-500/30 bg-amber-950/40 px-4 py-2 text-sm text-amber-200 hover:bg-amber-950/60"
          >
            Seed sample newsletter for development
          </button>
        </form>
      )}

      {/* Edition list */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">Newsletter Editions</h2>
        {editions.length === 0 ? (
          <p className="rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] px-5 py-8 text-center text-sm text-zinc-500">
            No editions yet. Create your first newsletter edition above.
          </p>
        ) : (
          <ul className="space-y-3">
            {editions.map((edition) => (
              <li
                key={edition.id}
                className="flex items-center gap-3 rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] px-4 py-4"
              >
                <Link
                  href={`/studio/newsletter/${edition.date}`}
                  className="min-w-0 flex-1 hover:opacity-90"
                >
                  <p className="font-medium text-white">
                    {new Date(edition.date).toLocaleDateString("en-ZA", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {edition.articleOfTheWeek.title || "No article set"} ·{" "}
                    {edition.sectionContent.length} sections with content
                  </p>
                </Link>
                <span
                  className={`rounded border px-2 py-0.5 text-[10px] uppercase tracking-wide ${
                    edition.status === "published"
                      ? "border-green-500/30 text-green-400"
                      : "border-[#2a2a2a] text-zinc-400"
                  }`}
                >
                  {edition.status}
                </span>
                <div className="flex shrink-0 gap-2">
                  <Link
                    href={`/newsletter/${edition.date}`}
                    target="_blank"
                    className="rounded-md border border-[#2a2a2a] px-2 py-1 text-xs text-zinc-400 hover:text-white"
                  >
                    Preview
                  </Link>
                  <Link
                    href={`/studio/newsletter/${edition.date}`}
                    className="rounded-md bg-[#3ecf8e]/20 px-2 py-1 text-xs text-[#3ecf8e] hover:bg-[#3ecf8e]/30"
                  >
                    Edit
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
