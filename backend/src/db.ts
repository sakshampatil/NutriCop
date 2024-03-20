import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import schema from "./schema";

// create the connection
const connectionString = process.env.DATABASE_URL;

export const client = postgres(connectionString!, { prepare: false });

export const db = drizzle(client, { schema });
