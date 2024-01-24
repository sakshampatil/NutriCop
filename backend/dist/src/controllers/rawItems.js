"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const db_1 = require("../db");
const errorHandler_1 = require("../service/errorHandler");
const raw_items_1 = require("../schema/raw_items");
const responseHandler_1 = require("../service/responseHandler");
const create = async (req, res, next) => {
    try {
        const params = req.body;
        console.log("PARAM = ", params);
        if (!(params === null || params === void 0 ? void 0 : params.name) || !(params === null || params === void 0 ? void 0 : params.proteins) || !(params === null || params === void 0 ? void 0 : params.calories)) {
            throw new errorHandler_1.BadRequest("Bad Request!");
        }
        const insertRawItem = await db_1.db.insert(raw_items_1.raw_items).values(params);
        (0, responseHandler_1.responseHandler)(res, insertRawItem);
    }
    catch (err) {
        console.log("ERR = ", err);
        next(err);
    }
};
exports.create = create;
