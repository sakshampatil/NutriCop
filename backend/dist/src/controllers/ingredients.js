"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.list = exports.update = exports.create = void 0;
const db_1 = require("../db");
const errorHandler_1 = require("../service/errorHandler");
const ingredients_1 = require("../schema/ingredients");
const responseHandler_1 = require("../service/responseHandler");
const drizzle_orm_1 = require("drizzle-orm");
const create = async (req, res, next) => {
    try {
        const body = req.body;
        body.userId = Number(req.user);
        console.log("ING = ", body);
        if (!(body === null || body === void 0 ? void 0 : body.name) || !(body === null || body === void 0 ? void 0 : body.proteins) || !(body === null || body === void 0 ? void 0 : body.calories)) {
            throw new errorHandler_1.BadRequest("Bad Request!");
        }
        const insertRawItem = await db_1.db.insert(ingredients_1.ingredients).values(body);
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
        const rawItem = await db_1.db.update(ingredients_1.ingredients).set(body).where((0, drizzle_orm_1.eq)(ingredients_1.ingredients.id, params.id));
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
        const items = await db_1.db.query.ingredients.findMany({
            where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(ingredients_1.ingredients.userId, Number(req === null || req === void 0 ? void 0 : req.user)), (0, drizzle_orm_1.like)(ingredients_1.ingredients.name, `%${query.search}%`)),
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
        const item = await db_1.db.delete(ingredients_1.ingredients).where((0, drizzle_orm_1.eq)(ingredients_1.ingredients.id, params.id));
        (0, responseHandler_1.responseHandler)(res, item);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteItem = deleteItem;
