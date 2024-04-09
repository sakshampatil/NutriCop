import jwt, { JwtPayload } from "jsonwebtoken";
import { useErrorHandler, Unauthorized } from "../service/errorHandler";
import { NextFunction, Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../types/types";

export const verifyToken = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  //get the token from the header if present
  let token = req.headers.authorization;
  // console.log("JWT = ", req.headers.authorization);
  //if no token found, return response (without going to the next middelware)
  if (!token) {
    throw new Unauthorized("Unauthorzied");
  }
  try {
    if (token.includes("Bearer")) {
      token = token.split(" ")[1];
    }
    console.log("JWT = ", token);
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, process.env.SECRET_KEY!);
    console.log("dec = ", decoded);
    req.user = (decoded as JwtPayload)?.email as string;
    next();
  } catch (err) {
    next(err);
  }
};
