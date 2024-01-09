import { mysqlTable, int, varchar, serial } from "drizzle-orm/mysql-core";
import { raw_items } from "./raw_items";

export const recipes = mysqlTable('recipes', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }),
  proteins: int('proteins'),
  calories: int('calories')
})

export const recipes_raw_items = mysqlTable('recipes_raw_items', {
  id: serial('id').primaryKey(),
  recipeId: serial('recipe_id').references(() => recipes.id),
  rawItemsId: serial('raw_items_id').references(() => raw_items.id),
  qty: int('qty'),
})
