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
import { eq, like } from "drizzle-orm";
import { recipes, recipes_raw_items } from "../schema/recipes";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body: any = req.body;

    if (!body.name || !body.proteins || !body.calories) {
      throw new BadRequest("Bad Request!");
    }

    const insertRecipe = await db.insert(recipes).values(body);

    body.rawItems.map(async (ele: any) => {
      let res = await db
        .insert(recipes_raw_items)
        .values({ recipeId: insertRecipe.insertId, ...ele });
    });

    responseHandler(res, insertRecipe);
  } catch (err) {
    next(err);
  }
};
