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
import { eq, and } from "drizzle-orm";
import { users } from "../schema/users";
import { IGetUserAuthInfoRequest } from "../types/types";

export const list = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  try {
    const dayRequested = req.query.day as string;

    if (dayRequested) {
      const day = await db.query.days.findFirst({
        where: and(eq(days.userId, Number(req?.user)), eq(days.day, dayRequested)),
      });
      responseHandler(res, day);
    } else {
      const daysList = await db.query.days.findMany({
        where: eq(days.userId, Number(req?.user)),
      });
      responseHandler(res, daysList);
    }
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
