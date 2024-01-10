import { int, mysqlTable, serial } from "drizzle-orm/mysql-core";

export const days = mysqlTable("days", {
  id: int("id").autoincrement().primaryKey(),
  dayNo: int("day_no"),
  totalCalories: int("total_calories"),
  totalProteins: int("total_proteins"),
});
