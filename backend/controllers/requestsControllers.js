import requestModel from "../models/requestModel.js";

const requestToBeContributor = async (req, res, next) => {
    try {
        const { reqType, skills, message } = req?.body;
        const alreadyExists = await requestModel.find({ userId: req.user?.id });
        if (alreadyExists.length) return res.status(400).send({ message: "EXISTS" });
        if (!reqType || !message || !skills) return res.status(400).send({ message: "MISSING" });
        await requestModel.create({ userId: req.user?.id, type: reqType, skills: skills, message: message });
        return res.status(200).send({ message: "SENT" });
    } catch (error) {
        next(error);
    }
}

const getAllRequests = async (req, res, next) => {
    try {
        const allRequests = await requestModel.find({}).populate('userId');
        return res.status(200).send({ message: "FETCHED", data: allRequests });
    } catch (error) {
        next(error);
    }
}

export { requestToBeContributor, getAllRequests };