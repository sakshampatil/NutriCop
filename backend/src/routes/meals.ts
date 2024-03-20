import { Router } from "express";
import { create, deleteMeal, findBasedOnId, update } from "../controllers/meals";

const router = Router();

router.route("/create").post(create);
router.route("/update/:id").put(update);
router.route("/list/:id").get(findBasedOnId);
// router.route("/deleteMealRecipe/:id").delete(deleteMealRecipe);
router.route("/deleteMeal/:id").delete(deleteMeal);

export default router;
