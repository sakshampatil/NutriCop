import { mysqlTable, int, varchar, serial } from "drizzle-orm/mysql-core";
import { raw_items } from "./raw_items";

export const recipes = mysqlTable("recipes", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 50 }),
  proteins: int("proteins"),
  calories: int("calories"),
});

export const recipes_raw_items = mysqlTable("recipes_raw_items", {
  id: int("id").autoincrement().primaryKey(),
  recipeId: int("recipe_id").references(() => recipes.id),
  rawItemsId: int("raw_items_id").references(() => raw_items.id),
  qty: int("qty"),
});
