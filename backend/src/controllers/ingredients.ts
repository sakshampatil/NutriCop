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
import { ingredients } from "../schema/ingredients";
import { responseHandler } from "../service/responseHandler";
import { eq, like, and } from "drizzle-orm";
import { IGetUserAuthInfoRequest } from "../types/types";

type NewIngredient = typeof ingredients.$inferInsert;

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body as NewIngredient;
    if (!body?.name || !body?.proteins || !body?.calories || !body?.userId) {
      throw new BadRequest("Bad Request!");
    }

    const insertRawItem = await db.insert(ingredients).values(body);
    responseHandler(res, insertRawItem);
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body: any = req.body;
    const params: any = req.params;
    if (!params.id || !body) {
      throw new BadRequest("Bad Request!");
    }
    const rawItem = await db.update(ingredients).set(body).where(eq(ingredients.id, params.id));
    responseHandler(res, rawItem);
  } catch (err) {
    next(err);
  }
};

export const list = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  try {
    const query: any = req.query;
    const params: any = req.params;
    // const items = await db
    //   .select()
    //   .from(raw_items)
    //   .where(like(raw_items.name, `%${query.search}%`));

    const items = await db.query.ingredients.findMany({
      where: and(
        eq(ingredients.userId, Number(req?.user)),
        like(ingredients.name, `%${query.search}%`)
      ),
    });

    responseHandler(res, items);
  } catch (err) {
    next(err);
  }
};

export const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params: any = req.params;
    if (!params.id) {
      throw new BadRequest("Bad Request!");
    }
    const item = await db.delete(ingredients).where(eq(ingredients.id, params.id));
    responseHandler(res, item);
  } catch (err) {
    next(err);
  }
};
