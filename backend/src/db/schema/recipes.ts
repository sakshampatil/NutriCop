import { mysqlTable, varchar, serial } from "drizzle-orm/mysql-core";

export const recipes = mysqlTable('recipes', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }),

}) 
