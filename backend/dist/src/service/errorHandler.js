"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralError = exports.InsufficentAccessError = exports.ApplicationError = exports.Unauthorized = exports.NotFound = exports.BadRequest = exports.useErrorHandler = void 0;
class GeneralError extends Error {
    constructor(message) {
        super();
        this.message = message;
    }
    getCode() {
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
exports.GeneralError = GeneralError;
class BadRequest extends GeneralError {
}
exports.BadRequest = BadRequest;
class NotFound extends GeneralError {
}
exports.NotFound = NotFound;
class Unauthorized extends GeneralError {
}
exports.Unauthorized = Unauthorized;
class ApplicationError extends GeneralError {
}
exports.ApplicationError = ApplicationError;
class InsufficentAccessError extends GeneralError {
}
exports.InsufficentAccessError = InsufficentAccessError;
const useErrorHandler = (err, res) => {
    if (err instanceof GeneralError) {
        return res.status(err.getCode()).json({
            status: "error",
            messsage: err.message
        });
    }
    return res.status(400).json({
        status: "error",
        message: err.message
    });
};
exports.useErrorHandler = useErrorHandler;
process.on("uncaughtException", (err) => {
    console.log(err);
});
process.on("unhandledRejection", (err) => {
    console.log(err);
});
