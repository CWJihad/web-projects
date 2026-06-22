import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: null
    },
    otp: {
        type: String,
        default: null
    },
    otpExp: {
        type: Date,
        default: null
    },
    avatar: {
        type: String,
        default: ""
    }
}, {timestamps: true})

const userModel = mongoose.model('user', userSchema)

export default userModel