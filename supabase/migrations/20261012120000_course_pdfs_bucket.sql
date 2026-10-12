-- Course Studio PDF uploads → private Supabase Storage.
-- Run via Supabase SQL Editor or `supabase db push`; idempotent.
-- Students download through /api/studio/media (service role). No public storage policy.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'course-pdfs',
  'course-pdfs',
  false,
  20971520,
  array['application/pdf']::text[]
)
on conflict (id) do update
set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
