import { Router } from "express";
import { create, deleteItem, list, update } from "../controllers/rawItems";
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.route("/create").post(verifyToken, create);
router.route("/update/:id").put(verifyToken, update);
router.route("/list").get(verifyToken, list);
router.route("/delete/:id").delete(verifyToken, deleteItem);

export default router;
