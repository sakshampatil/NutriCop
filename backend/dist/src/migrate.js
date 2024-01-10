"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const migrator_1 = require("drizzle-orm/mysql2/migrator");
const db_1 = require("./db");
(0, migrator_1.migrate)(db_1.db, { migrationsFolder: "./migrations" });
// Don't forget to close the connection, otherwise the script will hang
