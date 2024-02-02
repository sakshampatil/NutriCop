"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const days_1 = require("../controllers/days");
const router = (0, express_1.Router)();
router.route("/list").get(days_1.list);
router.route("/list/:id").get(days_1.findBasedOnId);
exports.default = router;
