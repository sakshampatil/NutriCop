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
exports.deleteRecipe = exports.findBasedOnId = exports.list = exports.update = exports.create = void 0;
const db_1 = require("../db");
const errorHandler_1 = require("../service/errorHandler");
const responseHandler_1 = require("../service/responseHandler");
const drizzle_orm_1 = require("drizzle-orm");
const recipes_1 = require("../schema/recipes");
const create = async (req, res, next) => {
    try {
        const body = req.body;
        body.userId = Number(req.user);
        if (!body.name || !body.proteins || !body.calories || !body.userId) {
            throw new errorHandler_1.BadRequest("Bad Request!");
        }
        const insertedRecipe = await db_1.db.insert(recipes_1.recipes).values(body);
        // body.rawItems.length > 0 &&
        //   body.rawItems.map(async (ele: any) => {
        //     await db.insert(recipes_raw_items).values({ recipeId: insertedRecipe.insertId, ...ele });
        //   });
        (0, responseHandler_1.responseHandler)(res, insertedRecipe);
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
        const updatedRecipe = await db_1.db
            .update(recipes_1.recipes)
            .set(Object.assign({}, recipeBody))
            .where((0, drizzle_orm_1.eq)(recipes_1.recipes.id, Number(params.id)));
        // rawItems.length > 0 &&
        //   rawItems.map(async (ele: any) => {
        //     let res = await db
        //       .update(recipes_raw_items)
        //       .set({ qty: ele.qty })
        //       .where(eq(recipes_raw_items.id, ele.recipeRawItemId));
        //   });
        (0, responseHandler_1.responseHandler)(res, updatedRecipe);
    }
    catch (err) {
        next(err);
    }
};
exports.update = update;
const list = async (req, res, next) => {
    try {
        const search = req.query.search;
        const page = parseInt(req.query.page)
            ? parseInt(req.query.page)
            : 1;
        const pageSize = parseInt(req.query.pageSize)
            ? parseInt(req.query.pageSize)
            : 10000;
        const sortBy = req.query.sortBy;
        const descending = req.query.desc === "true" ? true : false;
        const allowedSortByFields = ["name", "calories", "proteins"];
        const isAllowedSortBy = allowedSortByFields.includes(sortBy);
        const orderByClause = isAllowedSortBy ? recipes_1.recipes[sortBy] : "name";
        const startIdx = (page - 1) * pageSize;
        const endIdx = page * pageSize;
        let items = [];
        if (descending) {
            items = await db_1.db
                .select()
                .from(recipes_1.recipes)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(recipes_1.recipes.userId, Number(req === null || req === void 0 ? void 0 : req.user)), (0, drizzle_orm_1.like)(recipes_1.recipes.name, `%${search}%`)))
                .orderBy((0, drizzle_orm_1.desc)(orderByClause));
        }
        else {
            items = await db_1.db
                .select()
                .from(recipes_1.recipes)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(recipes_1.recipes.userId, Number(req === null || req === void 0 ? void 0 : req.user)), (0, drizzle_orm_1.like)(recipes_1.recipes.name, `%${search}%`)))
                .orderBy((0, drizzle_orm_1.asc)(orderByClause));
        }
        const totalPages = Math.ceil(items.length / pageSize);
        const paginatedItems = items.slice(startIdx, endIdx);
        const data = {
            recipes: paginatedItems,
            totalPages: totalPages,
        };
        (0, responseHandler_1.responseHandler)(res, data);
    }
    catch (err) {
        next(err);
    }
};
exports.list = list;
const findBasedOnId = async (req, res, next) => {
    try {
        const params = req.params;
        if (!params.id) {
            throw new errorHandler_1.BadRequest("Bad Request!");
        }
        const recipe = await db_1.db.query.recipes.findFirst({
            where: (0, drizzle_orm_1.eq)(recipes_1.recipes.id, Number(params.id)),
        });
        (0, responseHandler_1.responseHandler)(res, recipe);
    }
    catch (err) {
        next(err);
    }
};
exports.findBasedOnId = findBasedOnId;
// export const deleteRecipeRawItem = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const params = req.params;
//     if (!params.id) {
//       throw new BadRequest("Bad Request!");
//     }
//     const item = await db
//       .delete(recipes_raw_items)
//       .where(eq(recipes_raw_items.id, Number(params.id)));
//     responseHandler(res, item);
//   } catch (err) {
//     next(err);
//   }
// };
const deleteRecipe = async (req, res, next) => {
    try {
        const params = req.params;
        if (!params.id) {
            throw new errorHandler_1.BadRequest("Bad Request!");
        }
        const recipe = await db_1.db.delete(recipes_1.recipes).where((0, drizzle_orm_1.eq)(recipes_1.recipes.id, Number(params.id)));
        // await db.delete(recipes_raw_items).where(eq(recipes_raw_items.recipeId, Number(params.id)));
        (0, responseHandler_1.responseHandler)(res, recipe);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteRecipe = deleteRecipe;
// export const listRawItems = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     let recipesList = {};
//     recipesList = await db.query.recipes_raw_items.findMany({});
//     responseHandler(res, recipesList);
//   } catch (err) {
//     next(err);
//   }
// };
