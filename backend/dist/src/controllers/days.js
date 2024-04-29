"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findBasedOnId = exports.list = void 0;
const db_1 = require("../db");
const errorHandler_1 = require("../service/errorHandler");
const responseHandler_1 = require("../service/responseHandler");
const days_1 = require("../schema/days");
const drizzle_orm_1 = require("drizzle-orm");
const list = async (req, res, next) => {
    try {
        const dayRequested = req.query.day;
        if (dayRequested) {
            const day = await db_1.db.query.days.findFirst({
                where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(days_1.days.userId, Number(req === null || req === void 0 ? void 0 : req.user)), (0, drizzle_orm_1.eq)(days_1.days.day, dayRequested)),
            });
            (0, responseHandler_1.responseHandler)(res, day);
        }
        else {
            const daysList = await db_1.db.query.days.findMany({
                where: (0, drizzle_orm_1.eq)(days_1.days.userId, Number(req === null || req === void 0 ? void 0 : req.user)),
                orderBy: [(0, drizzle_orm_1.asc)(days_1.days.id)],
            });
            console.log("DAYS LIST =", daysList);
            (0, responseHandler_1.responseHandler)(res, daysList);
        }
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
        const day = await db_1.db.query.days.findFirst({
            where: (0, drizzle_orm_1.eq)(days_1.days.id, Number(params.id)),
            // with: {
            //   meals: {
            //     with: {
            //       mealsRecipies: {
            //         with: {
            //           recipes: true,
            //         },
            //       },
            //     },
            //   },
            // },
        });
        (0, responseHandler_1.responseHandler)(res, day);
    }
    catch (err) {
        next(err);
    }
};
exports.findBasedOnId = findBasedOnId;
