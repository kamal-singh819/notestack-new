import subjectModel from "../models/subjectModel.js";

const getAllSubjectsController = async (req, res, next) => {
    try {
        const allSubjects = await subjectModel.find({});
        return res.status(200).send({ statusCode: 200, message: "FETCHED", data: allSubjects });
    } catch (error) {
        next(error);
    }
}

const addSubjectController = async (req, res, next) => {
    try {
        const { subjectName } = req.body;
        if (!subjectName) return res.send({ statusCode: 400, message: "MISSING" });
        const alreadyExist = await subjectModel.find({ subjectName });
        if (alreadyExist.length) return res.send({ statusCode: 400, message: "EXISTS" });
        const subject = new subjectModel({ subjectName, adminId: req.user.id });
        await subject.save();
        return res.status(200).send({ statusCode: 200, message: "ADDED" });
    } catch (error) {
        next(error);
    }
}

const updateSubjectController = async (req, res, next) => {
    try {
        const { id } = req.query;
        const { subjectName } = req.body;
        if (!subjectName || !id) return res.send({ statusCode: 400, message: "MISSING" });
        const alreadyExist = await subjectModel.find({ subjectName });
        if (alreadyExist.length) return res.send({ statusCode: 400, message: "EXISTS" });
        await subjectModel.findByIdAndUpdate(id, { subjectName });
        return res.status(200).send({ statusCode: 200, message: "UPDATED" });
    } catch (error) {
        next(error);
    }
}

const deleteSubjectController = async (req, res, next) => {
    try {
        const { id } = req.query;
        if (!id) return res.send({ statusCode: 400, message: "MISSING" });
        await subjectModel.findByIdAndDelete(id);
        return res.status(200).send({ statusCode: 200, message: "DELETED" });
    } catch (error) {
        next(error);
    }
}

export { getAllSubjectsController, addSubjectController, updateSubjectController, deleteSubjectController };