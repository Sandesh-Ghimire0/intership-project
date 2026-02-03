import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { IUser } from "../types/type.js";


const userSchema = new mongoose.Schema<IUser>(
    {
        username: {
            type: String,
            unique:true,
            required: true,
            lowercase: true,
            trim: true,
            index:true
        },
        email: {
            type: String,
            unique:true,
            required: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
    },
    { timestamps: true },
);

/* 
    - "this" is the mongoose Docuement that follows the IUser interface
    - no need to call next(), mongoose will automatically call the next middleware when the promise resolves
*/
userSchema.pre<IUser>("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
});

userSchema.methods.isPasswordCorrect = async function (userPassword: string) {
    const isMatched = await bcrypt.compare(userPassword, this.password);
    return isMatched;
};

userSchema.methods.generateAccessToken = function (): string {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            role: this.role,
        },
        process.env.ACCESS_TOKEN_SECRET as Secret,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        } as SignOptions,
    );
};

export const User = mongoose.model("User", userSchema);
