CREATE TABLE users (
  id uuid PRIMARY KEY,
  role text NOT NULL CHECK (role IN ('technician', 'manager')),
  name text NOT NULL
);

CREATE TABLE units (
  id uuid PRIMARY KEY,
  name text NOT NULL
);

CREATE TABLE alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id uuid NOT NULL REFERENCES units(id),
  secret_internal_code text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);
