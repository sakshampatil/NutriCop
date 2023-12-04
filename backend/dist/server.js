"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const db = mysql2_1.default.createConnection({
    host: "localhost",
    user: "root",
    password: "1234@Abcd",
    database: "calories_tracker",
});
app.get("/", (req, res) => {
    res.json("Hey Saksham It Works");
});
app.get("/rawItems", (req, res) => {
    const q = "SELECT * FROM raw_items";
    db.query(q, (err, data) => {
        if (err)
            return res.json(err);
        else
            return res.json(data);
    });
});
app.listen(port, () => {
    console.log("Server is up and running");
});
