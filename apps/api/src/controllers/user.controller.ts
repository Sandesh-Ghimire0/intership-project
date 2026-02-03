import { Request, Response } from "express";
import { User } from "../models/user.model.js";

const createUser = async function (req: Request, res: Response) {
    try {
        const { username, email, password, role, description } = req.body;

        if (!username || !email || !password || !role) {
            return res.status(400).json({
                message: "username, email, password and role is required",
            });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({
                message: "username already exist",
            });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({
                message: "email already exist",
            });
        }

        const createdUser = await User.create({
            username,
            email,
            password,
            role,
            description,
        });

        if (!createdUser) {
            return res.status(400).json({
                message: "Something went wrong while creating user",
            });
        }

        return res.status(201).json({
            success: true,
            message: "User created Successfully !!!",
            data: createdUser,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error occured while creating user",
        });
    }
};


export {
    createUser
}