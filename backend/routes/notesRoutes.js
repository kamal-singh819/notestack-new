import { Router } from 'express';
import { getAllNotesController, likeNoteController } from '../controllers/notesControllers.js';
const router = Router();

router.get('/get-all-notes', getAllNotesController);
router.put('/like-update', likeNoteController);

export default router;