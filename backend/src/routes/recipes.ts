import { Router } from "express";
import { create, deleteRecipe, findBasedOnId, list, update } from "../controllers/recipes";
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.route("/create").post(verifyToken, create);
router.route("/update/:id").put(verifyToken, update);
router.route("/list/:userId").get(verifyToken, list);
router.route("/list/:id").get(verifyToken, findBasedOnId);
router.route("/deleteRecipe/:id").delete(verifyToken, deleteRecipe);

export default router;
