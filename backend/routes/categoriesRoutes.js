import { Router } from "express";
import { getAllCategoriesController, addCategoryController, updateCategoryController, deleteCategoryController } from "../controllers/categoryControllers.js";
import tokenValidateHandler from "../middlewares/tokenValidateHandler.js";
import isAdminMiddleware from "../middlewares/roleBasedAccess.js";

const router = Router();

router.get('/get-all-categories', getAllCategoriesController);
router.post('/add-category', tokenValidateHandler, isAdminMiddleware, addCategoryController);
router.put('/update-category', tokenValidateHandler, isAdminMiddleware, updateCategoryController);
router.delete('/delete-category', tokenValidateHandler, isAdminMiddleware, deleteCategoryController);

export default router;