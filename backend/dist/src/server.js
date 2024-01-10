"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// const mysql = require("mysql2");
const dotenv_1 = __importDefault(require("dotenv"));
// const drizzle = require("drizzle-orm/mysql2");
dotenv_1.default.config();
const app = (0, express_1.default)();
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
