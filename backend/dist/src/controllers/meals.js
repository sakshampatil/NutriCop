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
const update = async (req, res, next) => {
    try {
        const _a = req.body, { recipes } = _a, mealBody = __rest(_a, ["recipes"]);
        const params = req.params;
        if (!params.id || !req.body) {
            throw new errorHandler_1.BadRequest("Bad Request!");
        }
        const fetchedMeal = await db_1.db.query.meals.findFirst({
            where: (0, drizzle_orm_1.eq)(meals_1.meals.id, Number(params.id)),
        });
        if (!fetchedMeal) {
            throw new errorHandler_1.NotFound("Meal not found!");
        }
        const updatedMeal = await db_1.db
            .update(meals_1.meals)
            .set(Object.assign({}, mealBody))
            .where((0, drizzle_orm_1.eq)(meals_1.meals.id, Number(params.id)));
        recipes.length > 0 &&
            recipes.map(async (ele) => {
                await db_1.db
                    .update(meals_1.meals_recipes)
                    .set({ qty: ele.qty })
                    .where((0, drizzle_orm_1.eq)(meals_1.meals_recipes.id, ele.mealRecipeId));
            });
        await db_1.db
            .update(days_1.days)
            .set({
            totalCalories: (0, drizzle_orm_1.sql) `${days_1.days.totalCalories}-${fetchedMeal === null || fetchedMeal === void 0 ? void 0 : fetchedMeal.calories}+${mealBody.calories}`,
            totalProteins: (0, drizzle_orm_1.sql) `${days_1.days.totalProteins}-${fetchedMeal === null || fetchedMeal === void 0 ? void 0 : fetchedMeal.proteins}+${mealBody.proteins}`,
        })
            .where((0, drizzle_orm_1.eq)(days_1.days.day, fetchedMeal.day));
        (0, responseHandler_1.responseHandler)(res, updatedMeal);
    }
    catch (err) {
        next(err);
    }
};
exports.update = update;
