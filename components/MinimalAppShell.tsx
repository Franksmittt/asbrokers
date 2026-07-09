import type { ReactNode } from "react";

/** Skip link + main landmark for non-marketing app surfaces. */
export function MinimalAppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <main id="main-content" className="min-h-screen" tabIndex={-1}>
        {children}
      </main>
    </>
  );
}
