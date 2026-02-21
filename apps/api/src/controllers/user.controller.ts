import { Request, Response } from "express";
import { User } from "../models/user.model.js";

import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createUser = asyncHandler(async function (req: Request, res: Response) {
    const { username, email, password, role, description } = req.body;

    if (!username || !email || !password || !role) {
        throw new ApiError(
            400,
            "username, email, password and role is required",
        );
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
        throw new ApiError(400, "username already exist");
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        throw new ApiError(400, "email already exist");
    }

    const createdUser = await User.create({
        username,
        email,
        password,
        role,
        description,
    });

    if (!createdUser) {
        throw new ApiError(400, "Something went wrong while creating user");
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, createdUser, "User created Successfully !!!"),
        );
});

const validateAssingee = asyncHandler(async (req: Request, res: Response) => {
    const { username } = req.params;

    if (!username) {
        throw new ApiError(400, "Assignee username is required");
    }

    const assignee = await User.findOne({ username });
    if (!assignee) {
        throw new ApiError(400, "Assignee does not exist");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, assignee, "Assginee validated successfully"),
        );
})

export { createUser, validateAssingee };
