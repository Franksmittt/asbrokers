"use client";

import { MotionConfig } from "framer-motion";

/**
 * Global Framer Motion config. reducedMotion="user" respects OS prefers-reduced-motion
 * for vestibular accessibility (YMYL / SEO plan).
 */
export function MotionConfigProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
