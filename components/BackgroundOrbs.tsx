"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const APPLE_EASE = [0.25, 0.1, 0.25, 1] as const;
const springConfig = { damping: 35, stiffness: 60 };

export function BackgroundOrbs() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x1 = useSpring(mouseX, springConfig);
  const y1 = useSpring(mouseY, springConfig);
  const x2 = useSpring(mouseX, { ...springConfig, stiffness: 40 });
  const y2 = useSpring(mouseY, { ...springConfig, stiffness: 40 });
  const [mounted, setMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleMove = (e: MouseEvent) => {
      const w = typeof window !== "undefined" ? window.innerWidth : 1;
      const h = typeof window !== "undefined" ? window.innerHeight : 1;
      const x = (e.clientX - w / 2) / 60;
      const y = (e.clientY - h / 2) / 60;
      mouseX.set(x);
      mouseY.set(y);
    };
    const handleLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };
    window.addEventListener("mousemove", handleMove);
    document.body.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.body.removeEventListener("mouseleave", handleLeave);
    };
  }, [mounted, mouseX, mouseY]);

  if (!mounted) {
    return (
      <>
        <div className="absolute top-[-20%] left-[-15%] w-[70%] h-[70%] bg-[#008080]/25 blur-[180px] rounded-full pointer-events-none" aria-hidden />
        <div className="absolute top-[10%] right-[-20%] w-[60%] h-[80%] bg-[#FF7F50]/20 blur-[180px] rounded-full pointer-events-none" aria-hidden />
      </>
    );
  }

  return (
    <>
      {/* Nightography: Cinematic Teal — massive, heavily blurred */}
      <motion.div
        className="absolute top-[-20%] left-[-15%] w-[70%] h-[70%] bg-[#008080]/25 blur-[180px] rounded-full pointer-events-none"
        style={{ x: reduceMotion ? 0 : x1, y: reduceMotion ? 0 : y1 }}
        animate={reduceMotion ? {} : { scale: [1, 1.02, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: APPLE_EASE }}
        aria-hidden
      />
      {/* Nightography: Gold/Orange — blockbuster OLED contrast */}
      <motion.div
        className="absolute top-[10%] right-[-20%] w-[60%] h-[80%] bg-[#FF7F50]/20 blur-[180px] rounded-full pointer-events-none"
        style={{ x: reduceMotion ? 0 : x2, y: reduceMotion ? 0 : y2 }}
        animate={reduceMotion ? {} : { scale: [1, 1.025, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: APPLE_EASE }}
        aria-hidden
      />
      <motion.div
        className="absolute bottom-[15%] left-[10%] w-[40%] h-[40%] bg-[#008080]/10 blur-[120px] rounded-full pointer-events-none"
        style={{ x: reduceMotion ? 0 : x2, y: reduceMotion ? 0 : y2 }}
        animate={reduceMotion ? {} : { opacity: [0.6, 0.85, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: APPLE_EASE }}
        aria-hidden
      />
    </>
  );
}
