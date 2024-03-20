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
import { eq, like, and } from "drizzle-orm";

type NewRawItem = typeof raw_items.$inferInsert;

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body as NewRawItem;
    if (!body?.name || !body?.proteins || !body?.calories || !body?.userId) {
      throw new BadRequest("Bad Request!");
    }

    const insertRawItem = await db.insert(raw_items).values(body);
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
    const params: any = req.params;
    // const items = await db
    //   .select()
    //   .from(raw_items)
    //   .where(like(raw_items.name, `%${query.search}%`));

    const items = await db.query.raw_items.findMany({
      where: and(eq(raw_items.userId, params.userId), like(raw_items.name, `%${query.search}%`)),
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
    const item = await db.delete(raw_items).where(eq(raw_items.id, params.id));
    responseHandler(res, item);
  } catch (err) {
    next(err);
  }
};
