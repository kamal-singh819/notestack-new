import mongoose from "mongoose";
import notesModel from './notesModel.js';
const categorySchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    categoryName: {
        type: String,
        required: true
    }
}, { timestamps: true });

//to delete all notes related to a category on deleting category
categorySchema.post('findOneAndDelete', async (doc) => {
    console.log(doc);
    try {
        if (doc) {
            await notesModel.deleteMany({ categoryId: doc._id });
        }
    } catch (error) {
        console.log(error);
    }
})

const categoryModel = mongoose.model('categories', categorySchema);
export default categoryModel;