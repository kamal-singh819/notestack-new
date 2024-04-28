import { Router } from 'express';
import upload from "../services/fileUploadingMulter.js";
import { uploadNotesController } from '../controllers/adminControllers.js';
const router = Router();

router.post('/upload-notes', upload.array('files'), uploadNotesController);
export default router;