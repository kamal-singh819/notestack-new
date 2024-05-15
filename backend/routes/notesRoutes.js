import { Router } from 'express';
import { getAllNotesByCategoryController, getAllPyqsController, uploadNotesController, likeNoteController, updateNotesController, deleteNotesController } from '../controllers/notesControllers.js';
import tokenValidateHandler from '../middlewares/tokenValidateHandler.js';
import isAdminMiddleware from '../middlewares/roleBasedAccess.js';
const router = Router();

router.get('/get-all-pyqs', getAllPyqsController);
router.get('/get-notes-by-category', getAllNotesByCategoryController);
router.put('/like-update', likeNoteController);
router.post('/upload-note', tokenValidateHandler, isAdminMiddleware, uploadNotesController);
router.put('/update-note', tokenValidateHandler, isAdminMiddleware, updateNotesController);
router.delete('/delete-note', tokenValidateHandler, isAdminMiddleware, deleteNotesController);

export default router;