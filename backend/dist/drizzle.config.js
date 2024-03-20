"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
exports.default = {
    schema: "./src/schema/*.ts",
    out: "./migrations",
    driver: "pg", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
    dbCredentials: {
        connectionString: process.env.DATABASE_URL,
    },
};
