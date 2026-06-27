import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function supabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  const key = serviceKey || anonKey;
  return url && key ? { url, key } : null;
}

/** Exchange Supabase magic-link code or token_hash for session cookies. */
export async function GET(request: Request) {
  const env = supabaseEnv();
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const otpType = searchParams.get("type");
  const next = searchParams.get("next") ?? "/crm";
  const safeNext = next.startsWith("/") ? next : "/crm";

  if (!env || (!code && !(tokenHash && otpType))) {
    return NextResponse.redirect(`${origin}/login`);
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(env.url, env.key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Server Component context — middleware refresh handles session
        }
      },
    },
  });

  const { error } = code
    ? await supabase.auth.exchangeCodeForSession(code)
    : await supabase.auth.verifyOtp({
        token_hash: tokenHash!,
        type: otpType as "magiclink" | "email" | "recovery" | "invite",
      });

  if (error) {
    return NextResponse.redirect(`${origin}/login?error=auth`);
  }

  return NextResponse.redirect(`${origin}${safeNext}`);
}
