import Image from "next/image";
import { getAlt } from "@/lib/image-alt";

type BrandLogoProps = {
  className?: string;
  /** Render height in px — width scales from intrinsic 3:1 logo ratio. */
  height?: number;
  priority?: boolean;
};

/** Optimized nav/footer logo — next/image with explicit dimensions (Phase 9.3). */
export function BrandLogo({ className = "h-9 w-auto rounded-2xl object-contain", height = 36, priority }: BrandLogoProps) {
  const width = Math.round(height * (120 / 36));
  return (
    <Image
      src="/images/logo.jpg"
      alt={getAlt("/images/logo.jpg")}
      width={width}
      height={height}
      className={className}
      sizes={`${width}px`}
      priority={priority}
    />
  );
}
