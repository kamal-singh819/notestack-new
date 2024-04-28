import mongoose from 'mongoose';
const notesSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    subject: {
        type: String,
        required: true,
    },
    pdfName: {
        type: String
    }
}, { timestamps: true });

const notesModel = mongoose.model('notes', notesSchema);
export default notesModel;