"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.create = void 0;
const db_1 = require("../db");
const errorHandler_1 = require("../service/errorHandler");
const responseHandler_1 = require("../service/responseHandler");
const drizzle_orm_1 = require("drizzle-orm");
const recipes_1 = require("../schema/recipes");
const create = async (req, res, next) => {
    try {
        const body = req.body;
        if (!body.name || !body.proteins || !body.calories) {
            throw new errorHandler_1.BadRequest("Bad Request!");
        }
        const insertRecipe = await db_1.db.insert(recipes_1.recipes).values(body);
        body.rawItems.length > 0 &&
            body.rawItems.map(async (ele) => {
                let res = await db_1.db
                    .insert(recipes_1.recipes_raw_items)
                    .values(Object.assign({ recipeId: insertRecipe.insertId }, ele));
            });
        (0, responseHandler_1.responseHandler)(res, insertRecipe);
    }
    catch (err) {
        next(err);
    }
};
exports.create = create;
const update = async (req, res, next) => {
    try {
        const _a = req.body, { rawItems } = _a, recipeBody = __rest(_a, ["rawItems"]);
        const params = req.params;
        if (!params.id || !req.body) {
            throw new errorHandler_1.BadRequest("Bad Request!");
        }
        console.log("req = ", recipeBody);
        const updatedRecipe = await db_1.db
            .update(recipes_1.recipes)
            .set(Object.assign({}, recipeBody))
            .where((0, drizzle_orm_1.eq)(recipes_1.recipes.id, Number(params.id)));
        rawItems.length > 0 &&
            rawItems.map(async (ele) => {
                let res = await db_1.db
                    .update(recipes_1.recipes_raw_items)
                    .set({ qty: ele.qty })
                    .where((0, drizzle_orm_1.eq)(recipes_1.recipes_raw_items.id, ele.recipeRawItemId));
            });
        (0, responseHandler_1.responseHandler)(res, updatedRecipe);
    }
    catch (err) {
        next(err);
    }
};
exports.update = update;
