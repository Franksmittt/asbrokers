import {
  HUB_CANVAS as CANVAS,
} from "@/lib/hub-design-tokens";

/** Warm cream sibling to canvas, both are “light”; use for soft alternation. */
export const SECTION_CREAM = "#FDFCFA";

export type LightSectionSurface = "canvas" | "cream";

/**
 * Sequential light-section banding for calculator pages.
 * Prefers canvas ↔ cream alternation. Double-light is fine when a dark (shark)
 * chapter interrupts the rhythm, call `afterDark()` after shark/FAQ bands.
 */
export function createLightSurfaceAssigner(
  start: LightSectionSurface = "cream"
): {
  next: () => { backgroundColor: string };
  afterDark: () => null;
} {
  let nextSurface: LightSectionSurface = start;

  return {
    next() {
      const current = nextSurface;
      nextSurface = current === "canvas" ? "cream" : "canvas";
      return {
        backgroundColor: current === "canvas" ? CANVAS : SECTION_CREAM,
      };
    },
    /** After a shark/dark chapter, resume with cream so the next light band reads clearly. */
    afterDark() {
      nextSurface = "cream";
      return null;
    },
  };
}
