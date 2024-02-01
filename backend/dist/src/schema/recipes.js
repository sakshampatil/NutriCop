"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipes_raw_itemsRelations = exports.recipes_raw_items = exports.recipeRelations = exports.recipes = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const raw_items_1 = require("./raw_items");
const drizzle_orm_1 = require("drizzle-orm");
const meals_1 = require("./meals");
exports.recipes = (0, mysql_core_1.mysqlTable)("recipes", {
    id: (0, mysql_core_1.int)("id").autoincrement().primaryKey(),
    name: (0, mysql_core_1.varchar)("name", { length: 50 }).notNull(),
    proteins: (0, mysql_core_1.int)("proteins").notNull(),
    calories: (0, mysql_core_1.int)("calories").notNull(),
}, (table) => {
    return {
        nameidx: (0, mysql_core_1.uniqueIndex)("name_idx").on(table.name),
    };
});
exports.recipeRelations = (0, drizzle_orm_1.relations)(exports.recipes, ({ one, many }) => ({
    recipesRawItems: many(exports.recipes_raw_items),
    mealsRecipies: one(meals_1.meals_recipes, {
        fields: [exports.recipes.id],
        references: [meals_1.meals_recipes.recipeId],
    }),
}));
exports.recipes_raw_items = (0, mysql_core_1.mysqlTable)("recipes_raw_items", {
    id: (0, mysql_core_1.int)("id").autoincrement().primaryKey(),
    recipeId: (0, mysql_core_1.int)("recipe_id").notNull(),
    rawItemsId: (0, mysql_core_1.int)("raw_items_id").notNull(),
    qty: (0, mysql_core_1.int)("qty").notNull(),
}, (table) => {
    return {
        recipeIdidx: (0, mysql_core_1.index)("recipeId_idx").on(table.recipeId),
    };
});
exports.recipes_raw_itemsRelations = (0, drizzle_orm_1.relations)(exports.recipes_raw_items, ({ one, many }) => ({
    recipes: one(exports.recipes, {
        fields: [exports.recipes_raw_items.recipeId],
        references: [exports.recipes.id],
    }),
    rawItems: many(raw_items_1.raw_items),
}));
