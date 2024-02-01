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
import { raw_items } from "../schema/raw_items";
import { responseHandler } from "../service/responseHandler";
import { eq, like } from "drizzle-orm";
import { it } from "node:test";

type NewRawItem = typeof raw_items.$inferInsert;

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = req.body as NewRawItem;
    if (!params?.name || !params?.proteins || !params?.calories) {
      throw new BadRequest("Bad Request!");
    }

    const insertRawItem = await db.insert(raw_items).values(params);
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
    const rawItem = await db.update(raw_items).set(body).where(eq(raw_items.id, params.id));
    responseHandler(res, rawItem);
  } catch (err) {
    next(err);
  }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query: any = req.query;
    console.log("query = ", query.search);
    let items = {};
    if (query.search) {
      items = await db
        .select()
        .from(raw_items)
        .where(like(raw_items.name, `%${query.search}%`));
    } else {
      items = await db.query.raw_items.findMany();
    }
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
    const item = await db.delete(raw_items).where(eq(raw_items.id, params.id));
    responseHandler(res, item);
  } catch (err) {
    next(err);
  }
};
