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
import { eq, and, asc } from "drizzle-orm";
import { users } from "../schema/users";
import { IGetUserAuthInfoRequest } from "../types/types";
import { getToday } from "../service/helper";

export const list = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  try {
    const daysList = await db.query.days.findMany({
      where: eq(days.userId, Number(req?.user)),
      orderBy: [asc(days.id)],
    });

    responseHandler(res, daysList);
  } catch (err) {
    next(err);
  }
};

export const findBasedOnDay = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let today = getToday();
    console.log("today =", req?.user);
    const day = await db.query.days.findFirst({
      where: and(eq(days.userId, Number(req?.user)), eq(days.day, today)),
    });
    console.log("DAY =", day);
    responseHandler(res, day);
  } catch (err) {
    next(err);
  }
};
