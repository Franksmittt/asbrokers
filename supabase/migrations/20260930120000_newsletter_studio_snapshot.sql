-- Newsletter Studio snapshot (editions JSON), same pattern as course_studio_snapshot.
CREATE TABLE IF NOT EXISTS newsletter_studio_snapshot (
  id text PRIMARY KEY,
  payload jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
