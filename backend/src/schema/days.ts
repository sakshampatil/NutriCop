import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const days = mysqlTable("days", {
  id: int("id").autoincrement().primaryKey(),
  day: varchar("day", { length: 10 }).notNull(),
  totalCalories: int("total_calories").notNull(),
  totalProteins: int("total_proteins").notNull(),
});
