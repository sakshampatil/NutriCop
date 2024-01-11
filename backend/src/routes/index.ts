import express, { Application, Response, Request, NextFunction } from "express";
import { useErrorHandler } from "../service/errorHandler";

export const routes = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    useErrorHandler(err, res)
  });
}
