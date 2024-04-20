"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipes_1 = require("../controllers/recipes");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.route("/create").post(auth_1.verifyToken, recipes_1.create);
router.route("/update/:id").put(auth_1.verifyToken, recipes_1.update);
router.route("/list").get(auth_1.verifyToken, recipes_1.list);
router.route("/list/:id").get(auth_1.verifyToken, recipes_1.findBasedOnId);
router.route("/delete/:id").delete(auth_1.verifyToken, recipes_1.deleteRecipe);
exports.default = router;
