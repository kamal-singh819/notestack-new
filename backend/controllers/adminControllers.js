import notesModel from "../models/notesModel.js";
const uploadNotesController = async (req, res, next) => {
    try {
        const { subject, pdfName, pdfUrl, description } = req.body;
        if (!subject || !pdfName || !pdfUrl || !description) return res.send({ statusCode: 400, message: "MISSING" });
        const note = new notesModel({ subject, pdfName, pdfUrl, description, adminId: req.user.id });
        await note.save();
        return res.send({ statusCode: 200, message: "UPLOADED", data: note });
    } catch (error) {
        next(error);
    }
}
export { uploadNotesController };