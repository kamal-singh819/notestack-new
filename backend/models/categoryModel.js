import mongoose from "mongoose";
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

const categoryModel = mongoose.model('categories', categorySchema);
export default categoryModel;