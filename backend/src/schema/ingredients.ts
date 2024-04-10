// import { relations } from "drizzle-orm";
import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";
// import { recipes_raw_items } from "./recipes";

export const ingredients = pgTable(
  "ingredients",
  {
    id: serial("id").primaryKey(),
    userId: integer("userd_id").notNull(),
    name: varchar("name", { length: 50 }).notNull(),
    unit: varchar("unit", { length: 50 }),
    perUnit: integer("per_unit"),
    proteins: integer("proteins").notNull(),
    calories: integer("calories").notNull(),
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
