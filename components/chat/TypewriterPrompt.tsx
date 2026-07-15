"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const DEFAULT_PROMPTS = [
  "Ask me anything about Everest Wealth",
  "Ask me anything about Discovery Health",
  "Ask me about Gap Cover and medical aid",
  "Leave your details for a callback",
] as const;

type Props = {
  prompts?: readonly string[];
  /** When true, freeze (e.g. user focused the field). */
  paused?: boolean;
  className?: string;
};

/**
 * Cycles typewriter → pause → erase → next prompt. Respects prefers-reduced-motion.
 */
export function TypewriterPrompt({
  prompts = DEFAULT_PROMPTS,
  paused = false,
  className,
}: Props) {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(prompts[0] ?? "");

  useEffect(() => {
    if (prompts.length === 0) return;

    if (reduceMotion || paused) {
      setDisplay(prompts[0] ?? "");
      return;
    }

    let cancelled = false;
    let promptIndex = 0;
    let charIndex = 0;
    let erasing = false;
    let timer: ReturnType<typeof setTimeout>;

    const schedule = (fn: () => void, ms: number) => {
      timer = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
    };

    const step = () => {
      const full = prompts[promptIndex % prompts.length] ?? "";

      if (!erasing) {
        if (charIndex < full.length) {
          charIndex += 1;
          setDisplay(full.slice(0, charIndex));
          schedule(step, 36);
          return;
        }
        schedule(() => {
          erasing = true;
          step();
        }, 1800);
        return;
      }

      if (charIndex > 0) {
        charIndex -= 1;
        setDisplay(full.slice(0, charIndex));
        schedule(step, 20);
        return;
      }

      erasing = false;
      promptIndex = (promptIndex + 1) % prompts.length;
      schedule(step, 280);
    };

    setDisplay("");
    schedule(step, 200);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [paused, prompts, reduceMotion]);

  return (
    <span className={className} aria-hidden>
      {display}
      {!reduceMotion && !paused ? (
        <span className="ml-0.5 inline-block h-[1em] w-[2px] align-[-0.1em] bg-zinc-400 animate-pulse" />
      ) : null}
    </span>
  );
}

export { DEFAULT_PROMPTS as CHAT_TYPEWRITER_PROMPTS };
