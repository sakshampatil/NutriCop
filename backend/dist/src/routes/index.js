"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("../service/errorHandler");
const routes = (app) => {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use((err, req, res, next) => {
        (0, errorHandler_1.useErrorHandler)(err, res);
    });
};
exports.routes = routes;
