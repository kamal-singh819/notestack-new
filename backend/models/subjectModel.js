import mongoose from "mongoose";
import pyqModel from "./pyqModel.js";

const subjectSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    subjectName: {
        type: String,
        required: true
    }
}, { timestamps: true });

//to delete all notes related to a category on deleting category
subjectSchema.post('findOneAndDelete', async (doc) => {
    try {
        if (doc) {
            await pyqModel.deleteMany({ subjectId: doc._id });
        }
    } catch (error) {
        console.log(error);
    }
})

const subjectModel = mongoose.model('subjects', subjectSchema);
export default subjectModel;