import { studioLogout } from "./actions";

export function LogoutForm() {
  return (
    <form action={studioLogout} className="shrink-0">
      <button
        type="submit"
        className="rounded-full border border-white/15 px-3 py-1.5 text-xs sm:text-sm text-zinc-300 hover:border-white/25 hover:bg-white/5 hover:text-white whitespace-nowrap"
      >
        Sign out
      </button>
    </form>
  );
}
