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
import { days } from "../schema/days";
import { eq } from "drizzle-orm";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const params: any = req.params;
  try {
    const daysList = await db.query.days.findMany({
      where: eq(days.userId, params.userId),
    });

    responseHandler(res, daysList);
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

    const day = await db.query.days.findFirst({
      where: eq(days.id, Number(params.id)),
      // with: {
      //   meals: {
      //     with: {
      //       mealsRecipies: {
      //         with: {
      //           recipes: true,
      //         },
      //       },
      //     },
      //   },
      // },
    });
    responseHandler(res, day);
  } catch (err) {
    next(err);
  }
};
