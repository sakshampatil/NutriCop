import { int, mysqlTable } from "drizzle-orm/mysql-core";

export const days = mysqlTable("days", {
  id: int("id").autoincrement().primaryKey(),
  dayNo: int("day_no").notNull(),
  totalCalories: int("total_calories").notNull(),
  totalProteins: int("total_proteins").notNull(),
});
