"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const db_1 = require("../db");
const errorHandler_1 = require("../service/errorHandler");
const responseHandler_1 = require("../service/responseHandler");
const recipes_1 = require("../schema/recipes");
const create = async (req, res, next) => {
    try {
        const body = req.body;
        if (!body.name || !body.proteins || !body.calories) {
            throw new errorHandler_1.BadRequest("Bad Request!");
        }
        const insertRecipe = await db_1.db.insert(recipes_1.recipes).values(body);
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
