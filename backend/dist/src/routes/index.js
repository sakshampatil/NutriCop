"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("../service/errorHandler");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = __importDefault(require("./auth"));
const rawItems_1 = __importDefault(require("./rawItems"));
const recipes_1 = __importDefault(require("./recipes"));
const meals_1 = __importDefault(require("./meals"));
const days_1 = __importDefault(require("./days"));
const routes = (app) => {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use((0, cookie_parser_1.default)());
    app.use("/api/v1/auth", auth_1.default);
    app.use("/api/v1/rawItems", rawItems_1.default);
    app.use("/api/v1/recipes", recipes_1.default);
    app.use("/api/v1/meals", meals_1.default);
    app.use("/api/v1/days", days_1.default);
    app.use((err, req, res, next) => {
        (0, errorHandler_1.useErrorHandler)(err, res);
    });
};
exports.routes = routes;
