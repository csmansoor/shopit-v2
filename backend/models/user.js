import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength:[50, "Your name should not exceed 50 characters"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        maxLength:[50, "Your password should be longer then 6 characters"],
        select: false
    },
    avatar: {
        public_id: String,
        url: String,
    },
    role: {
        type: String,
        default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, 

{timestamps: true}
);

export default mongoose.model("User", userSchema);