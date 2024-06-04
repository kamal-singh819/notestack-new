import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    type: {
        type: String,
        enum: ["upload-request", "contributor-request"],
        required: true
    },
    skills: {
        type: String
    },
    message: {
        type: String
    }
});

const requestModel = mongoose.model("requests", requestSchema);
export default requestModel;