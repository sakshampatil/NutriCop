"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.connection = void 0;
const mysql2_1 = require("drizzle-orm/mysql2");
const mysql2_2 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.connection = mysql2_2.default.createConnection({
    host: "localhost",
    user: "root",
    password: "1234@Abcd",
    database: "calories_tracker",
    multipleStatements: true,
});
exports.db = (0, mysql2_1.drizzle)(exports.connection);
