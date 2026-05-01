"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

const TILT_MAX = 4;
const SPRING_CONFIG = { stiffness: 180, damping: 28 };

/**
 * Squircle card with hover tilt and cursor-following glare.
 * Prefers-reduced-motion: no tilt/glare when user prefers reduced motion.
 */
export function TiltCard({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
} & React.ComponentProps<typeof motion.div>) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [TILT_MAX, -TILT_MAX]), SPRING_CONFIG);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-TILT_MAX, TILT_MAX]), SPRING_CONFIG);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const h = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(cx);
      mouseY.set(cy);
      setGlare({ x, y, opacity: 1 });
    },
    [mouseX, mouseY, reduceMotion]
  );
  const handleLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setGlare((g) => ({ ...g, opacity: 0 }));
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX: reduceMotion ? 0 : rotateX,
        rotateY: reduceMotion ? 0 : rotateY,
        transformPerspective: 800,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...rest}
    >
      <div className="relative overflow-hidden h-full rounded-[2rem]">
        {children}
        {!reduceMotion && (
          <div
            className="absolute w-[100px] h-[100px] pointer-events-none rounded-full transition-opacity duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            style={{
              left: `${glare.x}%`,
              top: `${glare.y}%`,
              transform: "translate(-50%, -50%)",
              opacity: glare.opacity * 0.6,
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)",
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
