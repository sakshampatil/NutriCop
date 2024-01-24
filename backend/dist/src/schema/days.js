"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.days = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
exports.days = (0, mysql_core_1.mysqlTable)("days", {
    id: (0, mysql_core_1.int)("id").autoincrement().primaryKey(),
    dayNo: (0, mysql_core_1.int)("day_no").notNull(),
    totalCalories: (0, mysql_core_1.int)("total_calories").notNull(),
    totalProteins: (0, mysql_core_1.int)("total_proteins").notNull(),
});
