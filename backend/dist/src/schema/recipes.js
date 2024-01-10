"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipes_raw_items = exports.recipes = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const raw_items_1 = require("./raw_items");
exports.recipes = (0, mysql_core_1.mysqlTable)("recipes", {
    id: (0, mysql_core_1.serial)("id").primaryKey(),
    name: (0, mysql_core_1.varchar)("name", { length: 50 }),
    proteins: (0, mysql_core_1.int)("proteins"),
    calories: (0, mysql_core_1.int)("calories"),
});
exports.recipes_raw_items = (0, mysql_core_1.mysqlTable)("recipes_raw_items", {
    id: (0, mysql_core_1.serial)("id").primaryKey(),
    recipeId: (0, mysql_core_1.int)("recipe_id").references(() => exports.recipes.id),
    rawItemsId: (0, mysql_core_1.int)("raw_items_id").references(() => raw_items_1.raw_items.id),
    qty: (0, mysql_core_1.int)("qty"),
});
