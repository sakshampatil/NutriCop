"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mealsRecipiesRelations = exports.meals_recipes = exports.mealsRelations = exports.meals = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const recipes_1 = require("./recipes");
const days_1 = require("./days");
const drizzle_orm_1 = require("drizzle-orm");
exports.meals = (0, mysql_core_1.mysqlTable)("meals", {
    id: (0, mysql_core_1.int)("id").autoincrement().primaryKey(),
    mealNo: (0, mysql_core_1.int)("meal_no").notNull(),
    day: (0, mysql_core_1.varchar)("day", { length: 10 }).notNull(),
    proteins: (0, mysql_core_1.int)("proteins").notNull(),
    calories: (0, mysql_core_1.int)("calories").notNull(),
});
exports.mealsRelations = (0, drizzle_orm_1.relations)(exports.meals, ({ many, one }) => ({
    mealsRecipies: many(exports.meals_recipes),
    days: one(days_1.days, {
        fields: [exports.meals.day],
        references: [days_1.days.day],
    }),
}));
exports.meals_recipes = (0, mysql_core_1.mysqlTable)("meals_recipes", {
    id: (0, mysql_core_1.int)("id").autoincrement().primaryKey(),
    mealId: (0, mysql_core_1.int)("meal_id").notNull(),
    recipeId: (0, mysql_core_1.int)("recipe_id").notNull(),
    qty: (0, mysql_core_1.int)("qty").notNull(),
});
exports.mealsRecipiesRelations = (0, drizzle_orm_1.relations)(exports.meals_recipes, ({ one, many }) => ({
    meals: one(exports.meals, {
        fields: [exports.meals_recipes.mealId],
        references: [exports.meals.id],
    }),
    recipes: many(recipes_1.recipes),
}));
