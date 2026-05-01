import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";

export default async function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();
  return (
    <>
      {children}
      {isEnabled && <VisualEditing />}
    </>
  );
}
