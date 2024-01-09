import { int, mysqlTable, serial } from "drizzle-orm/mysql-core";

export const days = mysqlTable('days', {
  id: serial('id').primaryKey(),
  dayNo: int('day_no'),
  totalCalories: int('total_calories'),
  totalProteins: int('total_proteins')
})
