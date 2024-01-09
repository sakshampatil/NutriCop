import express, { Express, Request, Response } from "express";
import mysql, { Connection } from "mysql2";
import dotenv from "dotenv";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./schema"
import { raw_items } from "./schema/raw_items";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const sql = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});

const db = drizzle(sql)

const generateMigrate = async () => {
  await migrate(db, { migrationsFolder: "migrations" })
}

generateMigrate()


app.listen(port, () => {
  console.log("Server is up and running");
});


