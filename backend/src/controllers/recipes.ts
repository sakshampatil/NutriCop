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
import { eq, and } from "drizzle-orm";
import { recipes, recipes_raw_items } from "../schema/recipes";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body: any = req.body;

    if (!body.name || !body.proteins || !body.calories) {
      throw new BadRequest("Bad Request!");
    }

    const insertRecipe = await db.insert(recipes).values(body);

    body.rawItems.length > 0 &&
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

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rawItems, ...recipeBody } = req.body;

    const params = req.params;
    if (!params.id || !req.body) {
      throw new BadRequest("Bad Request!");
    }

    console.log("req = ", recipeBody);

    const updatedRecipe = await db
      .update(recipes)
      .set({ ...recipeBody })
      .where(eq(recipes.id, Number(params.id)));

    rawItems.length > 0 &&
      rawItems.map(async (ele: any) => {
        let res = await db
          .update(recipes_raw_items)
          .set({ qty: ele.qty })
          .where(eq(recipes_raw_items.id, ele.recipeRawItemId));
      });
    responseHandler(res, updatedRecipe);
  } catch (err) {
    next(err);
  }
};
