"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const db_1 = require("../db");
const errorHandler_1 = require("../service/errorHandler");
const users_1 = require("../schema/users");
const drizzle_orm_1 = require("drizzle-orm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const responseHandler_1 = require("../service/responseHandler");
const signup = async (req, res, next) => {
    try {
        const body = req.body;
        if (!(body === null || body === void 0 ? void 0 : body.name) || !(body === null || body === void 0 ? void 0 : body.email) || !body.password) {
            throw new errorHandler_1.BadRequest("Bad Request!");
        }
        const email = await db_1.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(users_1.users.email, body.email),
        });
        if (email) {
            throw new errorHandler_1.BadRequest("Email already exists!");
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hashPassword = await bcrypt_1.default.hash(body.password, salt);
        body.password = hashPassword;
        const user = await db_1.db.insert(users_1.users).values(body);
        (0, responseHandler_1.responseHandler)(res, user);
    }
    catch (err) {
        next(err);
    }
};
exports.signup = signup;
const login = async (req, res, next) => {
    try {
        const body = req.body;
        if (!body.email || !body.password) {
            throw new errorHandler_1.BadRequest("Bad Request!");
        }
        const user = await db_1.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(users_1.users.email, body.email),
        });
        if (!user) {
            throw new errorHandler_1.BadRequest("User does not exists!");
        }
        const passResult = await bcrypt_1.default.compare(body.password, user.password);
        if (!passResult) {
            throw new errorHandler_1.BadRequest("Incorrect password!");
        }
        (0, responseHandler_1.responseHandler)(res, user);
    }
    catch (err) {
        next(err);
    }
};
exports.login = login;
