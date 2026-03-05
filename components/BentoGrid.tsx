"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const services = [
  { id: "retirement", title: "Retirement Income Planning", summary: "Fixed-income solutions for retirees who want certainty.", category: "Retirement", size: "large", href: "/solutions#retirement" },
  { id: "calculators", title: "Retirement Calculators", summary: "See exactly when your money runs out. Free tools.", category: "Tools", size: "large", href: "/lab" },
  { id: "short-personal", title: "Short-Term Personal", summary: "Home, car and personal asset protection.", category: "Insurance", size: "medium", href: "/solutions#insurance" },
  { id: "short-business", title: "Short-Term Business", summary: "Commercial property and liability cover.", category: "Insurance", size: "medium", href: "/solutions#insurance" },
  { id: "life-personal", title: "Life Insurance (Personal)", summary: "Family protection and future financial security.", category: "Insurance", size: "medium", href: "/solutions#insurance" },
  { id: "life-business", title: "Life Insurance (Business)", summary: "Buy-and-sell and key person protection.", category: "Insurance", size: "medium", href: "/solutions#insurance" },
  { id: "medical", title: "Medical Aid & Gap Cover", summary: "Health insurance and gap cover solutions.", category: "Medical", size: "small", href: "/solutions#medical" },
  { id: "wellness", title: "Wellness & Integration", summary: "Holistic health and wellness planning.", category: "Medical", size: "small", href: "/solutions#medical" },
  { id: "estate", title: "Estate Planning", summary: "Wills, testaments and estate structuring.", category: "Estate", size: "medium", href: "/solutions#estate" },
  { id: "trust", title: "Trust & Business Structure", summary: "Asset protection and tax-efficient structuring.", category: "Estate", size: "medium", href: "/solutions#estate" },
  { id: "digital", title: "Digital Asset Protection", summary: "Protection for business digital assets.", category: "Estate", size: "small", href: "/solutions#estate" },
  { id: "consultation", title: "Consultation & Risk Assessment", summary: "Identify your financial gaps. Start here.", category: "Advisory", size: "large", href: "/contact" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function BentoGrid() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04]"
    >
      {services.map((s) => (
        <motion.div
          key={s.id}
          variants={item}
          className={cn(
            "bg-vault-dark panel-hover p-6 sm:p-8 group",
            s.size === "large" && "sm:col-span-2",
            s.size === "medium" && "sm:col-span-1",
            s.size === "small" && "sm:col-span-1"
          )}
        >
          <Link href={s.href} className="block h-full">
            <p className="font-sans text-vault-muted text-[10px] uppercase tracking-[0.2em] mb-3">
              {s.category}
            </p>
            <h3 className="font-serif text-lg sm:text-xl font-medium text-vault-cream mb-2 group-hover:text-vault-brass transition-colors duration-200">
              {s.title}
            </h3>
            <p className="font-sans text-vault-muted text-sm leading-relaxed">{s.summary}</p>
            <span className="inline-block mt-4 font-sans text-xs text-vault-muted group-hover:text-vault-brass transition-colors uppercase tracking-widest">
              Learn more
            </span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
