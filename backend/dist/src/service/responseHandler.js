"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHandler = void 0;
const responseHandler = (res, data, message, statuscode) => {
    let statusCode = statuscode || 200;
    let resData = data || null;
    let resMessage = message || `Success`;
    res.status(statusCode).json({
        status: "success",
        message: resMessage,
        data: resData,
    });
};
exports.responseHandler = responseHandler;
