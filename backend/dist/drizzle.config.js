"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
exports.default = {
    schema: "./src/schema/*.ts",
    out: "./migrations",
    driver: "mysql2", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
    dbCredentials: {
        uri: process.env.DATABASE_URL,
    },
    strict: true,
};
