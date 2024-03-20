// import { relations } from "drizzle-orm";
import { pgTable, serial, varchar, integer, json } from "drizzle-orm/pg-core";
// import { meals } from "./meals";

export const days = pgTable("days", {
  id: serial("id").primaryKey(),
  userId: integer("userd_id").notNull(),
  day: varchar("day", { length: 10 }).notNull(),
  totalCalories: integer("total_calories").notNull(),
  totalProteins: integer("total_proteins").notNull(),
});

// export const daysRelations = relations(days, ({ many }) => ({
//   meals: many(meals),
// }));
