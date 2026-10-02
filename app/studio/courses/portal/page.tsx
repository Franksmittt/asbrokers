import Link from "next/link";

import { saveStudentPortalConfigAction } from "@/app/studio/courses/actions";
import { getStudentPortalConfig } from "@/lib/courses/store";

export const dynamic = "force-dynamic";

export default async function StudentPortalStudioPage() {
  const config = await getStudentPortalConfig();

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8">
      <div>
        <Link href="/studio/courses" className="text-xs text-[#52525b] hover:text-[#1D1D1F]">
          ← Courses
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-[#1D1D1F]">Student portal banner</h1>
        <p className="mt-2 text-sm text-[#52525b]">
          Thin rotating messages students see at the top of their dashboard. Use them to advertise
          business insurance, retirement reviews, or other AS Brokers services.
        </p>
      </div>

      <form action={saveStudentPortalConfigAction} className="space-y-6">
        {config.promoSlides.map((slide, index) => (
          <div key={slide.id} className="space-y-3 rounded-xl border border-[#E5E5E5] bg-white p-5">
            <input type="hidden" name={`slides[${index}].id`} value={slide.id} />
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-[#1D1D1F]">Slide {index + 1}</p>
              <label className="flex items-center gap-2 text-xs text-[#3F3F46]">
                <input type="checkbox" name={`slides[${index}].enabled`} defaultChecked={slide.enabled} />
                Show on dashboard
              </label>
            </div>
            <label className="block text-xs text-[#52525b]">
              Title
              <input
                name={`slides[${index}].title`}
                required
                defaultValue={slide.title}
                className="mt-1 w-full rounded-md border border-[#E5E5E5] bg-[#F7F6F3] px-3 py-2 text-sm text-[#1D1D1F]"
              />
            </label>
            <label className="block text-xs text-[#52525b]">
              Short line
              <textarea
                name={`slides[${index}].body`}
                required
                rows={2}
                defaultValue={slide.body}
                className="mt-1 w-full rounded-md border border-[#E5E5E5] bg-[#F7F6F3] px-3 py-2 text-sm text-[#1D1D1F]"
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block text-xs text-[#52525b]">
                Button label
                <input
                  name={`slides[${index}].ctaLabel`}
                  required
                  defaultValue={slide.ctaLabel}
                  className="mt-1 w-full rounded-md border border-[#E5E5E5] bg-[#F7F6F3] px-3 py-2 text-sm text-[#1D1D1F]"
                />
              </label>
              <label className="block text-xs text-[#52525b]">
                Button link
                <input
                  name={`slides[${index}].ctaHref`}
                  required
                  defaultValue={slide.ctaHref}
                  className="mt-1 w-full rounded-md border border-[#E5E5E5] bg-[#F7F6F3] px-3 py-2 text-sm text-[#1D1D1F]"
                />
              </label>
            </div>
          </div>
        ))}

        <input type="hidden" name="slideCount" value={String(config.promoSlides.length)} />
        <button type="submit" className="rounded-md bg-[#006B6B] px-4 py-2 text-sm font-medium text-white">
          Save banner
        </button>
      </form>
    </div>
  );
}
