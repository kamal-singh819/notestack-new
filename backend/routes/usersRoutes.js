import { Router } from "express";
import { loginController, registerController, uploadProfileController, sendOtpController, resetPasswordController } from "../controllers/usersControllers.js";
import upload from "../services/fileUploadingMulter.js";

const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.put('/upload-profile', upload.single('file'), uploadProfileController);
router.post('/send-otp', sendOtpController);
router.post('/reset-password', resetPasswordController);
export default router;