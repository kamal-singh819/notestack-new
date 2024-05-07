import mongoose from 'mongoose';
const notesSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'categories'
    },
    pdfName: {
        type: String,
        required: true
    },
    pdfUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    likeCount: {
        type: Number,
        default: 0
    },
    contentType: {
        type: String,
        required: true,
        enum: ['PYQs', 'NOTES']
    }
}, { timestamps: true });

const notesModel = mongoose.model('notes', notesSchema);
export default notesModel;