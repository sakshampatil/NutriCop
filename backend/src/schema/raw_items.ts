import { relations } from "drizzle-orm";
import { mysqlTable, varchar, serial, decimal, int } from "drizzle-orm/mysql-core";
import { recipes_raw_items } from "./recipes";

export const raw_items = mysqlTable("raw_items", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  unit: varchar("unit", { length: 50 }),
  perQty: decimal("per_qty", { precision: 1 }),
  proteins: int("proteins").notNull(),
  calories: int("calories").notNull(),
});

export const rawItemsrelations = relations(raw_items, ({ one }) => ({
  recipesRawItems: one(recipes_raw_items, {
    fields: [raw_items.id],
    references: [recipes_raw_items.rawItemsId],
  }),
}));
