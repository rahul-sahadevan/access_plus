-- user entries
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE user_entries(
user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
email VARCHAR(255) UNIQUE NOT NULL,
username VARCHAR(50) UNIQUE NOT NULL,
password TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- login entries
CREATE TABLE login_entries(
session_token UUID PRIMARY KEY,
user_id UUID REFERENCES user_entries(user_id) ON DELETE CASCADE,
login_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
expired_at DEFAULT (CURRENT_TIMESTAMP + INTERVAL '1 hour')
);

-- netplan entries
CREATE TABLE netplan_config(
    id INTEGER PRIMARY KEY DEFAULT 1,
    config JSONB NOT NULL,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
)


