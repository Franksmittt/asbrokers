import { Suspense } from "react";

import AuthCallbackImplicitClient from "./AuthCallbackImplicitClient";

export default function AuthCallbackImplicitPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-void px-4">
          <p className="text-sm text-cinematic-teal" role="status">
            Completing secure sign-in…
          </p>
        </div>
      }
    >
      <AuthCallbackImplicitClient />
    </Suspense>
  );
}
