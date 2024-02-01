"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawItemsrelations = exports.raw_items = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const mysql_core_1 = require("drizzle-orm/mysql-core");
const recipes_1 = require("./recipes");
exports.raw_items = (0, mysql_core_1.mysqlTable)("raw_items", {
    id: (0, mysql_core_1.int)("id").autoincrement().primaryKey(),
    name: (0, mysql_core_1.varchar)("name", { length: 50 }).notNull(),
    unit: (0, mysql_core_1.varchar)("unit", { length: 50 }),
    perQty: (0, mysql_core_1.int)("per_qty"),
    proteins: (0, mysql_core_1.int)("proteins").notNull(),
    calories: (0, mysql_core_1.int)("calories").notNull(),
}, (table) => {
    return {
        nameidx: (0, mysql_core_1.uniqueIndex)("name_idx").on(table.name),
    };
});
exports.rawItemsrelations = (0, drizzle_orm_1.relations)(exports.raw_items, ({ one }) => ({
    recipesRawItems: one(recipes_1.recipes_raw_items, {
        fields: [exports.raw_items.id],
        references: [recipes_1.recipes_raw_items.rawItemsId],
    }),
}));
