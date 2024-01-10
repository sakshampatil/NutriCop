import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { createConnection } from "mysql2";
import { db, connection } from "./db";

migrate(db, { migrationsFolder: "./migrations" });
// Don't forget to close the connection, otherwise the script will hang
