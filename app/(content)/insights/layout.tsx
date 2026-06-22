import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";

/** Draft overlays only on insights routes — keeps marketing pages static (Phase 9). */
export default async function InsightsLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode();

  return (
    <>
      {children}
      {isEnabled && <VisualEditing />}
    </>
  );
}
