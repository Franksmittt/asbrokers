import { countImageUploadSlots } from "@/lib/client-studio/image-slots";

const CALCULATOR_SLOT_TOKEN = "[CALCULATOR_SLOT]";
const VIDEO_SLOT_TOKEN = "[VIDEO_SLOT]";

export function countUnresolvedPublishSlots(html: string): number {
  const imageSlots = countImageUploadSlots(html);
  const calculatorSlots = (html.match(/\[CALCULATOR_SLOT\]/g) ?? []).length;
  const videoSlots = (html.match(/\[VIDEO_SLOT\]/g) ?? []).length;
  return imageSlots + calculatorSlots + videoSlots;
}

export function unresolvedPublishSlotMessage(html: string): string | null {
  const imageSlots = countImageUploadSlots(html);
  const calculatorSlots = (html.match(/\[CALCULATOR_SLOT\]/g) ?? []).length;
  const videoSlots = (html.match(/\[VIDEO_SLOT\]/g) ?? []).length;
  if (imageSlots > 0) {
    return "This article still has unresolved image placeholders. Upload or replace every image slot before publishing.";
  }
  if (calculatorSlots > 0) {
    return "This article still has unresolved calculator placeholders. Choose a calculator for each slot before publishing.";
  }
  if (videoSlots > 0) {
    return "This article still has unresolved video placeholders. Add a video link for each slot before publishing.";
  }
  return null;
}

export { CALCULATOR_SLOT_TOKEN, VIDEO_SLOT_TOKEN };
