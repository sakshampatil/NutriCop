import { Router } from "express";
import { getUser, signIn, updateTarget } from "../controllers/auth";
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.route("/signIn").post(signIn);
router.route("/getUser").get(verifyToken, getUser);
router.route("/updateTarget").put(verifyToken, updateTarget);

export default router;
