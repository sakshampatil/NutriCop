"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipes = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
// import { raw_items } from "./raw_items";
// import { relations } from "drizzle-orm";
// import { meals_recipes } from "./meals";
exports.recipes = (0, pg_core_1.pgTable)("recipes", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.integer)("userd_id").notNull(),
    name: (0, pg_core_1.varchar)("name", { length: 50 }).notNull(),
    raw_items: (0, pg_core_1.json)("raw_items").$type(),
    proteins: (0, pg_core_1.integer)("proteins").notNull(),
    calories: (0, pg_core_1.integer)("calories").notNull(),
}
// (table) => {
//   return {
//     nameidx: uniqueIndex("name_idx").on(table.name),
//   };
// }
);
// export const recipeRelations = relations(recipes, ({ one, many }) => ({
//   recipesRawItems: many(recipes_raw_items),
//   mealsRecipies: one(meals_recipes, {
//     fields: [recipes.id],
//     references: [meals_recipes.recipeId],
//   }),
// }));
// export const recipes_raw_items = mysqlTable(
//   "recipes_raw_items",
//   {
//     id: int("id").autoincrement().primaryKey(),
//     recipeId: int("recipe_id").notNull(),
//     rawItemsId: int("raw_items_id").notNull(),
//     qty: int("qty").notNull(),
//   }
// (table) => {
//   return {
//     recipeIdidx: index("recipeId_idx").on(table.recipeId),
//   };
// }
// );
// export const recipes_raw_itemsRelations = relations(recipes_raw_items, ({ one, many }) => ({
//   recipes: one(recipes, {
//     fields: [recipes_raw_items.recipeId],
//     references: [recipes.id],
//   }),
//   rawItems: many(raw_items),
// }));
