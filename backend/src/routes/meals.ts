import { Router } from "express";
import { create, deleteMeal, list } from "../controllers/meals";
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.route("/create").post(verifyToken, create);
router.route("/list").get(verifyToken, list);
router.route("/delete/:id").delete(verifyToken, deleteMeal);

export default router;
