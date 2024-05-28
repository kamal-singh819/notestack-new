import bcrypt from 'bcrypt';
import dotenv from 'dotenv'; dotenv.config();
import jwt from 'jsonwebtoken';
import usersModel from "../models/usersModel.js";
import sendEmailHandler from '../services/sendEmailHandler.js';
import otpGenerate from '../services/otpGenerate.js';

const registerController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.send({ statusCode: 400, message: "MISSING" });
        const alreadyExists = await usersModel.find({ email });
        if (alreadyExists.length) return res.send({ statusCode: 400, message: "EXISTS" });
        const hashedPassword = await bcrypt.hash(password, 10);

        const userCteated = new usersModel({ name, email, password: hashedPassword });
        await userCteated.save();
        return res.send({ statusCode: 200, message: "CREATED" });
    } catch (error) {
        next(error);
    }
}

const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(404).send({ statusCode: 404, message: "MISSING" });
        const userDetails = await usersModel.findOne({ email });
        if (!userDetails) return res.send({ statusCode: 400, message: "NOT REGISTERED" });
        bcrypt.compare(password, userDetails.password, (err, resp) => {
            if (err) return res.status(400).send({ statusCode: 400, message: "ERROR" });
            else if (resp) {
                const accessToken = jwt.sign({ user: { id: userDetails._id, email: email } }, process.env.TOKEN_SECRET_KEY, { expiresIn: "20d" });
                return res.status(200).send({ statusCode: 200, message: "LOGGED IN", userInfo: { accessToken: accessToken, userId: userDetails._id, email: userDetails.email, role: userDetails.role } });
            }
            return res.status(400).send({ statusCode: 400, message: "UNMATCHED" });
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
        sendEmailHandler({ toEmail: email, fromEmail: "kamalsinghkanth@gmail.com", subject: "One Time Password from NoteStack", body: `Your One Time password to reset password is ${otp}` });
        return res.send({ statusCode: 200, message: "EMAIL SENT", emailOTP: { email: email, sentOtp: otp } });
    } catch (error) {
        next(error);
    }
}

const contactUsController = async (req, res, next) => {
    try {
        const { email, message } = req.body;
        if (!email || !message) return res.send({ statusCode: 400, message: "MISSING" });
        sendEmailHandler({ toEmail: "kamalsinghkanth@gmail.com", fromEmail: email, subject: "Hii NoteStack!", body: message });
        return res.send({ statusCode: 200, message: "EMAIL SENT" });
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

const updateProfileController = async (req, res, next) => {
    try {
        const { userId } = req.query;
        if (!userId) return res.status(404).send({ statusCode: 404, message: 'MISSING' });
        const { name, phone, linkedin, github } = req.body;
        const updatedObj = {};
        if (name) updatedObj.name = name;
        if (phone) updatedObj.phone = phone;
        if (linkedin) updatedObj.linkedin = linkedin;
        if (github) updatedObj.github = github;
        if (req?.file) updatedObj.imageUrl = req?.file?.filename;
        const updated = await usersModel.findByIdAndUpdate(userId, { $set: updatedObj }, { new: true });
        if (updated) return res.status(201).send({ statusCode: 201, message: "UPDATED", data: updated });
        else return res.status(400).send({ statusCode: 400, message: "ERROR" });
    } catch (error) {
        next(error);
    }
}

const getUserdetails = async (req, res, next) => {
    try {
        const response = await usersModel.findById(req.user.id);
        return res.status(200).send({ statusCode: 200, message: "FETCHED", data: response });
    } catch (error) {
        next(error);
    }
}

const getAllUsersDetails = async (req, res, next) => {
    try {
        const response = await usersModel.find({}, { _id: 1, email: 1, role: 1 });
        return res.status(200).send({ statusCode: 200, message: "FETCHED", data: response });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const loginWithGoogleController = async (req, res, next) => {
    try {
        if (!req.user?.email_verified) res.status(404).send({ message: "ERROR" });
        const userDetails = await usersModel.findOne({ email: req?.user?.email });
        if (!userDetails) {
            const userData = {
                googleId: req.user.sub,
                email: req.user.email,
                name: req.user.name
            }
            const userCteated = new usersModel(userData);
            await userCteated.save();
        }
        const userDetails2 = await usersModel.findOne({ email: req?.user?.email });
        const accessToken = jwt.sign({ user: { id: userDetails2._id, email: userDetails2.email } }, process.env.TOKEN_SECRET_KEY, { expiresIn: "20d" });
        return res.status(200).send({ statusCode: 200, message: "LOGGED IN", userInfo: { accessToken: accessToken, userId: userDetails2._id, email: userDetails2.email, role: userDetails2.role } });
    } catch (error) {
        next(error);
    }
}

export { registerController, loginController, loginWithGoogleController, sendOtpController, resetPasswordController, contactUsController, updateProfileController, getUserdetails, getAllUsersDetails };