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
import { meals, meals_recipes } from "../schema/meals";
import { days } from "../schema/days";
import { eq, sql } from "drizzle-orm";

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;

    if (!body.mealNo || !body.proteins || !body.calories) {
      throw new BadRequest("Bad Request!");
    }
    const today = new Date();
    const dayOfWeek = today.getDay();
    const dayName = daysOfWeek[dayOfWeek];

    const insertedMeal = await db.insert(meals).values({ day: dayName, ...body });

    body.recipes.length > 0 &&
      body.recipes.map(async (ele: any) => {
        await db.insert(meals_recipes).values({ mealId: insertedMeal.insertId, ...ele });
      });

    const dayExists = await db.query.days.findFirst({
      where: eq(days.day, dayName),
    });

    if (dayExists === undefined) {
      await db
        .insert(days)
        .values({ day: dayName, totalCalories: body.calories, totalProteins: body.proteins });
    } else {
      await db
        .update(days)
        .set({
          totalCalories: sql`${days.totalCalories}+${body.calories}`,
          totalProteins: sql`${days.totalProteins}+${body.proteins}`,
        })
        .where(eq(days.day, dayName));
    }

    responseHandler(res, insertedMeal);
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { recipes, ...mealBody } = req.body;
    const params = req.params;

    if (!params.id || !req.body) {
      throw new BadRequest("Bad Request!");
    }

    const fetchedMeal = await db.query.meals.findFirst({
      where: eq(meals.id, Number(params.id)),
    });

    if (!fetchedMeal) {
      throw new NotFound("Meal not found!");
    }

    const updatedMeal = await db
      .update(meals)
      .set({ ...mealBody })
      .where(eq(meals.id, Number(params.id)));

    recipes.length > 0 &&
      recipes.map(async (ele: any) => {
        await db
          .update(meals_recipes)
          .set({ qty: ele.qty })
          .where(eq(meals_recipes.id, ele.mealRecipeId));
      });

    await db
      .update(days)
      .set({
        totalCalories: sql`${days.totalCalories}-${fetchedMeal?.calories}+${mealBody.calories}`,
        totalProteins: sql`${days.totalProteins}-${fetchedMeal?.proteins}+${mealBody.proteins}`,
      })
      .where(eq(days.day, fetchedMeal.day));

    responseHandler(res, updatedMeal);
  } catch (err) {
    next(err);
  }
};