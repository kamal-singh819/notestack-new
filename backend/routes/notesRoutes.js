import { Router } from 'express';
import { getAllNotesByCategoryController, getAllPyqsController, uploadNotesController, likeNoteController, updateNotesController, deleteNotesController } from '../controllers/notesControllers.js';
import tokenValidateHandler from '../middlewares/tokenValidateHandler.js';
import accessMiddleware from '../middlewares/roleBasedAccess.js';
const router = Router();

router.get('/get-all-pyqs', getAllPyqsController);
router.get('/get-notes-by-category', getAllNotesByCategoryController);
router.put('/like-note', likeNoteController);
router.post('/upload-note', tokenValidateHandler, accessMiddleware(["Admin", "Contributer"]), uploadNotesController);
router.put('/update-note', tokenValidateHandler, accessMiddleware(["Admin"]), updateNotesController);
router.delete('/delete-note', tokenValidateHandler, accessMiddleware(["Admin"]), deleteNotesController);

export default router;