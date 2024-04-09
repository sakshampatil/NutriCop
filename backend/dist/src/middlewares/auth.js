"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler_1 = require("../service/errorHandler");
const verifyToken = (req, res, next) => {
    //get the token from the header if present
    let token = req.headers.authorization;
    // console.log("JWT = ", req.headers.authorization);
    //if no token found, return response (without going to the next middelware)
    if (!token) {
        throw new errorHandler_1.Unauthorized("Unauthorzied");
    }
    try {
        if (token.includes("Bearer")) {
            token = token.split(" ")[1];
        }
        console.log("JWT = ", token);
        //if can verify the token, set req.user and pass to next middleware
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        console.log("dec = ", decoded);
        req.user = decoded === null || decoded === void 0 ? void 0 : decoded.userId;
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.verifyToken = verifyToken;
