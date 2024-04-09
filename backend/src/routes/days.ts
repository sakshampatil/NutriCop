import { Router } from "express";
import { findBasedOnId, list } from "../controllers/days";
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.route("/list").get(verifyToken, list);
router.route("/list/:id").get(verifyToken, findBasedOnId);

export default router;
