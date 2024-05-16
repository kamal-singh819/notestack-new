import { Router } from 'express';
import { getAllSubjectsController, updateSubjectController, deleteSubjectController, addSubjectController } from '../controllers/subjectController.js';
import tokenValidateHandler from "../middlewares/tokenValidateHandler.js";
import isAdminMiddleware from "../middlewares/roleBasedAccess.js";

const router = Router();

router.get('/get-all-subjects', getAllSubjectsController);
router.post('/add-subject', tokenValidateHandler, isAdminMiddleware, addSubjectController);
router.put('/update-subject', tokenValidateHandler, isAdminMiddleware, updateSubjectController);
router.delete('/delete-subject', tokenValidateHandler, isAdminMiddleware, deleteSubjectController);

export default router;