import "dotenv/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import schema from "./schema";
// create the connection
export const connection = connect({
  url: process.env.DATABASE_URL,
});

export const db = drizzle(connection, { schema: schema });
