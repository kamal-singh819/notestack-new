import { Router } from 'express';
import { getAllPyqsController, uploadPyqsController, likePyqsController, updatePyqsController, deletePyqsController } from '../controllers/pyqsControllers.js';
import tokenValidateHandler from '../middlewares/tokenValidateHandler.js';
import accessMiddleware from '../middlewares/roleBasedAccess.js';
const router = Router();

router.get('/get-all-pyqs', getAllPyqsController);
router.put('/like-pyq', likePyqsController);
router.post('/upload-pyq', tokenValidateHandler, accessMiddleware(["Admin", "Contributer"]), uploadPyqsController);
router.put('/update-pyq', tokenValidateHandler, accessMiddleware(["Admin"]), updatePyqsController);
router.delete('/delete-pyq', tokenValidateHandler, accessMiddleware(["Admin"]), deletePyqsController);

export default router;