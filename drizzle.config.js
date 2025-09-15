require("dotenv").config({ path: ".env.local" });

/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./src/lib/schema.ts",
  out: "./drizzle/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL || "",
  },
};
