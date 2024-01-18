import { int, mysqlTable, serial } from "drizzle-orm/mysql-core";
import { recipes } from "./recipes";
import { days } from "./days";

export const meals = mysqlTable("meals", {
  id: int("id").autoincrement().primaryKey(),
  mealNo: int("meal_no"),
  // dayId: int("day_id").references(() => days.id),
  proteins: int("proteins"),
  calories: int("calories"),
});

export const meals_recipes = mysqlTable("meals_recipes", {
  id: int("id").autoincrement().primaryKey(),
  mealId: int("meal_id").references(() => meals.id),
  recipeId: int("recipe_id").references(() => recipes.id),
  qty: int("qty"),
});
