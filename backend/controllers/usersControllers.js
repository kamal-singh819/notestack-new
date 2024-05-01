import bcrypt from 'bcrypt';
import dotenv from 'dotenv'; dotenv.config();
import jwt from 'jsonwebtoken';
import usersModel from "../models/usersModel.js";
import sendEmailHandler from '../services/sendEmailHandler.js';
import otpGenerate from '../services/otpGenerate.js';

const registerController = async (req, res, next) => {
    try {
        const { name, email, phone, password } = req.body;
        if (!name || !email || !phone || !password) return res.send({ statusCode: 400, message: "MISSING" });
        const alreadyExists = await usersModel.find({ email });
        if (alreadyExists.length) return res.send({ statusCode: 400, message: "EXISTS" });
        const hashedPassword = await bcrypt.hash(password, 10);
        if (hashedPassword) {
            const userCteated = new usersModel({ name, email, phone, password: hashedPassword });
            await userCteated.save();
            return res.send({ statusCode: 200, message: "CREATED" });
        }
        return res.send({ statusCode: 400, message: "ERROR" });
    } catch (error) {
        next(error);
    }
}

const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.send({ statusCode: 400, message: "MISSING" });
        const userDetails = await usersModel.findOne({ email });
        if (!userDetails) return res.send({ statusCode: 400, message: "NOT REGISTERED" });
        bcrypt.compare(password, userDetails.password, (err, resp) => {
            if (err) return res.send({ statusCode: 400, message: "ERROR" });
            else if (resp) {
                const accessToken = jwt.sign({ user: { id: userDetails._id, email: email } }, process.env.TOKEN_SECRET_KEY, { expiresIn: "1d" });
                return res.send({ statusCode: 200, message: "LOGGED IN", userInfo: { accessToken: accessToken, name: userDetails.name, email: userDetails.email, isAdmin: userDetails.isAdmin } });
            }
            return res.send({ statusCode: 400, message: "UNMATCHED" });
        });
    } catch (error) {
        next(error);
    }
}

const sendOtpController = async (req, res, next) => {
    try {
        const { email } = req.body;
        const otp = otpGenerate().trim();
        console.log("OTP is ", otp);
        if (!email) return res.send({ statusCode: 400, message: "MISSING" });
        sendEmailHandler({ email: email, subject: "One Time Password from NoteStack", body: `Your One Time password to reset password is ${otp}` });
        return res.send({ statusCode: 200, message: "EMAIL SENT", emailOTP: { email: email, sentOtp: otp } });
    } catch (error) {
        next(error);
    }
}

const resetPasswordController = async (req, res, next) => {
    try {
        const { email, password, confirmPassword } = req.body;
        if (!email || !password || !confirmPassword) return res.send({ statusCode: 400, message: "MISSING" });
        const userExists = await usersModel.find({ email });
        if (!userExists.length) return res.send({ statusCode: 400, message: "MISSING" });
        const hashedPassword = await bcrypt.hash(password, 10);
        if (hashedPassword) {
            await usersModel.updateOne({ password: hashedPassword });
            return res.send({ statusCode: 200, message: "UPDATED" });
        }
        return res.send({ statusCode: 400, message: "ERROR" });
    } catch (error) {
        next(error);
    }
}

export { registerController, loginController, sendOtpController, resetPasswordController };