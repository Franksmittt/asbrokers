"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { ShieldCheck, User, ChevronDown, Menu, X } from "./icons";
import { useLeadForm } from "./LeadFormContext";

const solutionsItems = [
  { label: "All solutions", href: "/solutions" },
  { label: "Wealth & Retirement", href: "/#wealth" },
  { label: "Everest Wealth", href: "/everest-wealth" },
  { label: "Understanding Everest Wealth", href: "/everest-wealth/about" },
  { label: "Personal insurance", href: "/solutions/personal-insurance" },
  { label: "Business insurance", href: "/solutions/business-insurance" },
  { label: "Life insurance", href: "/solutions/life-insurance" },
  { label: "Business life", href: "/solutions/business-life" },
  { label: "Legacy & Estate", href: "/solutions#estate" },
  { label: "Team", href: "/team" },
];

const calculatorsItems = [
  { label: "Calculator Hub", href: "/calculators" },
  { label: "Everest Wealth Calculators", href: "/everest-wealth" },
  { label: "Run-Out Calculator", href: "/lab#calculator" },
  { label: "Retirement Reality Calculator", href: "/retirement" },
  { label: "Income in Retirement (Life of Capital)", href: "/income-in-retirement" },
  { label: "Income Tax Calculator", href: "/income-tax-calculator" },
  { label: "Future Value / Inflation Calculator", href: "/cost-of-inflation-over-time" },
  { label: "Estate Duty Calculator", href: "/estate-duty-calculator" },
  { label: "Annual Estate Reduction Strategy", href: "/annual-estate-reduction-strategy" },
  { label: "Premium Increase Problem Calculator", href: "/premium-increase-calculator" },
  { label: "Estate & Property Tools", href: "/lab" },
];

export function Nav() {
  const { openLeadForm } = useLeadForm();
  const [scrolled, setScrolled] = useState(false);
  const [calculatorsOpen, setCalculatorsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const calculatorsRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (calculatorsRef.current && !calculatorsRef.current.contains(target)) setCalculatorsOpen(false);
      if (solutionsRef.current && !solutionsRef.current.contains(target)) setSolutionsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkClass = `hover:text-white transition-colors whitespace-nowrap ${scrolled ? "text-zinc-200" : "text-zinc-400"}`;
  const closeMobile = () => setMobileOpen(false);

  const dropdownPanelClass =
    "absolute top-full left-0 mt-1 py-2 min-w-[200px] bg-[#151518] border border-white/10 rounded-xl shadow-xl backdrop-blur-xl z-50";

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-[#0a0a0c]/90 backdrop-blur-xl border-white/10 py-3 shadow-lg shadow-black/20"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-teal-400 p-2 rounded-xl">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight block leading-none text-white">AS Brokers</span>
            <span className={`text-[10px] font-medium tracking-widest uppercase mt-1 block transition-colors ${scrolled ? "text-zinc-300" : "text-zinc-400"}`}>
              FSP 17273
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1 text-sm font-medium">
          <Link href="/" className={`px-3 py-2 rounded-lg ${linkClass}`}>Home</Link>

          {/* Solutions dropdown */}
          <div className="relative" ref={solutionsRef}>
            <button
              type="button"
              onClick={() => setSolutionsOpen(!solutionsOpen)}
              onMouseEnter={() => setSolutionsOpen(true)}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg ${linkClass} ${solutionsOpen ? "text-white bg-white/5" : ""}`}
            >
              Solutions
              <ChevronDown className={`w-4 h-4 transition-transform ${solutionsOpen ? "rotate-180" : ""}`} />
            </button>
            {solutionsOpen && (
              <div
                className={dropdownPanelClass}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                {solutionsItems.map((item) => (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    onClick={() => setSolutionsOpen(false)}
                    className="block px-4 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors first:rounded-t-xl last:rounded-b-xl"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Calculators dropdown */}
          <div className="relative" ref={calculatorsRef}>
            <button
              type="button"
              onClick={() => setCalculatorsOpen(!calculatorsOpen)}
              onMouseEnter={() => setCalculatorsOpen(true)}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg ${linkClass} ${calculatorsOpen ? "text-white bg-white/5" : ""}`}
            >
              Calculators
              <ChevronDown className={`w-4 h-4 transition-transform ${calculatorsOpen ? "rotate-180" : ""}`} />
            </button>
            {calculatorsOpen && (
              <div
                className={dropdownPanelClass}
                onMouseLeave={() => setCalculatorsOpen(false)}
              >
                {calculatorsItems.map((item) => (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    onClick={() => setCalculatorsOpen(false)}
                    className="block px-4 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors first:rounded-t-xl last:rounded-b-xl"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/team" className={`px-3 py-2 rounded-lg ${linkClass}`}>
            Team
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openLeadForm}
            className="hidden sm:flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all backdrop-blur-md"
          >
            <User className="w-4 h-4" /> Client Login
          </button>
          <Link
            href="/contact"
            className="hidden sm:flex items-center px-5 py-2 rounded-full text-sm font-semibold border border-white/20 text-white hover:bg-white/10 transition-all"
          >
            Contact Us
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0a0a0c]/98 backdrop-blur-2xl border-b border-white/10 py-4 px-4 sm:px-6 max-h-[80vh] overflow-y-auto overscroll-contain">
          <div className="flex flex-col gap-0">
            {solutionsItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={closeMobile} className="py-3 text-zinc-300 hover:text-white font-medium">
                {item.label}
              </Link>
            ))}
            <span className="text-zinc-500 text-[10px] font-medium uppercase tracking-widest px-2 py-2 mt-2">Calculators</span>
            {calculatorsItems.map((item) => (
              <Link key={item.href + item.label} href={item.href} onClick={closeMobile} className="py-2.5 pl-4 text-zinc-300 hover:text-white text-sm border-l-2 border-transparent hover:border-blue-500">
                {item.label}
              </Link>
            ))}
            <Link href="/team" onClick={closeMobile} className="py-3 mt-2 text-zinc-300 hover:text-white font-medium border-t border-white/5 pt-4">
              Team
            </Link>
            <button
              type="button"
              onClick={() => { openLeadForm(); closeMobile(); }}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-white/10 border border-white/10 text-white py-3 rounded-full text-sm font-semibold"
            >
              <User className="w-4 h-4" /> Client Login
            </button>
            <Link href="/contact" onClick={closeMobile} className="mt-3 py-3 text-center text-zinc-300 hover:text-white font-medium border border-white/20 rounded-full">
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
