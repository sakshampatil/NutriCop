import { Router } from "express";
import { create, deleteMeal, findBasedOnId, update } from "../controllers/meals";
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.route("/create").post(verifyToken, create);
router.route("/update/:id").put(verifyToken, update);
router.route("/list/:id").get(verifyToken, findBasedOnId);
// router.route("/deleteMealRecipe/:id").delete(deleteMealRecipe);
router.route("/deleteMeal/:id").delete(verifyToken, deleteMeal);

export default router;
