import pyqModel from "../models/pyqModel.js";

const getAllPyqsController = async (req, res, next) => {
    try {
        const allPyqs = await pyqModel.find({}).populate('subjectId');
        return res.status(200).send({ statusCode: 200, message: "FETCHED", data: allPyqs });
    } catch (error) {
        next(error);
    }
}

const uploadPyqsController = async (req, res, next) => {
    try {
        const { subjectId, pdfName, pdfUrl, description, collegeName, isPyq } = req.body;
        if (!subjectId || !collegeName || !pdfName || !pdfUrl || !description) return res.send({ statusCode: 400, message: "MISSING" });
        const pyq = new pyqModel({ subjectId, collegeName, pdfName, pdfUrl, isPyq, description, adminId: req.user.id });
        await pyq.save();
        return res.status(200).send({ statusCode: 200, message: "UPLOADED" });
    } catch (error) {
        next(error);
    }
}

const likePyqsController = async (req, res, next) => {
    try {
        const { pyqId } = req.query;
        const { likeCount } = req.body;
        if (!pyqId) return res.status(400).send({ statusCode: 400, message: "MISSING" });
        await pyqModel.findByIdAndUpdate(pyqId, { likeCount: likeCount });
        return res.status(200).send({ statusCode: 200, message: "UPDATED" });
    } catch (error) {
        next(error);
    }
}

const updatePyqsController = async (req, res, next) => {
    try {
        const { pyqId } = req.query;
        if (!pyqId) return res.status(400).send({ statusCode: 400, message: "MISSING" });
        await pyqModel.findByIdAndUpdate(pyqId, req.body);
        return res.status(200).send({ statusCode: 200, message: "UPDATED" });
    } catch (error) {
        next(error);
    }
}

const deletePyqsController = async (req, res, next) => {
    try {
        const { pyqId } = req.query;
        if (!pyqId) return res.status(400).send({ statusCode: 400, message: "MISSING" });
        await pyqModel.findByIdAndDelete(pyqId);
        res.status(200).send({ statusCode: 200, message: "DELETED" });
    } catch (error) {
        next(error);
    }
}

export { getAllPyqsController, uploadPyqsController, likePyqsController, updatePyqsController, deletePyqsController };