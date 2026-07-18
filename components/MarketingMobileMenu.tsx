import { Menu, X } from "@/components/icons";
import { PRIMARY_NAV } from "@/lib/site-navigation";

const PANEL_ID = "mobile-nav-panel";
const TOGGLE_ID = "mobile-nav-toggle";
const ICON_OPEN_ID = "mobile-nav-icon-open";
const ICON_CLOSED_ID = "mobile-nav-icon-closed";

/**
 * Zero-JS mobile nav: real `<button>` (a11y role) + tiny inline script for toggle/Escape.
 * No React hydration on the marketing critical path.
 */
export function MarketingMobileMenu() {
  return (
    <div className="relative lg:hidden">
      <button
        id={TOGGLE_ID}
        type="button"
        className="flex cursor-pointer items-center justify-center p-2 text-shark transition-colors hover:text-[#0057B8]"
        aria-label="Toggle menu"
        aria-expanded="false"
        aria-controls={PANEL_ID}
      >
        <span id={ICON_CLOSED_ID} className="inline-flex">
          <Menu className="h-6 w-6" aria-hidden />
        </span>
        <span id={ICON_OPEN_ID} className="hidden">
          <X className="h-6 w-6" aria-hidden />
        </span>
      </button>

      <div
        id={PANEL_ID}
        hidden
        className="fixed inset-x-0 top-[4.75rem] z-50 max-h-[85vh] overflow-y-auto border-b border-stone-200 bg-[#F7F6F3] shadow-2xl ring-1 ring-stone-200/90"
      >
        <div className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
          {PRIMARY_NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-2xl px-3 py-3 font-medium text-[#2B2B2E] hover:bg-white hover:text-shark"
            >
              {item.label}
            </a>
          ))}
          <div className="mt-3 border-t border-stone-300/80 pt-3">
            <a
              href="/contact?source=nav_cta"
              className="block w-full rounded-[2rem] bg-samsung-blue py-3.5 text-center font-semibold text-white shadow-md shadow-samsung-blue/20"
            >
              Contact us
            </a>
          </div>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var b=document.getElementById(${JSON.stringify(TOGGLE_ID)});var p=document.getElementById(${JSON.stringify(PANEL_ID)});var io=document.getElementById(${JSON.stringify(ICON_OPEN_ID)});var ic=document.getElementById(${JSON.stringify(ICON_CLOSED_ID)});if(!b||!p)return;function setOpen(open){p.hidden=!open;b.setAttribute("aria-expanded",open?"true":"false");if(io&&ic){io.classList.toggle("hidden",!open);io.classList.toggle("inline-flex",open);ic.classList.toggle("hidden",open);ic.classList.toggle("inline-flex",!open);}}b.addEventListener("click",function(){setOpen(p.hidden);});document.addEventListener("keydown",function(e){if(e.key==="Escape")setOpen(false);});})();`,
        }}
      />
    </div>
  );
}
