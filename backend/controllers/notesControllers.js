import notesModel from "../models/notesModel.js";

// const getAllNotesController = async (req, res, next) => {
//     try {
//         const allNotes = await notesModel.find({ collegeName: "NONE" });
//         return res.send({ statusCode: 200, message: "FETCHED", data: allNotes });
//     } catch (error) {
//         next(error);
//     }
// }

const getAllPyqsController = async (req, res, next) => {
    try {
        const allPyqs = await notesModel.find({ collegeName: { $ne: "NONE" } });
        return res.send({ statusCode: 200, message: "FETCHED", data: allPyqs });
    } catch (error) {
        next(error);
    }
}

const getAllNotesByCategoryController = async (req, res, next) => {
    try {
        const { categoryId } = req.query;
        if (!categoryId) return res.send({ statusCode: 400, message: "MISSING" });
        const allNotes = await notesModel.find({ categoryId: categoryId, collegeName: "NONE" }).populate('categoryId');
        return res.send({ statusCode: 200, message: "FETCHED", data: allNotes });
    } catch (error) {
        next(error);
    }
}

const uploadNotesController = async (req, res, next) => {
    try {
        const { categoryId, pdfName, pdfUrl, description } = req.body;
        if (!categoryId || !pdfName || !pdfUrl || !description) return res.send({ statusCode: 400, message: "MISSING" });
        const note = new notesModel({ categoryId, pdfName, pdfUrl, description, adminId: req.user.id });
        await note.save();
        return res.send({ statusCode: 200, message: "UPLOADED", data: note });
    } catch (error) {
        next(error);
    }
}

const likeNoteController = async (req, res, next) => {
    try {
        const { noteId } = req.query;
        const { likeCount } = req.body;
        if (!noteId || !likeCount) return res.status(400).send({ statusCode: 400, message: "MISSING" });
        await notesModel.findByIdAndUpdate(noteId, { likeCount: likeCount });
        return res.status(200).send({ statusCode: 200, message: "UPDATED" });
    } catch (error) {
        next(error);
    }
}

const updateNotesController = async (req, res, next) => {
    try {
        const { noteId } = req.query;
        if (!noteId) return res.send({ statusCode: 400, message: "MISSING" });
        await notesModel.findByIdAndUpdate(noteId, req.body);
        return res.status(200).send({ statusCode: 200, message: "UPDATED" });
    } catch (error) {
        next(error);
    }
}

const deleteNotesController = async (req, res, next) => {
    try {
        const { noteId } = req.query;
        if (!noteId) return res.send({ statusCode: 400, message: "MISSING" });
        await notesModel.findByIdAndDelete(noteId);
        res.status(200).send({ statusCode: 200, message: "DELETED" });
    } catch (error) {
        next(error);
    }
}

export { getAllNotesByCategoryController, getAllPyqsController, uploadNotesController, likeNoteController, updateNotesController, deleteNotesController };