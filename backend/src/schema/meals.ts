import { int, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
import { recipes } from "./recipes";
import { days } from "./days";
import { relations } from "drizzle-orm";

export const meals = mysqlTable("meals", {
  id: int("id").autoincrement().primaryKey(),
  mealNo: int("meal_no").notNull(),
  day: varchar("day", { length: 10 }).notNull(),
  proteins: int("proteins").notNull(),
  calories: int("calories").notNull(),
});

export const mealsRelations = relations(meals, ({ many, one }) => ({
  mealsRecipies: many(meals_recipes),
  days: one(days, {
    fields: [meals.day],
    references: [days.day],
  }),
}));

export const meals_recipes = mysqlTable("meals_recipes", {
  id: int("id").autoincrement().primaryKey(),
  mealId: int("meal_id").notNull(),
  recipeId: int("recipe_id").notNull(),
  qty: int("qty").notNull(),
});

export const mealsRecipiesRelations = relations(meals_recipes, ({ one, many }) => ({
  meals: one(meals, {
    fields: [meals_recipes.mealId],
    references: [meals.id],
  }),
  recipes: many(recipes),
}));
