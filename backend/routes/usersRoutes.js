import { Router } from "express";
import { loginController, registerController, sendOtpController, resetPasswordController, contactUsController, updateProfileController, getUserdetails, getAllUsersDetails, loginWithGoogleController } from "../controllers/usersControllers.js";
import tokenValidateHandler from "../middlewares/tokenValidateHandler.js";
import accessMiddleware from "../middlewares/roleBasedAccess.js";
import upload from "../services/fileUploadingMulter.js";

const router = Router();
router.post('/login-with-google', tokenValidateHandler, loginWithGoogleController);
router.get('/get-user', tokenValidateHandler, getUserdetails);
router.get('/get-all-users', tokenValidateHandler, accessMiddleware(["Admin"]), getAllUsersDetails);
router.post('/register', registerController);
router.post('/login', loginController);
router.post('/send-otp', sendOtpController);
router.post('/reset-password', resetPasswordController);
router.post('/contact-us', tokenValidateHandler, contactUsController);
router.put('/update-profile', tokenValidateHandler, upload.single('image'), updateProfileController);
export default router;
