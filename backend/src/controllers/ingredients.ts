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
import { eq, like, and, asc, desc } from "drizzle-orm";
import { IGetUserAuthInfoRequest } from "../types/types";

export const create = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    body.userId = Number(req.user);
    console.log("ING = ", body);

    if (!body?.name || !body?.proteins || !body?.calories) {
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
    const search: string = req.query.search as string;
    const page: number = parseInt(req.query.page as string)
      ? parseInt(req.query.page as string)
      : 1;
    const pageSize: number = parseInt(req.query.pageSize as string)
      ? parseInt(req.query.pageSize as string)
      : 10000;
    const sortBy: string = req.query.sortBy as string;
    const descending: boolean = req.query.desc === "true" ? true : false;

    const allowedSortByFields = ["name", "calories", "proteins"];

    const isAllowedSortBy = allowedSortByFields.includes(sortBy);
    const orderByClause = isAllowedSortBy ? (ingredients as any)[sortBy] : "name";

    const startIdx = (page - 1) * pageSize;
    const endIdx = page * pageSize;

    let items = [];

    if (descending) {
      items = await db
        .select()
        .from(ingredients)
        .where(
          and(eq(ingredients.userId, Number(req?.user)), like(ingredients.name, `%${search}%`))
        )
        .orderBy(desc(orderByClause));
    } else {
      items = await db
        .select()
        .from(ingredients)
        .where(
          and(eq(ingredients.userId, Number(req?.user)), like(ingredients.name, `%${search}%`))
        )
        .orderBy(asc(orderByClause));
    }

    const totalPages = Math.ceil(items.length / pageSize);
    const paginatedItems = items.slice(startIdx, endIdx);

    const data = {
      ingredients: paginatedItems,
      totalPages: totalPages,
    };
    responseHandler(res, data);
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
