"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipes_1 = require("../controllers/recipes");
const router = (0, express_1.Router)();
router.route("/create").post(recipes_1.create);
exports.default = router;
