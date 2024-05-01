import mongoose from 'mongoose';
const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (emailId) {
                const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return regex.test(emailId);
            },
            message: () => "Email Is Invalid"
        },
        trim: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (phone) {
                return phone.length >= 10;
            },
            message: () => "Phone No. is wrong or missing"
        }
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const usersModel = mongoose.model('users', usersSchema);
export default usersModel;