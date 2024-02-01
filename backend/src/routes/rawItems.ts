import { Router } from "express";
import { create, deleteItem, list, update } from "../controllers/rawItems";

const router = Router();

router.route("/").post(create);
router.route("/:id").put(update);
router.route("/").get(list);
router.route("/:id").delete(deleteItem);

export default router;
