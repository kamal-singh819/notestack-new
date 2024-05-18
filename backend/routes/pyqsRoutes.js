import { Router } from 'express';
import { getAllPyqsController, uploadPyqsController, likePyqsController, updatePyqsController, deletePyqsController } from '../controllers/pyqsControllers.js';
import tokenValidateHandler from '../middlewares/tokenValidateHandler.js';
import isAdminMiddleware from '../middlewares/roleBasedAccess.js';
const router = Router();

router.get('/get-all-pyqs', getAllPyqsController);
router.put('/like-pyq', likePyqsController);
router.post('/upload-pyq', tokenValidateHandler, isAdminMiddleware, uploadPyqsController);
router.put('/update-pyq', tokenValidateHandler, isAdminMiddleware, updatePyqsController);
router.delete('/delete-pyq', tokenValidateHandler, isAdminMiddleware, deletePyqsController);

export default router;