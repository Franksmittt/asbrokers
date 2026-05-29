-- Insights studio (/studio/blog) image uploads → Supabase Storage.
-- Run via Supabase SQL Editor or `supabase db push`; idempotent.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog-images',
  'blog-images',
  false,
  20971520,
  array['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/avif', 'image/svg+xml']::text[]
)
on conflict (id) do update
set
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
