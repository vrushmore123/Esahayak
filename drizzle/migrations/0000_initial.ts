import { sql } from 'drizzle-orm';

export async function up(db) {
  await db.run(sql`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      email VARCHAR(255) NOT NULL UNIQUE,
      name VARCHAR(255),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
    );

    CREATE TABLE IF NOT EXISTS buyers (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      full_name VARCHAR(80) NOT NULL,
      email VARCHAR(255),
      phone VARCHAR(15) NOT NULL,
      city VARCHAR(50) NOT NULL,
      property_type VARCHAR(50) NOT NULL,
      bhk VARCHAR(10),
      purpose VARCHAR(10) NOT NULL,
      budget_min INTEGER,
      budget_max INTEGER,
      timeline VARCHAR(20) NOT NULL,
      source VARCHAR(20) NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'New',
      notes TEXT,
      owner_id UUID NOT NULL REFERENCES users(id),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
    );

    CREATE TABLE IF NOT EXISTS buyer_tags (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      buyer_id UUID NOT NULL REFERENCES buyers(id) ON DELETE CASCADE,
      tag VARCHAR(50) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS buyer_history (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      buyer_id UUID NOT NULL REFERENCES buyers(id) ON DELETE CASCADE,
      changed_by_id UUID NOT NULL REFERENCES users(id),
      changed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
      diff TEXT NOT NULL
    );
    
    CREATE INDEX buyers_owner_id_idx ON buyers (owner_id);
    CREATE INDEX buyer_tags_buyer_id_idx ON buyer_tags (buyer_id);
    CREATE INDEX buyer_history_buyer_id_idx ON buyer_history (buyer_id);
  `);
}

export async function down(db) {
  await db.run(sql`
    DROP TABLE IF EXISTS buyer_history;
    DROP TABLE IF EXISTS buyer_tags;
    DROP TABLE IF EXISTS buyers;
    DROP TABLE IF EXISTS users;
  `);
}
