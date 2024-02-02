import { Router } from "express";
import { create, findBasedOnId, update } from "../controllers/meals";

const router = Router();

router.route("/create").post(create);
router.route("/update/:id").put(update);
router.route("/list/:id").get(findBasedOnId);

export default router;
