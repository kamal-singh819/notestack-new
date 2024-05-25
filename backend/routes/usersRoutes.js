import { Router } from "express";
import { loginController, registerController, sendOtpController, resetPasswordController, contactUsController, updateProfileController, getUserdetails } from "../controllers/usersControllers.js";
import tokenValidateHandler from "../middlewares/tokenValidateHandler.js";
import upload from "../services/fileUploadingMulter.js";

const router = Router();
router.get('/get-user', tokenValidateHandler, getUserdetails);
router.post('/register', registerController);
router.post('/login', loginController);
router.post('/send-otp', sendOtpController);
router.post('/reset-password', resetPasswordController);
router.post('/contact-us', tokenValidateHandler, contactUsController);
router.put('/update-profile', tokenValidateHandler, upload.single('image'), updateProfileController);
export default router;
