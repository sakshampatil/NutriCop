import { relations } from "drizzle-orm";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { meals } from "./meals";

export const days = mysqlTable("days", {
  id: int("id").autoincrement().primaryKey(),
  day: varchar("day", { length: 10 }).notNull(),
  totalCalories: int("total_calories").notNull(),
  totalProteins: int("total_proteins").notNull(),
});

export const daysRelations = relations(days, ({ many }) => ({
  meals: many(meals),
}));
