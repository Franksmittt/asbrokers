"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/lab", label: "The Lab" },
  { href: "/team", label: "The Team" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-vault-dark/80 backdrop-blur-md"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-serif text-lg font-medium text-vault-cream">
          <span className="text-vault-brass">AS</span>
          <span>Brokers</span>
          <span className="font-sans text-vault-muted text-xs font-normal ml-0.5">FSP 17273</span>
        </Link>
        <nav className="hidden md:flex items-center gap-10">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "font-sans text-xs uppercase tracking-widest transition-colors",
                pathname === item.href
                  ? "text-vault-brass"
                  : "text-vault-muted hover:text-vault-stone"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4 font-sans text-xs">
          <Link
            href="#"
            className="text-vault-muted hover:text-vault-stone transition-colors hidden sm:inline uppercase tracking-widest"
          >
            Client login
          </Link>
          <Link
            href="/contact?book=1"
            className="text-vault-muted hover:text-vault-brass transition-colors uppercase tracking-widest"
          >
            Book consult
          </Link>
          <a
            href="https://wa.me/27672429946"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/20 px-3 py-1.5 text-vault-stone hover:border-vault-brass/50 hover:text-vault-brass transition-colors uppercase tracking-widest"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </motion.header>
  );
}
