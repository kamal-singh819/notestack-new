import notesModel from "../models/notesModel.js";

const getAllNotesController = async (req, res, next) => {
    try {
        const allNotes = await notesModel.find({});
        return res.send({ statusCode: 200, message: "FETCHED", data: allNotes });
    } catch (error) {
        next(error);
    }
}

const likeNoteController = async (req, res, next) => {
    try {
        const { noteId } = req.query;
        const { likeCount } = req.body;
        if (!noteId || !likeCount) return res.status(400).send({ statusCode: 400, message: "NOT FOUND" });
        await notesModel.findByIdAndUpdate(noteId, { likeCount: likeCount });
        return res.status(200).send({ statusCode: 200, message: "UPDATED" });
    } catch (error) {
        next(error);
    }
}

export { getAllNotesController, likeNoteController };