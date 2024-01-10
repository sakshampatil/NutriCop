import express from "express";
// const mysql = require("mysql2");
import dotenv from "dotenv";
// const drizzle = require("drizzle-orm/mysql2");

dotenv.config();

const app = express();
const port = process.env.PORT;

// const sql = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   port: Number(process.env.DB_PORT),
// });

// const db = drizzle(sql);

app.listen(port, () => {
  console.log("USER", process.env.DB_HOST);
  console.log("Server is up and running");
});
