"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMeal = exports.list = exports.create = void 0;
const db_1 = require("../db");
const errorHandler_1 = require("../service/errorHandler");
const responseHandler_1 = require("../service/responseHandler");
const meals_1 = require("../schema/meals");
const days_1 = require("../schema/days");
const drizzle_orm_1 = require("drizzle-orm");
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const getToday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    return daysOfWeek[dayOfWeek];
};
const create = async (req, res, next) => {
    try {
        const body = req.body;
        body.userId = Number(req.user);
        if (!body.mealNo || !body.proteins || !body.calories || !body.userId) {
            throw new errorHandler_1.BadRequest("Bad Request!");
        }
        const today = getToday();
        const insertedMeal = await db_1.db.insert(meals_1.meals).values(Object.assign({ day: today }, body));
        await db_1.db
            .update(days_1.days)
            .set({
            totalCalories: (0, drizzle_orm_1.sql) `${days_1.days.totalCalories}+${body.calories}`,
            totalProteins: (0, drizzle_orm_1.sql) `${days_1.days.totalProteins}+${body.proteins}`,
        })
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(days_1.days.userId, body.userId), (0, drizzle_orm_1.eq)(days_1.days.day, today)));
        (0, responseHandler_1.responseHandler)(res, insertedMeal);
    }
    catch (err) {
        next(err);
    }
};
exports.create = create;
const list = async (req, res, next) => {
    try {
        const today = getToday();
        let morningArry = await db_1.db
            .select()
            .from(meals_1.meals)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(meals_1.meals.userId, Number(req === null || req === void 0 ? void 0 : req.user)), (0, drizzle_orm_1.eq)(meals_1.meals.day, today), (0, drizzle_orm_1.eq)(meals_1.meals.time, "Morning")));
        let afternoonArry = await db_1.db
            .select()
            .from(meals_1.meals)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(meals_1.meals.userId, Number(req === null || req === void 0 ? void 0 : req.user)), (0, drizzle_orm_1.eq)(meals_1.meals.day, today), (0, drizzle_orm_1.eq)(meals_1.meals.time, "Afternoon")));
        let eveningArry = await db_1.db
            .select()
            .from(meals_1.meals)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(meals_1.meals.userId, Number(req === null || req === void 0 ? void 0 : req.user)), (0, drizzle_orm_1.eq)(meals_1.meals.day, today), (0, drizzle_orm_1.eq)(meals_1.meals.time, "Evening")));
        const data = {
            meals: {
                morning: morningArry,
                afternoon: afternoonArry,
                evening: eveningArry,
            },
        };
        (0, responseHandler_1.responseHandler)(res, data);
    }
    catch (err) {
        next(err);
    }
};
exports.list = list;
// export const update = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { recipes, ...mealBody } = req.body;
//     const params = req.params;
//     if (!params.id || !req.body) {
//       throw new BadRequest("Bad Request!");
//     }
//     const fetchedMeal = await db.query.meals.findFirst({
//       where: eq(meals.id, Number(params.id)),
//     });
//     if (!fetchedMeal) {
//       throw new NotFound("Meal not found!");
//     }
//     const updatedMeal = await db
//       .update(meals)
//       .set({ ...mealBody })
//       .where(eq(meals.id, Number(params.id)));
//     await db
//       .update(days)
//       .set({
//         totalCalories: sql`${days.totalCalories}-${fetchedMeal?.calories}+${mealBody.calories}`,
//         totalProteins: sql`${days.totalProteins}-${fetchedMeal?.proteins}+${mealBody.proteins}`,
//       })
//       .where(and(eq(days.userId, fetchedMeal.userId), eq(days.day, fetchedMeal.day)));
//     responseHandler(res, updatedMeal);
//   } catch (err) {
//     next(err);
//   }
// };
// export const findBasedOnId = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const params = req.params;
//     if (!params.id) {
//       throw new BadRequest("Bad Request!");
//     }
//     const meal = await db.query.meals.findFirst({
//       where: eq(meals.id, Number(params.id)),
//     });
//     responseHandler(res, meal);
//   } catch (err) {
//     next(err);
//   }
// };
const deleteMeal = async (req, res, next) => {
    try {
        const params = req.params;
        if (!params.id) {
            throw new errorHandler_1.BadRequest("Bad Request!");
        }
        let meal = await db_1.db.query.meals.findFirst({
            where: (0, drizzle_orm_1.eq)(meals_1.meals.id, Number(params.id)),
        });
        const today = getToday();
        await db_1.db
            .update(days_1.days)
            .set({
            totalCalories: (0, drizzle_orm_1.sql) `${days_1.days.totalCalories}-${meal === null || meal === void 0 ? void 0 : meal.calories}`,
            totalProteins: (0, drizzle_orm_1.sql) `${days_1.days.totalProteins}-${meal === null || meal === void 0 ? void 0 : meal.proteins}`,
        })
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(days_1.days.userId, Number(req === null || req === void 0 ? void 0 : req.user)), (0, drizzle_orm_1.eq)(days_1.days.day, today)));
        await db_1.db.delete(meals_1.meals).where((0, drizzle_orm_1.eq)(meals_1.meals.id, Number(params.id)));
        console.log("MEAL = ", meal);
        (0, responseHandler_1.responseHandler)(res, meal);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteMeal = deleteMeal;
