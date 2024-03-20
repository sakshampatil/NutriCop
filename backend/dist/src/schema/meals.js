"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meals = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
// import { recipes } from "./recipes";
// import { days } from "./days";
// import { relations } from "drizzle-orm";
exports.meals = (0, pg_core_1.pgTable)("meals", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    mealNo: (0, pg_core_1.integer)("meal_no").notNull(),
    day: (0, pg_core_1.varchar)("day", { length: 10 }).notNull(),
    recipes: (0, pg_core_1.json)("recipes").$type(),
    proteins: (0, pg_core_1.integer)("proteins").notNull(),
    calories: (0, pg_core_1.integer)("calories").notNull(),
});
// export const mealsRelations = relations(meals, ({ many, one }) => ({
//   mealsRecipies: many(meals_recipes),
//   days: one(days, {
//     fields: [meals.day],
//     references: [days.day],
//   }),
// }));
// export const meals_recipes = mysqlTable("meals_recipes", {
//   id: int("id").autoincrement().primaryKey(),
//   mealId: int("meal_id").notNull(),
//   recipeId: int("recipe_id").notNull(),
//   qty: int("qty").notNull(),
// });
// export const mealsRecipiesRelations = relations(meals_recipes, ({ one, many }) => ({
//   meals: one(meals, {
//     fields: [meals_recipes.mealId],
//     references: [meals.id],
//   }),
//   recipes: many(recipes),
// }));
