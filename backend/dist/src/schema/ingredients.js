"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingredients = void 0;
// import { relations } from "drizzle-orm";
const pg_core_1 = require("drizzle-orm/pg-core");
// import { recipes_raw_items } from "./recipes";
exports.ingredients = (0, pg_core_1.pgTable)("ingredients", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.integer)("userd_id").notNull(),
    name: (0, pg_core_1.varchar)("name", { length: 50 }).notNull(),
    unit: (0, pg_core_1.varchar)("unit", { length: 50 }),
    perQty: (0, pg_core_1.integer)("per_qty"),
    proteins: (0, pg_core_1.integer)("proteins").notNull(),
    calories: (0, pg_core_1.integer)("calories").notNull(),
}
// (table) => {
//   return {
//     nameidx: uniqueIndex("name_idx").on(table.name),
//   };
// }
);
// export const rawItemsrelations = relations(raw_items, ({ one }) => ({
//   recipesRawItems: one(recipes_raw_items, {
//     fields: [raw_items.id],
//     references: [recipes_raw_items.rawItemsId],
//   }),
// }));
