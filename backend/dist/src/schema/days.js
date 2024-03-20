"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.days = void 0;
// import { relations } from "drizzle-orm";
const pg_core_1 = require("drizzle-orm/pg-core");
// import { meals } from "./meals";
exports.days = (0, pg_core_1.pgTable)("days", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    day: (0, pg_core_1.varchar)("day", { length: 10 }).notNull(),
    totalCalories: (0, pg_core_1.integer)("total_calories").notNull(),
    totalProteins: (0, pg_core_1.integer)("total_proteins").notNull(),
});
// export const daysRelations = relations(days, ({ many }) => ({
//   meals: many(meals),
// }));
