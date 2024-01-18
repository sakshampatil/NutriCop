import { int, mysqlTable } from "drizzle-orm/mysql-core";

export const days = mysqlTable("days", {
  id: int("id").primaryKey(),
  dayNo: int("day_no"),
  totalCalories: int("total_calories"),
  totalProteins: int("total_proteins"),
});
