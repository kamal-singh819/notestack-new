import mongoose from "mongoose";
import notesModel from "../models/notesModel.js";

const getAllNotesController = async (req, res, next) => {
    try {
        const allNotes = await notesModel.find({});
        return res.send({ statusCode: 200, message: "FETCHED", data: allNotes });
    } catch (error) {
        next(error);
    }
}

const uploadNotesController = async (req, res, next) => {
    try {
        const { categoryId, pdfName, pdfUrl, description, contentType } = req.body;
        if (!categoryId || !pdfName || !pdfUrl || !description || !contentType) return res.send({ statusCode: 400, message: "MISSING" });
        const note = new notesModel({ categoryId: categoryId, pdfName, contentType, pdfUrl, description, adminId: req.user.id });
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
        if (!noteId || !likeCount) return res.status(400).send({ statusCode: 400, message: "NOT FOUND" });
        await notesModel.findByIdAndUpdate(noteId, { likeCount: likeCount });
        return res.status(200).send({ statusCode: 200, message: "UPDATED" });
    } catch (error) {
        next(error);
    }
}

export { getAllNotesController, uploadNotesController, likeNoteController };