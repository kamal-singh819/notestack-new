import { Router } from 'express';
import { getAllNotesController, uploadNotesController, likeNoteController } from '../controllers/notesControllers.js';
import tokenValidateHandler from '../middlewares/tokenValidateHandler.js';
const router = Router();

router.get('/get-all-notes', getAllNotesController);
router.put('/like-update', likeNoteController);
router.post('/upload-notes', tokenValidateHandler, uploadNotesController);

export default router;