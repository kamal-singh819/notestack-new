import mongoose from 'mongoose';
const pyqSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'subjects'
    },
    collegeName: {
        type: String,
        required: true
    },
    pdfName: {
        type: String,
        required: true
    },
    pdfUrl: {
        type: String,
        required: true
    },
    isPyq: {  // true for pyq and false for class notes
        type: Boolean,
        required: true,
        default: true
    },
    description: {
        type: String,
        required: true
    },
    likeCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const pyqModel = mongoose.model('pyqs', pyqSchema);
export default pyqModel;