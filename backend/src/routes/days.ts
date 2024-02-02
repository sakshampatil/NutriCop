import { Router } from "express";
import { findBasedOnId, list } from "../controllers/days";

const router = Router();

router.route("/list").get(list);
router.route("/list/:id").get(findBasedOnId);

export default router;
