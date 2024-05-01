import { Router } from 'express';
import { uploadNotesController } from '../controllers/adminControllers.js';
import tokenValidateHandler from '../middlewares/tokenValidateHandler.js';
const router = Router();

router.post('/upload-notes', tokenValidateHandler, uploadNotesController);
export default router;