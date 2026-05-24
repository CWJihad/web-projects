import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username already exist"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exist"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    verified: {
        type: Boolean,
        default: false
    }
})

const userModel = mongoose.model('user', userSchema) // in here user is a collection

export default userModel;


