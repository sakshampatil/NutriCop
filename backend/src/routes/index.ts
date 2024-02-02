import express, { Application, Response, Request, NextFunction } from "express";
import { useErrorHandler } from "../service/errorHandler";
import cookieParser from "cookie-parser";

import rawItems from "./rawItems";
import recipes from "./recipes";
import meals from "./meals";

export const routes = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use("/api/v1/rawItems", rawItems);
  app.use("/api/v1/recipes", recipes);
  app.use("/api/v1/meals", meals);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    useErrorHandler(err, res);
  });
};
