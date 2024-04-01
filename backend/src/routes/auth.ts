import { Router } from "express";
import { signIn } from "../controllers/auth";

const router = Router();

router.route("/signIn").post(signIn);

export default router;
