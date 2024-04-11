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
        const search = req.query.search;
        const page = parseInt(req.query.page);
        const pageSize = parseInt(req.query.pageSize);
        const sortBy = req.query.sortBy;
        const descending = req.query.desc === "true" ? true : false;
        const allowedSortByFields = ["name", "calories", "proteins"];
        const isAllowedSortBy = allowedSortByFields.includes(sortBy);
        const orderByClause = isAllowedSortBy ? ingredients_1.ingredients[sortBy] : "name";
        const startIdx = (page - 1) * pageSize;
        const endIdx = page * pageSize;
        let items = [];
        if (descending) {
            items = await db_1.db
                .select()
                .from(ingredients_1.ingredients)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(ingredients_1.ingredients.userId, Number(req === null || req === void 0 ? void 0 : req.user)), (0, drizzle_orm_1.like)(ingredients_1.ingredients.name, `%${search}%`)))
                .orderBy((0, drizzle_orm_1.desc)(orderByClause));
        }
        else {
            items = await db_1.db
                .select()
                .from(ingredients_1.ingredients)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(ingredients_1.ingredients.userId, Number(req === null || req === void 0 ? void 0 : req.user)), (0, drizzle_orm_1.like)(ingredients_1.ingredients.name, `%${search}%`)))
                .orderBy((0, drizzle_orm_1.asc)(orderByClause));
        }
        const paginatedItems = items.slice(startIdx, endIdx);
        console.log("ITEMS =", paginatedItems);
        (0, responseHandler_1.responseHandler)(res, paginatedItems);
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
