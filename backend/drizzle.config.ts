import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schema/*.ts",
  out: "./migrations",
  driver: "mysql2", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    uri: process.env.DATABASE_URL as string,
  },
  strict: true,
} satisfies Config;
