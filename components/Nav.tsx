"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { User, Menu, X } from "./icons";
import { BrandLogo } from "@/components/BrandLogo";
import { Home4UtilityBar } from "@/components/home4/Home4UtilityBar";
import { isNavActive, HOME2_PRIMARY_NAV, PRIMARY_NAV } from "@/lib/site-navigation";

const PlanningToolsMenu = dynamic(
  () => import("./PlanningToolsMenu").then((m) => m.PlanningToolsMenu),
  { loading: () => <span className="px-3 py-2 text-sm text-zinc-400">Planning tools</span> }
);
const PlanningToolsMobileSection = dynamic(
  () => import("./PlanningToolsMenu").then((m) => m.PlanningToolsMobileSection),
  { loading: () => null }
);

const dashboardPaths = ["/crm", "/login"];

export function Nav() {
  const pathname = usePathname();
  const isDashboard = dashboardPaths.some((p) => pathname?.startsWith(p));
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const isHome4 = pathname === "/home4";
  const linkClass = isHome4
    ? `hover:text-shark transition-colors duration-300 ease-apple whitespace-nowrap ${
        scrolled ? "text-stone-600" : "text-stone-500"
      }`
    : `hover:text-white transition-colors duration-300 ease-apple whitespace-nowrap ${
        scrolled ? "text-zinc-200" : "text-zinc-400"
      }`;
  const closeMobile = () => setMobileOpen(false);
  const isJourneyHome = pathname === "/home2" || pathname === "/home3" || isHome4;
  const navLinks = (isJourneyHome ? HOME2_PRIMARY_NAV : PRIMARY_NAV).filter(
    (item) => !(isHome4 && item.href === "/contact")
  );
  const homeHref =
    pathname === "/home2"
      ? "/home2"
      : pathname === "/home3"
        ? "/home3"
        : isHome4
          ? "/home4"
          : "/";

  if (isDashboard) {
    return (
      <nav className="fixed top-0 w-full z-50 border-b bg-vault-card/80 backdrop-blur border-white/10 py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" prefetch={false} className="flex items-center gap-3">
            <BrandLogo height={36} priority className="h-9 w-auto rounded-2xl object-contain" />
            <span className="text-xl font-bold tracking-tight text-white">AS Brokers</span>
          </Link>
          <div className="flex items-center gap-4">
            {pathname?.startsWith("/login") ? (
              <Link href="/" prefetch={false} className="text-sm text-zinc-400 hover:text-white">
                Back to site
              </Link>
            ) : (
              <>
                <Link href="/" prefetch={false} className="text-sm text-zinc-400 hover:text-white">
                  Back to site
                </Link>
                <Link
                  href="/login"
                  prefetch={false}
                  className="text-sm rim-light px-4 py-2 rounded-2xl text-white hover:bg-white/10"
                >
                  Switch account
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      {isHome4 ? <Home4UtilityBar /> : null}
      <nav
        className={`fixed w-full z-50 border-b transition-all duration-500 ease-apple ${
          isHome4 ? "top-9" : "top-0"
        } ${
          isHome4
            ? scrolled
              ? "border-stone-200/80 bg-white/95 py-3 shadow-lg shadow-stone-900/5 backdrop-blur-xl"
              : "border-transparent bg-white/75 py-4 backdrop-blur-md"
            : scrolled
              ? "bg-white/5 backdrop-blur-2xl border-white/10 py-3 shadow-rim-glow shadow-black/20"
              : "bg-transparent border-transparent py-5"
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        <Link href={homeHref} prefetch={false} className="flex items-center gap-3 shrink-0">
          <BrandLogo height={36} priority className="h-9 w-auto rounded-2xl object-contain" />
          <div className="hidden sm:block">
            <span
              className={`text-lg font-bold tracking-tight block leading-none ${
                isHome4 ? "text-shark" : "text-white"
              }`}
            >
              AS Brokers
            </span>
            <span
              className={`trust-hallmark text-[10px] font-semibold uppercase mt-0.5 block transition-colors duration-300 ${
                isHome4
                  ? "text-stone-500"
                  : scrolled
                    ? "text-zinc-300"
                    : "text-zinc-400"
              }`}
            >
              FSP 17273
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-0.5 text-sm font-medium">
          {!isJourneyHome ? <PlanningToolsMenu scrolled={scrolled} linkClass={linkClass} /> : null}
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className={`px-3 py-2 rounded-2xl transition-colors duration-300 ${
                isNavActive(pathname ?? "", item.href)
                  ? isHome4
                    ? "text-shark font-semibold"
                    : "text-white"
                  : linkClass
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/login"
            aria-label={isHome4 ? "Client portal login" : "Team office login"}
            className={`hidden md:flex items-center gap-2 border-0 px-4 py-2 rounded-[2rem] text-sm font-semibold transition-all ${
              isHome4
                ? "text-stone-600 hover:bg-stone-100"
                : "rim-light hover:bg-white/10 text-white"
            }`}
          >
            <User className="w-4 h-4" />
            <span className="hidden xl:inline">{isHome4 ? "Client Portal" : "Team office"}</span>
          </Link>
          <Link
            href="/contact"
            prefetch={false}
            className={`hidden sm:flex items-center px-4 py-2 rounded-[2rem] text-sm font-semibold transition-all ${
              isHome4
                ? "bg-samsung-blue text-white shadow-md shadow-samsung-blue/20 hover:bg-[#004a9e]"
                : "rim-light text-white hover:bg-white/10"
            }`}
          >
            {isHome4 ? "Find an Adviser" : "Contact"}
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 transition-colors ${
              isHome4 ? "text-stone-500 hover:text-shark" : "text-zinc-400 hover:text-white"
            }`}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav-panel"
          className={`lg:hidden absolute top-full left-0 right-0 backdrop-blur-2xl border-b shadow-2xl max-h-[85vh] overflow-y-auto ${
            isHome4 ? "bg-white/98 border-stone-200" : "bg-shark/98 border-white/10"
          }`}
        >
          <div className="py-3 px-4 flex flex-col">
            {!isJourneyHome ? <PlanningToolsMobileSection onNavigate={closeMobile} /> : null}
            {!isJourneyHome ? <div className="border-t border-white/10 my-2" /> : null}
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                onClick={closeMobile}
                className={`py-3 px-2 font-medium rounded-2xl ${
                  isHome4 ? "text-shark hover:bg-stone-100" : "text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className={`border-t mt-3 pt-3 flex flex-col gap-2 ${isHome4 ? "border-stone-200" : "border-white/10"}`}>
              <Link
                href="/contact"
                prefetch={false}
                onClick={closeMobile}
                className={`w-full py-3.5 text-center font-semibold rounded-[2rem] ${
                  isHome4 ? "bg-samsung-blue text-white" : "text-white bg-[#00549F]"
                }`}
              >
                {isHome4 ? "Find an Adviser" : "Contact us"}
              </Link>
              <Link
                href="/login"
                onClick={closeMobile}
                className={`w-full py-3 text-center text-sm ${
                  isHome4 ? "text-stone-500 hover:text-shark" : "text-zinc-400 hover:text-white"
                }`}
              >
                {isHome4 ? "Client Portal" : "Team office login"}
              </Link>
            </div>
          </div>
        </div>
      )}
      </nav>
    </>
  );
}
