import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

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
        minLength:[6, "Your password should be longer then 6 characters"],
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

// Encrypting password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
       return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
    
});

// Return JWT Token
userSchema.method.getJwtToken = function() {
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_EXPIRES_TIME,
  });
};

export default mongoose.model("User", userSchema);