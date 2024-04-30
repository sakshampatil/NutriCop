import { Router } from "express";
import { findBasedOnDay, list } from "../controllers/days";
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.route("/list").get(verifyToken, list);
router.route("/day").get(verifyToken, findBasedOnDay);

export default router;
