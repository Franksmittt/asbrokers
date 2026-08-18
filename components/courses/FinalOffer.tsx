"use client";

import { useTransition } from "react";

import { trackOfferClick } from "@/app/(content)/learn/actions";
import { WARM_BTN_PRIMARY } from "@/lib/warm-theme";
import type { LessonOffer } from "@/lib/courses/types";

export function FinalOffer({
  offer,
  courseSlug,
  lessonSlug,
}: {
  offer: LessonOffer;
  courseSlug: string;
  lessonSlug: string;
}) {
  const [pending, startTransition] = useTransition();

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    const formData = new FormData();
    formData.set("courseSlug", courseSlug);
    formData.set("lessonSlug", lessonSlug);
    formData.set("url", offer.buttonUrl);
    formData.set("newTab", offer.openInNewTab ? "true" : "false");
    startTransition(() => {
      void trackOfferClick(formData);
    });
    if (!offer.openInNewTab && offer.buttonUrl.startsWith("/")) {
      event.preventDefault();
    }
  }

  return (
    <section className="rounded-3xl bg-gradient-to-br from-shark via-[#1a2626] to-[#152020] p-6 text-white sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Next step</p>
      {offer.heading ? <h2 className="mt-3 text-2xl font-bold tracking-tight">{offer.heading}</h2> : null}
      {offer.body ? <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">{offer.body}</p> : null}
      <a
        href={offer.buttonUrl}
        onClick={handleClick}
        target={offer.openInNewTab ? "_blank" : undefined}
        rel={offer.openInNewTab ? "noreferrer" : undefined}
        className={`${WARM_BTN_PRIMARY} mt-6 ${pending ? "opacity-80" : ""}`}
      >
        {offer.buttonText}
      </a>
    </section>
  );
}
