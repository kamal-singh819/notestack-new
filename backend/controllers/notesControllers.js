import notesModel from "../models/notesModel.js";

const getAllNotesController = async (req, res, next) => {
    try {
        const allNotes = await notesModel.find({});
        return res.send({ statusCode: 200, message: "UPLOADED", data: allNotes });
    } catch (error) {
        next(error);
    }
}

export { getAllNotesController };