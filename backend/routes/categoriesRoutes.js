import { Router } from "express";
import { getAllCategoriesController, addCategoryController } from "../controllers/categoryControllers.js";
import tokenValidateHandler from "../middlewares/tokenValidateHandler.js";
import isAdminMiddleware from "../middlewares/roleBasedAccess.js";

const router = Router();

router.get('/get-all-categories', getAllCategoriesController);
router.post('/add-category', tokenValidateHandler, isAdminMiddleware, addCategoryController);

export default router;