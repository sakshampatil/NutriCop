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

type NewRawItem = typeof raw_items.$inferInsert;

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = req.body as NewRawItem;
    console.log("PARAM = ", params);
    if (!params?.name || !params?.proteins || !params?.calories) {
      throw new BadRequest("Bad Request!");
    }

    const insertRawItem = await db.insert(raw_items).values(params);
    responseHandler(res, insertRawItem);
  } catch (err) {
    console.log("ERR = ", err);

    next(err);
  }
};
