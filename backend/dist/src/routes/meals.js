"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const meals_1 = require("../controllers/meals");
const router = (0, express_1.Router)();
router.route("/create").post(meals_1.create);
exports.default = router;
