"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rawItems_1 = require("../controllers/rawItems");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.route("/create").post(auth_1.verifyToken, rawItems_1.create);
router.route("/update/:id").put(auth_1.verifyToken, rawItems_1.update);
router.route("/list").get(auth_1.verifyToken, rawItems_1.list);
router.route("/delete/:id").delete(auth_1.verifyToken, rawItems_1.deleteItem);
exports.default = router;
