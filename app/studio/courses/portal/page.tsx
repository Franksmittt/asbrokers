import Link from "next/link";

import { saveStudentPortalConfigAction } from "@/app/studio/courses/actions";
import { getStudentPortalConfig } from "@/lib/courses/store";

export const dynamic = "force-dynamic";

export default async function StudentPortalStudioPage() {
  const config = await getStudentPortalConfig();

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8">
      <div>
        <Link href="/studio/courses" className="text-xs text-zinc-500 hover:text-white">
          ← Courses
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-white">Student portal banner</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Thin rotating messages students see at the top of their dashboard. Use them to advertise
          business insurance, retirement reviews, or other AS Brokers services.
        </p>
      </div>

      <form action={saveStudentPortalConfigAction} className="space-y-6">
        {config.promoSlides.map((slide, index) => (
          <div key={slide.id} className="space-y-3 rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-5">
            <input type="hidden" name={`slides[${index}].id`} value={slide.id} />
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-white">Slide {index + 1}</p>
              <label className="flex items-center gap-2 text-xs text-zinc-300">
                <input type="checkbox" name={`slides[${index}].enabled`} defaultChecked={slide.enabled} />
                Show on dashboard
              </label>
            </div>
            <label className="block text-xs text-zinc-400">
              Title
              <input
                name={`slides[${index}].title`}
                required
                defaultValue={slide.title}
                className="mt-1 w-full rounded-md border border-[#2a2a2a] bg-black px-3 py-2 text-sm text-white"
              />
            </label>
            <label className="block text-xs text-zinc-400">
              Short line
              <textarea
                name={`slides[${index}].body`}
                required
                rows={2}
                defaultValue={slide.body}
                className="mt-1 w-full rounded-md border border-[#2a2a2a] bg-black px-3 py-2 text-sm text-white"
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block text-xs text-zinc-400">
                Button label
                <input
                  name={`slides[${index}].ctaLabel`}
                  required
                  defaultValue={slide.ctaLabel}
                  className="mt-1 w-full rounded-md border border-[#2a2a2a] bg-black px-3 py-2 text-sm text-white"
                />
              </label>
              <label className="block text-xs text-zinc-400">
                Button link
                <input
                  name={`slides[${index}].ctaHref`}
                  required
                  defaultValue={slide.ctaHref}
                  className="mt-1 w-full rounded-md border border-[#2a2a2a] bg-black px-3 py-2 text-sm text-white"
                />
              </label>
            </div>
          </div>
        ))}

        <input type="hidden" name="slideCount" value={String(config.promoSlides.length)} />
        <button type="submit" className="rounded-md bg-[#3ecf8e] px-4 py-2 text-sm font-medium text-black">
          Save banner
        </button>
      </form>
    </div>
  );
}
