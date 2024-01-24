import { int, mysqlTable, serial } from "drizzle-orm/mysql-core";
import { recipes } from "./recipes";
import { days } from "./days";
import { relations } from "drizzle-orm";

export const meals = mysqlTable("meals", {
  id: int("id").autoincrement().primaryKey(),
  mealNo: int("meal_no"),
  dayId: int("day_id"),
  proteins: int("proteins"),
  calories: int("calories"),
});

export const mealsRelations = relations(meals, ({ many, one }) => ({
  mealsRecipies: many(meals_recipes),
  days: one(days, {
    fields: [meals.dayId],
    references: [days.id],
  }),
}));

export const meals_recipes = mysqlTable("meals_recipes", {
  id: int("id").autoincrement().primaryKey(),
  mealId: int("meal_id"),
  recipeId: int("recipe_id"),
  qty: int("qty"),
});

export const mealsRecipiesRelations = relations(meals_recipes, ({ one, many }) => ({
  meals: one(meals, {
    fields: [meals_recipes.mealId],
    references: [meals.id],
  }),
  recipes: many(recipes),
}));
