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
        const body = req.body;
        if (!(body === null || body === void 0 ? void 0 : body.name) || !(body === null || body === void 0 ? void 0 : body.proteins) || !(body === null || body === void 0 ? void 0 : body.calories) || !(body === null || body === void 0 ? void 0 : body.userId)) {
            throw new errorHandler_1.BadRequest("Bad Request!");
        }
        const insertRawItem = await db_1.db.insert(raw_items_1.raw_items).values(body);
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
        const params = req.params;
        // const items = await db
        //   .select()
        //   .from(raw_items)
        //   .where(like(raw_items.name, `%${query.search}%`));
        const items = await db_1.db.query.raw_items.findMany({
            where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(raw_items_1.raw_items.userId, params.userId), (0, drizzle_orm_1.like)(raw_items_1.raw_items.name, `%${query.search}%`)),
        });
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
