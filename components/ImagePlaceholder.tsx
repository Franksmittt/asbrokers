"use client";

import Image from "next/image";
import { useState } from "react";

type AspectRatio = "16/9" | "4/3" | "3/2" | "1/1" | "16/10";

const ratioMap: Record<AspectRatio, string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "1/1": "aspect-square",
  "16/10": "aspect-[16/10]",
};

export function ImagePlaceholder({
  src,
  alt,
  aspectRatio = "16/9",
  className = "",
  placeholderLabel,
  priority,
  sizes,
}: {
  src: string;
  alt: string;
  aspectRatio?: AspectRatio;
  className?: string;
  placeholderLabel?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const [error, setError] = useState(false);
  const path = src.startsWith("/") ? src : `/images/${src}`;
  const label = placeholderLabel ?? src.replace(/^.*\//, "");

  if (error) {
    return (
      <div
        className={`${ratioMap[aspectRatio]} w-full bg-[#151518] border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden ${className}`}
        title={`Add image: ${label}`}
      >
        <span className="text-zinc-500 text-xs text-center px-4">
          {label}
        </span>
      </div>
    );
  }

  return (
    <div className={`${ratioMap[aspectRatio]} w-full relative rounded-2xl overflow-hidden ${className}`}>
      <Image
        src={path}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setError(true)}
        priority={priority}
        sizes={sizes ?? "100vw"}
      />
    </div>
  );
}
