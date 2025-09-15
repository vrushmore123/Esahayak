import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

// Database connection configuration
const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'buyer_leads_db',
});

// Export the drizzle DB instance
export const db = drizzle(pool);

// Export a client for raw queries if needed
export const pgClient = pool;
