"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const db_1 = require("../db");
const errorHandler_1 = require("../service/errorHandler");
const responseHandler_1 = require("../service/responseHandler");
const meals_1 = require("../schema/meals");
const days_1 = require("../schema/days");
const drizzle_orm_1 = require("drizzle-orm");
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const create = async (req, res, next) => {
    try {
        const body = req.body;
        if (!body.mealNo || !body.proteins || !body.calories) {
            throw new errorHandler_1.BadRequest("Bad Request!");
        }
        const today = new Date();
        const dayOfWeek = today.getDay();
        const dayName = daysOfWeek[dayOfWeek];
        const insertedMeal = await db_1.db.insert(meals_1.meals).values(Object.assign({ day: dayName }, body));
        body.recipes.length > 0 &&
            body.recipes.map(async (ele) => {
                await db_1.db.insert(meals_1.meals_recipes).values(Object.assign({ mealId: insertedMeal.insertId }, ele));
            });
        const dayExists = await db_1.db.query.days.findFirst({
            where: (0, drizzle_orm_1.eq)(days_1.days.day, dayName),
        });
        if (dayExists === undefined) {
            await db_1.db
                .insert(days_1.days)
                .values({ day: dayName, totalCalories: body.calories, totalProteins: body.proteins });
        }
        else {
            await db_1.db
                .update(days_1.days)
                .set({
                totalCalories: (0, drizzle_orm_1.sql) `${days_1.days.totalCalories}+${body.calories}`,
                totalProteins: (0, drizzle_orm_1.sql) `${days_1.days.totalProteins}+${body.proteins}`,
            })
                .where((0, drizzle_orm_1.eq)(days_1.days.day, dayName));
        }
        (0, responseHandler_1.responseHandler)(res, insertedMeal);
    }
    catch (err) {
        next(err);
    }
};
exports.create = create;
