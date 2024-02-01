import { Router } from "express";
import {
  create,
  deleteRecipe,
  deleteRecipeRawItem,
  findBasedOnId,
  list,
  listRawItems,
  update,
} from "../controllers/recipes";

const router = Router();

router.route("/create").post(create);
router.route("/update/:id").put(update);
router.route("/list").get(list);
router.route("/list/:id").get(findBasedOnId);
router.route("/listRecipeRawItems").get(listRawItems);
router.route("/deleteRecipeRawItem/:id").delete(deleteRecipeRawItem);
router.route("/deleteRecipe/:id").delete(deleteRecipe);

export default router;
