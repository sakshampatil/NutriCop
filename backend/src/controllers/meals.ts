import { NextFunction, Response, Request } from "express";
import { db } from "../db";
import {
  BadRequest,
  NotFound,
  Unauthorized,
  ApplicationError,
  InsufficentAccessError,
  useErrorHandler,
} from "../service/errorHandler";
import { responseHandler } from "../service/responseHandler";
import { meals } from "../schema/meals";
import { days } from "../schema/days";
import { and, eq, sql } from "drizzle-orm";
import { IGetUserAuthInfoRequest } from "../types/types";
import { getToday } from "../service/helper";

export const create = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    body.userId = Number(req.user);

    if (!body.mealNo || !body.proteins || !body.calories || !body.userId) {
      throw new BadRequest("Bad Request!");
    }

    const today = getToday();
    const insertedMeal = await db.insert(meals).values({ day: today, ...body });

    await db
      .update(days)
      .set({
        totalCalories: sql`${days.totalCalories}+${body.calories}`,
        totalProteins: sql`${days.totalProteins}+${body.proteins}`,
      })
      .where(and(eq(days.userId, body.userId), eq(days.day, today)));

    responseHandler(res, insertedMeal);
  } catch (err) {
    next(err);
  }
};

export const list = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  try {
    const today = getToday();
    let morningArry = await db
      .select()
      .from(meals)
      .where(
        and(eq(meals.userId, Number(req?.user)), eq(meals.day, today), eq(meals.time, "Morning"))
      );

    let afternoonArry = await db
      .select()
      .from(meals)
      .where(
        and(eq(meals.userId, Number(req?.user)), eq(meals.day, today), eq(meals.time, "Afternoon"))
      );

    let eveningArry = await db
      .select()
      .from(meals)
      .where(
        and(eq(meals.userId, Number(req?.user)), eq(meals.day, today), eq(meals.time, "Evening"))
      );

    const data = {
      meals: {
        morning: morningArry,
        afternoon: afternoonArry,
        evening: eveningArry,
      },
    };
    responseHandler(res, data);
  } catch (err) {
    next(err);
  }
};

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

export const deleteMeal = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const params = req.params;

    if (!params.id) {
      throw new BadRequest("Bad Request!");
    }

    let meal = await db.query.meals.findFirst({
      where: eq(meals.id, Number(params.id)),
    });

    const today = getToday();

    await db
      .update(days)
      .set({
        totalCalories: sql`${days.totalCalories}-${meal?.calories}`,
        totalProteins: sql`${days.totalProteins}-${meal?.proteins}`,
      })
      .where(and(eq(days.userId, Number(req?.user)), eq(days.day, today)));

    await db.delete(meals).where(eq(meals.id, Number(params.id)));
    console.log("MEAL = ", meal);

    responseHandler(res, meal);
  } catch (err) {
    next(err);
  }
};
