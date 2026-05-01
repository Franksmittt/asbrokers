"use client";

import dynamic from "next/dynamic";

const StudioClient = dynamic(
  () =>
    Promise.all([
      import("next-sanity/studio"),
      import("@/sanity/config"),
    ]).then(([studio, conf]) => {
      const Studio = () => <studio.NextStudio config={conf.config} />;
      Studio.displayName = "Studio";
      return Studio;
    }),
  { ssr: false }
);

export function StudioClientWrapper() {
  return <StudioClient />;
}
