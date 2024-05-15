import { Router } from "express";
import { loginController, registerController, sendOtpController, resetPasswordController, contactUsController } from "../controllers/usersControllers.js";

const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/send-otp', sendOtpController);
router.post('/reset-password', resetPasswordController);
router.post('/contact-us', contactUsController);
export default router;