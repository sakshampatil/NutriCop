import { Response } from "express";
class GeneralError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }

  getCode(): number {
    if (this instanceof BadRequest) {
      return 400;
    }

    if (this instanceof NotFound) {
      return 404;
    }

    if (this instanceof ApplicationError) {
      return 500;
    }

    if (this instanceof Unauthorized) {
      return 401;
    }

    if (this instanceof InsufficentAccessError) {
      return 403;
    }

    return 400;
  }
}

class BadRequest extends GeneralError { }
class NotFound extends GeneralError { }
class Unauthorized extends GeneralError { }
class ApplicationError extends GeneralError { }
class InsufficentAccessError extends GeneralError { }

const useErrorHandler = (err: Error, res: Response) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: "error",
      messsage: err.message
    })
  }

  return res.status(400).json({
    status: "error",
    message: err.message
  })
}

export { useErrorHandler, BadRequest, NotFound, Unauthorized, ApplicationError, InsufficentAccessError, GeneralError };

process.on("uncaughtException", (err: Error) => {
  console.log(err);
})

process.on("unhandledRejection", (err: Error) => {
  console.log(err);
})
