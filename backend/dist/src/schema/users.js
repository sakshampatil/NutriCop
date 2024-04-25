"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 50 }).notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 50 }).notNull().unique(),
    targetProteins: (0, pg_core_1.integer)("target_proteins"),
    targetCalories: (0, pg_core_1.integer)("target_calories"),
});
