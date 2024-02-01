import { Router } from "express";
import { create, update } from "../controllers/recipes";

const router = Router();

router.route("/create").post(create);
router.route("/update/:id").put(update);

export default router;
