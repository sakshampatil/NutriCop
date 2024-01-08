import express, { Express, Request, Response } from "express";
import mysql, { Connection } from "mysql2";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const db: Connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234@Abcd",
  database: "calories_tracker",
});

app.get("/", (req: Request, res: Response) => {
  res.json("Hey Saksham It Works");
});

app.get("/rawItems", (req: Request, res: Response) => {
  const q = "SELECT * FROM raw_items";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });
});

app.listen(port, () => {
  console.log("Server is up and running");
});
