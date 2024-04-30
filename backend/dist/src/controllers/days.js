"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findBasedOnDay = exports.list = void 0;
const db_1 = require("../db");
const responseHandler_1 = require("../service/responseHandler");
const days_1 = require("../schema/days");
const drizzle_orm_1 = require("drizzle-orm");
const helper_1 = require("../service/helper");
const list = async (req, res, next) => {
    try {
        const daysList = await db_1.db.query.days.findMany({
            where: (0, drizzle_orm_1.eq)(days_1.days.userId, Number(req === null || req === void 0 ? void 0 : req.user)),
            orderBy: [(0, drizzle_orm_1.asc)(days_1.days.id)],
        });
        (0, responseHandler_1.responseHandler)(res, daysList);
    }
    catch (err) {
        next(err);
    }
};
exports.list = list;
const findBasedOnDay = async (req, res, next) => {
    try {
        let today = (0, helper_1.getToday)();
        console.log("today =", req === null || req === void 0 ? void 0 : req.user);
        const day = await db_1.db.query.days.findFirst({
            where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(days_1.days.userId, Number(req === null || req === void 0 ? void 0 : req.user)), (0, drizzle_orm_1.eq)(days_1.days.day, today)),
        });
        console.log("DAY =", day);
        (0, responseHandler_1.responseHandler)(res, day);
    }
    catch (err) {
        next(err);
    }
};
exports.findBasedOnDay = findBasedOnDay;
