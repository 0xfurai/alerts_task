CREATE TABLE users (
  id uuid PRIMARY KEY,
  role text NOT NULL CHECK (role IN ('technician', 'manager')),
  name text NOT NULL
);

CREATE TABLE units (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  status text NOT NULL DEFAULT 'available'
    CHECK (status IN ('available', 'sleep', 'in_use')),
  is_active boolean NOT NULL DEFAULT true,
  door_access_code text NOT NULL,
  secret_internal_note text,
  updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);
