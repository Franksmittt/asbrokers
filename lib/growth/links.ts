import { absoluteUrl } from "@/lib/site-url";

import { getChampion, type CourseChampion } from "./champions";
import type { ChampionKey } from "./types";

/** Build a champion share URL for a course (or catalog). */
export function championCourseUrl(input: {
  courseSlug?: string;
  championKey: ChampionKey | string;
}): string {
  const champion = getChampion(input.championKey);
  const ref = champion?.ref ?? String(input.championKey).toLowerCase();
  const path = input.courseSlug ? `/learn/${input.courseSlug}` : "/learn";
  const url = new URL(absoluteUrl(path));
  url.searchParams.set("ref", ref);
  return url.toString();
}

export function championShareKit(input: {
  champion: CourseChampion;
  courseSlug: string;
  courseTitle: string;
}): {
  url: string;
  whatsappText: string;
  whatsappHref: string;
  copyLabel: string;
} {
  const url = championCourseUrl({
    courseSlug: input.courseSlug,
    championKey: input.champion.key,
  });
  const whatsappText =
    `Hi — ${input.champion.firstName} from AS Brokers recommended this free course for you:\n\n` +
    `*${input.courseTitle}*\n${url}\n\n` +
    `Educational only — not personal financial advice. FSP 17273.`;
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;
  return {
    url,
    whatsappText,
    whatsappHref,
    copyLabel: `Copy ${input.champion.firstName}'s link`,
  };
}
