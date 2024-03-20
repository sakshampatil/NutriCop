import { Router } from "express";
import { create, deleteRecipe, findBasedOnId, list, update } from "../controllers/recipes";

const router = Router();

router.route("/create").post(create);
router.route("/update/:id").put(update);
router.route("/list/:userId").get(list);
router.route("/list/:id").get(findBasedOnId);
router.route("/deleteRecipe/:id").delete(deleteRecipe);

export default router;
