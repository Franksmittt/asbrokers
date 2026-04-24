"use client";

import Link from "next/link";
import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { LineChart, HeartPulse, Briefcase, Scroll, ArrowRight } from "./icons";

const APPLE_EASE = [0.25, 0.1, 0.25, 1] as const;
const stagger = 0.04;

const cardMotion = (i: number) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-20px" },
  transition: { duration: 0.45, delay: i * stagger, ease: APPLE_EASE },
});

const TILT_MAX = 3;
const SPRING_CONFIG = { stiffness: 180, damping: 28 };

function TiltCard({
  children,
  className,
  ...motionProps
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
  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
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
    [mouseX, mouseY]
  );
  const handleLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setGlare((g) => ({ ...g, opacity: 0 }));
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      {...motionProps}
      className={className}
      style={{
        ...(motionProps.style as object),
        rotateX,
        rotateY,
        transformPerspective: 800,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="relative overflow-hidden h-full rounded-[2rem]">
        {children}
        <div
          className="absolute w-[120px] h-[120px] pointer-events-none rounded-full transition-opacity duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
          style={{
            left: `${glare.x}%`,
            top: `${glare.y}%`,
            transform: "translate(-50%, -50%)",
            opacity: glare.opacity * 0.7,
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)",
          }}
        />
      </div>
    </motion.div>
  );
}

export function SolutionsBento() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      <TiltCard {...cardMotion(0)} className="md:col-span-2 md:row-span-2">
        <div className="rim-light rounded-[2rem] p-8 sm:p-10 md:p-12 border-0 relative overflow-hidden h-full group hover:border-cinematic-teal/20 transition-colors duration-500">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cinematic-teal/15 blur-[120px] rounded-full -mr-20 -mt-20 group-hover:bg-cinematic-teal/25 transition-all duration-700" />
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                <LineChart className="w-8 h-8 text-cinematic-teal" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">Retirement & Investment</h3>
              <p className="text-gray-400 text-lg max-w-md leading-relaxed tracking-[0.01em]">
                Fixed-income solutions engineered for certainty. We construct portfolios designed to weather volatility and outpace inflation, ensuring your lifestyle never downgrades.
              </p>
            </div>
            <div>
              <Link
                href="/solutions#retirement"
                className="flex items-center gap-2 text-cinematic-teal font-semibold hover:text-teal-300 w-max group-hover:gap-4 transition-all duration-500"
              >
                Explore Income Planning <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/everest-wealth" className="flex items-center gap-2 text-gray-400 text-sm hover:text-white mt-2 w-max transition-colors duration-300">
                Everest Wealth calculators
              </Link>
            </div>
          </div>
        </div>
      </TiltCard>

      <TiltCard {...cardMotion(1)}>
        <Link
          href="/solutions#insurance"
          className="rim-light rounded-[2rem] p-6 sm:p-8 border-0 flex flex-col justify-between group hover:bg-white/[0.07] transition-all duration-500 block min-h-[200px] md:min-h-0 h-full"
        >
          <div>
            <HeartPulse className="w-8 h-8 text-red-400/90 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Insurance & Risk</h3>
            <p className="text-sm text-gray-400 leading-relaxed tracking-[0.01em]">
              Uncompromising personal and commercial cover. Protection for what matters most.
            </p>
          </div>
          <span className="text-cinematic-teal text-sm font-medium group-hover:underline">Personal, business, life</span>
        </Link>
      </TiltCard>

      <TiltCard {...cardMotion(2)}>
        <Link
          href="/solutions#insurance"
          className="rim-light rounded-[2rem] p-6 sm:p-8 border-0 flex flex-col justify-between group hover:bg-white/[0.07] transition-all duration-500 block min-h-[200px] md:min-h-0 h-full"
        >
          <div>
            <Briefcase className="w-8 h-8 text-gold-orange/90 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Business Structuring</h3>
            <p className="text-sm text-gray-400 leading-relaxed tracking-[0.01em]">
              Buy-and-sell agreements, key person cover, and tax-efficient corporate asset protection.
            </p>
          </div>
          <span className="text-cinematic-teal text-sm font-medium group-hover:underline">Business insurance</span>
        </Link>
      </TiltCard>

      <TiltCard {...cardMotion(3)}>
        <Link
          href="/solutions/estate-planning"
          className="rim-light rounded-[2rem] p-6 sm:p-8 border-0 flex flex-col justify-between group hover:bg-white/[0.07] transition-all duration-500 block min-h-[200px] md:min-h-0 h-full"
        >
          <div>
            <Scroll className="w-8 h-8 text-teal-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Fiduciary & Estate</h3>
            <p className="text-sm text-gray-400 leading-relaxed tracking-[0.01em]">
              Wills, Trusts, and comprehensive generational wealth transfer strategies.
            </p>
          </div>
          <span className="text-cinematic-teal text-sm font-medium group-hover:underline">Estate duty calculators</span>
        </Link>
      </TiltCard>

      <TiltCard {...cardMotion(4)} className="md:col-span-2">
        <Link
          href="/solutions/medical-aid"
          className="rim-light rounded-[2rem] p-6 sm:p-8 border-0 flex flex-col justify-between group hover:border-cinematic-teal/20 hover:bg-white/[0.03] transition-colors duration-500 block min-h-[200px] md:min-h-0 h-full relative overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-cinematic-teal/10 to-transparent pointer-events-none" aria-hidden />
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Medical & Wellness</h3>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed tracking-[0.01em]">
              Premium medical aid and gap cover. True wealth needs the health to enjoy it.
            </p>
          </div>
          <span className="relative z-10 inline-flex items-center gap-2 text-cinematic-teal text-sm font-medium group-hover:underline mt-4">
            Medical and gap cover
          </span>
        </Link>
      </TiltCard>
    </div>
  );
}
