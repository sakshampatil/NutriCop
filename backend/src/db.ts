import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234@Abcd",
  database: "calories_tracker",
  multipleStatements: true,
});

export const db = drizzle(connection);
