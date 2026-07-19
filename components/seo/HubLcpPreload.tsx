import { getImageProps } from "next/image";
import {
  CALC_SPLIT_HERO_SIZES,
  HUB_HERO_SIZES,
  HUB_SPLIT_HERO_SIZES,
} from "@/lib/hub-lcp";

type Props = {
  src: string;
  variant?: "full" | "split" | "calc-split";
};

/** Preload the LCP image URL the page will paint (avoids double-fetch). */
export function HubLcpPreload({ src, variant = "full" }: Props) {
  // ASSET calc heroes use a native <img> + pre-sized WebP — preload the file as-is.
  if (variant === "calc-split") {
    return <link rel="preload" as="image" href={src} imageSizes={CALC_SPLIT_HERO_SIZES} />;
  }

  const sizes = variant === "split" ? HUB_SPLIT_HERO_SIZES : HUB_HERO_SIZES;
  const quality = 65;
  const unoptimized = src.endsWith(".webp") || src.endsWith(".avif");
  const { props } = getImageProps({
    alt: "",
    src,
    fill: true,
    sizes,
    priority: true,
    quality,
    ...(unoptimized ? { unoptimized: true } : {}),
  });

  return (
    <link
      rel="preload"
      as="image"
      href={props.src}
      imageSrcSet={props.srcSet}
      imageSizes={props.sizes}
    />
  );
}
