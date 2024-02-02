"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const meals_1 = require("../controllers/meals");
const router = (0, express_1.Router)();
router.route("/create").post(meals_1.create);
router.route("/update/:id").put(meals_1.update);
exports.default = router;
