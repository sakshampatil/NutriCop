import { pgTable, serial, varchar, integer, json } from "drizzle-orm/pg-core";
// import { raw_items } from "./raw_items";
// import { relations } from "drizzle-orm";
// import { meals_recipes } from "./meals";

export const recipes = pgTable(
  "recipes",
  {
    id: serial("id").primaryKey(),
    userId: integer("userd_id").notNull(),
    name: varchar("name", { length: 50 }).notNull(),
    raw_items: json("raw_items").$type<{ rawItemId: number; qty: number }[]>(),
    proteins: integer("proteins").notNull(),
    calories: integer("calories").notNull(),
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
