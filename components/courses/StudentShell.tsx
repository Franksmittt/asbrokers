import Link from "next/link";

import { StudentPromoBanner } from "@/components/courses/StudentPromoBanner";
import { StudentSidebar } from "@/components/courses/StudentSidebar";
import type { CourseStudent, StudentPromoSlide } from "@/lib/courses/types";
import { formatStudentDisplayName } from "@/lib/courses/display-name";

type Props = {
  student: CourseStudent;
  promoSlides: StudentPromoSlide[];
  children: React.ReactNode;
};

/** Student learning portal chrome — sidebar + optional promo banner. */
export function StudentShell({ student, promoSlides, children }: Props) {
  const name = formatStudentDisplayName(student);

  return (
    <div className="min-h-screen bg-[#F7F6F3] text-[#2B2B2E]">
      <StudentSidebar studentName={name} />
      <div className="md:ml-[52px]">
        <header className="sticky top-0 z-30 hidden h-12 items-center justify-between border-b border-stone-200 bg-white/90 px-6 backdrop-blur md:flex">
          <div>
            <p className="text-sm font-semibold text-shark">Student portal</p>
            <p className="text-[11px] text-stone-500">Signed in as {name}</p>
          </div>
          <Link href="/learn" className="text-xs font-medium text-stone-500 hover:text-shark">
            Course catalogue
          </Link>
        </header>
        <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 pt-16 md:px-8 md:pt-8">
          {promoSlides.length > 0 ? <StudentPromoBanner slides={promoSlides} /> : null}
          {children}
        </div>
      </div>
    </div>
  );
}
