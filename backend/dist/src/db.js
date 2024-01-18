"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.connection = void 0;
require("dotenv/config");
const planetscale_serverless_1 = require("drizzle-orm/planetscale-serverless");
const database_1 = require("@planetscale/database");
// create the connection
exports.connection = (0, database_1.connect)({
    url: process.env.DATABASE_URL,
});
exports.db = (0, planetscale_serverless_1.drizzle)(exports.connection);
