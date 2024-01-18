import { Router } from "express";
import { create } from "../controllers/rawItems";

const router = Router();

router.route("/").post(create);

export default router;
