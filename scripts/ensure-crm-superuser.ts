/**
 * Ensures the CRM superuser is Albert and retires the old placeholder admin.
 *
 * Usage:
 *   npm run crm:ensure-superuser
 *
 * Requires:
 *   NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Optional:
 *   DATABASE_URL - also syncs public.crm_staff_profiles
 */
import { resolve } from "path";
import { config as loadEnv } from "dotenv";
import { createClient, type User } from "@supabase/supabase-js";
import { Client } from "pg";

loadEnv({ path: resolve(process.cwd(), ".env") });
loadEnv({ path: resolve(process.cwd(), ".env.local"), override: true });

const SUPERUSER_EMAIL = "albert@asbrokers.co.za";
const LEGACY_ADMIN_EMAIL = "admin@asbrokers.co.za";
const SUPERUSER_NAME = "Albert Schuurman";
const SUPERUSER_PHONE = "0672429946";
const REVOKED_ROLE = "revoked";

function requiredEnv(name: string, fallback?: string): string {
  const value = (process.env[name] ?? fallback ?? "").trim();
  if (!value) {
    console.error(`Missing ${name}. Add it to .env.local or the runtime environment.`);
    process.exit(1);
  }
  return value;
}

async function findUserByEmail(email: string): Promise<User | null> {
  let page = 1;
  const perPage = 200;

  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });
    if (error) throw new Error(`Unable to list Supabase users: ${error.message}`);

    const match =
      data.users?.find((user) => user.email?.toLowerCase() === email.toLowerCase()) ?? null;
    if (match) return match;
    if (!data.users || data.users.length < perPage) return null;
    page += 1;
  }
}

async function ensureAuthSuperuser(): Promise<User> {
  const existing = await findUserByEmail(SUPERUSER_EMAIL);
  if (existing) {
    const { data, error } = await supabase.auth.admin.updateUserById(existing.id, {
      app_metadata: { ...existing.app_metadata, role: "admin" },
      user_metadata: {
        ...existing.user_metadata,
        full_name: SUPERUSER_NAME,
        phone: SUPERUSER_PHONE,
      },
      ban_duration: "none",
    });
    if (error || !data.user) {
      throw new Error(`Unable to promote ${SUPERUSER_EMAIL}: ${error?.message ?? "No user returned"}`);
    }
    return data.user;
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email: SUPERUSER_EMAIL,
    email_confirm: true,
    app_metadata: { role: "admin" },
    user_metadata: { full_name: SUPERUSER_NAME, phone: SUPERUSER_PHONE },
  });
  if (error || !data.user) {
    throw new Error(`Unable to create ${SUPERUSER_EMAIL}: ${error?.message ?? "No user returned"}`);
  }
  return data.user;
}

async function revokeLegacyAdmin(): Promise<User | null> {
  const legacy = await findUserByEmail(LEGACY_ADMIN_EMAIL);
  if (!legacy) return null;

  const { data, error } = await supabase.auth.admin.updateUserById(legacy.id, {
    app_metadata: { ...legacy.app_metadata, role: REVOKED_ROLE },
    ban_duration: "876000h",
  });
  if (error) {
    throw new Error(`Unable to revoke ${LEGACY_ADMIN_EMAIL}: ${error.message}`);
  }
  return data.user ?? legacy;
}

async function syncStaffProfiles(superuser: User, legacy: User | null) {
  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (!databaseUrl) {
    console.log("DATABASE_URL not set; skipped crm_staff_profiles sync.");
    return;
  }

  const client = new Client({ connectionString: databaseUrl });
  await client.connect();
  try {
    await client.query(
      `
        INSERT INTO public.crm_staff_profiles
          (id, full_name, email, phone, role, is_active, permissions, updated_at)
        VALUES
          ($1, $2, $3, $4, 'admin', true, '{}'::jsonb, NOW())
        ON CONFLICT (id) DO UPDATE SET
          full_name = EXCLUDED.full_name,
          email = EXCLUDED.email,
          phone = EXCLUDED.phone,
          role = 'admin',
          is_active = true,
          permissions = '{}'::jsonb,
          updated_at = NOW()
      `,
      [superuser.id, SUPERUSER_NAME, SUPERUSER_EMAIL, SUPERUSER_PHONE]
    );

    await client.query(
      `
        UPDATE public.crm_staff_profiles
        SET is_active = false, updated_at = NOW()
        WHERE lower(email) = lower($1)
      `,
      [LEGACY_ADMIN_EMAIL]
    );

    if (legacy) {
      await client.query(
        `
          UPDATE public.crm_staff_profiles
          SET is_active = false, updated_at = NOW()
          WHERE id = $1
        `,
        [legacy.id]
      );
    }
  } finally {
    await client.end();
  }
}

const supabaseUrl = requiredEnv(
  "NEXT_PUBLIC_SUPABASE_URL",
  process.env.SUPABASE_URL
);
const serviceRoleKey = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function main() {
  const superuser = await ensureAuthSuperuser();
  const legacy = await revokeLegacyAdmin();
  await syncStaffProfiles(superuser, legacy);

  console.log(`OK: ${SUPERUSER_EMAIL} is the CRM admin superuser.`);
  if (legacy) {
    console.log(`OK: ${LEGACY_ADMIN_EMAIL} was revoked and deactivated.`);
  } else {
    console.log(`OK: no ${LEGACY_ADMIN_EMAIL} Supabase Auth user was found.`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
