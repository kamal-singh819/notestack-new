import { Router } from "express";
import { getAllCategoriesController, addCategoryController, updateCategoryController, deleteCategoryController } from "../controllers/categoryControllers.js";
import tokenValidateHandler from "../middlewares/tokenValidateHandler.js";
import accessMiddleware from "../middlewares/roleBasedAccess.js";

const router = Router();

router.get('/get-all-categories', getAllCategoriesController);
router.post('/add-category', tokenValidateHandler, accessMiddleware(["Admin"]), addCategoryController);
router.put('/update-category', tokenValidateHandler, accessMiddleware(["Admin"]), updateCategoryController);
router.delete('/delete-category', tokenValidateHandler, accessMiddleware(["Admin"]), deleteCategoryController);

export default router;