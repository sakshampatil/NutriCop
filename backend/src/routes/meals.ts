import { Router } from "express";
import { create, deleteMeal, findBasedOnId, list, update } from "../controllers/meals";
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.route("/create").post(verifyToken, create);
router.route("/update/:id").put(verifyToken, update);
router.route("/list").get(verifyToken, list);
router.route("/list/:id").get(verifyToken, findBasedOnId);
// router.route("/deleteMealRecipe/:id").delete(deleteMealRecipe);
router.route("/delete/:id").delete(verifyToken, deleteMeal);

export default router;
