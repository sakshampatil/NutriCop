"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.list = exports.update = exports.create = void 0;
const db_1 = require("../db");
const errorHandler_1 = require("../service/errorHandler");
const raw_items_1 = require("../schema/raw_items");
const responseHandler_1 = require("../service/responseHandler");
const drizzle_orm_1 = require("drizzle-orm");
const create = async (req, res, next) => {
    try {
        const params = req.body;
        if (!(params === null || params === void 0 ? void 0 : params.name) || !(params === null || params === void 0 ? void 0 : params.proteins) || !(params === null || params === void 0 ? void 0 : params.calories)) {
            throw new errorHandler_1.BadRequest("Bad Request!");
        }
        const insertRawItem = await db_1.db.insert(raw_items_1.raw_items).values(params);
        (0, responseHandler_1.responseHandler)(res, insertRawItem);
    }
    catch (err) {
        next(err);
    }
};
exports.create = create;
const update = async (req, res, next) => {
    try {
        const body = req.body;
        const params = req.params;
        if (!params.id || !body) {
            throw new errorHandler_1.BadRequest("Bad Request!");
        }
        const rawItem = await db_1.db.update(raw_items_1.raw_items).set(body).where((0, drizzle_orm_1.eq)(raw_items_1.raw_items.id, params.id));
        (0, responseHandler_1.responseHandler)(res, rawItem);
    }
    catch (err) {
        next(err);
    }
};
exports.update = update;
const list = async (req, res, next) => {
    try {
        const query = req.query;
        console.log("query = ", query.search);
        let items = {};
        if (query.search) {
            items = await db_1.db
                .select()
                .from(raw_items_1.raw_items)
                .where((0, drizzle_orm_1.like)(raw_items_1.raw_items.name, `%${query.search}%`));
        }
        else {
            items = await db_1.db.query.raw_items.findMany();
        }
        (0, responseHandler_1.responseHandler)(res, items);
    }
    catch (err) {
        next(err);
    }
};
exports.list = list;
const deleteItem = async (req, res, next) => {
    try {
        const params = req.params;
        if (!params.id) {
            throw new errorHandler_1.BadRequest("Bad Request!");
        }
        const item = await db_1.db.delete(raw_items_1.raw_items).where((0, drizzle_orm_1.eq)(raw_items_1.raw_items.id, params.id));
        (0, responseHandler_1.responseHandler)(res, item);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteItem = deleteItem;
