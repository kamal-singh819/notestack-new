import { Router } from 'express';
import { getAllNotesController } from '../controllers/notesControllers.js';
const router = Router();

router.get('/get-all-notes', getAllNotesController);

export default router;