import { getImageProps } from "next/image";
import {
  CALC_SPLIT_HERO_QUALITY,
  CALC_SPLIT_HERO_SIZES,
  HUB_HERO_SIZES,
  HUB_SPLIT_HERO_SIZES,
} from "@/lib/hub-lcp";

type Props = {
  src: string;
  variant?: "full" | "split" | "calc-split";
};

/** Preload the same optimised URL Next/Image will request for LCP (avoids raw + optimised double fetch). */
export function HubLcpPreload({ src, variant = "full" }: Props) {
  const sizes =
    variant === "calc-split"
      ? CALC_SPLIT_HERO_SIZES
      : variant === "split"
        ? HUB_SPLIT_HERO_SIZES
        : HUB_HERO_SIZES;
  const quality = variant === "calc-split" ? CALC_SPLIT_HERO_QUALITY : 65;
  const { props } = getImageProps({
    alt: "",
    src,
    fill: true,
    sizes,
    priority: true,
    quality,
    ...(src.endsWith(".webp") || src.endsWith(".avif") ? { unoptimized: true } : {}),
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
