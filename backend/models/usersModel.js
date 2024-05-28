import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    googleId: {
        type: String,
        unique: true
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
        trim: true
    },
    imageUrl: {
        type: String
    },
    role: {
        type: String,
        enum: ["Admin", "Contributor", "User"],
        required: true,
        default: "User"
    },
    linkedin: {
        type: String
    },
    github: {
        type: String
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
            delete ret.__v;
        },
    },
});

const usersModel = mongoose.model('users', usersSchema);
export default usersModel;