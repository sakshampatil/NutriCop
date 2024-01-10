import { mysqlTable, varchar, serial, decimal, int } from "drizzle-orm/mysql-core";

export const raw_items = mysqlTable("raw_items", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 50 }),
  unit: varchar("name", { length: 50 }),
  perQty: decimal("per_qty", { precision: 1 }),
  proteins: int("proteins"),
  calories: int("calories"),
});
