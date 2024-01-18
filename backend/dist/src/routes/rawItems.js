"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rawItems_1 = require("../controllers/rawItems");
const router = (0, express_1.Router)();
router.route("/").post(rawItems_1.create);
exports.default = router;
