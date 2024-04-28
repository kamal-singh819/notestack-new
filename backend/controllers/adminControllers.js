import notesModel from "../models/notesModel.js";
const uploadNotesController = async (req, res, next) => {
    try {
        const { subject } = req.body;
        if (!subject || req.files.length === 0) return res.send({ statusCode: 400, message: "MISSING" });
        const arr = [];
        req.files.forEach(element => {
            arr.push({ pdfName: element.filename, subject: subject });
        });
        await notesModel.insertMany(arr);
        return res.send({ statusCode: 200, pdfUrl: arr, message: "UPLOADED" });
    } catch (error) {
        next(error);
    }
}
export { uploadNotesController };