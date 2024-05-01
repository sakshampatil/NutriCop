import { pgTable, serial, varchar, integer, json } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  email: varchar("email", { length: 50 }).notNull().unique(),
  targetProteins: integer("target_proteins").default(50),
  targetCalories: integer("target_calories").default(1800),
});
