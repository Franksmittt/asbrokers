import Link from "next/link";

import {
  listEditions,
  suggestedEditionDate,
} from "@/lib/newsletter/store";
import {
  createEditionAction,
  duplicateEditionAction,
  seedMockEditionsAction,
} from "./actions";

export const dynamic = "force-dynamic";

export default async function NewsletterStudioPage() {
  const editions = await listEditions();
  const defaultDate = suggestedEditionDate();

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-[#52525b]">
            Newsletter Studio
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#1D1D1F]">Weekly Newsletter Builder</h1>
          <p className="mt-2 max-w-xl text-sm text-[#52525b]">
            Assemble editions with live preview, article/calculator/course pickers, and schedule or
            send via Resend.{" "}
            <strong className="font-medium text-[#3F3F46]">Publish</strong> = website only.{" "}
            <strong className="font-medium text-[#3F3F46]">Send</strong> = email subscribers.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/studio/newsletter/subscribers"
            className="rounded-md bg-[#006B6B] px-3 py-2 text-xs font-medium text-white"
          >
            View subscribers
          </Link>
          <Link
            href="/newsletter"
            target="_blank"
            className="rounded-md border border-[#E5E5E5] px-3 py-2 text-xs font-medium text-[#3F3F46] hover:text-[#1D1D1F]"
          >
            View live newsletter →
          </Link>
        </div>
      </div>

      <form
        action={createEditionAction}
        className="rounded-xl border border-[#E5E5E5] bg-white p-5"
      >
        <p className="text-sm font-medium text-[#1D1D1F]">Create a new newsletter edition</p>
        <p className="mt-1 text-xs text-[#52525b]">
          Pick the edition date (typically a Monday). Defaults to next Monday.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <input
            name="date"
            type="date"
            required
            defaultValue={defaultDate}
            className="rounded-md border border-[#E5E5E5] bg-[#F7F6F3] px-3 py-2 text-sm text-[#1D1D1F]"
          />
          <button
            type="submit"
            className="rounded-md bg-[#006B6B] px-4 py-2 text-sm font-medium text-white"
          >
            Create Edition
          </button>
        </div>
      </form>

      <form action={seedMockEditionsAction}>
        <button
          type="submit"
          className="rounded-md border border-amber-200 bg-amber-950/40 px-4 py-2 text-sm text-amber-900 hover:bg-amber-950/60"
        >
          Seed 3 mock newsletters (2 published + 1 draft)
        </button>
      </form>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-[#1D1D1F]">Newsletter Editions</h2>
        {editions.length === 0 ? (
          <p className="rounded-xl border border-[#E5E5E5] bg-white px-5 py-8 text-center text-sm text-[#52525b]">
            No editions yet. Create your first newsletter edition above.
          </p>
        ) : (
          <ul className="space-y-3">
            {editions.map((edition) => (
              <li
                key={edition.id}
                className="flex flex-wrap items-center gap-3 rounded-xl border border-[#E5E5E5] bg-white px-4 py-4"
              >
                <Link
                  href={`/studio/newsletter/${edition.date}`}
                  className="min-w-0 flex-1 hover:opacity-90"
                >
                  <p className="font-medium text-[#1D1D1F]">
                    {new Date(edition.date).toLocaleDateString("en-ZA", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="mt-1 text-xs text-[#52525b]">
                    {edition.articleOfTheWeek.title || "No article set"} ·{" "}
                    {edition.sectionContent.length} sections with content
                    {edition.scheduledAt
                      ? ` · scheduled ${new Date(edition.scheduledAt).toLocaleString("en-ZA")}`
                      : ""}
                  </p>
                </Link>
                <span
                  className={`rounded border px-2 py-0.5 text-[10px] uppercase tracking-wide ${
                    edition.status === "published" || edition.status === "sent"
                      ? "border-green-500/30 text-green-400"
                      : edition.status === "scheduled"
                        ? "border-sky-500/30 text-sky-300"
                        : "border-[#E5E5E5] text-[#52525b]"
                  }`}
                >
                  {edition.status}
                </span>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <Link
                    href={`/studio/newsletter/${edition.date}/preview`}
                    target="_blank"
                    className="rounded-md border border-[#E5E5E5] px-2 py-1 text-xs text-[#52525b] hover:text-[#1D1D1F]"
                  >
                    Preview
                  </Link>
                  <Link
                    href={`/studio/newsletter/${edition.date}`}
                    className="rounded-md bg-[#006B6B]/20 px-2 py-1 text-xs text-[#006B6B] hover:bg-[#006B6B]/30"
                  >
                    Edit
                  </Link>
                  <form action={duplicateEditionAction}>
                    <input type="hidden" name="sourceId" value={edition.id} />
                    <input type="hidden" name="date" value={defaultDate} />
                    <button
                      type="submit"
                      className="rounded-md border border-[#E5E5E5] px-2 py-1 text-xs text-[#52525b] hover:text-[#1D1D1F]"
                    >
                      Duplicate → next Mon
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
