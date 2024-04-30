"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const days_1 = require("../controllers/days");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.route("/list").get(auth_1.verifyToken, days_1.list);
router.route("/day").get(auth_1.verifyToken, days_1.findBasedOnDay);
exports.default = router;
