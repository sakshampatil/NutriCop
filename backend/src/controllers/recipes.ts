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
import { eq, and, like } from "drizzle-orm";
import { recipes, recipes_raw_items } from "../schema/recipes";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body: any = req.body;

    if (!body.name || !body.proteins || !body.calories) {
      throw new BadRequest("Bad Request!");
    }

    const insertedRecipe = await db.insert(recipes).values(body);

    body.rawItems.length > 0 &&
      body.rawItems.map(async (ele: any) => {
        await db.insert(recipes_raw_items).values({ recipeId: insertedRecipe.insertId, ...ele });
      });

    responseHandler(res, insertedRecipe);
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

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.query;

    const recipesList = await db.query.recipes.findMany({
      where: like(recipes.name, `%${query.search}%`),
      with: {
        recipesRawItems: {
          with: {
            rawItems: true,
          },
        },
      },
    });

    responseHandler(res, recipesList);
  } catch (err) {
    next(err);
  }
};

export const findBasedOnId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = req.params;
    if (!params.id) {
      throw new BadRequest("Bad Request!");
    }
    const recipe = await db.query.recipes.findFirst({
      where: eq(recipes.id, Number(params.id)),
      with: {
        recipesRawItems: {
          with: {
            rawItems: true,
          },
        },
      },
    });

    responseHandler(res, recipe);
  } catch (err) {
    next(err);
  }
};

export const deleteRecipeRawItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = req.params;
    if (!params.id) {
      throw new BadRequest("Bad Request!");
    }

    const item = await db
      .delete(recipes_raw_items)
      .where(eq(recipes_raw_items.id, Number(params.id)));

    responseHandler(res, item);
  } catch (err) {
    next(err);
  }
};

export const deleteRecipe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = req.params;
    if (!params.id) {
      throw new BadRequest("Bad Request!");
    }

    const recipe = await db.delete(recipes).where(eq(recipes.id, Number(params.id)));
    await db.delete(recipes_raw_items).where(eq(recipes_raw_items.recipeId, Number(params.id)));
    responseHandler(res, recipe);
  } catch (err) {
    next(err);
  }
};

export const listRawItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let recipesList = {};
    recipesList = await db.query.recipes_raw_items.findMany({});
    responseHandler(res, recipesList);
  } catch (err) {
    next(err);
  }
};
