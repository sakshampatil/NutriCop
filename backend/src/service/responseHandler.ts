import { Response } from "express";

export const responseHandler = (
  res: Response,
  data?: any,
  message?: string,
  statuscode?: number
) => {
  let statusCode = statuscode || 200;
  let resData = data || null;
  let resMessage = message || `Success`;

  res.status(statusCode).json({
    status: "success",
    message: resMessage,
    data: resData,
  });
};
