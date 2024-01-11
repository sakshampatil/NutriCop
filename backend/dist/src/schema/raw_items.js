"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.raw_items = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
exports.raw_items = (0, mysql_core_1.mysqlTable)("raw_items", {
    id: (0, mysql_core_1.int)("id").autoincrement().primaryKey(),
    name: (0, mysql_core_1.varchar)("name", { length: 50 }),
    unit: (0, mysql_core_1.varchar)("name", { length: 50 }),
    perQty: (0, mysql_core_1.decimal)("per_qty", { precision: 1 }),
    proteins: (0, mysql_core_1.int)("proteins"),
    calories: (0, mysql_core_1.int)("calories"),
});
