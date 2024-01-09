import { int, mysqlTable, serial } from "drizzle-orm/mysql-core";
import { recipes } from "./recipes";
import { days } from "./days";

export const meals = mysqlTable('meals', {
  id: serial('id').primaryKey(),
  mealNo: serial('meal_no'),
  dayId: serial('day_id').references(() => days.id),
  proteins: int('proteins'),
  calories: int('calories'),
})

export const meals_recipes = mysqlTable('meals_recipes', {
  id: serial('id').primaryKey(),
  mealId: serial('meal_id').references(() => meals.id),
  recipeId: serial('recipe_id').references(() => recipes.id),
  qty: int('qty'),
})
