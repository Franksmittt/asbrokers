import React from "react";
import { ImageResponse } from "next/og";
import {
  getOgFonts,
  OG_CACHE_CONTROL,
  OG_CONTENT_TYPE,
  OG_SIZE,
  truncateOgText,
  type OgFont,
} from "@/lib/og-fonts";

export type OgImageContent = {
  title: string;
  description: string;
  eyebrow?: string;
};

/** Flexbox-only Satori layout, 1200×630 (Phase 6.1). */
export function OgImageLayout({ title, description, eyebrow = "FSP 17273" }: OgImageContent) {
  const headline = truncateOgText(title, 72);
  const subline = truncateOgText(description, 140);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 64,
        background: "linear-gradient(135deg, #0a0a0c 0%, #151518 52%, #0d1f1f 100%)",
        color: "#ffffff",
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#5eead4",
            marginBottom: 20,
          }}
        >
          {eyebrow}
        </div>
        <div style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.12, maxWidth: 980 }}>{headline}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 26, color: "#d4d4d8", lineHeight: 1.35, maxWidth: 920 }}>{subline}</div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 20, color: "#71717a" }}>
          www.asbrokers.co.za · Krugersdorp, Gauteng
        </div>
      </div>
    </div>
  );
}

export async function createOgImageResponse(content: OgImageContent, fontsOverride?: OgFont[]): Promise<Response> {
  const fonts = fontsOverride ?? (await getOgFonts());
  return new ImageResponse(<OgImageLayout {...content} />, {
    ...OG_SIZE,
    fonts,
    headers: {
      "Content-Type": OG_CONTENT_TYPE,
      "Cache-Control": OG_CACHE_CONTROL,
    },
  });
}
