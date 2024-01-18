"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meals_recipes = exports.meals = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const recipes_1 = require("./recipes");
exports.meals = (0, mysql_core_1.mysqlTable)("meals", {
    id: (0, mysql_core_1.int)("id").autoincrement().primaryKey(),
    mealNo: (0, mysql_core_1.int)("meal_no"),
    // dayId: int("day_id").references(() => days.id),
    proteins: (0, mysql_core_1.int)("proteins"),
    calories: (0, mysql_core_1.int)("calories"),
});
exports.meals_recipes = (0, mysql_core_1.mysqlTable)("meals_recipes", {
    id: (0, mysql_core_1.int)("id").autoincrement().primaryKey(),
    mealId: (0, mysql_core_1.int)("meal_id").references(() => exports.meals.id),
    recipeId: (0, mysql_core_1.int)("recipe_id").references(() => recipes_1.recipes.id),
    qty: (0, mysql_core_1.int)("qty"),
});
