"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.daysRelations = exports.days = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const mysql_core_1 = require("drizzle-orm/mysql-core");
const meals_1 = require("./meals");
exports.days = (0, mysql_core_1.mysqlTable)("days", {
    id: (0, mysql_core_1.int)("id").autoincrement().primaryKey(),
    day: (0, mysql_core_1.varchar)("day", { length: 10 }).notNull(),
    totalCalories: (0, mysql_core_1.int)("total_calories").notNull(),
    totalProteins: (0, mysql_core_1.int)("total_proteins").notNull(),
});
exports.daysRelations = (0, drizzle_orm_1.relations)(exports.days, ({ many }) => ({
    meals: many(meals_1.meals),
}));
