import mongoose from "mongoose";

const articlesSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });


const articlesModel = mongoose.model('articles', articlesSchema);
export default articlesModel;