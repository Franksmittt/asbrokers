"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const springConfig = { damping: 30, stiffness: 100 };

export function BackgroundOrbs() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x1 = useSpring(mouseX, springConfig);
  const y1 = useSpring(mouseY, springConfig);
  const x2 = useSpring(mouseX, { ...springConfig, stiffness: 60 });
  const y2 = useSpring(mouseY, { ...springConfig, stiffness: 60 });
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
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[150px] rounded-full pointer-events-none" aria-hidden />
        <div className="absolute top-[30%] right-[-10%] w-[30%] h-[50%] bg-teal-500/10 blur-[150px] rounded-full pointer-events-none" aria-hidden />
      </>
    );
  }

  return (
    <>
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[150px] rounded-full pointer-events-none"
        style={{ x: reduceMotion ? 0 : x1, y: reduceMotion ? 0 : y1 }}
        animate={reduceMotion ? {} : { scale: [1, 1.03, 1] }}
        transition={reduceMotion ? { duration: 0 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="absolute top-[30%] right-[-10%] w-[30%] h-[50%] bg-teal-500/10 blur-[150px] rounded-full pointer-events-none"
        style={{ x: reduceMotion ? 0 : x2, y: reduceMotion ? 0 : y2 }}
        animate={reduceMotion ? {} : { scale: [1, 1.05, 1] }}
        transition={reduceMotion ? { duration: 0 } : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="absolute bottom-[20%] left-[20%] w-[25%] h-[25%] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"
        style={{ x: reduceMotion ? 0 : x2, y: reduceMotion ? 0 : y2 }}
        animate={reduceMotion ? {} : { opacity: [0.6, 0.9, 0.6] }}
        transition={reduceMotion ? { duration: 0 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
    </>
  );
}
