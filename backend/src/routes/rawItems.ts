import { Router } from "express";
import { create, deleteItem, list, update } from "../controllers/rawItems";

const router = Router();

router.route("/create").post(create);
router.route("/update/:id").put(update);
router.route("/list/:userId").get(list);
router.route("/delete/:id").delete(deleteItem);

export default router;
